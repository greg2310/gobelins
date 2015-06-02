(function(){
  'use strict';

  /* require plugins */
  var $ = require('jquery');
  require('../../../bower_components/jquery-contenttoggle/jquery.contenttoggle.js');
  require('../../../bower_components/sticky/jquery.sticky.js');

  $(function(){
     var $body = $('body');
     var $subMenu = $('.js-contentToggle--nav-lev3');
     var $mobileSubMenu = $('.js-contentToggle--nav-mob');
     
     /********** Menu sub-menu. **********/
    $subMenu.contentToggle({
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
        duration: 200,
        complete: function() {
          var isOpen = $(this).triggerHandler('isOpen');
          isOpen && $(this).find('.js-contentToggle__content-lev3').eq(0).trigger('open');
        }
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
    
    
    /********** Menu mobile sub-menu. **********/
    $mobileSubMenu.contentToggle({
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
    
    
    /********** Menu mobile. **********/
    $('body').contentToggle({
      defaultState: 'close',
      globalClose: true,
      triggerSelector: '.js-btn-menu-mob',
      contentSelector: '.js-aside-move',
      toggleProperties: {}
    });
    
  });
})();
