(function(){
  'use strict';

  /* require plugins */
  var $ = require('jquery');
  require('../bower/jquery.colorbox.js');

  $(function(){
    $('.js-popin--content').colorbox({inline:true, width: "910px"});
  });
  
})();
