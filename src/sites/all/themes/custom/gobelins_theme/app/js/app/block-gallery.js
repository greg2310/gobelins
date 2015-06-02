(function(){
  'use strict';

  /* Require plugins */
  var $ = require('jquery');
  var Modernizr = require('modernizr');
  require('../plugins/array.move.js');
  
  /* Plugin name. */
  var pluginName = 'blockGallery';
  
  /* Plugin default options. */
  var defaultOptions = {
    columns: {
      0: 3,
      840: 4,
      1120: 5
    }
  };
  
  /**
   * Constructor.
   */
  function Plugin(element, options) {
    // Merge specific and default options.
    this.options = $.extend({}, defaultOptions, options);
    
    // Initialize the main element.
    this.$element = (element instanceof $)? element: $(element);

    // Object initialisation.
    this.setup && this.setup();
    this.bind  && this.bind();
    this.init  && this.init();
  }
  
  /**
   * Setup plugin.
   * e.g. Get DOM elements, setup data...
   */
  Plugin.prototype.setup = function() {
    var data, totalBlocks, max, $style, style, i;
    
    /* DOM elements. */
    this.$grid = this.$element.find('.js-block_gallery__grid');
    this.$left = this.$element.find('.js-block_gallery__left');
    this.$right = this.$element.find('.js-block_gallery__right');
    this.$items = this.$element.find('.js-block_gallery__item');
    this.$stamp = this.$element.find('.js-block_gallery__stamp');
    
    /* Data initialization. */
    data = this.$element.data();
    this.totalCols = data.totalCols;
    this.colWidth = data.colWidth;
    this.lineHeight = data.lineHeight;
    this.currentColumn = 0;
    this.items = [];
    totalBlocks = 0;
    max = {
      col: 0,
      line: 0
    };
    
    /* Get items data. */
    this.$items.each(function(index){
      var $el = this.$items.eq(index);
      var data = $el.data();
      totalBlocks += data.width * data.height;
      this.items[index] = {
        width: data.width,
        height: data.height,
        $el: $el,
        index: index
      };
      max.col = Math.max(max.col, data.width);
      max.line = Math.max(max.line, data.height);
    }.bind(this));
    this.totalLines = Math.ceil(totalBlocks / this.totalCols);
    
    /* Write styles. */
    style = '';
    $.each(this.options.columns, function(breakpoint, colNumber){
      style += '@media screen and (min-width: ' + breakpoint + 'px) {' + "\n";
      for (i = 1; i <= max.col; i++) {
        style += '.block-gallery__item[data-width="' + i + '"]{width:' + (i * 100 / colNumber) + '%;}' + "\n";
      }
      for (i = 0; i < this.totalCols; i++) {
        style += '.block-gallery__item[data-col="' + i + '"]{left:' + (i * 100 / colNumber) + '%;}' + "\n";
      }
      style += '}' + "\n";
    }.bind(this));
    for (i = 1; i <= max.line; i++) {
      style += '.block-gallery__item[data-height="' + i + '"]{height:' + (i * 100 / this.totalLines) + '%;}' + "\n";
    }
    for (i = 0; i < this.totalLines; i++) {
      style += '.block-gallery__item[data-line="' + i + '"]{top:' + (i * 100 / this.totalLines) + '%;}' + "\n";
    }
    $style = $(document.createElement('style'));
    $style.text(style).appendTo('head');
  };

  /**
   * Bind events.
   */
  Plugin.prototype.bind = function() {
    this.$left.on('click.' + pluginName, this.prev.bind(this));
    this.$right.on('click.' + pluginName, this.next.bind(this));
    $(window).on('resize.' + pluginName, this.resize.bind(this));
  };

  /**
   * Initialize default plugin state.
   */
  Plugin.prototype.init = function() {
    this.buildGrid();
    this.resize();
  };
    
  /**
   * Optionally move an item up and (re)build the grid.
   */
  Plugin.prototype.buildGrid = function(index) {
    var i, searchIndex;
    
    // Initialize data.
    this.gridColIndex = 0;
    this.gridLineIndex = 0;
    this.grid = [];
    for (i = 0; i < this.totalCols; i++) {
      this.grid[i] = [];
    }
    this.items.map(function(value){
      value.processed = false;
    });
    
    if (index) {
      // Rebuild case.
      searchIndex = index - 1;
      while (this.items[searchIndex] && this.items[searchIndex].height > 1) {
        searchIndex--;
      }
      this.items.move(searchIndex, index + 1);
      if(this.items[searchIndex]) {
        // Start new build.
        this.buildGridRecursive(0);
      } else {
        // We can't build a nice gallery...
        console.log('block-gallery : can\'t build a well formed grid.');
      }
    } else {
      // First build.
      this.buildGridRecursive(0);
    }
  };
  
  /**
   * Build the grid.
   */
  Plugin.prototype.buildGridRecursive = function(index) {
    var i, searchIndex;
    var empty = true;
    
    // Check if item has been already processed.
    if (this.items[index].processed) {
      this.processItem(index + 1);
      return;
    }
    
    // Check if there is enough place at the current position.
    for (i = 1; i < this.items[index].width; i++) {
      if (this.gridColIndex + i >= this.totalCols ||
          this.grid[this.gridColIndex + i][this.gridLineIndex]) {
         empty = false;
      }
    }
    
    if (empty) {
      this.insertItem(index);
      this.processItem(index + 1);
    } else {
      // KO : Search for a narrower item.
      searchIndex = index + 1;
      while (this.items[searchIndex] &&
             (this.items[searchIndex].processed ||
             this.items[searchIndex].width >= this.items[index].width)) {
        searchIndex++;
      }
      if(this.items[searchIndex]) {
        // Insert found item then re-process the same item.
        this.insertItem(searchIndex);
        this.processItem(index);
      } else {
        // Move the item up and rebuild the grid.
        this.buildGrid(index);
      }
    }
  };
  
  /**
   * Insert item into the grid.
   */
  Plugin.prototype.insertItem = function(index) {
    var i, j;
    
    // Update item data.
    this.items[index].processed = true;
    this.items[index].$el.attr('data-col', this.gridColIndex);
    this.items[index].$el.attr('data-line', this.gridLineIndex);
    
    // Fill grid.
    for (i = 0; i < this.items[index].width; i++) {
      for (j = 0; j < this.items[index].height; j++) {
        this.grid[this.gridColIndex + i][this.gridLineIndex + j] = this.items[index];
      }
    }
    
    // Search next empty block.
    while (this.grid[this.gridColIndex][this.gridLineIndex]) {
      this.gridColIndex++;
      if (this.gridColIndex === this.totalCols) {
        this.gridColIndex = 0;
        this.gridLineIndex++;
      }
    }
  };
  
  /**
   * Process item if exists or finilize grid.
   */
  Plugin.prototype.processItem = function(index) {
    if (this.items[index]) {
      // Process next item.
      this.buildGridRecursive(index);
    } else {
      // We finish building the grid: check if it's OK.
      this.checkGrid();
    }
  };
  
  /**
   * Check if the grid is well formed.
   */
  Plugin.prototype.checkGrid = function() {
    var index;
    var i = 0;
    
    // Check if an item is overflowing.
    while (!index && this.grid[i]) {
      if (this.grid[i][this.totalLines]) {
        index = this.grid[i][this.totalLines].index;
      }
      i++;
    }
    
    if (index) {
      // Move the item up and rebuild the grid.
      this.buildGrid(index);
    }
  };
  
  /**
   * Go to previous slide.
   */
  Plugin.prototype.getColumns = function() {
    var columns = 5;
    if (Modernizr.mq('(max-width: 840px)')) {
      columns = 3;
    } else if (Modernizr.mq('(max-width: 1120px)')) {
      columns = 4;
    }
    return columns;
  };
  
  /**
   * Go to previous slide.
   */
  Plugin.prototype.prev = function() {
    if (this.currentColumn > 0) {
      this.currentColumn--;
      this.move();
    }
  };
  
  /**
   * Go to next slide.
   */
  Plugin.prototype.next = function() {
    if (this.currentColumn < this.totalCols - this.columnNumber) {
      this.currentColumn++;
      this.move();
    }
  };
  
  /**
   * Go to slide.
   */
  Plugin.prototype.move = function() {
    if (this.currentColumn >= this.totalCols - this.columnNumber) {
      this.currentColumn = this.totalCols - this.columnNumber;
    }
    this.$grid.css({left: (- this.currentColumn * 100 / this.columnNumber) + '%'});
    this.updatePager();
  };
  
  /**
   * Update pager state.
   */
  Plugin.prototype.updatePager = function() {
    if (this.currentColumn === 0) {
      this.$left.addClass('is-disabled');
    } else {
      this.$left.removeClass('is-disabled');
    }
    if (this.currentColumn === this.totalCols - this.columnNumber) {
      this.$right.addClass('is-disabled');
    } else {
      this.$right.removeClass('is-disabled');
    }
  };
  
  /**
   * Resize callback.
   */
  Plugin.prototype.resize = function() {
    this.columnNumber = this.getColumns();
    var colWidth = this.$element.width() / this.columnNumber;
    var lineHeight = this.lineHeight / this.colWidth * colWidth;
    var percentage = colWidth / this.colWidth;
    
    this.$grid.css({
      height: this.totalLines * lineHeight
    });
    this.$stamp.css({
      fontSize: percentage + 'em'
    });
    this.move();
  };

  $(function(){
    $('.js-block_gallery').each(function(){
      new Plugin(this);
    });
  });
})();
