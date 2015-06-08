(function(){
  'use strict';

  /* require plugins */
  var $ = require('jquery');

  $(function(){
    var getPositions, scrollCallback;
    var $window = $(window);
    var $root = $('html, body');
    var $container = $('.js-sticky-menu__container');
    var $scroll = $('.js-sticky-menu__scroll');
    var $sections = $('.js-sticky-menu__section');
    var offset = 80 + 68;
    var positions = [];
    var $links = $();

    // Sections positions.
    getPositions = function(){
      $sections.each(function(index){
        var $section = $sections.eq(index);
        positions[index] = {
          top: $section.offset().top - offset,
          height: $section.outerHeight()
        };
      });
    };

    // Process function.
    scrollCallback = function(){
      var scrollTop = $window.scrollTop();
      var activeIndex = null;

      // Update active link.
      if ($sections.length > 0) {
        positions.forEach(function(position, index){
          if (scrollTop >= position.top && scrollTop < position.top + position.height) {
            activeIndex = index;
          }
        });

        $links.removeClass('is-active');
        if (activeIndex !== null) {
          $links.eq(activeIndex).addClass('is-active');
        }
      }

      // Update scroll bar.
      $scroll.width((scrollTop / ($root.height() - $window.height()) * 100) + '%');
    };

    // Set menu styicky.
    $('.js-sticky-menu').sticky({
      wrapperClassName: 'sticky-menu__sticky-wrapper',
      topSpacing: 80
    });

    // Events.
    $window.on('scroll', scrollCallback);
    if ($sections.length > 0) {
      $window.on('resize', getPositions);
    }
    $window.on('load', function(){
      getPositions();
      scrollCallback();
    });

    // Initialization.
    $sections.each(function(index){
      var $link;
      var title = $sections.eq(index).data('title');

      $link = $(document.createElement('a'))
        .addClass('sticky-menu__link')
        .attr('href', '#')
        .text(title)
        .appendTo($container)
        .on('click', function(event){
          event.preventDefault();
          $root.animate({scrollTop: positions[index].top});
        });
      $links = $links.add($link);
    });
  });
})();
