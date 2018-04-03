self.babelHelpers={asyncToGenerator:function(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){function n(o,i){try{var l=t[o](i),c=l.value}catch(e){return void r(e)}if(!l.done)return Promise.resolve(c).then(function(e){n("next",e)},function(e){n("throw",e)});e(c)}return n("next")})}}},this.workbox=this.workbox||{},this.workbox.core=function(){"use strict";try{self.workbox.v["workbox:core:3.0.0-alpha.3"]=1}catch(e){}var e={debug:0,log:1,warn:2,error:3,silent:4};const t=(e,...t)=>{let r=e;return t.length>0&&(r+=` :: ${JSON.stringify(t)}`),r};class r extends Error{constructor(e,r){super(t(e,r)),this.name=e,this.details=r}}const n={prefix:"workbox",suffix:self.registration.scope,googleAnalytics:"googleAnalytics",precache:"precache",runtime:"runtime"},o=e=>[n.prefix,e,n.suffix].filter(e=>e.length>0).join("-"),i={updateDetails:e=>{Object.keys(n).forEach(t=>{void 0!==e[t]&&(n[t]=e[t])})},getGoogleAnalyticsName:e=>e||o(n.googleAnalytics),getPrecacheName:e=>e||o(n.precache),getRuntimeName:e=>e||o(n.runtime)};let l=e.warn;const c=e=>l<=e,u=e.error,s=function(t,r,n){const o=0===t.indexOf("group")?u:e[t];if(!c(o))return;if(!n)return void console[t](...r);const i=["%cworkbox",`background: ${n}; color: white; padding: 2px 0.5em; `+"border-radius: 0.5em;"];console[t](...i,...r)},a=()=>{c(u)&&console.groupEnd()},f={groupEnd:a,unprefixed:{groupEnd:a}},d={debug:"#7f8c8d",log:"#2ecc71",warn:"#f39c12",error:"#c0392b",groupCollapsed:"#3498db"};Object.keys(d).forEach(e=>((e,t)=>{f[e]=((...r)=>s(e,r,t)),f.unprefixed[e]=((...t)=>s(e,t))})(e,d[e]));class h{constructor(){try{self.workbox.v=self.workbox.v||{}}catch(e){}}get cacheNames(){return{googleAnalytics:i.getGoogleAnalyticsName(),precache:i.getPrecacheName(),runtime:i.getRuntimeName()}}setCacheNameDetails(e){i.updateDetails(e)}get logLevel(){return l}setLogLevel(t){if(t>e.silent||t<e.debug)throw new r("invalid-value",{paramName:"logLevel",validValueDescription:"Please use a value from LOG_LEVELS, i.e 'logLevel = workbox.core.LOG_LEVELS.debug'.",value:t});(e=>l=e)(t)}}var p=new h;var y={CACHE_DID_UPDATE:"cacheDidUpdate",CACHE_WILL_UPDATE:"cacheWillUpdate",CACHED_RESPONSE_WILL_BE_USED:"cachedResponseWillBeUsed",FETCH_DID_FAIL:"fetchDidFail",REQUEST_WILL_FETCH:"requestWillFetch"},b={filter:(e,t)=>e.filter(e=>t in e)};const g=(()=>{var e=babelHelpers.asyncToGenerator(function*(e,t,r,n=[]){let o=yield m(t,r,n);if(!o)return;const i=yield caches.open(e),l=b.filter(n,y.CACHE_DID_UPDATE);let c=l.length>0?yield v(e,t):null;yield i.put(t,o);for(let r of l)yield r[y.CACHE_DID_UPDATE].call(r,{cacheName:e,request:t,oldResponse:c,newResponse:o})});return function(t,r,n){return e.apply(this,arguments)}})(),v=(()=>{var e=babelHelpers.asyncToGenerator(function*(e,t,r,n=[]){let o=yield(yield caches.open(e)).match(t,r);for(let i of n)y.CACHED_RESPONSE_WILL_BE_USED in i&&(o=yield i[y.CACHED_RESPONSE_WILL_BE_USED].call(i,{cacheName:e,request:t,matchOptions:r,cachedResponse:o}));return o});return function(t,r,n){return e.apply(this,arguments)}})(),m=(()=>{var e=babelHelpers.asyncToGenerator(function*(e,t,r){let n=t,o=!1;for(let t of r)y.CACHE_WILL_UPDATE in t&&(o=!0,n=yield t[y.CACHE_WILL_UPDATE].call(t,{request:e,response:n}));return o||(n=n.ok?n:null),n});return function(t,r,n){return e.apply(this,arguments)}})(),w={put:g,match:v},E={fetch:(()=>{var e=babelHelpers.asyncToGenerator(function*(e,t,n=[]){"string"==typeof e&&(e=new Request(e));const o=b.filter(n,y.FETCH_DID_FAIL),i=o.length>0?e.clone():null;try{for(let t of n)y.REQUEST_WILL_FETCH in t&&(e=yield t[y.REQUEST_WILL_FETCH].call(t,{request:e.clone()}))}catch(e){throw new r("plugin-error-request-will-fetch",{thrownError:e})}const l=e.clone();try{return yield fetch(e,t)}catch(e){for(let e of o)yield e[y.FETCH_DID_FAIL].call(e,{originalRequest:i.clone(),request:l.clone()});throw e}});return function(t,r){return e.apply(this,arguments)}})()};class L{constructor(e,t,{onupgradeneeded:r,onversionchange:n=this.e}={}){this.t=e,this.r=t,this.n=r,this.e=n,this.o=null}open(){var e=this;return babelHelpers.asyncToGenerator(function*(){if(!e.o)return e.o=yield new Promise(function(t,r){let n=!1;setTimeout(function(){n=!0,r(new Error("The open request was blocked and timed out"))},e.OPEN_TIMEOUT);const o=indexedDB.open(e.t,e.r);o.onerror=function(e){return r(o.error)},o.onupgradeneeded=function(t){n?(o.transaction.abort(),t.target.result.close()):e.n&&e.n(t)},o.onsuccess=function(r){const o=r.target.result;n?o.close():(o.onversionchange=e.e,t(o))}}),e})()}get(e,...t){var r=this;return babelHelpers.asyncToGenerator(function*(){return yield r.i("get",e,"readonly",...t)})()}add(e,...t){var r=this;return babelHelpers.asyncToGenerator(function*(){return yield r.i("add",e,"readwrite",...t)})()}put(e,...t){var r=this;return babelHelpers.asyncToGenerator(function*(){return yield r.i("put",e,"readwrite",...t)})()}delete(e,...t){var r=this;return babelHelpers.asyncToGenerator(function*(){yield r.i("delete",e,"readwrite",...t)})()}getAll(e,t,r){var n=this;return babelHelpers.asyncToGenerator(function*(){return"getAll"in IDBObjectStore.prototype?yield n.i("getAll",e,"readonly",t,r):yield n.getAllMatching(e,{query:t,count:r})})()}getAllMatching(e,t={}){var r=this;return babelHelpers.asyncToGenerator(function*(){return yield r.transaction([e],"readonly",function(r,n){const o=r[e],i=[];(t.index?o.index(t.index):o).openCursor(t.query,t.direction).onsuccess=function(e){const r=e.target.result;if(r){const{primaryKey:e,key:o,value:l}=r;i.push(t.includeKeys?{primaryKey:e,key:o,value:l}:l),t.count&&i.length>=t.count?n(i):r.continue()}else n(i)}})})()}transaction(e,t,r){var n=this;return babelHelpers.asyncToGenerator(function*(){return yield n.open(),yield new Promise(function(o,i){const l=n.o.transaction(e,t);l.onerror=function(e){return i(e.target.error)},l.onabort=function(e){return i(e.target.error)},l.oncomplete=function(){return o()};const c={};for(const t of e)c[t]=l.objectStore(t);r(c,function(e){return o(e)},function(){i(new Error("The transaction was manually aborted")),l.abort()})})})()}i(e,t,r,...n){var o=this;return babelHelpers.asyncToGenerator(function*(){yield o.open();return yield o.transaction([t],r,function(r,o){r[t][e](...n).onsuccess=function(e){o(e.target.result)}})})()}e(e){this.close()}close(){this.o&&this.o.close()}}L.prototype.OPEN_TIMEOUT=2e3;var H=Object.freeze({logger:f,assert:null,cacheNames:i,cacheWrapper:w,fetchWrapper:E,WorkboxError:r,DBWrapper:L,getFriendlyURL:e=>{const t=new URL(e,location);return t.origin===location.origin?t.pathname:t.href}});return Object.assign(p,{LOG_LEVELS:e,_private:H})}();
//# sourceMappingURL=workbox-core.prod.js.map
