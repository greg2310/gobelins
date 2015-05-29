(function(){
  'use strict';

  /* require plugins */
  var $ = require('jquery');
  $(function(){
    $('.close-themes').click(function(){
     $('.filter-training-field').find('.list-themes').parent('.form-item').toggle();
     
    });
    
  });
})();
