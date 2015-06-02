(function(){
  'use strict';

  /* require plugins */
  var $ = require('jquery');
  require('../../../bower_components/colorbox/jquery.colorbox.js');

  $(function(){
    if (screen.width > 480){
      $('.js-popin--content').colorbox({inline:true, width: "910px"});
    }else{
      $('.js-popin--content').colorbox({inline:true, width: "400px"});
    }
  });
  
})();
