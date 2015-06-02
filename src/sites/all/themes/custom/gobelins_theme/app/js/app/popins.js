(function(){
  'use strict';

  /* require plugins */
  var $ = require('jquery');
  require('../../../bower_components/colorbox/jquery.colorbox.js');

  $(function(){
    var baseOptions;
    var groupId = 0;
    var width = 400;
    if (screen.width > 480){
      width = 910;
    }
    
    baseOptions = {
      width: width,
      transition: 'none',
      title: false
    };
    
    // HTML content popin.
    $('.js-popin--content').colorbox({
      inline: true,
      width: width,
      transition: 'none',
      title: false
    });
    
    // Video popin.
    $('.js-popin--video').colorbox({
      inline: true,
      className:'is-video',
      width: width,
      maxHeight: '90%',
      transition: 'none',
      title: false
    });
    $(document).on('cbox_complete', function(){
      var $iframes = $('#cboxLoadedContent iframe');
      $iframes.each(function(index){
        var $iframe = $iframes.eq(index);
        var width  = $iframe.attr('width');
        var height = $iframe.attr('height');
        var ratio = parseInt(width, 10) / parseInt(height, 10);
        $iframe.height($iframe.width() / ratio);
      });
      $iframes.length && $.colorbox.resize();
    });
    
    // Gallery popin.
    $('.js-popin--gallery').each(function(){
      $(this).find('.js-popin--gallery__item').colorbox({
        rel: ++groupId,
        className:'is-video',
        maxWidth: '100%',
        maxHeight: '90%',
        transition: 'none',
        title: false,
        returnFocus: false,
      });
    });
  });

})();
