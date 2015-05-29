(function(){
  'use strict';

  /* Require plugins */
  var $ = require('jquery');
  var tmpl = require('../jstemplates/aside-gallery__ajax.js');
  require('../../../bower_components/jquery-contenttoggle/jquery.contenttoggle.js');

  $(function(){
    var $gallery, doneCallback;
    var $more = $('.js-masonry--aside-gallery__more');
    
    /* Open/close gallery. */
    $('.with-gallery').contentToggle({
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
    
    /* AJAX call */
    if (window.gobelinsSettings &&
        window.gobelinsSettings.asideGallery &&
        window.gobelinsSettings.asideGallery.url &&
        $more.length > 0) {
      
      doneCallback = function(data){
        var html, $items;
        
        if (!data.more) {
          $more.hide();
          $more.off('click');
        }
        
        if (typeof data.items == 'object') {
          html = tmpl['aside-gallery__ajax.html'](data);
          $items = $(html).filter('.js-masonry--aside-gallery__item');
          
          $gallery.append($items);
          $gallery.masonry('appended', $items);
          
          $items.imagesLoaded(function() {
            $gallery.masonry();
          });
        }
      };

      $more.on('click', function(){
        $.ajax({
          url: window.gobelinsSettings.asideGallery.url,
          dataType: 'json'
        }).done(doneCallback);
      });
    }
  });
})();
