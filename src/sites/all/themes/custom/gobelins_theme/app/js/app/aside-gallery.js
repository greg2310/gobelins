(function(){
  'use strict';

  /* Require plugins */
  var $ = require('jquery');
  require('../../../bower_components/jquery-contenttoggle/jquery.contenttoggle.js');

  $(function(){
    var $gallery;
    
    /* Open/close gallery. */
    $('body').contentToggle({
      group: 'aside-gallery',
      defaultState: 'close',
      globalClose: true,
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
        columnWidth: 245,
        gutter: 40,
      });
    });
  });
})();
