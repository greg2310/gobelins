(function(){
  'use strict';

  /* require plugins */
  var $ = require('jquery');
  var Modernizr = require('modernizr');

  $(function(){
    var $element, $root, minScroll, scrollCallback;
    var $window = $(window);

    /* Setup data. */
    $element = $('.js-gototop');
    $root = $('html, body');
    minScroll = screen.height;

    scrollCallback = function() {
      if (Modernizr.mq('(max-width: 1400px)')) {
        $element.css({right: 27});
      } else {
        $element.css({right: ($window.width() - 1400) / 2 + 27});
      }

      if ($window.scrollTop() > minScroll) {
        $element.show();
      } else {
        $element.hide();
      }
    };

    /* Bind events. */
    $element.on('click', function(event){
      event.preventDefault();
      $root.animate({scrollTop: 0});
    });
    $window.on('scroll', scrollCallback);
    $window.on('resize', scrollCallback);

    /* Initialize. */
    scrollCallback();
  });

})();
