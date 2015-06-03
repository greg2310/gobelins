(function(){
  'use strict';

  /* require plugins */
  var $ = require('jquery');
  var Modernizr = require('modernizr');

  $(function(){
    var $element, $body, minScroll, scrollCallback;

    /* Setup data. */
    $element = $('.js-gototop');
    $body = $('body');
    minScroll = screen.height;

    scrollCallback = function() {
      if (Modernizr.mq('(max-width: 1400px)')) {
        $element.css({right: 27});
      } else {
        $element.css({right: ($body.width() - 1400) / 2 + 27});
      }

      if ($body.scrollTop() > minScroll) {
        $element.show();
      } else {
        $element.hide();
      }
    };

    /* Bind events. */
    $element.on('click', function(event){
      event.preventDefault();
      $body.animate({scrollTop: 0});
    });
    $(window).on('scroll', scrollCallback);

    /* Initialize. */
    scrollCallback();
  });

})();
