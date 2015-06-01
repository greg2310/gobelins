(function(){
  'use strict';

  /* require plugins */
  var $ = require('jquery');
  $(function(){
   // Afficher masquer themes dans les filtres
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
    
    // Afficher masquer block en savoir plus banner type
    if($('.block-banner.type').length > 0){
     $('.block-training-presentation').hide();
     $(this).find('.link-more-training').click(function(e){
      e.preventDefault();
      $('.block-training-presentation').slideToggle( "slow" );
     });
    }
    
    // Changement position bloc banner type sur mobile
    if(window.matchMedia("(max-width:767px)").matches) {
       $('.intro-link').insertAfter('.block-banner.type');
     } else{
      $('.intro-link').insertAfter('.training-type-summary');
     }
    
  });
  
  // Changement position bloc banner type sur mobile
  window.addEventListener("resize", redimensionnement,false);

  function redimensionnement() {
    if("matchMedia" in window) { // Détection
      if(window.matchMedia("(max-width:767px)").matches) {
        $('.intro-link').insertAfter('.block-banner.type');
      } else{
       $('.intro-link').insertAfter('.training-type-summary');
      }
    }
  }
   
})();
