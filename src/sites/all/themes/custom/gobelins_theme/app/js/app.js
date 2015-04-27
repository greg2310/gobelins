(function(){
  'use strict';

  /* require jQuery plugins */
  var $ = require('jquery');

  $(function(){
    //var hash = window.location.hash;

    // Init contentToggle plugin.
    require('./plugins/jquery.contentToggle.js');

    // Main nav contentToggle initialization.
    $('.js-contentToggle--nav').contentToggle({
      globalClose: true,
      beforeCallback: function() {
        return this.isOpen || !this.$contents.is(':visible');
      },
      toggleOptions: {
        duration: 200,
        complete: function() {
          var $this = $(this);
          if (!$this.is(':visible')) {
            console.log('no visible');
            $(this).css({display: ''});
          }else{
            console.log('visible'); 
            
          }
        }
      }
    });
    $('.js-contentToggle--nav-mob').contentToggle({
      globalClose: true,
      beforeCallback: function() {
        return this.isOpen || !this.$contents.is(':visible');
      },
      toggleOptions: {
        duration: 200,
        complete: function() {
          var $this = $(this);
          if (!$this.is(':visible')) {
            console.log('no visible');
            $(this).css({display: ''});
          }else{
            console.log('visible'); 
            
          }
        }
      }
    });
    $('.js-contentToggle--nav-lev3').contentToggle({
      contentSelector: '.js-contentToggle__content-lev3',
      elementClass :'is-open-lev3',
      
      toggleOptions: {
        duration: 200,
        complete: function() {
          var $this = $(this);
          if (!$this.is(':visible')) {
            $(this).css({display: ''});
          }
        }
      }
    });

    // FAQ contentToggle initialization.
    /*$('.js-contentToggle--faq').contentToggle({
      independent: true,
      contentSelector: '+ .js-contentToggle__content'
    });*/

    /**********menu hover*************/
    $('.main-menu--desktop').find('.lev1').hover(function(){
      $(this).siblings().children('a').stop().animate({'opacity' : '0.5'}, 300);
      
    }, function(){
        $(this).siblings().children('a').stop().animate({'opacity' : '1'}, 300);
      
    });
    
    /**************** main menu sticky ********************/
    /*var headerHeight = $('.header').height();
    var headerStickyHeight = $('.header--sticky').height();
    console.log(headerHeight);
    
    var scrollPos;
    var lastScrollPos = $(window).scrollTop();
    
    $(window).scroll(function(){ 
      scrollPos = $(window).scrollTop();
      if($(window).scrollTop() > headerHeight){
        console.log('go');
        $('.header').addClass('header--sticky').stop().animate({'top' : - headerHeight + 'px'}, 200);
      }
      if(lastScrollPos > scrollPos){
        console.log('scrol To Top');
        $('.header').stop().animate({'top' : 0}, 300);
      }else{
        $('.header').stop().animate({'top' : - headerStickyHeight + 'px'}, 100);
      }
      lastScrollPos = scrollPos;
    });*/
    
    
    
    /*************menu mob move*************************/
    var menuWidth = $('.js-aside-move').innerWidth();
    $('.js-btn-wrapper-move').click(function(){
      if($(this).hasClass('js-menu-mob-open')){
        $(this).removeClass('js-menu-mob-open');
        $('.js-aside-move')
        .animate({'left': - menuWidth + 'px'}, 300)
        .next()
        .animate({'left': 0 + 'px'}, 300);
      }else{
        $(this).addClass('js-menu-mob-open');
        $('.js-aside-move')
          .animate({'left': 0 + 'px'}, 300)
          .next()
          .css({'position' : 'relative'})
          .animate({'left': menuWidth + 'px'}, 300);
      }
    });
  });

})();
