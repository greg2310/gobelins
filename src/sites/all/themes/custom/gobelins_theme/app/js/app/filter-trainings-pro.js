(function(){
  'use strict';

  /* require plugins */
  var $ = require('jquery');
  $(function(){
    $('.close-themes').click(function(){
     $('.filter-training-field').find('.list-themes').parent('.form-item').slideToggle( "slow" );
     
     if($(this).hasClass('icon-minus')){
      $(this).removeClass('icon-minus');
      $(this).addClass('icon-plus');
     }
     else if($(this).hasClass('icon-plus')){
      $(this).removeClass('icon-plus');
      $(this).addClass('icon-minus');
     }
    });
    
    
    if($('.block-banner.type').length > 0){
     $('.block-training-presentation').hide();
     $(this).find('.link-more-training').click(function(e){
      e.preventDefault();
      $('.block-training-presentation').slideToggle( "slow" );
     });
     
    }
    
  });
})();
