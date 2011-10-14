(function(){var a=function(c){return new a.init(c)},b=document;a.init=function(d){if(d.nodeType){d=[d]}else{if(typeof d=="string"){d=b.querySelectorAll(d)}else{if(!(d instanceof Array)){return null}}}this.length=d.length;for(var c=0;c<this.length;c++){this[c]=d[c]}return this};a.data={};a.init.prototype={each:function(d){for(var c=0;c<this.length;c++){d.call(this[c])}return this},css:function(d,c){var e={};if(typeof d==="string"&&c===undefined){return window.getComputedStyle(this[0],null).getPropertyValue(d)}if(typeof d!=="object"){e[d]=c}else{e=d}return this.each(function(){for(var f in e){this.style[f]=e[f]}})},hide:function(){this.each(function(){this.style.display="none"})},show:function(){this.each(function(){this.style.display="block"})},item:function(c){return this[c]},set:function(c,d){this.each(function(){this[c]=d})},get:function(c){return this.item(0)[c]},setAttribute:function(c,d){this.each(function(){this.setAttribute(c,d)})},getAttribute:function(c){this.item(0).getAttribute(c)},addClass:function(d){this.each(function(){var c=new RegExp("(^|\\s)"+d+"(\\s|$)").test(this.className);if(!c){this.className+=this.className?" "+d:d}})},removeClass:function(d){this.each(function(){var c=this.className.match(" "+d)?" "+d:d;this.className=this.className.replace(c,"")})},hasClass:function(d){return new RegExp("(^|\\s)"+d+"(\\s|$)").test(this.className)},index:function(){var d=this[0].parentNode.childNodes;for(var c=0;c<d.length;c++){if(d[c]==this[0]){return c}}}};window.E=a})();(function(){var f="E",b=window[f]||(window[f]={}),d=0,c=["hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toString","toLocaleString","valueOf"],g=!{valueOf:0}.propertyIsEnumerable("valueOf"),e=Object.prototype.hasOwnProperty,j=Object.prototype.toString,a=function(k){return j.call(k)==="[object Function]"},i=function(m,l){var k=typeof m;return(m&&(k==="object"||(!l&&(k==="function"||a(m)))))||false},h=function(k,l,r,m,o,s){var p,v,u,n,w,q,t;if(!k||!l){return k}if(o){if(o===2){h(k.prototype,l.prototype,r,m,0,s)}u=o===1||o===3?l.prototype:l;t=o===1||o===4?k.prototype:k;if(!u||!t){return k}}else{u=l;t=k}p=r&&!s;if(m){for(n=0,q=m.length;n<q;++n){w=m[n];if(!e.call(u,w)){continue}v=p?false:w in t;if(s&&v&&i(t[w],true)&&i(u[w],true)){h(t[w],u[w],r,null,0,s)}else{if(r||!v){t[w]=u[w]}}}}else{for(w in u){if(!e.call(u,w)){continue}v=p?false:w in t;if(s&&v&&i(t[w],true)&&i(u[w],true)){h(t[w],u[w],r,null,0,s)}else{if(r||!v){t[w]=u[w]}}}if(g){h(t,u,r,c,o,s)}}return k};h(b,{mix:h,guid:function(k){var l=(d++)+"";return k?k+l:l},isFunction:a,isObject:i,isUndefined:function(k){return k===undefined},isBoolean:function(k){return j.call(k)==="[object Boolean]"},isString:function(k){return j.call(k)==="[object String]"},isNumber:function(k){return j.call(k)==="[object Number]"&&isFinite(k)},isArray:function(k){return j.call(k)==="[object Array]"},Array:{indexOf:function(k,o){if(k.indexOf){return k.indexOf(o)}for(var n=0,m=k.length;n<m;n++){if(k[n]===o){return n}}return -1},each:function(k,o){for(var n=0,m=k.length;n<m;n++){o(k[n],n,k)}},remove:function(k,m){var l=this.indexOf(k,m);if(l!=-1){return k.splice(l,1)}}},merge:function(){var m=arguments,p={},n,k=m.length;for(n=0;n<k;n=n+1){h(p,m[n],true)}return p},namespace:function(p){var m=arguments,s=null,q,n,r,k;for(q=0;q<m.length;q=q+1){r=(""+m[q]).split(".");s=this;k=r.length;for(n=(r[0]==f)?1:0;n<k;n=n+1){s[r[n]]=s[r[n]]||{};s=s[r[n]]}}return s},extend:function(o,n,l,t){if(!n||!o){return o}var k=Object.prototype,q=function(s){function r(){}r.prototype=s;return new r()},p=n.prototype,m=q(p);o.prototype=m;m.constructor=o;o.superclass=p;if(n!=Object&&p.constructor==k.constructor){p.constructor=n}if(l){h(m,l,true)}if(t){h(o,t,true)}o.superclass=n;return o},declare:function(t,k,u){var x=this;if(this.isFunction(k)){var m=k();if(!x.isUndefined(m)){x.declare(t,m,u)}else{h(this.namespace(t),u)}return}k=k||{};var w=k.superclass,v,s,q,r,n;if(k.hasOwnProperty("constructor")&&this.isFunction(k.constructor)){v=k.constructor}else{if(!w){v=function(){}}else{v=function(){w.prototype.constructor.apply(this,arguments)}}}delete k.constructor;if(!w){this.mix(v.prototype,k);this.mix(v,u)}else{v=this.extend(v,w,k,u)}s=(""+t).split(".");r=(s[0]==f)?1:0;q=s.length;n=this;for(;r<q;r++){if(r==q-1){n[s[r]]=v}else{n[s[r]]=n[s[r]]||{}}n=n[s[r]]}return n}})})();E.declare("SignalBinding",{active:true,params:null,constructor:function(e,d,b,c,a){this._listener=d;this._isOnce=b;this.context=c;this._signal=e;this._priority=a||0},execute:function(a){var c,b;if(this.active&&!!this._listener){b=this.params?this.params.concat(a):a;c=this._listener.apply(this.context,b);if(this._isOnce){this.detach()}}return c},detach:function(){return this.isBound()?this._signal.remove(this._listener):null},isBound:function(){return(!!this._signal&&!!this._listener)},getListener:function(){return this._listener},_destroy:function(){delete this._signal;delete this._listener;delete this.context},isOnce:function(){return this._isOnce},toString:function(){return"[SignalBinding isOnce: "+this._isOnce+", isBound: "+this.isBound()+", active: "+this.active+"]"}});E.declare("Signal",{_bindings:null,_shouldPropagate:true,active:true,constructor:function(){this._bindings=[]},_addBinding:function(a){var b=this._bindings.length;do{--b}while(this._bindings[b]&&a._priority<=this._bindings[b]._priority);this._bindings.splice(b+1,0,a)},_registerListener:function(e,d,c,b){var a=this._indexOfListener(e),f;if(a!==-1){f=this._bindings[a];if(f.isOnce()!==d){throw new Error("不能重复添加监听器")}}else{f=new E.SignalBinding(this,e,d,c,b);this._addBinding(f)}return f},add:function(c,b,a){return this._registerListener(c,false,b,a)},addOnce:function(c,b,a){return this._registerListener(c,true,b,a)},remove:function(b){var a=this._indexOfListener(b);if(a!==-1){this._bindings[a]._destroy();this._bindings.splice(a,1)}return b},removeAll:function(){var a=this._bindings.length;while(a--){this._bindings[a]._destroy()}this._bindings.length=0},dispatch:function(b){if(!this.active){return}var a=Array.prototype.slice.call(arguments),d=this._bindings.slice(),c=this._bindings.length;this._shouldPropagate=true;do{c--}while(d[c]&&this._shouldPropagate&&d[c].execute(a)!==false)},getNumListeners:function(){return this._bindings.length},registerListener:function(c,b){var a=this.find(c);if(a==-1||!b){this.__bindings.push(c);if(b){this.__bindingsOnce.push(c)}}},halt:function(){this._shouldPropagate=false},dispose:function(){this.removeAll();delete this._bindings},_indexOfListener:function(a){var b=this._bindings.length;while(b--){if(this._bindings[b]._listener===a){return b}}return -1},toString:function(){return"[Signal active: "+this.active+" numListeners: "+this.getNumListeners()+"]"}});E.declare("Component",{defaultUIClass:"e-component",defaultUITag:"div",constructor:function(a){this.utils=E.Component.Utils;this._setOptions(a);this.createSignals();this._autoBindSignals();this._initContainer();this.initEvents();this.defineActivable();this._autoBindActivable()},createSignals:function(){},createChildren:function(){},invalidate:function(){},initEvents:function(){},defineActivable:function(){return null},destroy:function(){this._autoUnbindActivable();this.removeAllSignals();this.remove()},_setOptions:function(a){a=a||{};if(a.visible==undefined){a.visible=true}if(a.includeInLayout==undefined){a.includeInLayout=true}this._includeInLayout=a.includeInLayout;this._parent=a.parent||null;this.uiClass=a.uiClass||this.defaultUIClass||"";this.signals={};this.options=a},_initContainer:function(){var a;if(E.isArray(this.options.cls)){a=this.options.cls}else{if(E.isString(this.options.cls)){a=[this.options.cls]}else{a=[]}}if(this.uiClass){a.push(this.uiClass)}this.el=document.createElement(this.defaultUITag);this.el.className=a.join(" ");this.createChildren();this.invalidate();if(this.options.disabled){this.disable()}if(!this.options.visible){this.hide()}if(this._parent){this._parent.addChild(this)}else{if(E.isString(this.options.container)){var b=document.querySelector(this.options.container);b&&b.appendChild(this.el)}else{if(this.options.container instanceof HTMLElement){this.options.container.appendChild(this.el)}}}},_autoBindActivable:function(c){var a=this,b=c||this.defineActivable();if(b==null){return}else{if(E.isString(b)){this.utils.addToActiveList(this.el,b)}else{if(b instanceof NodeList){b=Array.prototype.slice.call(b,0);this._autoBindActivable(b)}else{if(E.isArray(b)){E.Array.each(b,function(d){a._autoBindActivable(d)})}else{this.utils.addToActiveList(b)}}}}},_autoUnbindActivable:function(){var a=this,b=this.defineActivable();if(b==null){return}else{if(E.isString(b)){this.utils.removeFromActiveList(this.el,b)}else{if(E.isArray(b)){E.Array.each(b,function(c){a._unbindActivable(c)})}else{this.utils.removeFromActiveList(b)}}}},_autoBindSignals:function(){var b=this.options.signals||{};for(var a in b){if(b.hasOwnProperty(a)&&this.signals.hasOwnProperty(a)){this._bindSignal(a,b[a])}}},removeAllSignals:function(){var b=this.signals||{};for(var a in b){if(b.hasOwnProperty(a)){b[a].removeAll()}}},_bindSignal:function(b,a,c){if(!E.isFunction(a)&&a.handler){this._bindSignal(b,a.handler,a.target)}else{if(E.isFunction(a)){this.signals[b].add(a,c)}}},_updateIncludeInLayout:function(){var a=E(this.el);if(this._includeInLayout){a.css({visibility:(this._visible?"visible":"hidden")})}else{a.css({display:(this._visible?null:"none")})}},remove:function(){if(this._parent){this._parent.removeChild(this)}else{if(this.el.parentNode){try{this.el.parentNode.removeChild(this.el)}catch(a){}}}},enable:function(){if(this._disabled==true){this._disabled=false;E(this.el).removeClass("disabled")}},disable:function(){if(this._disabled!=true){this._disabled=true;E(this.el).addClass("disabled")}},getEnabled:function(){return !this._disabled},show:function(){if(this._visible==false){this._visible=true;this._updateIncludeInLayout()}},hide:function(){if(this._visible==true){this._visible=false;this._updateIncludeInLayout()}},getVisible:function(){return this._visible},setIncludeInLayout:function(a){if(this._includeInLayout!=a){this._includeInLayout=a;if(!this._visible){this._updateIncludeInLayout()}}},getIncludeInLayout:function(){return this._includeInLayout},getParent:function(){return this._parent},on:function(){this.utils.on.apply(this.utils,arguments)},delegate:function(){this.utils.delegate.apply(this.utils,arguments)},detach:function(){this.utils.detach.apply(this.utils,arguments)},setFocus:function(a){this.utils.setFocus(a)},getFocus:function(){return this.utils.getFocus()}},{Utils:(function(){var d=[],c=[],b=null,a=null;return{on:function(i,h,j,g){var f=this;if(E.isArray(h)){E.Array.each(h,function(k){f.on(i,k,j,g)})}else{var e=function(){j.apply(g,arguments)};if(i.addEventListener){i.addEventListener(h,e,false)}else{i.attachEvent(h,e)}this._saveListeners(i,h,e)}},test:function(k,e,g){var h=g.querySelectorAll(e);h=Array.prototype.slice.call(h,0);for(var j=0,f=h.length;j<f;j++){if(h[j]===k){return true}}return false},delegate:function(i,e,h,j,g){var f=this;this.on(i,h,function(n){var m=n.target,k=[],l;if(m.nodeType===3){m=m.parentNode}while(m){l=(m===i);if(f.test(m,e,i)){k.push(m)}if(l){break}m=m.parentNode}E.Array.each(k,function(o){var p={__proto__:n,currentTarget:o};j.call(g,p)})})},detach:function(j,h,k){var e=this;if(E.isArray(h)){E.Array.each(h,function(i){e.detach(j,i,k)})}else{if(k){if(j.removeEventListener){j.removeEventListener(h,k)}else{j.detachEvent(h,k)}}else{var f=this._getListeners(j,h);if(h==undefined){for(var g in f){if(f.hasOwnProperty(g)){e.detach(j,g,k)}}}else{E.Array.each(f,function(i){if(j.removeEventListener){j.removeEventListener(h,i)}else{j.detachEvent(h,i)}})}}}},_getListeners:function(j,h){var f=null;for(var g=0,e=d.length;g<e;g++){if(d[g].target==j){f=d[g]}}if(f==null||h==null){return f}return f[h]},_saveListeners:function(h,f,g){var e=this._getListeners(h);if(e==null){e={target:h,data:{}};d.push(e)}if(e[f]==null){e[f]=[]}e[f].push(g)},setFocus:function(e){if(b){E(b).removeClass("focus")}b=e;if(b){E(b).addClass("focus")}},getFocus:function(){return b},addToActiveList:function(f,e){if(e){this.addActiveElListener(f,e)}else{if(E.Array.indexOf(c,f)==-1){c.push(f);this.addActiveElListener(f)}}},removeFromActiveList:function(f,e){if(E.Array.indexOf(c,f)!=-1){E.Array.remove(c,f);this.removeActiveElListener(f)}},setActiveEl:function(e){if(a){E(a).removeClass("hover")}a=e;if(a){E(a).addClass("hover")}},onActive:function(f){this.setActiveEl(f.currentTarget)},onDeactive:function(e){this.setActiveEl(null)},addActiveElListener:function(f,e){if(e){this.delegate(f,e,["mouseover","touchstart"],this.onActive,this);this.delegate(f,e,["mouseout","touchend"],this.onDeactive,this)}else{this.on(f,["mouseover","touchstart"],this.onActive,this);this.on(f,["mouseout","touchend"],this.onDeactive,this)}},removeActiveElListener:function(e){this.detach(e,["mouseover","touchstart"]);this.detach(e,["mouseout","touchend"])}}})()});E.declare("Container",{superclass:E.Component,defaultUIClass:"e-container",createChildren:function(){this._children=[];this._childrenContainer=this.el},invalidate:function(){var a=this,b=this.options.children;if(E.isArray(b)){E.Array.each(b,function(c){a.addChild(c)})}},addChild:function(a){return this.addChildAt(a)},addChildAt:function(c,a){if(!(c instanceof E.Component)&&E.isFunction(E[c.className])){return this.addChildAt(new E[c.className](c),a)}if(isNaN(a)||a>this._children.length){a=this._children.length}else{if(a<0){a=0}}var b=c.getParent();b&&b.removeChild(c);c._parent=this;this._addChild(c,a);this._children.splice(a,0,c);return c},_addChild:function(b,a){if(a>=this._children.length){this._childrenContainer.appendChild(b.el)}else{this._childrenContainer.insertBefore(b.el,this.getChildAt(a).el)}},getChildAt:function(a){return this._children[a]},removeChild:function(a){if(!this.hasChild(a)){return null}E.Array.remove(this._children,a);a._parent=null;this._removeChild(a);return a},removeChildAt:function(a){var b=this.getChildAt(a);if(b){return this.removeChild(b)}return null},_removeChild:function(b){try{b.el.parentNode.removeChild(b.el)}catch(a){}},hasChild:function(a){return a.getParent()==this},children:function(){return this._children}});E.declare("ListComponent",{superclass:E.Component,_items:null,_nodes:null,_selectedIndex:-1,itemRenderer:null,defaultItemTag:"div",defaultUIClass:"e-listcomponent",defaultItemClass:"e-item",createChildren:function(){E.ListComponent.superclass.prototype.createChildren.apply(this,arguments);this._itemContainer=this.el},invalidate:function(){E.ListComponent.superclass.prototype.invalidate.apply(this,arguments);this.setData(this.options.data);if(this._selectedIndex!=-1){this.setSelectedIndex(this._selectedIndex,true,true)}if(E.isNumber(this.options.selectedIndex)){this.setSelectedIndex(this.options.selectedIndex,true)}},createSignals:function(){this.signals.change=new E.Signal();this.signals.itemClick=new E.Signal()},defineActivable:function(){return"."+this.defaultItemClass},initEvents:function(){var a="."+this.defaultItemClass;this.delegate(this.el,a,"click",function(c){var b=Array.prototype.slice.call(this.el.querySelectorAll(a),0);this._onItemClicked(E.Array.indexOf(b,c.currentTarget),c.currentTarget)},this)},_onItemClicked:function(a,b){this.signals.itemClick.dispatch(a,this.getItemAt(a),b)},setData:function(a){this.destroyList();if(a==null){a=[]}else{if(!E.isArray(a)){a=[a]}}this._items=[];this._nodes=[];this.createList(a)},getData:function(){return this._items},addItem:function(a){return this.addItemAt(a,this._items.length)},addItemAt:function(d,b){if(isNaN(b)||b>this._items.length){b=this._items.length}else{if(b<0){b=0}}var c=this.createNode(d);if(b==this._items.length){this._itemContainer.appendChild(c)}else{var a=this._nodes[b];this._itemContainer.insertBefore(c,a)}this._addItemAndNode(d,c,b);if(this._items.length==1){this.setSelectedIndex(this._selectedIndex,true,true)}},getItemAt:function(a){return this._items[a]},removeItem:function(a){return this.removeItemAt(E.Array.indexOf(this._items,a))},removeItemAt:function(a){if(a<0||a>=this._items.length){return null}var c=this._nodes[a];try{c&&c.parentNode.removeChild(c)}catch(b){}this._removeItemAtNodeByIndex(a);return this._items[a]},setSelectedIndex:function(c,a,b){if(!this._items||this._items.length==0){return}if(this._selectedIndex!=c||b){var d=this._nodes[this._selectedIndex];d&&E(d).removeClass("selected");this._selectedIndex=c;d=this._nodes[this._selectedIndex];d&&E(d).addClass("selected");if(!a){this.onSelectedIndexChange(c,this.getSelectedItem())}}},getSelectedIndex:function(){return this._selectedIndex},setSelectedItem:function(c,a){if(this.getSelectedItem()!=c){var b=E.Array.indexOf(this._items,c);this.setSelectedIndex(b,a)}},getSelectedItem:function(){return this._items[this._selectedIndex]},getCellAt:function(a){return this._nodes[a]},_addItemAndNode:function(c,b,a){this._nodes.splice(a,0,b);this._items.splice(a,0,c)},_removeItemAtNodeByIndex:function(a){if(a>=0&&a<=this._nodes.length){this._nodes.splice(a,1);this._items.splice(a,1)}},createList:function(b){var a=this;E.Array.each(b,function(c){a.addItem(c)})},destroyList:function(){if(!this._items){return}while(this._items.length){this.removeItemAt(0)}},createNode:function(b){var c;if(this.itemRenderer&&E.isFunction(this.itemRenderer.createNode)){c=this.itemRenderer.createNode(b);if(c instanceof HTMLElement){return c}else{if(c instanceof E.Component){return c.el}}}if(b instanceof E.Component){return b.el}var a=document.createElement(this.defaultItemTag);a.className=this.defaultItemClass;if(E.isString(c)){a.innerHTML=c}else{if(E.isString(b)){a.innerText=b}else{if(b&&!E.isUndefined(b.label)){a.innerText=b.label}else{a.innerText=String(b)}}}return a},onSelectedIndexChange:function(a,b,c){this.signals.change.dispatch(a,b,c)},destroy:function(){this.destroyList();E.ListComponent.superclass.prototype.destroy.apply(this,arguments)}});E.declare("FormElement",{superclass:E.Component,defaultUITag:"input",defaultUIClass:"e-form",type:"input",createSignals:function(){this.signals.change=new E.Signal()},createChildren:function(){E.FormElement.superclass.prototype.createChildren.apply(this,arguments);if(this.options.type){this.type=this.options.type}this.el.setAttribute("type",this.type)},invalidate:function(){E.FormElement.superclass.prototype.invalidate.apply(this,arguments);if(this.options.value){this.setValue(this.options.value)}if(this.options.placeholder){this.setPlaceholder(this.options.placeholder)}if(this.options.readonly){this.setReadonly(true)}},initEvents:function(){this.on(this.el,"change",function(){this.onFormElementChange()},this)},setValue:function(b,a){if(b!=this.el.value){this.el.value=b;if(!a){this.onFormElementChange()}}},enable:function(){this.el.removeAttribute("disabled");E.FormElement.superclass.prototype.enable.apply(this,arguments)},disable:function(){this.el.setAttribute("disabled","disable");E.FormElement.superclass.prototype.disable.apply(this,arguments)},getValue:function(){return this.el.value},getReadonly:function(){return Boolean(this.el.getAttribute("readonly"))},setReadonly:function(b,a){if(b==this.getReadonly()&&!a){return}if(b){this.el.setAttribute("readonly","readonly")}else{this.el.removeAttribute("readonly","readonly")}},getPlaceholder:function(){return this.el.getAttribute("placeholder")},setPlaceholder:function(a){this.el.setAttribute("placeholder",a)},onFormElementChange:function(){this.signals.change.dispatch(this.el.value)}});E.declare("Label",{superclass:E.Component,defaultUIClass:"e-label",invalidate:function(){E.Label.superclass.prototype.invalidate.apply(this,arguments);this.setValue(this.options.value)},setValue:function(a){this.el.innerText=a},getValue:function(){return this.el.innerText}});E.declare("HTML",{superclass:E.Label,defaultUIClass:"e-html",setValue:function(a){this.el.innerHTML=a},getValue:function(){return this.el.innerHTML}});E.declare("Icon",{superclass:E.Component,defaultUIClass:"e-icon"});E.declare("Button",{superclass:E.Component,defaultUIClass:"e-button",invalidate:function(){var a=this.options.theme;if(a!=undefined){E(this.el).addClass(a)}if(this.options.label===undefined){this.options.label=""}this.setLabel(this.options.label)},createSignals:function(){this.signals.click=new E.Signal()},defineActivable:function(){return this.el},initEvents:function(){var a=this;this.on(this.el,"click",function(b){if(this.getEnabled()){this.onButtonClicked()}},this)},onButtonClicked:function(){this.signals.click.dispatch()},setLabel:function(a){this.el.innerText=a},getLabel:function(){return this.el.innerText}});E.declare("NavBar",{superclass:E.Component,defaultUIClass:"e-navbar",createChildren:function(){var a='<div class="e-view title"></div><div class="e-flexrow"><div class="e-backbutton"></div></div>';this.el.innerHTML=a},invalidate:function(){if(this.options.title===undefined){this.options.title=""}this.setTitle(this.options.title)},createSignal:function(){this.signals.back=new E.Signal()},initEvents:function(){this.on(this.el.querySelector(".e-backbutton"),"click",function(){if(this.getEnabled()){this.signals.back.dispatch()}},this)},setTitle:function(a){this.el.querySelector(".title").innerText=a},getTitle:function(){return this.el.querySelector(".title").innerText}});E.declare("Box",{superclass:E.Container,defaultUIClass:"e-box"});E.declare("HBox",{superclass:E.Box,defaultUIClass:"e-hbox"});E.declare("VBox",{superclass:E.Box,defaultUIClass:"e-vbox"});E.declare("Group",{superclass:E.Container,defaultUIClass:"e-group"});E.declare("Toggle",{superclass:E.Component,defaultUIClass:"e-toggle",_onLabel:"ON",_offLabel:"OFF",_on:false,_closeHighlight:false,_closeHighlightClass:"e-close-highlight",createChildren:function(){var a='<span class="label"></span><span class="label"></span>';this.el.innerHTML=a},invalidate:function(){E.Toggle.superclass.prototype.invalidate.apply(this,arguments);if(this.options.onLabel!=undefined){this._onLabel=this.options.onLabel}if(this.options.offLabel!=undefined){this._offLabel=this.options.offLabel}if(this.options.closeHighlight!=undefined){this.setCloseHighlight(this.options.closeHighlight)}this.setOnLabel(this._onLabel);this.setOffLabel(this._offLabel);if(this.options.on){this._setOn(true,true)}},createSignals:function(){this.signals.change=new E.Signal()},initEvents:function(){this.on(this.el,"click",function(){this.toggle()},this)},isOn:function(){return this._on},toggle:function(a){if(this.getEnabled()){this._setOn(!this.isOn(),a)}},_setOn:function(a,b){if(a==this._on){return}var c=a?"addClass":"removeClass";E(this.el)[c]("on");this._on=a;if(!b){this.signals.change.dispatch(this.isOn())}},setOnLabel:function(a){this._onLabel=a;this.el.querySelector("span:first-child").innerText=a},getOnLabel:function(){return this._onLabel},setOffLabel:function(a){this._offLabel=a;this.el.querySelector("span:last-child").innerText=a},getOffLabel:function(){return this._offLabel},setCloseHighlight:function(a){if(this._closeHighlight!=a){this._closeHighlight=a;var c=a?"addClass":"removeClass";E(this.el)[c](this._closeHighlightClass)}}});E.declare("Input",{superclass:E.FormElement,defaultUIClass:"e-input"});E.declare("TextArea",{superclass:E.FormElement,defaultUITag:"textarea",defaultUIClass:"e-textarea"});E.declare("Checkbox",{superclass:E.FormElement,defaultUIClass:"e-checkbox",type:"checkbox",_checked:false,onFormElementChange:function(){this.signals.change.dispatch(this.el.checked)},invalidate:function(){E.Checkbox.superclass.prototype.invalidate.apply(this,arguments);this.setChecked(Boolean(this.options.checked))},setChecked:function(a){if(this.getChecked()!=a){if(a){this.el.setAttribute("checked","checked")}else{this.el.sremoveAttribute("checked")}}},getChecked:function(){return Boolean(this.el.checked)}});E.declare("Radio",{superclass:E.Checkbox,defaultUITag:"input",defaultUIClass:"e-radio",type:"radio"});E.declare("Option",{superclass:E.ListComponent,defaultUIClass:"e-option",defaultItemClass:"e-optionitem",_selectedIndex:0,_onItemClicked:function(a,b){this.setSelectedIndex(a);E.Option.superclass.prototype._onItemClicked.apply(this,arguments)}});E.declare("Tab",{superclass:E.Option,defaultUIClass:"e-tab",defaultItemClass:"e-tabitem"});E.declare("ViewStack",{superclass:E.ListComponent,defaultUIClass:"e-viewstack",_selectedIndex:0,defineActivable:function(){return null}});E.declare("HRule",{superclass:E.Component,defaultUIClass:"e-hrule"});E.declare("List",{superclass:E.ListComponent,defaultUIClass:"e-list",defaultItemClass:"e-listitem",constructor:function(a){a=a||{};this.itemRenderer=new E.List.ItemRenderer(a.rendererOptions);E.List.superclass.prototype.constructor.apply(this,arguments)}});E.declare("List.ItemRenderer",{constructor:function(a){this.options=a||{}},createNode:function(g){var a=new E.Container(),b=new E.HBox({cls:"e-listitem"}),f=new E.HRule(),d=this.options;if(E.isString(g)){g={label:g}}var h=g.leftInterface||d.leftInterface;if(h){if(h instanceof E.Component){b.addChild(h)}else{b.addChild(new h(g.leftInterfaceOptions||d.leftInterfaceOptions))}}if(g.label){var e=new E.VBox();e.addChild({className:"Label",cls:"label",value:g.label});if(g.description){e.addChild(new E.Label({cls:"desc",value:g.description}))}b.addChild(e)}var c=g.rightInterface||d.rightInterface;if(c){if(c instanceof E.Component){b.addChild(c)}else{b.addChild(new c(g.rightInterfaceOptions||d.rightInterfaceOptions))}}a.addChild(b);a.addChild(f);return a}});E.declare("BusyIndicator",{superclass:E.Component,defaultUIClass:"e-busyindicator",_size:"L",invalidate:function(){E.BusyIndicator.superclass.prototype.invalidate.apply(this,arguments);this.setSize(this.options.size)},setSize:function(a){if(a&&this._size!=a){E(this.el).removeClass(this._size.toUpperCase());this._size=a;E(this.el).addClass(this._size.toUpperCase())}},getSize:function(){return this._size.toUpperCase()}});E.declare("Shim",{superclass:E.Container,defaultUIClass:"e-shim",_host:null,_visible:false,invalidate:function(){E.Shim.superclass.prototype.invalidate.apply(this,arguments);this.setHost(this.options.host)},setHost:function(a){if(this._host==a){return}if(this._host){if(this._host instanceof E.Container){this._host.removeChild(this)}else{this.el.parentNode&&this.el.parentNode.removeChild(this.el)}}if(a instanceof E.Container){a.addChild(this);this._host=a}else{if(a instanceof HTMLElement){a.appendChild(this.el);this._host=a}else{this._host=null}}},getHost:function(){return this._host}},{_shimMap:[],_getShim:function(b){for(var c=0,a=this._shimMap.length;c<a;c++){var d=this._shimMap[c];if(d.host==b){return d.shim}}return null},_setShim:function(a,b){this._removeShim(a);this._shimMap.push({host:a,shim:b})},_removeShim:function(e,f){var c=f?"shim":"host";for(var b=0,a=this._shimMap.length;b<a;b++){var d=this._shimMap[b];if(d[c]==e){this._shimMap.splice(b,1);return}}},show:function(a){if(!a){a=document.body}var b=this._getShim(a);if(!b){b=new E.Shim({host:a});this._setShim(a,b)}b.show();return b},hide:function(b,a){b.hide();if(a){this._removeShim(b,true);b.destroy()}return b},_busyIndicatorShim:null,_busyIndicator:null,showBusyIndicator:function(a){if(!this._busyIndicatorShim){this._busyIndicatorShim=new E.Shim({host:document.body,cls:"e-popup"});this._busyIndicatorShim.addChild(new E.BusyIndicator())}this._busyIndicatorShim.getChildAt(0).setSize(a);this._busyIndicatorShim.show();return this._busyIndicatorShim},hideBusyIndicator:function(a){if(this._busyIndicatorShim){this._busyIndicatorShim.hide();if(a){this._busyIndicatorShim.destroy();this._busyIndicatorShim=null}}}});E.declare("Panel",{superclass:E.Container,defaultUIClass:"e-panel",createChildren:function(){E.Panel.superclass.prototype.createChildren.apply(this,arguments);var a='<div class="e-title"><div class="title"></div><div class="e-title-mask"></div></div><div class="e-panel-content e-card e-container"></div>';this.el.innerHTML=a;this._childrenContainer=this.el.querySelector(".e-panel-content")},invalidate:function(){E.Panel.superclass.prototype.invalidate.apply(this,arguments);if(this.options.title==undefined){this.options.title=""}this.setTitle(this.options.title)},setTitle:function(a){this.el.querySelector(".e-title .title").innerText=a},getTitle:function(){return this.el.querySelector(".e-title .title").innerText},setHTMLTitle:function(a){this.el.querySelector(".e-title .title").innerHTML=a},getHTMLTitle:function(){return this.el.querySelector(".e-title .title").innerHTML}});E.declare("Alert",{superclass:E.Shim,contentRenderer:null,_buttonFlags:1,_autoClose:true,_content:null,defaultUIClass:"e-alert e-shim e-popup",createSignals:function(){E.Alert.superclass.prototype.createSignals.apply(this,arguments);this.signals.ok=new E.Signal();this.signals.cancel=new E.Signal();this.signals.close=new E.Signal()},invalidate:function(){E.Alert.superclass.prototype.invalidate.apply(this,arguments);if(this.options.autoClose!=undefined){this._autoClose=this.options.autoClose}this._buildAlert()},_buildAlert:function(){var c=this.contentBox=new E.Container({cls:"e-alert-content"}),d=this.buttonBox=new E.HBox({cls:"e-alert-buttons"}),b=this.options.buttonFlags||this._buttonFlags;if(b&E.Alert.OK){var f=this.okButton=new E.Button({label:this.options.okLabel||E.Alert.OK_LABEL});f.signals.click.add(this._onOkButtonClicked,this);d.addChild(f)}if(b&E.Alert.CANCEL){var e=this.cancelButton=new E.Button({label:this.options.cancelLabel||E.Alert.CANCEL_LABEL});e.signals.click.add(this._onCancelButtonClicked,this);d.addChild(e)}var a=this.panel=new E.Panel({title:(this.options.title||E.Alert.DEFAULT_TITLE),children:[c,d]});this.addChild(a);this.setContent(this.options.content)},setContent:function(a){if(a==this._content){return}this._content=a;while(this.contentBox.children().length){this.contentBox.removeChildAt(0)}if(a instanceof E.Component){this.contentBox.addChild(a)}else{if(a&&E.isString(a)){this.contentBox.addChild(new E.HTML({value:a}))}}},getContent:function(){return this._content},setTitle:function(){this.panel.setTitle()},getTitle:function(){return this.panel.getTitle()},_onOkButtonClicked:function(){if(this._autoClose){this.close();this.signals.close.dispatch(E.Alert.OK)}this.signals.ok.dispatch()},_onCancelButtonClicked:function(){if(this._autoClose){this.close();this.signals.close.dispatch(E.Alert.CANCEL)}this.signals.cancel.dispatch()},show:function(){this.setHost(document.body)},hide:function(){this.close()},close:function(){this.setHost(null)},destroy:function(){if(this.okButton){this.okButton.destroy()}if(this.cancelButton){this.cancelButton.destroy()}E.Alert.superclass.prototype.destroy.apply(this,arguments)}},{OK:1,CANCEL:2,OK_LABEL:"确定",CANCEL_LABEL:"取消",DEFAULT_TITLE:"提示",show:function(c,e,b,a){var d=new E.Alert({content:c,title:e,buttonFlags:b});if(E.isFunction(a)){d.signals.close.add(a)}d.show();return d}});