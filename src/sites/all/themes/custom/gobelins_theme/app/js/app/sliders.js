(function(){
  'use strict';

  /* require plugins */
  var $ = require('jquery');
  require('../../../bower_components/owl.carousel/dist/owl.carousel.js');

  $(function(){
    var $sliders, initCallback, translateCallback;
    
    /* Function called when slider initilazes. */
    initCallback = function() {
      var $slider = this.dom.$el;
      $slider.find('.js-slider--left').addClass('is-disabled');
      if (this.num.active >= this.num.items) {
        $slider.find('.js-slider--right').addClass('is-disabled');
        $slider.find('.owl-nav').css({opacity: 0});
      }
    };
    
    /* Function called when slider moves. */
    translateCallback = function(event) {
      var $slider = $(event.target);
      var hiddenNav = 0;
      if (event.item.index <= 0) {
        $slider.find('.js-slider--left').addClass('is-disabled');
        hiddenNav++;
      } else {
        $slider.find('.js-slider--left').removeClass('is-disabled');
      }
      if (event.item.index + event.page.size >= event.item.count) {
        $slider.find('.js-slider--right').addClass('is-disabled');
        hiddenNav++;
      } else {
        $slider.find('.js-slider--right').removeClass('is-disabled');
      }
      if (hiddenNav === 2) {
        $slider.find('.owl-nav').css({opacity: 0});
      } else {
        $slider.find('.owl-nav').css({opacity: 1});
      }
    };
    
    /* 1 item slider. */
    $sliders = $('.js-slider--1').owlCarousel({
      nav: false,
      dots: true,
      items: 1,
      margin: 40,
      onInitialized: initCallback
    });
    $sliders.on('translate.owl.carousel', translateCallback);
    
    /* 3 items slider. */
    $sliders = $('.js-slider--3').owlCarousel({
      nav: true,
      dots: false,
      navText: ['', ''],
      navClass: ['js-slider--left icon-left-small btn-round--light', 'js-slider--right icon-right-small btn-round--light'],
      onInitialized: initCallback,
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
    $sliders.on('translate.owl.carousel', translateCallback);
    
    /* 4 items slider. */
    $sliders = $('.js-slider--4').owlCarousel({
      nav: true,
      dots: false,
      navText: ['', ''],
      navClass: ['js-slider--left icon-left-small btn-round--dark', 'js-slider--right icon-right-small btn-round--dark'],
      onInitialized: initCallback,
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
    $sliders.on('translate.owl.carousel', translateCallback);
  });
})();