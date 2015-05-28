(function(){
  'use strict';

  /* Require plugins */
  var $ = require('jquery');
  require('../../../bower_components/jquery-contenttoggle/jquery.contenttoggle.js');

  $(function(){
    var $body, $gallery;
    
    /* Open/close gallery. */
    $body = $('body');
    $body.contentToggle({
      group: 'aside-gallery',
      defaultState: 'close',
      elementClass: 'is-open--gallery',
      triggerSelector: '.js-contentToggle--gallery__trigger',
      contentSelector: '.js-contentToggle--gallery__content',
      toggleProperties: {}
    });
    
    /* Initialize gallery.*/
    $gallery = $('.js-masonry--aside-gallery');
    $gallery.imagesLoaded( function() {
      $gallery.masonry({
        itemSelector: '.js-masonry--aside-gallery__item',
        columnWidth: '.aside-gallery__item--1'
      });
    });
  });
})();
