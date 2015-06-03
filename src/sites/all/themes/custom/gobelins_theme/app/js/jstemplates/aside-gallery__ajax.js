var _ = require('underscore');
exports["aside-gallery__ajax.html"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='';
 for (var i=0; i < items.length; i++) { 
__p+='\n  <a\n    href="'+
((__t=( items[i].href ))==null?'':__t)+
'"\n    title="'+
((__t=( items[i].title ))==null?'':__t)+
'"\n    class="aside-gallery__item aside-gallery__item--'+
((__t=( items[i].columns ))==null?'':__t)+
' js-masonry--aside-gallery__item"\n  >\n    <img src="'+
((__t=( items[i].src ))==null?'':__t)+
'" alt="'+
((__t=( items[i].title ))==null?'':__t)+
'">\n  </a>\n';
 } 
__p+='';
}
return __p;
};