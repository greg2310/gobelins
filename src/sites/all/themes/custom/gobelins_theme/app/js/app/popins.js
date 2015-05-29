(function(){
  'use strict';

  /* require plugins */
  var $ = require('jquery');
  require('../../../bower_components/colorbox/jquery.colorbox.js');

  $(function(){
    $('.js-popin--content').colorbox({inline:true, width: "910px"});
  });
  
})();
