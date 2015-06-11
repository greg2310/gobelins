(function(){
  'use strict';

  /* require plugins */
  var $ = require('jquery');
  $(function(){
    
    //Déplacer bloc filtrer par durée prix dans les résultats de recherche page formation pro
    if($('.views-widget-sort-by').length > 0){
      $('.views-widget-sort-by').insertBefore('.results-filter-training__list');
      
    }
    
   // Afficher masquer themes dans les filtres
    $('.close-themes').click(function(){
     $('.filter-training-field').find('.list-themes').slideToggle( "slow" );
     
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
