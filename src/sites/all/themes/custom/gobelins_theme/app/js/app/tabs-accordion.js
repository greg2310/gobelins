(function(){
  'use strict';

  /* require plugins */
  var $ = require('jquery');
  require('../bower/jquery.contenttoggle.js');

  $(function(){
    $('.js-contenttoggle--tabs-accordion').contentToggle({
      triggerSelectorContext: false,
      contentSelectorContext: false,
      beforeCallback: function(event) {
        return !(this.isOpen && event.type == 'click');
      }
    });
  });
})();
