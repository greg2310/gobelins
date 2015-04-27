(function($){
  'use strict';

  /* Plugin variables. */
  var pluginName;
  var defaultOptions = {};
  var $global = $(document);
  var globalEvent = navigator.userAgent.match(/iPad|iPhone/i)? 'touchstart' : 'click';
  var uid = 0;

  /**
   * Plugin Constructor.
   *
   * @param {Node|jQuery} element
   *   Main DOM element.
   * @param {string} selector
   *   Element initial selector.
   * @param {object} options
   *   Instance specific options.
   */
  function Plugin(element, selector, options) {
    // Merge specific and default options.
    this.options = $.extend({}, defaultOptions, options);

    // Initialize data.
    this.$element = (element instanceof $)? element: $(element);
    this.selector = selector;
    this.uid = ++uid;

    // Save the instance reference into the DOM element.
    this.$element.data(pluginName, this);

    // Object initialization.
    this.setup();
    this.bind();
    this.init();
  }

  /********** Start plugin specific code **********/

    /* Plugin name. */
  pluginName = 'contentToggle';

  /* Plugin default options. */
  defaultOptions = {
    globalClose: false,
    independent: false,
    beforeCallback: null,
    triggerSelector: '.js-contentToggle__trigger',
    triggerSelectorContext: true,
    contentSelector: '.js-contentToggle__content',
    contentSelectorContext: true,
    elementClass: 'is-open',
    triggerClass: 'is-active',
    toggleProperties: {
      height: 'toggle'
    },
    toggleOptions: {
      duration: 0
    }
  };

  /**
   * Setup plugin.
   * e.g. Get DOM elements, setup data...
   */
  Plugin.prototype.setup = function() {
    this.setupDataOptions();

    // Get trigger elements.
    if (this.options.triggerSelectorContext) {
      this.$triggers = $(this.options.triggerSelector, this.$element);
    } else {
      this.$triggers = $(this.options.triggerSelector);
    }
    if (this.$triggers.length === 0) {
      this.$triggers = this.$element;
    }

    // Get content elements.
    if (this.options.contentSelectorContext) {
      this.$contents = $(this.options.contentSelector, this.$element);
    } else {
      this.$contents = $(this.options.contentSelector);
    }

    // Get callback.
    if (typeof this.options.beforeCallback == 'string' &&
        window[this.options.beforeCallback] &&
        typeof window[this.options.beforeCallback] == 'function') {
      this.options.beforeCallback = window[this.options.beforeCallback].bind(this);
    } else if (typeof this.options.beforeCallback == 'function') {
      this.options.beforeCallback = this.options.beforeCallback.bind(this);
    }
  };

  /**
   * Setup plugin specific data.
   * e.g. Get DOM elements, setup data...
   */
  Plugin.prototype.setupDataOptions = function() {
    $.each(
      this.$element.data(),
      function(index, value){
        if (index in defaultOptions) {
          this.options[index] = value;
        }
      }.bind(this)
    );
  };

  /**
   * Bind events.
   */
  Plugin.prototype.bind = function() {
    // Bind custom events.
    this.$element.on('toggle.' + pluginName, $.proxy(this.toggle, this, null));
    this.$element.on('open.' + pluginName, $.proxy(this.toggle, this, true));
    this.$element.on('close.' + pluginName, $.proxy(this.toggle, this, false));
    this.$element.on('destroy.' + pluginName, this.destroy.bind(this));

    // Bind native events.
    this.$triggers.on('click.' + pluginName, function(event){
      event.preventDefault();
      event.stopPropagation();
      this.toggle(null, event);
    }.bind(this));
    this.$triggers.on('dblclick.' + pluginName, function(event){
      event.preventDefault();
    });
    this.$contents.on('click.' + pluginName, function(event){
      event.stopPropagation();
    });
    if (this.options.globalClose) {
      this.$element.on(globalEvent + '.' + pluginName, function(event){
        event.stopPropagation();
      });
    }
  };

  /**
   * Initialize default plugin state.
   */
  Plugin.prototype.init = function() {
    this.isOpen = this.$contents.is(':visible');
  };

  /**
   * Toggle content.
   *
   * @param {boolean} state
   *   The state of the wanted display.
   * @param {Event} event
   *   The event object.
   */
  Plugin.prototype.toggle = function(state, event) {
    if (typeof state != 'boolean') {
      state = !this.isOpen;
    }

    this.$currentTrigger = null;
    if (this.$triggers.is(event.currentTarget)) {
      this.$currentTrigger = $(event.currentTarget);
    } else if(this.$triggers.is(event.target)) {
      this.$currentTrigger = $(event.target);
    }

    if (!this.options.beforeCallback ||
        (typeof this.options.beforeCallback == 'function' &&
         this.options.beforeCallback(event))) {
      if (state) {
        this.open();
      } else {
        this.close();
      }
    }
  };

  /**
   * Open content.
   */
  Plugin.prototype.open = function() {
    if (!this.isOpen) {
      this.isOpen = true;
      this.do();
      this.closeAll(true);
      if (this.options.globalClose) {
        $global.on(globalEvent + '.' + pluginName + this.uid, function(){
          this.closeAll();
        }.bind(this));
      }
    }
  };

  /**
   * Close content.
   */
  Plugin.prototype.close = function() {
    if (this.isOpen) {
      this.isOpen = false;
      this.do();
      $global.off('.' + pluginName + this.uid);
    }
  };

  /**
   * Close all binded instances.
   *
   * @param {boolean} butItself
   *   Close all but itself or not.
   */
  Plugin.prototype.closeAll = function(butItself) {
    if (!this.options.independent) {
      $(this.selector).not(this.$element).trigger('close.' + pluginName);
    }
    if (!butItself) {
      this.close();
    }
  };

  /**
   * Perform toggle action.
   */
  Plugin.prototype.do = function() {
    if (this.options.elementClass) {
      this.$element.toggleClass(this.options.elementClass, this.isOpen);
    }
    if (this.options.triggerClass && this.$currentTrigger) {
      this.$currentTrigger.toggleClass(this.options.triggerClass, this.isOpen);
    }
    this.$contents.stop().animate(
      this.options.toggleProperties,
      this.options.toggleOptions
    );
  };

  /**
   * Destroy events.
   */
  Plugin.prototype.destroy = function() {
    this.$element.off('.' + pluginName);
    this.$triggers.off('.' + pluginName);
    this.$contents.off('.' + pluginName);
  };

  /********** End plugin specific code **********/

  /* Expose jQuery plugin. */
  $.fn[pluginName] = function(options) {
    var selector = this.selector;
    return this.each(function() {
      var $this = $(this);
      if (!$this.data(pluginName)) {
        new Plugin($this, selector, options);
      }
    });
  };
})(jQuery);
