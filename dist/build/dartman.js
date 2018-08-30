//      
//          __                  __                              
//      .--|  | .---.-. .----. |  |_  .--------. .---.-. .-----.
//      |  _  | |  _  | |   _| |   _| |        | |  _  | |     |
//      |_____| |___._| |__|   |____| |__|__|__| |___._| |__|__|
//
//      Dartman
//		v0.0.126 - 2018-08-29
//		By Mike Gieson
//		www.gieson.com
//		Copyright Mike Gieson
//



 //navigo.min

!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Navigo",[],t):"object"==typeof exports?exports.Navigo=t():e.Navigo=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function o(){return!("undefined"==typeof window||!window.history||!window.history.pushState)}function i(e,t,n){this.root=null,this._routes=[],this._useHash=t,this._hash="undefined"==typeof n?"#":n,this._paused=!1,this._destroyed=!1,this._lastRouteResolved=null,this._notFoundHandler=null,this._defaultHandler=null,this._usePushState=!t&&o(),this._onLocationChange=this._onLocationChange.bind(this),this._genericHooks=null,this._historyAPIUpdateMethod="pushState",e?this.root=t?e.replace(/\/$/,"/"+this._hash):e.replace(/\/$/,""):t&&(this.root=this._cLoc().split(this._hash)[0].replace(/\/$/,"/"+this._hash)),this._listen(),this.updatePageLinks()}function s(e){return e instanceof RegExp?e:e.replace(/\/+$/,"").replace(/^\/+/,"^/")}function r(e,t){return 0===t.length?null:e?e.slice(1,e.length).reduce(function(e,n,o){return null===e&&(e={}),e[t[o]]=decodeURIComponent(n),e},null):null}function a(e){var t,n=[];return t=e instanceof RegExp?e:new RegExp(e.replace(i.PARAMETER_REGEXP,function(e,t,o){return n.push(o),i.REPLACE_VARIABLE_REGEXP}).replace(i.WILDCARD_REGEXP,i.REPLACE_WILDCARD)+i.FOLLOWED_BY_SLASH_REGEXP,i.MATCH_REGEXP_FLAGS),{regexp:t,paramNames:n}}function u(e){return e.replace(/\/$/,"").split("/").length}function h(e,t){return u(t)-u(e)}function l(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return t.map(function(t){var n=a(s(t.route)),o=n.regexp,i=n.paramNames,u=e.replace(/^\/+/,"/").match(o),h=r(u,i);return!!u&&{match:u,route:t,params:h}}).filter(function(e){return e})}function d(e,t){return l(e,t)[0]||!1}function c(e,t){var n=t.map(function(t){return""===t.route||"*"===t.route?e:e.split(new RegExp(t.route+"($|/)"))[0]}),o=s(e);return n.length>1?n.reduce(function(e,t){return e.length>t.length&&(e=t),e},n[0]):1===n.length?n[0]:o}function f(){return!!("undefined"!=typeof window&&"onhashchange"in window)}function _(e){return e.split(/\?(.*)?$/).slice(1).join("")}function p(e,t,n){var i,s=e,r=function(e){return e.split(/\?(.*)?$/)[0]};return"undefined"==typeof n&&(n="#"),o()&&!t?s=r(e).split(n)[0]:(i=e.split(n),s=r(i.length>1?i[1]:i[0])),s}function v(e,t,n){if(t&&"object"===("undefined"==typeof t?"undefined":g(t))){if(t.before)return void t.before(function(){var o=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];o&&(e(),t.after&&t.after(n))},n);if(t.after)return e(),void(t.after&&t.after(n))}e()}function R(e,t,n){if(o()&&!t)return!1;if(!e.match(n))return!1;var i=e.split(n);return i.length<2||""===i[1]}Object.defineProperty(t,"__esModule",{value:!0});var g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};i.prototype={helpers:{match:d,root:c,clean:s,getOnlyURL:p},navigate:function(e,t){var n;return e=e||"",this._usePushState?(n=(t?"":this._getRoot()+"/")+e.replace(/^\/+/,"/"),n=n.replace(/([^:])(\/{2,})/g,"$1/"),history[this._historyAPIUpdateMethod]({},"",n),this.resolve()):"undefined"!=typeof window&&(e=e.replace(new RegExp("^"+this._hash),""),window.location.href=window.location.href.replace(/#$/,"").replace(new RegExp(this._hash+".*$"),"")+this._hash+e),this},on:function(){for(var e=this,t=arguments.length,n=Array(t),o=0;o<t;o++)n[o]=arguments[o];if("function"==typeof n[0])this._defaultHandler={handler:n[0],hooks:n[1]};else if(n.length>=2)if("/"===n[0]){var i=n[1];"object"===g(n[1])&&(i=n[1].uses),this._defaultHandler={handler:i,hooks:n[2]}}else this._add(n[0],n[1],n[2]);else if("object"===g(n[0])){var s=Object.keys(n[0]).sort(h);s.forEach(function(t){e.on(t,n[0][t])})}return this},off:function(e){return null!==this._defaultHandler&&e===this._defaultHandler.handler?this._defaultHandler=null:null!==this._notFoundHandler&&e===this._notFoundHandler.handler&&(this._notFoundHandler=null),this._routes=this._routes.reduce(function(t,n){return n.handler!==e&&t.push(n),t},[]),this},notFound:function(e,t){return this._notFoundHandler={handler:e,hooks:t},this},resolve:function(e){var t,o,i=this,s=(e||this._cLoc()).replace(this._getRoot(),"");this._useHash&&(s=s.replace(new RegExp("^/"+this._hash),"/"));var r=_(e||this._cLoc()),a=p(s,this._useHash,this._hash);return!this._paused&&(this._lastRouteResolved&&a===this._lastRouteResolved.url&&r===this._lastRouteResolved.query?(this._lastRouteResolved.hooks&&this._lastRouteResolved.hooks.already&&this._lastRouteResolved.hooks.already(this._lastRouteResolved.params),!1):(o=d(a,this._routes))?(this._callLeave(),this._lastRouteResolved={url:a,query:r,hooks:o.route.hooks,params:o.params,name:o.route.name},t=o.route.handler,v(function(){v(function(){o.route.route instanceof RegExp?t.apply(void 0,n(o.match.slice(1,o.match.length))):t(o.params,r)},o.route.hooks,o.params,i._genericHooks)},this._genericHooks,o.params),o):this._defaultHandler&&(""===a||"/"===a||a===this._hash||R(a,this._useHash,this._hash))?(v(function(){v(function(){i._callLeave(),i._lastRouteResolved={url:a,query:r,hooks:i._defaultHandler.hooks},i._defaultHandler.handler(r)},i._defaultHandler.hooks)},this._genericHooks),!0):(this._notFoundHandler&&v(function(){v(function(){i._callLeave(),i._lastRouteResolved={url:a,query:r,hooks:i._notFoundHandler.hooks},i._notFoundHandler.handler(r)},i._notFoundHandler.hooks)},this._genericHooks),!1))},destroy:function(){this._routes=[],this._destroyed=!0,this._lastRouteResolved=null,this._genericHooks=null,clearTimeout(this._listeningInterval),"undefined"!=typeof window&&(window.removeEventListener("popstate",this._onLocationChange),window.removeEventListener("hashchange",this._onLocationChange))},updatePageLinks:function(){var e=this;"undefined"!=typeof document&&this._findLinks().forEach(function(t){t.hasListenerAttached||(t.addEventListener("click",function(n){var o=e.getLinkPath(t);e._destroyed||(n.preventDefault(),e.navigate(o.replace(/\/+$/,"").replace(/^\/+/,"/")))}),t.hasListenerAttached=!0)})},generate:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=this._routes.reduce(function(n,o){var i;if(o.name===e){n=o.route;for(i in t)n=n.toString().replace(":"+i,t[i])}return n},"");return this._useHash?this._hash+n:n},link:function(e){return this._getRoot()+e},pause:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this._paused=e,e?this._historyAPIUpdateMethod="replaceState":this._historyAPIUpdateMethod="pushState"},resume:function(){this.pause(!1)},historyAPIUpdateMethod:function(e){return"undefined"==typeof e?this._historyAPIUpdateMethod:(this._historyAPIUpdateMethod=e,e)},disableIfAPINotAvailable:function(){o()||this.destroy()},lastRouteResolved:function(){return this._lastRouteResolved},getLinkPath:function(e){return e.getAttribute("href")},hooks:function(e){this._genericHooks=e},_add:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return"string"==typeof e&&(e=encodeURI(e)),"object"===("undefined"==typeof t?"undefined":g(t))?this._routes.push({route:e,handler:t.uses,name:t.as,hooks:n||t.hooks}):this._routes.push({route:e,handler:t,hooks:n}),this._add},_getRoot:function(){return null!==this.root?this.root:(this.root=c(this._cLoc().split("?")[0],this._routes),this.root)},_listen:function(){var e=this;if(this._usePushState)window.addEventListener("popstate",this._onLocationChange);else if(f())window.addEventListener("hashchange",this._onLocationChange);else{var t=this._cLoc(),n=void 0,o=void 0;o=function(){n=e._cLoc(),t!==n&&(t=n,e.resolve()),e._listeningInterval=setTimeout(o,200)},o()}},_cLoc:function(){return"undefined"!=typeof window?"undefined"!=typeof window.__NAVIGO_WINDOW_LOCATION_MOCK__?window.__NAVIGO_WINDOW_LOCATION_MOCK__:s(window.location.href):""},_findLinks:function(){return[].slice.call(document.querySelectorAll("[data-navigo]"))},_onLocationChange:function(){this.resolve()},_callLeave:function(){this._lastRouteResolved&&this._lastRouteResolved.hooks&&this._lastRouteResolved.hooks.leave&&this._lastRouteResolved.hooks.leave(this._lastRouteResolved.params)}},i.PARAMETER_REGEXP=/([:*])(\w+)/g,i.WILDCARD_REGEXP=/\*/g,i.REPLACE_VARIABLE_REGEXP="([^/]+)",i.REPLACE_WILDCARD="(?:.*)",i.FOLLOWED_BY_SLASH_REGEXP="(?:/$|$)",i.MATCH_REGEXP_FLAGS="",t["default"]=i,e.exports=t["default"]}])});
//# sourceMappingURL=navigo.min.js.map
undefined
!function(e,n){"undefined"!=typeof module?module.exports=n():this.storeset=n(!0)}(0,function(e){function n(){e||(p=require("fs"),m=require("path"))}function t(e){var n,o=typeof e;if(null===e||"object"!=o)return e;if("date"==o)return e.getTime();if(Array.isArray(e)){n=[];for(var r=0,a=e.length;r<a;r++)n[r]=t(e[r]);return n}if("object"==o){n={};for(var i in e)e.hasOwnProperty(i)&&(n[i]=t(e[i]));return n}return null}function o(t,o){f=t||h;var r;e?r=localStorage.getItem(L):(n(),v=~f.indexOf(m.sep)?f:m.resolve(process.cwd(),f),p.existsSync(v)&&(r=p.readFileSync(v,"UTF-8")));var a;if(r)try{a=JSON.parse(r)}catch(e){}void 0!==o&&(y=o),I=!0,(g=a||k)!=a&&u()}function r(e){y=a(e)}function a(e){var n,t=typeof e;return"undefined"==t?n=null:"boolean"==t&&(e?(t="string",n="\t"):n=null),"string"!=t&&"number"!=t||(n=e),n}function i(){I||o(h)}function c(e,n){_||(_=!0,u(),!0===e&&process.exit(128+n))}function d(e){S=e,e?T||(T=!0,process.once("exit",c),process.once("SIGINT",B),process.once("SIGTERM",M)):T&&(T=!1)}function s(e,n){e.defaultStoreFile&&(h=e.defaultStoreFile),void 0!==e.format&&(y=e.format),e.addressSeparator&&(E=e.addressSeparator),e.defaultData&&(k=e.defaultData),void 0!==e.saveOnSet&&(w=e.saveOnSet),void 0!==e.saveOnExit&&(S=e.saveOnExit,d(S)),n&&u()}function u(){i();var n;e?(n=b(!1),localStorage.setItem(L,n)):(n=b(),p.writeFileSync(v,n,"UTF-8"))}function l(){return i(),g}"undefined"!=typeof window&&(e=!0);var p,m,f,v,g,h="store.json",y="\t",E=".",k={},w=!0,S=!1,I=!1,L=h.replace(/[^A-Za-z0-9]/g,""),_=!1,T=!1,B=c.bind(null,!0,2),M=c.bind(null,!0,15),A=function(e,n,r){if(i(),!e)throw new Error("Can't save data. No location defined.");I||o(h);var a=e.split(E),c=a.pop(),d=g,s=a.length;if(s)for(var l=0;l<s;l++){var p=a[l],m=d[p];m&&"object"==typeof m||(m=d[p]={}),d=m}return d[c]=t(n),(w||r)&&u(),n},b=function(e){return i(),e=a(void 0===e?y:e),JSON.stringify(g,null,e)};return{get:function(e,n){if(i(),!e&&!n)return t(g);var o=e.split(E),r=o.pop(),a=g,c=o.length;if(c)for(var d=0;d<c;d++)a=a[o[d]];var s;return a&&void 0!==a[r]?s=t(a[r]):e&&n&&(s=t(A(e,n))),s},set:A,clear:function(){i();for(var n in g)g.hasOwnProperty(n)&&delete g[n];e?(localStorage.clear(),localStorage.setItem(L,"")):p.writeFileSync(v,"{}","UTF-8")},create:o,save:u,setFormat:r,getJSON:b,configure:s,getDataObject:l}}),this.dartman=this.dartman||{},this.dartman.ohone=function(){function e(){M=document.getElementById("ohOneSize"),M.addEventListener("blur",c),toggleModeElem=document.getElementById("toggleMode"),toggleModeElem.addEventListener("mousedown",l),x=document.getElementById("p1_ok"),x.addEventListener("mousedown",h),H=document.getElementById("p2_ok"),H.addEventListener("mousedown",h),F=document.getElementById("p1_cancelScore"),F.addEventListener("mousedown",y),N=document.getElementById("p2_cancelScore"),N.addEventListener("mousedown",y),p1_minusStack=document.getElementById("p1_minusStack"),p1_minusStack.addEventListener("mousedown",I),p2_minusStack=document.getElementById("p2_minusStack"),p2_minusStack.addEventListener("mousedown",L),j=document.getElementById("p1_name"),j.addEventListener("input",t),C=document.getElementById("p2_name"),C.addEventListener("input",t),document.getElementById("resetGame").addEventListener("mousedown",d),z=k(),D=k(),flopper=document.getElementById("flopper"),flopper.addEventListener("mousedown",v);for(var e=0;e<b.length;e++){var o=b[e],a="n"+o,i=document.getElementById(a);i.addEventListener("mousedown",p),Y[a]={elem:i,num:o}}u(),r(Z),r(W),r(X);for(var e=0;e<V.length;e++)r(V[e]),r(K[e]);var m=storeset.get("ohone");s(),m?(console.log("existing",m),j.value=m.p1.name,C.value=m.p2.name,A=M.value=Number(m.size),O=m,J=m.currentPlayer,n()):E("p1")}function n(){var e=J;J="p1",T(),J="p2",T(),E(e)}function t(){O.size=A,O.p1.name=j.value,O.p2.name=C.value,O.currentPlayer=J,storeset.set("ohone",O)}function o(){return"p1"==J?"p2":"p1"}function r(e){try{e.load(),e.volume=.001,a(e),e.addEventListener("ended",i,!1)}catch(n){i(null,e)}}function a(e,n){var t=e.play();void 0!==t&&t.catch(function(n){i(null,e)}).then(function(){n&&n()})}function i(e,n){var t=n||e.target;t.volume=1,t.removeEventListener("ended",i,!1)}function c(){var e=M.value;e&&(e=parseInt(e),e>=1e4&&(e=9999,M.value=9999),e>10&&(A=parseInt(M.value),M.value=A,n(),t()))}function d(){confirm("Are you sure? (This will zero all scoring)")&&s()}function s(){y(),u(),B("","p1_stack"),B("","p2_stack"),O.p1.stack=[],O.p2.stack=[],B(A,"p1_score"),B(A,"p2_score")}function u(){for(var e=0;e<b.length;e++)G["c"+b[e]]=0}function l(){"add"==q?(q="sub",g("toggleMode","mathToggler minus","-")):(q="add",g("toggleMode","mathToggler","+"))}function p(e){e.preventDefault();var n=Y[e.target.id].num;"add"==q?(f(n),R++,R%=V.length,V[R].play()):(m(n),Q++,Q%=K.length,console.log("soundSubIndex",Q),K[Q].play())}function m(e){U-=e,U<0&&(U=0),--G["c"+e]<0&&(G["c"+e]=0);var n=G["c"+e];n<3&&n>-1&&g("n"+e,"numb score"+String(n)),B(U,J+"_working"),"p1"==J?B(" ","p2_working"):B(" ","p1_working")}function f(e){if(e>0){var n=G["c"+e]++;n<3&&g("n"+e,"numb score"+String(n+1))}U+=e,B(U,J+"_working"),"p1"==J?B(" ","p2_working"):B(" ","p1_working")}function v(){J=o(),E(J)}function g(e,n,t){var o=document.getElementById(e);o.className=n,t&&(o.innerHTML=t)}function h(){O[J].stack[O[J].stack.length]=U,T(!0),y()}function y(){for(var e=0;e<b.length;e++){g("n"+b[e],"numb score0")}U=0,E(o()),q="add",g("toggleMode","mathToggler","+"),f(0),u(),a(Z)}function E(e){"p2"==e?(J="p2",w(F),S(N),w(x),S(H),p1_working.innerHTML="",p2_working.classList.add(P),p2_working.classList.remove(D),p1_working.classList.add(z)):(J="p1",w(N),S(F),w(H),S(x),p2_working.innerHTML="",p1_working.classList.add(P),p1_working.classList.remove(z),p2_working.classList.add(D))}function k(){return $[Math.floor(Math.random()*$.length)]}function w(e){e.style.display="none"}function S(e){e.style.display="block"}function I(e){_("p1")}function L(e){_("p2")}function _(e){O[e].stack.pop(),J=e,T(),f(0),W.play()}function T(e){for(var n=O[J].stack.length,o="",r=0,a=0,i=0;i<n;i++){a=O[J].stack[i];var c=a>=49,d="";c&&(a>179?d="180":a>169?d="170":a>139?d="140":a>99?d="100":a>79?d="80":a>59?d="60":a>49&&(d="50")),o+="<span "+(c?' class="ton'+d+'"':"")+">"+a+"</span>",r+=a}var s=A-r,u=parseInt(s);u<0?_(J):(B(s,J+"_score"),B(o,J+"_stack"),(a>=ee&&e||0===u)&&X.play()),e&&t()}function B(e,n){if(document.getElementById){var t=document.getElementById(n);t.innerHTML="",t.innerHTML=e}else if(document.all){var t=document.all[n];t.innerHTML=e}else if(document.layers){var t=document.layers[n];text2='<P CLASS="testclass">'+e+"</P>",t.document.open(),t.document.write(text2),t.document.close()}}var M,A=301,b=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,25],O={};O.p1={},O.p2={},O.p1.stack=[],O.p2.stack=[];var x,H,F,N,M,z,D,P,j,C,G={},J="p1",U=0,q="add",V=[new Audio("media/Tock.mp3"),new Audio("media/Tock.mp3"),new Audio("media/Tock.mp3"),new Audio("media/Tock.mp3"),new Audio("media/Tock.mp3")],R=0,Z=new Audio("media/end_record.mp3"),K=[new Audio("media/Tink.mp3"),new Audio("media/Tink.mp3"),new Audio("media/Tink.mp3"),new Audio("media/Tink.mp3"),new Audio("media/Tink.mp3")],Q=0,W=new Audio("media/SIMToolkitSMS.mp3"),X=new Audio("media/oh-yeah.mp3"),Y={},$=["inactive1","inactive2","inactive3","inactive4"],ee=80;return{init:e,doScore:p,cancelScore:y,commitScore:h}}(),this.dartman=this.dartman||{},this.dartman.cricket=function(){function e(e){e.preventDefault();var n=e.target.dataset;"minusing"==y?a(n.num,n.player):r(n.num,n.player)}function n(){y=y==g?h:g,t()}function t(){f.className="toggleMathButton "+y}function o(){y=g,t()}function r(e,n){var t=E[n],o="n"+e,r=++t[o];if(r>3){E["p1"==n?"p2":"p1"][o]<3&&(E[n].score+=parseInt(e),c())}else r>3&&(r=t[o]=3),i(n+"_"+e,r)}function a(e,n){var t=E[n],o=--t["n"+e];o<1&&(o=t["n"+e]=0),o>2?(t.score-=parseInt(e),t.score<0&&(t.score=0),c()):i(n+"_"+e,o)}function i(e,n){n>3&&(n=3),(!n||n<1)&&(n=L),I[e].innerHTML=n,d()}function c(){p1ScoreElem.innerHTML=E.p1.score,p2ScoreElem.innerHTML=E.p2.score,d()}function d(){storeset.set("dartman.cricket.score",E);var e={p1:k.value,p2:w.value};storeset.set("dartman.cricket.names",e)}function s(){f=document.getElementById("toggleMathButton"),f.addEventListener("mousedown",n,!1),p1ScoreElem=document.getElementById("player1score"),p2ScoreElem=document.getElementById("player2score"),k=document.getElementById("p1_name"),w=document.getElementById("p2_name"),k.addEventListener("input",d,!1),w.addEventListener("input",d,!1),document.getElementById("resetGame").addEventListener("mousedown",p,!1);for(var t=0;t<v.length;t++)for(var o=v[t],r=0;r<S.length;r++){var a=S[r],i=a+"_"+o,c=document.getElementById(i);c.dataset.player=a,c.dataset.num=o,c.addEventListener("mousedown",e,!1),I[i]=c}var s=storeset.get("dartman.cricket");s&&s.score&&(u(s.score),s.names&&(k.value=s.names.p1,w.value=s.names.p2))}function u(e){E.p1={},E.p2={};for(var n=0;n<v.length;n++)for(var t=v[n],o=0;o<S.length;o++){var r=S[o],a=e[r]["n"+t];E[r]["n"+t]=a,i(r+"_"+t,a)}E.p1.score=parseInt(e.p1.score||0),E.p2.score=parseInt(e.p2.score||0),c()}function l(e){E.p1={},E.p2={},E.p1.n20=0,E.p1.n19=0,E.p1.n18=0,E.p1.n17=0,E.p1.n16=0,E.p1.n15=0,E.p1.n25=0,E.p1.score=0,E.p2.n20=0,E.p2.n19=0,E.p2.n18=0,E.p2.n17=0,E.p2.n16=0,E.p2.n15=0,E.p2.n25=0,E.p2.score=0}function p(e){confirm("Are you sure? (This will zero all scoring)")&&m()}function m(){l();for(var e in I){I[e].innerHTML=L}c(),o(),console.log("reset",E.p1.n20,E.p1.score)}var f,v=[20,19,18,17,16,15,25],g="adding",h="minusing",y=g,E={};E.p1={},E.p1.n20=0,E.p1.n19=0,E.p1.n18=0,E.p1.n17=0,E.p1.n16=0,E.p1.n15=0,E.p1.n25=0,E.p1.score=0,E.p2={},E.p2.n20=0,E.p2.n19=0,E.p2.n18=0,E.p2.n17=0,E.p2.n16=0,E.p2.n15=0,E.p2.n25=0,E.p2.score=0;var k,w,S=["p1","p2"],I={},L="&nbsp;";return{init:s,doScore:e,toggleMode:n,reset:m}}(),this.dartman=this.dartman||{},this.dartman.main=function(){function e(){a=null;var e=document.getElementById("chooseCricket");e.addEventListener("mousedown",n),e=document.getElementById("choose301"),e.addEventListener("mousedown",t),e=document.getElementById("chooseHelp"),e.addEventListener("mousedown",o),i=new Navigo(null,!0,"#"),i.on(function(){r("home")}),i.on("cricket",function(){r("cricket")}),i.on("ohone",function(){r("ohone")}),i.on("301",function(){r("ohone")}),i.on("help",function(){r("help")}),i.on("home",function(){r("home")});var c=location.hash?location.hash.replace("#",""):null;d[c]||(c=null),r(c||"home")}function n(){i.navigate("#cricket")}function t(){i.navigate("#ohone")}function o(){i.navigate("#help")}function r(e){c=e||"home";for(var n in d){var t=d[n];t.elem||(t.elem=document.getElementById(n)),t.elem.style.display="none"}d[c].elem.style.display="block",storeset.set("page",c),console.log("Vpage",e,dartman),dartman[e]&&(console.log("Vpage",e,dartman[e]),dartman[e].init())}var a,i,c="home",d={home:{},cricket:{},ohone:{},help:{}};return{init:e}}(),document.addEventListener("DOMContentLoaded",dartman.main.init);
//# sourceMappingURL=dartman.js.map

