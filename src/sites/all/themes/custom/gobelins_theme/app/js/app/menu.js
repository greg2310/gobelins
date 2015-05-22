(function(){
  'use strict';

  /* require plugins */
  var $ = require('jquery');
  require('../bower/jquery.contenttoggle.js');
  require('../bower/jquery.sticky.js');

  $(function(){
     var $body = $('body');
     var $subMenu;
     
     /********** Menu sub-menu. **********/
    $subMenu = $('.js-contentToggle--nav-lev3').contentToggle({
      contentSelector: '.js-contentToggle__content-lev3',
      elementClass:'is-open-lev3',
      toggleOptions: {
        duration: 200
      }
    });
    $('.js-contentToggle--nav').contentToggle({
      globalClose: true,
      beforeCallback: function() {
        $subMenu.trigger('close');
        return true;
      },
      toggleOptions: {
        duration: 200
      }
    });
    
    
    /********** Menu hover. **********/
    $('.main-menu--desktop').find('.lev1').hover(function(){
      $(this).siblings().children('a').stop().animate({'opacity' : '0.5'}, 300);
    }, function(){
      $(this).siblings().children('a').stop().animate({'opacity' : '1'}, 300);
    });
    
    
    /********** Menu sticky. **********/
    $('.js-header-sticky').sticky();
    
    
    /********** Menu mobile. **********/
    $('body').contentToggle({
      defaultState: 'close',
      globalClose: true,
      triggerSelector: '.js-btn-menu-mob',
      contentSelector: '.js-aside-move',
      toggleProperties: {}
    });
    
    
    /********** Menu mobile sub-menu. **********/
    $('.js-contentToggle--nav-mob').contentToggle({
      globalClose: true,
      toggleOptions: {
        duration: 0,
        complete: function() {
          var isOpen = $(this).triggerHandler('isOpen');
          $body.toggleClass('is-open__lev2', isOpen);
        }
      },
      toggleProperties: {
        width: 'toggle'
      }
    });
    $('.js-menu-lev2-close').click(function(){
      $(this).closest('.js-contentToggle--nav-mob').trigger('close');
    });
    
  });
})();
