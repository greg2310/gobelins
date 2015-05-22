require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){
  'use strict';

  /* require app plugins */
  require('./app/menu.js');

})();

},{"./app/menu.js":2}],2:[function(require,module,exports){
(function(){
  'use strict';

  /* require plugins */
  var $ = require('jquery');
  require('../bower/jquery.contenttoggle.js');
  require('../bower/jquery.sticky.js');

  $(function(){
     var $body = $('body');
     var $subMenu;
     
     /********** Menu sub-menu. **********/
    $subMenu = $('.js-contentToggle--nav-lev3').contentToggle({
      contentSelector: '.js-contentToggle__content-lev3',
      elementClass:'is-open-lev3',
      toggleOptions: {
        duration: 200
      }
    });
    $('.js-contentToggle--nav').contentToggle({
      globalClose: true,
      beforeCallback: function() {
        $subMenu.trigger('close');
        return true;
      },
      toggleOptions: {
        duration: 200
      }
    });
    
    
    /********** Menu hover. **********/
    $('.main-menu--desktop').find('.lev1').hover(function(){
      $(this).siblings().children('a').stop().animate({'opacity' : '0.5'}, 300);
    }, function(){
      $(this).siblings().children('a').stop().animate({'opacity' : '1'}, 300);
    });
    
    
    /********** Menu sticky. **********/
    $('.js-header-sticky').sticky();
    
    
    /********** Menu mobile. **********/
    $('body').contentToggle({
      defaultState: 'close',
      globalClose: true,
      triggerSelector: '.js-btn-menu-mob',
      contentSelector: '.js-aside-move',
      toggleProperties: {}
    });
    
    
    /********** Menu mobile sub-menu. **********/
    $('.js-contentToggle--nav-mob').contentToggle({
      globalClose: true,
      toggleOptions: {
        duration: 0,
        complete: function() {
          var isOpen = $(this).triggerHandler('isOpen');
          $body.toggleClass('is-open__lev2', isOpen);
        }
      },
      toggleProperties: {
        width: 'toggle'
      }
    });
    $('.js-menu-lev2-close').click(function(){
      $(this).closest('.js-contentToggle--nav-mob').trigger('close');
    });
    
  });
})();

},{"../bower/jquery.contenttoggle.js":3,"../bower/jquery.sticky.js":4,"jquery":"jquery"}],3:[function(require,module,exports){
(function($){
  'use strict';

  /* Plugin constants. */
  var ENTER_KEY_CODE = 13;
  var SPACE_KEY_CODE = 32;

  /* Plugin variables. */
  var pluginName;
  var defaultOptions = {};
  var $global = $(document);
  var isIthing = navigator.userAgent.match(/iPad|iPhone/i);
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
    defaultState: null,
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

    // Parse JSON options.
    if (typeof this.options.toggleProperties == 'string') {
      this.options.toggleProperties = JSON.parse(this.options.toggleProperties);
    }
    if (typeof this.options.toggleOptions == 'string') {
      this.options.toggleOptions = JSON.parse(this.options.toggleOptions);
    }

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
    var eventName = (isIthing && this.options.globalClose)? 'touchstart': 'click';
    var $all = this.$element.add(this.$triggers).add(this.$contents);

    // Bind custom events on all elements.
    $all.on('destroy.' + pluginName, this.destroy.bind(this));
    $all.on('toggle.' + pluginName, $.proxy(this.toggle, this, null));
    $all.on('close.' + pluginName, $.proxy(this.toggle, this, false));
    $all.on('open.' + pluginName, $.proxy(this.toggle, this, true));
    $all.on('isOpen.' + pluginName, function(){
      return this.isOpen;
    }.bind(this));

    // Bind native events on triggers.
    this.$triggers.on(eventName + '.' + pluginName, function(event){
      event.preventDefault();
      this.toggle(null, event);
    }.bind(this));
    this.$triggers.on('keydown.' + pluginName, function(event){
      if (event.keyCode == ENTER_KEY_CODE || event.keyCode == SPACE_KEY_CODE) {
        event.preventDefault();
        this.toggle(null, event);
      }
    }.bind(this));

    // Bind native events on contents (avoid triggers click event).
    this.$contents.on(eventName + '.' + pluginName, function(event){
      event.stopPropagation();
    });
  };

  /**
   * Initialize default plugin state.
   */
  Plugin.prototype.init = function() {
    // Init triggers id atttribute.
    this.tid = [];
    this.$triggers.each($.proxy(this.initId, this, this.tid, 'contentToggle__trigger'));

    // Init contents id atttribute.
    this.cid = [];
    this.$contents.each($.proxy(this.initId, this, this.cid, 'contentToggle__content'));

    // Init ariacontrols atttribute.
    this.$triggers.attr('role', 'button');
    this.$triggers.attr('aria-controls', this.cid.join(' '));

    // Default plugin state.
    if ($.inArray(this.options.defaultState, ['open', 'close']) !== -1) {
      this.$element.trigger(this.options.defaultState + '.' + pluginName);
    } else {
      this.isOpen = this.$contents.is(':visible');
      this.update();
    }
  };

  /**
   * Initialize element id.
   */
  Plugin.prototype.initId = function(ids, prefix, index, element) {
    var $element = $(element);
    ids[index] = $element.attr('id');
    if (!ids[index]) {
      ids[index] = prefix + '-' + this.uid + '-' + index;
      $element.attr('id', ids[index]);
    }
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
    event.stopPropagation();
    
    if (typeof state != 'boolean') {
      state = !this.isOpen;
    }

    this.$currentTrigger = null;
    if (this.$triggers.is(event.currentTarget)) {
      this.$currentTrigger = $(event.currentTarget);
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
    var eventName;
    if (this.isOpen !== true) {
      this.isOpen = true;
      this.do();
      this.closeAll(true);
      if (this.options.globalClose) {
        eventName = isIthing? 'touchstart': 'click';
        $global.on(eventName + '.' + pluginName + this.uid, function(){
          this.closeAll();
        }.bind(this));
      }
    }
  };

  /**
   * Close content.
   */
  Plugin.prototype.close = function() {
    if (this.isOpen !== false) {
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
    this.update();
    if (this.isOpen ^ this.$contents.is(':visible')) {
      this.$contents.stop().animate(
        this.options.toggleProperties,
        this.options.toggleOptions
      );
    }
  };

  /**
   * Update classes and aria data.
   */
  Plugin.prototype.update = function() {
    if (this.isOpen) {
      this.$element.addClass(this.options.elementClass);
      this.$contents.attr('aria-hidden', false);
      this.$triggers.attr('aria-expanded', true);
      if (this.$currentTrigger) {
        this.$currentTrigger.addClass(this.options.triggerClass);
      } else {
        this.$triggers.addClass(this.options.triggerClass);
      }
    } else {
      this.$element.removeClass(this.options.elementClass);
      this.$contents.attr('aria-hidden', true);
      this.$triggers.attr('aria-expanded', false);
      this.$triggers.removeClass(this.options.triggerClass);
    }
  };

  /**
   * Destroy events.
   */
  Plugin.prototype.destroy = function() {
    this.$element.removeData(pluginName);
    this.$element.off('.' + pluginName);
    this.$triggers.off('.' + pluginName);
    this.$contents.off('.' + pluginName);
    $global.off('.' + pluginName + this.uid);
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


},{}],4:[function(require,module,exports){
// Sticky Plugin v1.0.0 for jQuery
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Created: 2/14/2011
// Date: 2/12/2012
// Website: http://labs.anthonygarand.com/sticky
// Description: Makes an element on the page stick on the screen as you scroll
//       It will only set the 'top' and 'position' of your element, you
//       might need to adjust the width in some cases.

(function($) {
  var defaults = {
      topSpacing: 0,
      bottomSpacing: 0,
      className: 'is-sticky',
      wrapperClassName: 'sticky-wrapper',
      center: false,
      getWidthFrom: '',
      responsiveWidth: false
    },
    $window = $(window),
    $document = $(document),
    sticked = [],
    windowHeight = $window.height(),
    scroller = function() {
      var scrollTop = $window.scrollTop(),
        documentHeight = $document.height(),
        dwh = documentHeight - windowHeight,
        extra = (scrollTop > dwh) ? dwh - scrollTop : 0;

      for (var i = 0; i < sticked.length; i++) {
        var s = sticked[i],
          elementTop = s.stickyWrapper.offset().top,
          etse = elementTop - s.topSpacing - extra;

        if (scrollTop <= etse) {
          if (s.currentTop !== null) {
            s.stickyElement
              .css('position', '')
              .css('top', '');
            s.stickyElement.trigger('sticky-end', [s]).parent().removeClass(s.className);
            s.currentTop = null;
          }
        }
        else {
          var newTop = documentHeight - s.stickyElement.outerHeight()
            - s.topSpacing - s.bottomSpacing - scrollTop - extra;
          if (newTop < 0) {
            newTop = newTop + s.topSpacing;
          } else {
            newTop = s.topSpacing;
          }
          if (s.currentTop != newTop) {
            s.stickyElement
              .css('position', 'fixed')
              .css('top', newTop);

            if (typeof s.getWidthFrom !== 'undefined') {
              s.stickyElement.css('width', $(s.getWidthFrom).width());
            }

            s.stickyElement.trigger('sticky-start', [s]).parent().addClass(s.className);
            s.currentTop = newTop;
          }
        }
      }
    },
    resizer = function() {
      windowHeight = $window.height();

      for (var i = 0; i < sticked.length; i++) {
        var s = sticked[i];
        if (typeof s.getWidthFrom !== 'undefined' && s.responsiveWidth === true) {
          s.stickyElement.css('width', $(s.getWidthFrom).width());
        }
      }
    },
    methods = {
      init: function(options) {
        var o = $.extend({}, defaults, options);
        return this.each(function() {
          var stickyElement = $(this);

          var stickyId = stickyElement.attr('id');
          var wrapperId = stickyId ? stickyId + '-' + defaults.wrapperClassName : defaults.wrapperClassName 
          var wrapper = $('<div></div>')
            .attr('id', stickyId + '-sticky-wrapper')
            .addClass(o.wrapperClassName);
          stickyElement.wrapAll(wrapper);

          if (o.center) {
            stickyElement.parent().css({width:stickyElement.outerWidth(),marginLeft:"auto",marginRight:"auto"});
          }

          if (stickyElement.css("float") == "right") {
            stickyElement.css({"float":"none"}).parent().css({"float":"right"});
          }

          var stickyWrapper = stickyElement.parent();
          stickyWrapper.css('height', stickyElement.outerHeight());
          sticked.push({
            topSpacing: o.topSpacing,
            bottomSpacing: o.bottomSpacing,
            stickyElement: stickyElement,
            currentTop: null,
            stickyWrapper: stickyWrapper,
            className: o.className,
            getWidthFrom: o.getWidthFrom,
            responsiveWidth: o.responsiveWidth
          });
        });
      },
      update: scroller,
      unstick: function(options) {
        return this.each(function() {
          var unstickyElement = $(this);

          var removeIdx = -1;
          for (var i = 0; i < sticked.length; i++)
          {
            if (sticked[i].stickyElement.get(0) == unstickyElement.get(0))
            {
                removeIdx = i;
            }
          }
          if(removeIdx != -1)
          {
            sticked.splice(removeIdx,1);
            unstickyElement.unwrap();
            unstickyElement.removeAttr('style');
          }
        });
      }
    };

  // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
  if (window.addEventListener) {
    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', resizer, false);
  } else if (window.attachEvent) {
    window.attachEvent('onscroll', scroller);
    window.attachEvent('onresize', resizer);
  }

  $.fn.sticky = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };

  $.fn.unstick = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.unstick.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }

  };
  $(function() {
    setTimeout(scroller, 0);
  });
})(jQuery);

},{}],"jquery":[function(require,module,exports){
if (window.jQuery) {
  module.exports = window.jQuery;
}

},{}],"modernizr":[function(require,module,exports){
if (window.Modernizr) {
  module.exports = window.Modernizr;
}

},{}],"underscore":[function(require,module,exports){

},{}]},{},[1]);
