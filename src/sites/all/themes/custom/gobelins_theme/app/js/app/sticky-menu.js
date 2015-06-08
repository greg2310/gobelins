(function(){
  'use strict';

  /* require plugins */
  var $ = require('jquery');

  $(function(){
    var $window = $(window);
    var $root = $('html, body');
    var $container = $('.js-sticky-menu__container');
    var $scroll = $('.js-sticky-menu__scroll');
    var $sections = $('.js-sticky-menu__section');
    var $titles = $('.js-sticky-menu__title');
    var offset = $('.js-header-sticky').height() + $container.height();
    var positions = [];
    var $links = $();

    $('.js-sticky-menu').sticky({
      wrapperClassName: 'sticky-menu__sticky-wrapper',
      topSpacing: 80
    });

    $titles.each(function(index){
      var $link;
      var $title = $titles.eq(index);
      var title = $title.data('title');

      if (!title) {
        title = $title.text();
      }

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

    window.setTimeout(function(){
      // Initializes positions.
      $sections.each(function(index){
        var $section = $sections.eq(index);
        positions[index] = {
          top: $section.offset().top - offset,
          height: $section.outerHeight()
        };
      });
    }, 0);


    $window.on('scroll', function(){
      var scrollTop = $window.scrollTop();
      var activeIndex = null;

      // Find active link.
      positions.forEach(function(position, index){
        if (scrollTop >= position.top && scrollTop < position.top + position.height) {
          activeIndex = index;
        }
      });

      // Set active link.
      $links.removeClass('is-active');
      if (activeIndex !== null) {
        $links.eq(activeIndex).addClass('is-active');
      }

      // Update scroll bar.
      $scroll.width((scrollTop / ($root.height() - $window.height()) * 100) + '%');
    });
  });
})();
