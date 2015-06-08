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
      inline: true,
      width: width,
      maxHeight: '90%',
      transition: 'none',
      title: false,
      returnFocus: false
    };

    var processPopins = function(context, group) {
      var groupOptions = {};
      if (group) {
        groupOptions['rel'] = group;
      }

      // HTML content popin.
      $('.js-popin--content', context)
        .not('.is-colorbox-processed')
        .addClass('is-colorbox-processed')
        .colorbox($.extend({className:'is-content'}, groupOptions, baseOptions));

      // Video popin.
      $('.js-popin--video', context)
        .not('.is-colorbox-processed')
        .addClass('is-colorbox-processed')
        .colorbox($.extend({className:'is-video'}, groupOptions, baseOptions));

      // Gallery popin.
      $('.js-popin--gallery', context)
        .not('.is-colorbox-processed')
        .addClass('is-colorbox-processed')
        .colorbox($.extend({className:'is-gallery'}, groupOptions, baseOptions));
    };

    // Generate grouped popins first.
    $('.js-popin--group').each(function(){
      processPopins(this, ++groupId);
    });

    // Generate other popins after.
    $('body').each(function(){
      processPopins(this);
    });

    // Resize iframe.
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
  });

})();