// --------------- 
// Appended Files 
// --------------- 


 //fastclick

;(function () {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/


	/**
	 * Instantiate fast-clicking listeners on the specified layer.
	 *
	 * @constructor
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
		 * Whether a click is currently being tracked.
		 *
		 * @type boolean
		 */
		this.trackingClick = false;


		/**
		 * Timestamp for when click tracking started.
		 *
		 * @type number
		 */
		this.trackingClickStart = 0;


		/**
		 * The element being tracked for a click.
		 *
		 * @type EventTarget
		 */
		this.targetElement = null;


		/**
		 * X-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartX = 0;


		/**
		 * Y-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartY = 0;


		/**
		 * ID of the last touch, retrieved from Touch.identifier.
		 *
		 * @type number
		 */
		this.lastTouchIdentifier = 0;


		/**
		 * Touchmove boundary, beyond which a click will be cancelled.
		 *
		 * @type number
		 */
		this.touchBoundary = options.touchBoundary || 10;


		/**
		 * The FastClick layer.
		 *
		 * @type Element
		 */
		this.layer = layer;

		/**
		 * The minimum time between tap(touchstart and touchend) events
		 *
		 * @type number
		 */
		this.tapDelay = options.tapDelay || 200;

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}


		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	*
	* @type boolean
	*/
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		// Don't send a synthetic click to disabled inputs (issue #62)
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
		case 'video':
			return true;
		}

		return (/\bneedsclick\b/).test(target.className);
	};


	/**
	 * Determine whether a given element requires a call to focus to simulate click into element.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	 */
	FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};


	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};


	/**
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.focus = function(targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};


	/**
	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	 *
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};


	/**
	 * @param {EventTarget} targetElement
	 * @returns {Element|EventTarget}
	 */
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};


	/**
	 * On touch start, record the position and scroll offset.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};


	/**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};


	/**
	 * Update the last position.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};


	/**
	 * Attempt to find the labelled control for the given label element.
	 *
	 * @param {EventTarget|HTMLLabelElement} labelElement
	 * @returns {Element|null}
	 */
	FastClick.prototype.findControl = function(labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};


	/**
	 * On touch end, determine whether to send a click event at once.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};


	/**
	 * On touch cancel, stop tracking the click.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};


	/**
	 * Determine mouse events which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onMouse = function(event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};


	/**
	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	 * an actual click which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onClick = function(event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};


	/**
	 * Remove all FastClick's event listeners.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};


	/**
	 * Check whether FastClick is needed.
	 *
	 * @param {Element} layer The layer to listen on
	 */
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

			// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		// AMD. Register as an anonymous module.
		define(function() {
			return FastClick;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());
