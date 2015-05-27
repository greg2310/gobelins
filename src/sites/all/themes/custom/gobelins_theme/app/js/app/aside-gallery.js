(function(){
  'use strict';

  /* require plugins */
  var $ = require('jquery');
  require('../bower/jquery.contenttoggle.js');

  $(function(){
    $('.js-contentToggle--gallery').contentToggle({
      defaultState: 'close',
      globalClose: true,
      triggerSelector: '.js-contentToggle--gallery__trigger',
      contentSelector: '.js-contentToggle--gallery__content',
      toggleProperties: {}
    });
  });
})();
