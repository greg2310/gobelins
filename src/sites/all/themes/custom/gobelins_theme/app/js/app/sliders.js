(function(){
  'use strict';

  /* require plugins */
  var $ = require('jquery');
  require('../bower/owl.carousel.js');

  $(function(){
    var $sliders, callback;
    
    /* Function called when slider moves. */
    callback = function(event) {
      var $slider = $(event.target);
      if (event.item.index === 0) {
        $slider.find('.js-slider--left').addClass('is-disabled');
      } else if (event.item.index + event.page.size === event.item.count) {
        $slider.find('.js-slider--right').addClass('is-disabled');
      } else {
        $slider.find('.js-slider--left').removeClass('is-disabled');
        $slider.find('.js-slider--right').removeClass('is-disabled');
      }
    };
    
    /* 1 item slider. */
    $sliders = $('.js-slider--1').owlCarousel({
      nav: true,
      items: 1,
      margin: 40
    });
    $sliders.on('translate.owl.carousel', callback);
    
    /* 3 items slider. */
    $sliders = $('.js-slider--3').owlCarousel({
      nav: true,
      navText: ['', ''],
      navClass: ['js-slider--left icon-left-small btn-round--light is-disabled', 'js-slider--right icon-right-small btn-round--light'],
      responsive : {
        // Breakpoint from 0 up to 767.
        0 : {
          items: 1,
          margin: 20
        },
        // Breakpoint from 768 up 1139.
        768 : {
          items: 2,
          margin: 34
        },
        // Breakpoint from 1140 up.
        1140 : {
          items: 3,
          margin: 40
        }
      }
    });
    $sliders.on('translate.owl.carousel', callback);
    
    /* 4 items slider. */
    $sliders = $('.js-slider--4').owlCarousel({
      nav: true,
      navText: ['', ''],
      navClass: ['js-slider--left icon-left-small btn-round--dark is-disabled', 'js-slider--right icon-right-small btn-round--dark'],
      responsive : {
        // Breakpoint from 0 up to 767.
        0 : {
          items: 2,
          margin: 20
        },
        // Breakpoint from 768 up 1139.
        768 : {
          items: 3,
          margin: 34
        },
        // Breakpoint from 1140 up.
        1140 : {
          items: 4,
          margin: 40
        }
      }
    });
    $sliders.on('translate.owl.carousel', callback);
  });
})();
