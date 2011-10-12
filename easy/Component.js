/**
E
====

全局函数和对象，用于查找DOM元素

		var nodeList = E("#container .item");
		nodeList.addClass("focus").show();


方法
--------
- `css()`
设置或获取DOM元素的样式

- `hide()`
隐藏元素

- `show()`
显示元素

- `item(index)`
在查找到的NodeList中获得第N个DOM元素

- `index()`
获得元素在NodeList中的索引

- `addClass(className)`
为DOM元素添加css class

- `removeClass(className)`
为DOM元素移除css class

- `hasClass(className)`
判断DOM元素有css class


静态属性和方法
--------
- `guid()`
生成GUID

- `mix()`
合并两个对象

- `merge`
合并两个对象

- `namespace`
生成命名空间

- `extend`
类继承

- `declare`
类定义

			E.declare("ClassName", {
				superclass: Superclass
				instanceProperty: value, //基本类型
				constructor: function(){
				},
				instanceMethod: function(){}
			}, {
				staticProperty: staticPropertyValue,
				staticMethod: function(){}
			});

 - `Array`

 */
(function() {

  var E = function(query) {
      return new E.init(query);
    },
    doc = document;

  E.init = function(query) {

    if (query.nodeType) {
      query = [query];
    } else if (typeof query == 'string') {
      query = doc.querySelectorAll(query);
    } else if (!(query instanceof Array)) {
      return null;
    }

    this.length = query.length;

    for (var i = 0; i < this.length; i++) {
      this[i] = query[i];
    }

    //this.fn.setArray(this.fn.makeArray(this));

    return this;
  };

  E.data = {};

  E.init.prototype = {
    each: function(callbacM) {
      for (var i = 0; i < this.length; i++) {
        callbacM.call(this[i]);
      }
      return this;
    },
    css: function(attrib, value) {
      var o = {};
      
      if (typeof attrib === 'string' && value === undefined) {
        return window.getComputedStyle(this[0], null).getPropertyValue(attrib);
      }
      if (typeof attrib !== 'object') {
        o[attrib] = value;
      } else {
        o = attrib;
      }      
      return this.each(function() {
        for (var i in o) {
          this.style[i] = o[i];
        }
      });
    },
    hide: function() {
      this.each(function() {
        this.style.display = "none";
      })
    },
    show: function() {
      this.each(function() {
        this.style.display = "block";
      })
    },
    item : function (index) {
      return this[index];
    },
    set: function(key, val) {
      this.each(function() {
        this[key] = val;
      })
    },
    get: function(key) {
      return this.item(0)[key];
    },
    setAttribute: function(key, val) {
      this.each(function() {
        this.setAttribute(key, val);
      })
    },
    getAttribute: function(key) {
      this.item(0).getAttribute(key);
    },
    addClass: function(c) {
      this.each(function() {
        var t = new RegExp("(^|\\s)" + c + "(\\s|$)").test(this.className);
        if (!t) {
          this.className += this.className ? " " + c : c;
        }
      });
    },
    removeClass: function(c) {
      this.each(function() {
        var r = this.className.match(' ' + c) ? ' ' + c : c;
        this.className = this.className.replace(r, '');
      })
    },
    hasClass: function(c) {
      return new RegExp("(^|\\s)" + c + "(\\s|$)").test(this.className);
    },
    index: function(){
      var pa = this[0].parentNode.childNodes;
      for( var i = 0; i< pa.length; i++ ){
        if( pa[i] == this[0] ){
          return i;
        }
      }
    },
    closest: function(){

    }
  };

  // 声明E为全局变量
  window.E = E;

})();


;(function(){
	
	var kernelName = "E", 
		core = window[kernelName] || (window[kernelName] = {}),
		_guid = 0,
		_forceEnum = [
			'hasOwnProperty',
			'isPrototypeOf',
			'propertyIsEnumerable',
			'toString',
			'toLocaleString',
			'valueOf'
		],
		_hasEnumBug = !{valueOf: 0}.propertyIsEnumerable('valueOf'),
		hasOwn   = Object.prototype.hasOwnProperty,
		TO_STRING = Object.prototype.toString,

		isFunction = function(o) {
			return TO_STRING.call(o) === '[object Function]';
		},
		isObject = function(o, failfn) {
			var t = typeof o;
			return (o && (t === 'object' ||
				(!failfn && (t === 'function' || isFunction(o))))) || false;
		},
		
		mix = function(receiver, supplier, overwrite, whitelist, mode, merge) {
			var alwaysOverwrite, exists, from, i, key, len, to;

			if (!receiver || !supplier) {
				return receiver;
			}

			if (mode) {
				if (mode === 2) {
					mix(receiver.prototype, supplier.prototype, overwrite,
							whitelist, 0, merge);
				}

				from = mode === 1 || mode === 3 ? supplier.prototype : supplier;
				to   = mode === 1 || mode === 4 ? receiver.prototype : receiver;

				if (!from || !to) {
					return receiver;
				}
			} else {
				from = supplier;
				to   = receiver;
			}

			alwaysOverwrite = overwrite && !merge;

			if (whitelist) {
				for (i = 0, len = whitelist.length; i < len; ++i) {
					key = whitelist[i];

					if (!hasOwn.call(from, key)) {
						continue;
					}
					exists = alwaysOverwrite ? false : key in to;

					if (merge && exists && isObject(to[key], true)
							&& isObject(from[key], true)) {
						mix(to[key], from[key], overwrite, null, 0, merge);
					} else if (overwrite || !exists) {
						to[key] = from[key];
					}
				}
			} else {
				for (key in from) {
					if (!hasOwn.call(from, key)) {
						continue;
					}
					exists = alwaysOverwrite ? false : key in to;

					if (merge && exists && isObject(to[key], true)
							&& isObject(from[key], true)) {
						mix(to[key], from[key], overwrite, null, 0, merge);
					} else if (overwrite || !exists) {
						to[key] = from[key];
					}
				}
				if (_hasEnumBug) {
					mix(to, from, overwrite, _forceEnum, mode, merge);
				}
			}

			return receiver;
		};



	mix(core, {
			mix: mix,
			guid: function(pre) {
				var id = (_guid++) + "";
				return pre ? pre + id : id;
			},
			isFunction: isFunction,
			isObject: isObject,
			isUndefined: function(o) {
				return o === undefined;
			},

			isBoolean: function(o) {
				return TO_STRING.call(o) === '[object Boolean]';
			},

			isString: function(o) {
				return TO_STRING.call(o) === '[object String]';
			},

			isNumber: function(o) {
				return TO_STRING.call(o) === '[object Number]' && isFinite(o);
			},

			isFunction: isFunction,

			isArray: function(o) {
				return TO_STRING.call(o) === '[object Array]';
			},
			'Array': {
				indexOf: function(arr, item){
					if(arr.indexOf){
						return arr.indexOf(item);
					}
					for(var i = 0, l = arr.length; i < l; i++){
						if(arr[i] === item){
							return i;
						}
					}
					return -1;
				},
				each: function(arr, callback){
					for(var i = 0, l = arr.length; i < l; i++){
						callback(arr[i], i, arr);
					}
				},
				remove: function(arr, item){
					var index = this.indexOf(arr, item);
					if(index != -1){
						return arr.splice(index, 1);
					}
				}
			},
			merge: function() {
				var a = arguments, o = {}, i, l = a.length;
				for (i=0; i<l; i=i+1) {
					mix(o, a[i], true);
				}
				return o;
			},
			namespace: function(name){
				var a=arguments, o=null, i, j, d, l;
				for (i=0; i<a.length; i=i+1) {
					d = ("" + a[i]).split(".");
					o = this;
					l = d.length;
					for (j=(d[0] == kernelName) ? 1 : 0; j < l; j = j+1) {
						o[d[j]] = o[d[j]] || {} ;
						o = o[d[j]];
					}
				}
				return o;
			},
			extend: function(r, s, px, sx) {
				if (!s||!r) {
					return r;
				}
				var OP = Object.prototype,
					O = function (o) {
						function F() {
						}

						F.prototype = o;
						return new F();
					},
					sp = s.prototype,
					rp = O(sp);


				r.prototype=rp;
				rp.constructor=r;
				r.superclass=sp;

				if (s != Object && sp.constructor == OP.constructor) {
					sp.constructor=s;
				}

				if (px) {
					mix(rp, px, true);
				}

				if (sx) {
					mix(r, sx, true);
				}
				r.superclass = s;
				return r;
			},
			declare: function(className, prop, statics){
				var self = this;

				if(this.isFunction(prop)){
					var p = prop();
					if(!self.isUndefined(p)){
						self.declare(className, p, statics);
					}else{
						mix(this.namespace(className), statics);
					}
					return;
				};

				prop = prop || {};
				var superclass = prop.superclass,
					 newclass,
					 d, l, i, o;

				if(prop.hasOwnProperty("constructor") && this.isFunction(prop.constructor)){
					newclass = prop.constructor;
				}else if(!superclass){
					newclass = function(){}
				}else{
					newclass = function(){
						superclass.prototype.constructor.apply(this, arguments);
					};
				}
				delete prop.constructor;

				if(!superclass){
					this.mix(newclass.prototype, prop);
					this.mix(newclass, statics);
				}else{
					newclass = this.extend(newclass, superclass, prop, statics);
				}

				d = ("" + className).split(".");
				i = (d[0]==kernelName) ? 1 : 0;
				l = d.length;
				o = this;
				for(; i < l; i++){
					if(i == l-1){
						o[d[i]] = newclass;
					}else{
						o[d[i]] = o[d[i]] || {} ;
					}
					o = o[d[i]];
				}
				return o;
			}
	});

})();
/**
Signal
====

信号

方法
-----

- `add(listener)`
为信号添加监听器

- `addOnce(listener, scope, priority)`
为信号添加一次性监听器，监听函数执行后能自动解绑监听器

- `remove(listener)`
为信号移除监听器

- `removeAll()`
移除信号的所有监听器

- `dispatch(...)`
派发信号

- `halt()`
终止信号的传播

 */
E.declare("SignalBinding", {
	
	active: true,
	params: null,
	constructor: function(signal, listener, isOnce, listenerContext, priority) {
        this._listener = listener;
        this._isOnce = isOnce;
        this.context = listenerContext;
        this._signal = signal;
        this._priority = priority || 0;
    },
	execute: function(paramsArr){
		var handlerReturn, params;
		if (this.active && !!this._listener) {
			params = this.params? this.params.concat(paramsArr) : paramsArr;
			handlerReturn = this._listener.apply(this.context, params);
			if (this._isOnce) {
				this.detach();
			}
		}
		return handlerReturn;
	},
	detach : function () {
            return this.isBound()? this._signal.remove(this._listener) : null;
        },
		 isBound : function () {
            return (!!this._signal && !!this._listener);
        },
        getListener : function () {
            return this._listener;
        },
        _destroy : function () {
            delete this._signal;
            delete this._listener;
            delete this.context;
        },
        isOnce : function () {
            return this._isOnce;
        },
        toString : function () {
            return '[SignalBinding isOnce: ' + this._isOnce +', isBound: '+ this.isBound() +', active: ' + this.active + ']';
        }
});
E.declare('Signal', {

	_bindings: null,
	_shouldPropagate : true,
    active : true,

	constructor: function(){
		this._bindings = [];
	},
	_addBinding: function(binding){
		var n = this._bindings.length;
		do { --n; } while (this._bindings[n] && binding._priority <= this._bindings[n]._priority);
		this._bindings.splice(n + 1, 0, binding);
	},
	 _registerListener : function (listener, isOnce, scope, priority) {

            var prevIndex = this._indexOfListener(listener),
                binding;

            if (prevIndex !== -1) {
                binding = this._bindings[prevIndex];
                if (binding.isOnce() !== isOnce) {
                    throw new Error('不能重复添加监听器');
                }
            } else {
                binding = new E.SignalBinding(this, listener, isOnce, scope, priority);
                this._addBinding(binding);
            }

            return binding;
        },
	add: function(listener, scope, priority){
		return this._registerListener(listener, false, scope, priority);
	},
	addOnce: function(listener, scope, priority){
		 return this._registerListener(listener, true, scope, priority);
	},
	remove : function (listener) {
		var i = this._indexOfListener(listener);
		if (i !== -1) {
			this._bindings[i]._destroy();
			this._bindings.splice(i, 1);
		}
		return listener;
	},
	removeAll : function () {
		var n = this._bindings.length;
		while (n--) {
			this._bindings[n]._destroy();
		}
		this._bindings.length = 0;
	},
	dispatch : function (params) {
		if (! this.active) {
			return;
		}
		var paramsArr = Array.prototype.slice.call(arguments),
			bindings = this._bindings.slice(),
			n = this._bindings.length;
		this._shouldPropagate = true; 
		do { n--; } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
	},
	getNumListeners: function(){
		return this._bindings.length;
	},
	registerListener: function(listener, once){
		var index = this.find(listener);
		if(index == -1 || !once){
			this.__bindings.push(listener);
			if(once){
				this.__bindingsOnce.push(listener);
			}
		}
	},
	halt : function () {
		this._shouldPropagate = false;
	},
	dispose : function () {
		this.removeAll();
		delete this._bindings;
	},
	_indexOfListener : function (listener) {
		var n = this._bindings.length;
		while (n--) {
			if (this._bindings[n]._listener === listener) {
				return n;
			}
		}
		return -1;
	},
	toString : function () {
		return '[Signal active: '+ this.active +' numListeners: '+ this.getNumListeners() +']';
	}
});
/**
Component
====
组件基类。每个组件都有一个可选的构造参数，这个参数是一个Hash对象，用来配置组件的状态、数据和信号处理函数。例如：

		var component = new E.Component({
			container: '#containerId',
			disabled: true
		});

在上面的例子中，container是一个DOM Element或者一个字符串选择器，如果指定了container，则组件被构造完成后会被自动插入到document文档中。

方法
-----

- `setIncludeInLayout(b)`
设置组件隐藏时是否会释放所占的页面空间。

- `getIncludeInLayout()`
组件隐藏时是否会释放所占的页面空间，默认不占用。

- `show()`
显示组件

- `hide()`
隐藏组件

- `getVisible()`
组件是否可视

- `enable()`
启用组件

- `disable()`
禁用组件

- `getEnabled()`
组件是否可用

- `setOpacity()`
设置组件透明度

- `getOpacity()`
返回组件透明度

- `getParent()`
返回组件所在的容器

- `setFocus()`
设置页面当前的focus元素

- `getFocus()`
返回页面当前的focus元素

- `on(target, type, listener)`
给target绑定监听器

- `detach(target, type, listener, agent)`
给target解绑监听器

- `delegate(target, selector, type, listener, agent)`
给target绑定delegate监听器

受保护的方法
-------------
- `createSignals()`
创建组件拥有的信号。比如button有click信号，tab有change信号。

- `defineActivable()`
定义组件中会模拟hover效果的元素。因为mobile中CSS不支持:hover，所以定义在该函数中的DOM元素会在touchstart的时候加上一个hover class。

- `createChildren()`
创建组件的DOM树。

- `invalidate()`
对组件进行配置。比如button的文本，输入框的value，tab的标签等等。

- `initEvents()`
监听DOM中相应元素的事件，然后作为组件封装的信号（signal）发出去。
 */
E.declare("Component", {
	
	defaultUIClass: 'ui-component',
	defaultUITag: 'div',
	
	constructor: function(options){
		this._focusManager = E.Component.focusManager;
		//构造参数
		this._setOptions(options);
		//实例化signals
		this.createSignals();
		this._autoBindSignals();
		//构建dom树
		this._initContainer();
		//初始化事件
		this.initEvents();
		//定义hover模拟列表
		this.defineActivable();
		this._autoBindActivable();
	},
	/////////////////////////////
	// protected method
	////////////////////////////
	createSignals: function(){
	},
	createChildren: function(){
	},
	invalidate: function(){
	},
	initEvents: function(){
	},
	defineActivable: function(){
		return null;
	},
	destroy: function(){
		this._autoUnbindActivable();
		this.removeAllSignals();
		this.remove();
	},
	////////////////////////////
	//private method
	////////////////////////////
	_setOptions: function(options){
		options = options || {};
		if(options.visible == undefined){
			options.visible = true;
		}
		if(options.includeInLayout == undefined){
			options.includeInLayout = true;
		}
		this._includeInLayout = options.includeInLayout;
		this._parent = options.parent || null;
		this.uiClass = options.uiClass || this.defaultUIClass || "";
		this.signals = {};
		this.options = options;
	},
	_initContainer: function(){
		var cls;
		if(E.isArray(this.options.cls)){
			cls = this.options.cls;
		}else if(E.isString(this.options.cls)){
			cls = [this.options.cls];
		}else{
			cls = [];
		}
		if(this.uiClass){
			cls.push(this.uiClass);
		}
		this.el = document.createElement(this.defaultUITag); 
		this.el.className = cls.join(" ");
		this.createChildren();
		this.invalidate();

		if(this.options.disabled){
			this.disable();
		}
		if(!this.options.visible){
			this.hide();
		}
		if(this._parent){
			this._parent.addChild(this);
		}else{
			if(E.isString(this.options.container)){
				var node = document.querySelector(this.options.container);
				node && node.appendChild(this.el);
			}else if(this.options.container instanceof HTMLElement){
				this.options.container.appendChild(this.el);
			}
		}
	},
	_autoBindActivable: function(list){
		var self = this,
			aList = list || this.defineActivable();
		
		if(aList == null){
			return;
		}else if(E.isString(aList)){
			this._focusManager.addToActiveList(this.el, aList); 
		}else if(E.isArray(aList) || (aList instanceof NodeList)){
			E.Array.each(aList, function(item){
				self._autoBindActivable(item);
			});
		}else{return;
			this._focusManager.addToActiveList(aList);
		}
	},
	_autoUnbindActivable: function(){
		var self = this,
			aList = this.defineActivable();
		if(aList == null){
			return;
		}else if(E.isString(aList)){
			this._focusManager.removeFromActiveList(this.el, aList); 
		}else if(E.isArray(aList)){
			E.Array.each(aList, function(item){
				self._unbindActivable(item);
			});
		}else{
			this._focusManager.removeFromActiveList(aList);
		}
	},
	_autoBindSignals: function(){
		var s = this.options.signals || {};
		for(var i in s){
			if(s.hasOwnProperty(i) && this.signals.hasOwnProperty(i)){
				this._bindSignal(i, s[i]);
			}
		}
	},
	removeAllSignals: function(){
		var s = this.signals || {};
		for(var i in s){
			if(s.hasOwnProperty(i)){
				s[i].removeAll();
			}
		}
	},
	_bindSignal: function(signal, func, target){
		if(!E.isFunction(func) && func.handler){
			this._bindSignal(signal, func.handler, func.target);
		}else if(E.isFunction(func)){
			this.signals[signal].add(func, target);
		}
	},
	_updateIncludeInLayout: function(){
		var $el = E(this.el);
		if(this._includeInLayout){
			$el.css({"visibility": (this._visible ? "visible" : 'hidden')});
		}else{
			$el.css({"display": (this._visible ? null : 'none')});
		}
	},
	/////////////////////////////////////////
	// public method
	/////////////////////////////////////////
	remove: function(){
		if(this._parent){
			this._parent.removeChild(this);
		}else if(this.el.parentNode){
			try{
				this.el.parentNode.removeChild(this.el);
			}catch(err){}
		}
	},
	enable: function(){
		if(this._disabled == true){
			this._disabled = false;
			E(this.el).removeClass('disabled');
		}
	},
	disable: function(){
		if(this._disabled != true){
			this._disabled = true;
			E(this.el).addClass('disabled');
		}
	},
	getEnabled: function(){
		return !this._disabled;
	},
	show: function(){
		if(this._visible == false){
			this._visible = true;
			this._updateIncludeInLayout();
		}
	},
	hide: function(){
		if(this._visible == true){
			this._visible = false;
			this._updateIncludeInLayout();
		}
	},
	getVisible: function(){
		return this._visible;
	},
	setIncludeInLayout: function(b){
		if(this._includeInLayout != b){
			this._includeInLayout = b;
			if(!this._visible){
				this._updateIncludeInLayout();
			}
		}
	},
	getIncludeInLayout: function(){
		return this._includeInLayout;
	},
	setOpacity: function(o){
		E(this.el).css("opacity", o);
	},
	getOpacity: function(){
		return E(this.el).css("opacity");
	},
	getParent: function(){
		return this._parent;
	},
	on: function(){
		this._focusManager.on.apply(this._focusManager, arguments);
	},
	delegate: function(){
		this._focusManager.delegate.apply(this._focusManager, arguments);
	},
	detach: function(){
		this._focusManager.detach.apply(this._focusManager, arguments);
	},
	setFocus: function(el){
		this._focusManager.setFocus(el);
	},
	getFocus: function(){
		return this._focusManager.getFocus();
	}
	

}, {
	focusManager: (function(){
		
		var eventListeners = [],
			activeList = [],
			focusItem = null,
			activeItem = null;

		return {
			on: function(el, type, listener, agent){
				var self = this;
				if(E.isArray(type)){
					E.Array.each(type, function(item){
						self.on(el, item, listener, agent);
					});
				}else{
					var newListener = function(){
						listener.apply(agent, arguments);
					};
					if(el.addEventListener){
						el.addEventListener(type, newListener, false);
					}else{
						el.attachEvent(type, newListener);
					}
					this._saveListeners(el, type, newListener);
				}
			},
			test: function(target, selector, container){
				var items = container.querySelectorAll(selector);
				items = Array.prototype.slice.call(items, 0);
				for(var i = 0, l = items.length; i < l; i++){
					if(items[i] === target){
						return true;
					}
				}
				return false;
			},
			delegate: function(el, selector, type, listener, agent){
				var self = this;
				this.on(el, type, function(e){
					var target = e.target,
						match = [],
						isContainer;
					 if (target.nodeType === 3) {
						target = target.parentNode;
					}
					while (target) {
						isContainer = (target === el);
						if (self.test(target, selector, el)) {
							match.push(target);
						}

						if (isContainer) {
							break;
						}
						target = target.parentNode;
					}
					E.Array.each(match, function(item){
						var clone = {__protot__: e, currentTarget: item};
						listener.call(agent, clone);
					});
				});
			},
			detach: function(el, type, listener){
				var self = this;
				if(E.isArray(type)){
					E.Array.each(type, function(item){
						self.detach(el, item, listener);
					});
				}else{
					if(listener){
						if(el.removeEventListener){
							el.removeEventListener(type, listener);
						}else{
							el.detachEvent(type, listener);
						}
					}else{
						var lis =this._getListeners(el, type);
						if(type==undefined){
							for(var i in lis){
								if(lis.hasOwnProperty(i)){
									self.detach(el, i, listener);
								}
							}
						}else{
							E.Array.each(lis, function(item){
								if(el.removeEventListener){
									el.removeEventListener(type, item);
								}else{
									el.detachEvent(type, item);
								}
							});
						}
					}
				}
			},
			_getListeners: function(target, type){
				var lis = null;
				for(var i = 0, l = eventListeners.length; i < l; i++){
					if(eventListeners[i].target == target){
						lis = eventListeners[i];
					}
				}
				if(lis == null || type == null){
					return lis;
				}
				return lis[type];
			},
			_saveListeners: function(target, type, listener){
				var lis = this._getListeners(target);
				if(lis == null){
					lis = {target: target, data:{}};
					eventListeners.push(lis);
				}
				if(lis[type] == null){
					lis[type] = [];
				}
				lis[type].push(listener);
			},
			setFocus: function(value){
				if(focusItem){
					E(focusItem).removeClass("focus");
				}
				focusItem = value;
				if(focusItem){
					E(focusItem).addClass("focus");
				}
			},
			getFocus: function(){
				return focusItem;
			},
			addToActiveList: function(el, selector){
				if(selector){
					this.addActiveElListener(el, selector);
				}else if(E.Array.indexOf(activeList, el) == -1){
					activeList.push(el);
					this.addActiveElListener(el);
				}
			},
			removeFromActiveList: function(el, selector){
				//ignore delegate listener
				if(E.Array.indexOf(activeList, el) != -1){
					E.Array.remove(activeList, el);
					this.removeActiveElListener(el);
				}
			},
			setActiveEl: function(el){
				if(activeItem){
					E(activeItem).removeClass("hover");
				}
				activeItem = el;
				if(activeItem){
					E(activeItem).addClass("hover");
				}
			},
			onActive: function(e){
				this.setActiveEl(e.currentTarget);
			},
			onDeactive: function(el){
				this.setActiveEl(null);
			},
			addActiveElListener: function(el, selector){
				if(selector){
					this.delegate(el, selector, ["mouseover", "touchstart"], this.onActive, this);
					this.delegate(el, selector, ["mouseout", "touchend"], this.onDeactive, this);
				}else{
					this.on(el, ["mouseover", "touchstart"], this.onActive, this);
					this.on(el, ["mouseout", "touchend"], this.onDeactive, this);
				}
			},
			removeActiveElListener: function(el){
				this.detach(el, ["mouseover", "touchstart"]);
				this.detach(el, ["mouseout", "touchend"]);
			}
		}
	})()
});
/**
Container
====
容器组件的基类。容器组件可以包含其它组件，也可以动态移除组件。

		var container = new E.Container({
			container: "#container",
			children: [
				new E.Button({label: "button1", theme:"red"}),
				new E.Button({label: "button2", theme:"green"}),
				new E.Button({label: "button3", theme:"blue"})
			]
		});

继承
----
- Component

方法
-----

- `addChild(child)`
添加组件到容器

- `addChildAt(child, index)`
添加组件到容器的指定位置

- `removeChild(child)`
从容器中移除组件

- `removeChildAt(index)`
从容器指定位置移除组件

- `getChildAt(index)`
获取指定位置的组件

- `hasChild(child)`
是否包含某个组件

- `children()`
返回容器中的组件列表

 */
E.declare("Container", {

	superclass: E.Component,
	defaultUIClass: 'ui-container',

	createChildren: function(){
		this._children = [];
		this._childrenContainer = this.el;
	},

	invalidate: function(){
		var self = this,
			children = this.options.children;
		if(E.isArray(children)){
			E.Array.each(children, function(item){
				self.addChild(item);
			});
		}
	},
	addChild: function(child){
		return this.addChildAt(child);
	},
	addChildAt: function(child, index){
		if(!(child instanceof E.Component) && E.isFunction(E[child.className])){
			return this.addChildAt(new E[child.className](child), index);
		}
		if(isNaN(index) || index > this._children.length){
			index = this._children.length;
		}else if(index < 0){
			index = 0;
		}
		var parent = child.getParent();
		parent && parent.removeChild(child);
		child._parent = this;
		this._addChild(child, index);
		this._children.splice(index, 0, child);
		return child;
	},
	_addChild: function(child, index){
		if(index >= this._children.length){
			this._childrenContainer.appendChild(child.el);
		}else{
			this._childrenContainer.insertBefore(child.el, this.getChildAt(index).el);
		}
	},
	getChildAt: function(index){
		return this._children[index];
	},
	removeChild: function(child){
		if(!this.hasChild(child)){
			return null;
		}
		E.Array.remove(this._children, child);
		child._parent = null;
		this._removeChild(child);
		return child;
	},
	removeChildAt: function(index){
		var child = this.getChildAt(index);
		if(child){
			return this.removeChild(child);
		}
		return null;
	},
	_removeChild: function(child){
		try{
			child.el.parentNode.removeChild(child.el);
		}catch(e){}
	},
	hasChild: function(child){
		return child.getParent() == this;
	},
	children: function(){
		return this._children;
	}
});
/**
ListComponent
====
列表组件基类。列表组件是List, Option, Tab, ViewStack等组件的基类。

继承
----
- Component

方法
-----

- `setData(data)`
设置列表的数据

- `getData()`
获取列表的数据

- `addItem(item)`
添加一个列表项

- `addItemAt(item, index)`
从指定位置添加一个列表项

- `getItemAt(index)`
从指定位置获取列表的数据

- `removeItem(item)`
移除某个列表项

- `removeItemAt(index)`
根据索引移除列表项

- `getSelectedIndex()`
获取当前选中的列表索引

- `setSelectedIndex(index)`
设置当前选中的列表索引

- `getSelectedItem()`
获取当前选中的列表数据

- `setSelectedItem(item)`
设置当前选中的列表索引

信号
----
- `change`
选中的列表索引发生改变了。

- `itemClick`
列表项被点击了。

 */


E.declare("ListComponent", {
	superclass: E.Component,
	_items: null,
	_nodes: null,
	_selectedIndex: -1,
	itemRenderer: null,
	defaultItemTag: "div",
	defaultUIClass: "ui-listcomponent",
	defaultItemClass: "ui-item",

	createChildren: function(){
		E.ListComponent.superclass.prototype.createChildren.apply(this, arguments);
		this._itemContainer = this.el;
	},
	invalidate: function(){
		E.ListComponent.superclass.prototype.invalidate.apply(this, arguments);
		if(this.options.data){
			this.setData(this.options.data);
		}
		if(this._selectedIndex != -1){
			this.setSelectedIndex(this._selectedIndex, true, true);
		}
		if(E.isNumber(this.options.selectedIndex)){
			this.setSelectedIndex(this.options.selectedIndex, true);
		}
	},
	createSignals: function(){
		this.signals.change = new E.Signal();
		this.signals.itemClick = new E.Signal();
	},
	defineActivable: function(){
		return "."+this.defaultItemClass;
	},
	initEvents: function(){
		var itemClass =  "."+this.defaultItemClass;
		this.delegate(this.el, itemClass, "click", function(e){
			var nodeList = Array.prototype.slice.call(this.el.querySelectorAll(itemClass), 0);
			this._onItemClicked(E.Array.indexOf(nodeList, e.currentTarget), e.currentTarget);
		}, this);
	},
	_onItemClicked: function(index, target){
		this.signals.itemClick.dispatch(index, this.getItemAt(index), target);
	},
	//////////////////////////////
	// public 
	//////////////////////////////
	setData: function(data){
		this.destroyList();
		if(data == null){
			data = [];
		}else if(!E.isArray(data)){
			data = [data];
		}
		this._items = [];
		this._nodes = [];
		this.createList(data);
	},
	getData: function(){
		return this._items;
	},
	addItem: function(item){
		return this.addItemAt(item, this._items.length);
	},
	addItemAt: function(item, index){
		if(isNaN(index) || index > this._items.length){
			index = this._items.length;
		}else if(index < 0){
			index = 0;
		}
		var node = this.createNode(item);
		if(index == this._items.length){
			this._itemContainer.appendChild(node);
		}else{
			var relativeNode = this._nodes[index];
			this._itemContainer.insertBefore(node, relativeNode);
		}
		this._addItemAndNode(item, node, index);
	},
	getItemAt: function(index){
		return this._items[index];
	},
	removeItem: function(item){
		return this.removeItemAt(E.Array.indexOf(this._items, item));
	},
	removeItemAt: function(index){
		if(index<0 || index>=this._items.length){
			return null;
		}
		var dom = this._nodes[index];
		try{
			dom && dom.parentNode.removeChild(dom);
		}catch(err){}
		this._removeItemAtNodeByIndex(index);
		return this._items[index];
	},
	setSelectedIndex: function(index, silence, forceChange){
		if(this._selectedIndex != index || forceChange){
			var node = this._nodes[this._selectedIndex];
			node && E(node).removeClass("selected");
			this._selectedIndex = index;
			node = this._nodes[this._selectedIndex];
			node && E(node).addClass("selected");
			if(!silence){
				this.onSelectedIndexChange(index, this.getSelectedItem());
			}
		}
	},
	getSelectedIndex: function(){
		return this._selectedIndex;
	},
	setSelectedItem: function(item, silence){
		if(this.getSelectedItem() != item){
			var index = E.Array.indexOf(this._items, item);
			this.setSelectedIndex(index, silence)
		}
	},
	getSelectedItem: function(){
		return this._items[this._selectedIndex];
	},
	getCellAt: function(index){
		return this._nodes[index]
	},
	////////////////////////////
	// protected
	////////////////////////////
	_addItemAndNode: function(item, node, index){
		this._nodes.splice(index, 0, node);
		this._items.splice(index, 0, item);
	},
	_removeItemAtNodeByIndex: function(index){
		if(index >=0 && index <= this._nodes.length){
			this._nodes.splice(index, 1);
			this._items.splice(index, 1);
		}
	},
	createList: function(data){
		var self = this;
		E.Array.each(data, function(item){
			self.addItem(item);
		});
	},
	destroyList: function(){
		if(!this._items){
			return;
		}
		while(this._items.length){
			this.removeItemAt(0);
		}
	},
	
	createNode: function(item){
		var renderer;
		if(this.itemRenderer && E.isFunction(this.itemRenderer.createNode)){
			renderer = this.itemRenderer.createNode(item);
			if(renderer instanceof HTMLElement){
				return renderer;
			}else if(renderer instanceof E.Component){
				return renderer.el;
			}
		}
		if(item instanceof E.Component){
			return item.el;
		}
		var node = document.createElement(this.defaultItemTag);
		node.className = this.defaultItemClass;
		if(E.isString(renderer)){
			node.innerHTML = renderer;
		}else if(E.isString(item)){
			node.innerText = item;
		}else if(item && !E.isUndefined(item.label)){
			node.innerText = item.label;
		}else{
			node.innerText = String(item);
		}
		return node;
	},
	onSelectedIndexChange: function(index, item, oldItem){
		this.signals.change.dispatch(index, item, oldItem);
	},
	destroy: function(){
		this.destroyList();
		E.ListComponent.superclass.prototype.destroy.apply(this, arguments);
	}
});
/**
FormElement
====
表单组件基类。FormElement是Input, TextArea, Checkbox, Radio等组件的基类。

继承
----
- Component

方法
-----

- `getValue()`

- `setValue(value)`

- `getPlaceholder()`

- `setPlaceholder()`


信号
----
- `change`
表单数据发生改变时触发。

 */

E.declare("FormElement", {

	superclass: E.Component,
	defaultUITag: "input",
	defaultUIClass: 'ui-form',
	type: "input",

	createSignals: function(){
		this.signals.change = new E.Signal();
	},
	createChildren: function(){
		E.FormElement.superclass.prototype.createChildren.apply(this, arguments);
		if(this.options.type){
			this.type = this.options.type;
		}
		this.el.setAttribute("type", this.type);
	},
	invalidate: function(){
		E.FormElement.superclass.prototype.invalidate.apply(this, arguments);
		if(this.options.value){
			this.setValue(this.options.value);
		}
		if(this.options.placeHolder){
			this.setPlaceholder(this.options.placeHolder);
		}
		if(this.options.readonly){
			this.setReadonly(true);
		}
	},
	initEvents: function(){
		this.on(this.el, "change", function(){
			this.onFormElementChange();
		}, this);
	},
	setValue: function(value, silence){
		if(value != this.el.value){
			this.el.value = value;
			if(!silence){
				this.onFormElementChange();
			}
		}
	},
	enable: function(){
		this.el.removeAttribute("disabled");
		E.FormElement.superclass.prototype.enable.apply(this, arguments);
	},
	disable: function(){
		this.el.setAttribute("disabled", "disable");
		E.FormElement.superclass.prototype.disable.apply(this, arguments);
	},
	getValue: function(){
		return this.el.value;
	},
	getReadonly: function(){
		return Boolean(this.el.getAttribute("readonly"));
	},
	setReadonly: function(value, force){
		if(value == this.getReadonly() && !force){
			return;
		}
		if(value){
			this.el.setAttribute("readonly", "readonly");
		}else{
			this.el.removeAttribute("readonly", "readonly");
		}
	},
	getPlaceholder: function(){
		return this.el.getAttribute("placeholder");
	},
	setPlaceholder: function(value){
		this.el.setAttribute("placeholder", value);
	},
	onFormElementChange: function(){
		this.signals.change.dispatch(this.el.value);
	}
	
});
/**
Label
====
文本组件。

继承
----
- Component

方法
-----
- `getValue()`
获取组件的文本。

- `setValue(value)`
设置组件的文本。

 */
E.declare("Label", {

	superclass: E.Component,
	defaultUIClass: 'ui-label',

	invalidate: function(){
		E.Label.superclass.prototype.invalidate.apply(this, arguments);
		this.setValue(this.options.value);
	},
	
	setValue: function(value){
		this.el.innerText = value;
	},
	getValue: function(){
		return this.el.innerText;
	}
	
});
/**
HTML
====
HTML文本组件。

继承
----
- Label

方法
-----
- `getValue()`
获取组件的html文本

- `setValue(value)`
设置组件的html文本

 */
E.declare("HTML", {

	superclass: E.Label,
	defaultUIClass: 'ui-html',
	
	setValue: function(value){
		this.el.innerHTML = value;
	},
	getValue: function(){
		return this.el.innerHTML;
	}
	
});
/**
Icon
====
图标组件。

		var icon = new E.Icon({
			container: '#icon',
			cls: 'custom-icon-cls'
		})

继承
----
- Component

 */
E.declare("Icon", {

	superclass: E.Component,
	defaultUIClass: 'ui-icon'
	
});
/**
Button
====

按钮组件。

我们可以在构造函数中定义组件的信号回调函数：
		var button = new E.Button({
			label: "click me",
			container: "#buttonContainer",
			signals: {
				click: function(){
					console.log("button is clicked");
				}
			}
		});

也可以单独对信号进行监听：
		var redButton = new E.Button({theme: "red"});
		redButton.signals.click.add(function(){
			console.log("red button is clicked");
		});

继承
----
- Component

方法
-----

- `getLabel()`
返回按钮文本

- `setLabel(value)`
设置按钮文本

 */
E.declare("Button", {

	superclass: E.Component,
	defaultUIClass: 'ui-button',

	invalidate: function(){
		var theme = this.options.theme;
		if(theme != undefined){
			E(this.el).addClass(theme);
		}
		if(this.options.label === undefined){
			this.options.label = "";
		}
		this.setLabel(this.options.label);
	},
	createSignals: function(){
		this.signals.click = new E.Signal();
	},
	defineActivable: function(){
		return this.el;
	},
	initEvents: function(){
		var self = this;
		this.on(this.el, "click", function(e){
			if(this.getEnabled()){
				this.onButtonClicked();
			}
		}, this);
	},
	onButtonClicked: function(){
		this.signals.click.dispatch();
	},
	setLabel: function(label){
		this.el.innerText = label;
	},
	getLabel: function(){
		return this.el.innerText;
	}
});
/**
NavBar
====
NavBar组件。

		var navBar = new NavBar({
			container: "#navContainer",
			signals: {
				back: function(){
					alert("back button clicked");
				}
			}
		});

继承
----
- Component

方法
-----

- `getTitle()`
获取标题文本

- `setTitle(title)`
设置标题文本

 */

E.declare("NavBar", {

	superclass: E.Component,
	defaultUIClass: 'ui-navbar',

	createChildren: function(){
		var tpl ='<div class="ui-view title"></div>' + 
					'<div class="ui-flexrow">' + 
						'<div class="ui-backbutton"></div>' + 
					'</div>' ;
		this.el.innerHTML = tpl;
	},
	invalidate: function(){
		if(this.options.title === undefined){
			this.options.title = "";
		}
		this.setTitle(this.options.title);
	},
	createSignal: function(){
		this.signals.back = new E.Signal();
	},
	initEvents: function(){
		this.on(this.el.querySelector(".ui-backbutton"), "click", function(){
			if(this.getEnabled()){
				this.signals.back.dispatch();
			}
		}, this);
	},
	setTitle: function(title){
		this.el.querySelector(".title").innerText = title;
	}
});
/**
Box
====
Box组件。它是HBox和VBox组件的基类。

继承
----
- Container

 */
E.declare("Box", {
	superclass: E.Container,
	defaultUIClass: 'ui-box'
});
/**
HBox
====
HBox组件。HBox组件中的子组件会以水平方向排列。
		
		var hbox = new E.HBox({
			childen: [
				{className:"Button", label:"Button A"},
				{className:"Button", label:"Button B"},
				{className:"Button", label:"Button C"}
			]
		});

继承
----
- Box

 */
E.declare("HBox", {

	superclass: E.Box,
	defaultUIClass: 'ui-hbox'
	
});

/**
VBox
====
VBox组件。VBox组件中的子组件会以竖直方向排列。
		
		var vbox = new E.VBox({
			childen: [
				{className:"Button", label:"Button A"},
				{className:"Button", label:"Button B"},
				{className:"Button", label:"Button C"}
			]
		});

继承
----
- Box

 */
E.declare("VBox", {
	superclass: E.Box,
	defaultUIClass: 'ui-vbox'
});

/**
Group
====
Group组件。

继承
----
- Container

 */
E.declare("Group", {

	superclass: E.Container,
	defaultUIClass: 'ui-group'

});
/**
Toggle
====
Toggle组件。

继承
----
- Component

方法
-----

- `isOn()`
判断toggle是否是打开状态

- `toggle()`
切换状态

- `setOnLabel(label)`
设置打开状态的文本

- `getOnLabel()`
获取打开状态的文本

- `setOffLabel(label)`
设置关闭状态的文本

- `getOffLabel()`
获取关闭状态的文本

- `setCloseHighlight(b)`
设置关闭状态是否高亮显示，默认不高亮显示。

- `getCloseHighlight()`
判断关闭状态是否高亮显示。

信号
----
- `change`
toggle的状态发生变化时触发。
 */
E.declare("Toggle", {

	superclass: E.Component,
	defaultUIClass: 'ui-toggle',
	_onLabel: 'ON',
	_offLabel: 'OFF',
	_on: false,
	_closeHighlight: false,

	createChildren: function(){
		var tpl = '<span class="label"></span>' +
					'<span class="label"></span>';
		this.el.innerHTML = tpl;
	},
	invalidate: function(){
		E.Toggle.superclass.prototype.invalidate.apply(this, arguments);
		if(this.options.onLabel != undefined){
			this._onLabel = this.options.onLabel;
		}
		if(this.options.offLabel != undefined){
			this._offLabel = this.options.offLabel;
		}
		if(this.options.closeHighlight != undefined){
			this.setCloseHighlight(this.options.closeHighlight);
		}
		this.setOnLabel(this._onLabel);
		this.setOffLabel(this._offLabel);
		if(this.options.on){
			this._setOn(true, true);
		}
	},
	createSignals: function(){
		this.signals.change = new E.Signal();
	},
	initEvents: function(){
		this.on(this.el, "click", function(){
			this.toggle();
		}, this);
	},
	isOn: function(){
		return this._on;
	},
	toggle: function(silence){
		if(this.getEnabled()){
			this._setOn(!this.isOn(), silence);
		}
	},
	_setOn: function(on, silence){
		if(on == this._on){
			return;
		}
		var method =  on ? "addClass" : "removeClass";
		E(this.el)[method]("on");
		this._on = on;
		if(!silence){
			this.signals.change.dispatch(this.isOn());
		}
	},
	setOnLabel: function(onLabel){
		this._onLabel = onLabel;
		this.el.querySelector("span:first-child").innerText = onLabel;
	},
	getOnLabel: function(){
		return this._onLabel;
	},
	setOffLabel: function(offLabel){
		this._offLabel = offLabel;
		this.el.querySelector("span:last-child").innerText = offLabel;
	},
	getOffLabel: function(){
		return this._offLabel;
	},
	setCloseHighlight: function(b){
		if(this._closeHighlight != b){
			this._closeHighlight = b;
			var method = b ? "addClass" : "removeClass";
			E(this.el)[method]("close-highlight");
		}
	}
	
});
/**
Input
====
输入文本框组件。
		
		//文本框
		var input = new E.Input();
		input.signals.change.add(function(value){
			console.log("文本框的值变为了:"+value);
		});
		//创建数字文本框
		var digitInput = new E.Input({type:"number",placeholder:"请输入数字"});

继承
----
- FormElement

 */
E.declare("Input", {

	superclass: E.FormElement,
	defaultUIClass: 'ui-input'
	
});
/**
TextArea
====
文本域组件。文本域组件可以让用户输入多行的文本。

继承
----
- FormElement

 */
E.declare("TextArea", {

	superclass: E.FormElement,
	defaultUITag: "textarea",
	defaultUIClass: 'ui-textarea'
	
});
/**
Checkbox
====
复选框组件。

继承
----
- FormElement

方法
----
- `setChecked(b)`
设置组件的check状态

- `getChecked()`
组件是否是check状态
 */
E.declare("Checkbox", {

	superclass: E.FormElement,
	defaultUIClass: "ui-checkbox",
	type: "checkbox",
	_checked: false,

	onFormElementChange: function(){
		this.signals.change.dispatch(this.el.checked);
	},
	
	invalidate: function(){
		E.Checkbox.superclass.prototype.invalidate.apply(this, arguments);
		this.setChecked(Boolean(this.options.checked));
	},
	setChecked: function(b){
		if(this.getChecked() != b){
			if(b){
				this.el.setAttribute("checked", "checked");
			}else{
				this.el.sremoveAttribute("checked");
			}
		}
	},
	getChecked: function(){
		return Boolean(this.el.checked);
	}
	
});
/**
Radio
====
单选框组件。

继承
----
- Checkbox

 */
E.declare("Radio", {

	superclass: E.Checkbox,
	defaultUITag: "input",
	defaultUIClass: 'ui-radio',
	type: "radio"

});
/**
Option
====
选项切换组件。

		var option = new E.Option({
				container: "#container",
				signals: {
					change: function(selectedIndex){
						alert("the option component actived at the " + selectedIndex + " option item");
					}
				}
		 });

继承
----
- ListComponent

 */

E.declare("Option", {

	superclass: E.ListComponent,
	defaultUIClass: 'ui-option',
	defaultItemClass: "ui-optionitem",
	_selectedIndex: 0,

	_onItemClicked: function(index, target){
		this.setSelectedIndex(index);
		E.Option.superclass.prototype._onItemClicked.apply(this, arguments);
	}
	
});
/**
Tab
====
选项卡组件。选项卡组件

继承
----
- Option

 */
E.declare("Tab", {

	superclass: E.Option,
	defaultUIClass: 'ui-tab',
	defaultItemClass: "ui-tabitem"
	
});
/**
ViewStack
====
可切换的视图组件。

继承
----
- ListComponent

 */
E.declare("ViewStack", {
	
	superclass: E.ListComponent,
	defaultUIClass: 'ui-viewstack',
	_selectedIndex: 0,
	
	defineActivable: function(){
		return null;
	}
	
});
/**
HRule
====
水平分割线组件。

继承
----
- Component

 */
E.declare("HRule", {

	superclass: E.Component,
	defaultUIClass: 'ui-hrule'
	
});
/**
List
====
列表组件。

继承
----
- ListComponent

 */
E.declare("List", {

	superclass: E.ListComponent,
	defaultUIClass: "ui-list",
	defaultItemClass: "ui-listitem",
	constructor: function(options){
		options = options || {};
		this.itemRenderer = new E.List.ItemRenderer(options.rendererOptions);
		E.List.superclass.prototype.constructor.apply(this, arguments);
	}
});
/**
List.ItemRenderer
====
列表组件的单元格渲染器。

 */
E.declare("List.ItemRenderer", {
		constructor: function(options){
			this.options = options || {};
		},
		createNode: function(item){
			var container = new E.Container(),
				hbox = new E.HBox({cls:"ui-listitem"}),
				hrule = new E.HRule(),
				options = this.options;

			if(E.isString(item)){
				item = {label:item}
			}
			
			var leftInterface = item.leftInterface || options.leftInterface;
			if(leftInterface){
				if(leftInterface instanceof E.Component){
					hbox.addChild(leftInterface);
				}else{
					hbox.addChild(new leftInterface(item.leftInterfaceOptions || options.leftInterfaceOptions));
				}
			}

			if(item.label){
				var vbox = new E.VBox();
				vbox.addChild({className:"Label", cls:'label', value:item.label});
				if(item.description){
					vbox.addChild(new E.Label({cls:'desc', value:item.description}));
				}
				hbox.addChild(vbox);
			}

			var rightInterface = item.rightInterface || options.rightInterface;
			if(rightInterface){
				if(rightInterface instanceof E.Component){
					hbox.addChild(rightInterface);
				}else{
					hbox.addChild(new rightInterface(item.rightInterfaceOptions || options.rightInterfaceOptions));
				}
			}

			container.addChild(hbox);
			container.addChild(hrule);
			return container;
		}
});
/**
BusyIndicator
====
忙指示器。

继承
----
Component

方法
----
- `setSize(size)`
设置忙指示器的大小，可以为S, M, L, XL, XXL

- `getSize()`
获取忙指示器的大小。
 */
E.declare("BusyIndicator", {

	superclass: E.Component,
	defaultUIClass: 'ui-busyindicator',
	_size: "L",

	invalidate: function(){
		E.BusyIndicator.superclass.prototype.invalidate.apply(this, arguments);
		this.setSize(this.options.size);
	},
	setSize: function(size){
		if(size && this._size != size){
			E(this.el).removeClass(this._size.toUpperCase());
			this._size = size;
			E(this.el).addClass(this._size.toUpperCase());
		}
	},
	getSize: function(){
		return this._size.toUpperCase();
	}
});
/**
Shim
====
遮罩组件。

继承
----
Container

方法
----
- `setHost(host)`
设置浮层所在的DOM或Container。

- `getHost()`
设置浮层所在的DOM或Container。

静态方法
----

 */
E.declare("Shim", {

	superclass: E.Container,
	defaultUIClass: "ui-shim",
	_host: null,
	_visible: false,

	invalidate: function(){
		E.Shim.superclass.prototype.invalidate.apply(this, arguments);
		this.setHost(this.options.host);
	},
	setHost: function(host){
		if(this._host == host){
			return;
		}
		if(this._host){
			if(this._host instanceof E.Container){
				this._host.removeChild(this);
			}else{
				this.el.parentNode && this.el.parentNode.removeChild(this.el);
			}
		}
		if(host instanceof E.Container){
			host.addChild(this);
			this._host = host;
		}else if(host instanceof HTMLElement){
			host.appendChild(this.el);
			this._host = host;
		}else{
			this._host = null;
		}
	},
	getHost: function(){
		return this._host;
	}
},{
	_shimMap: [],
	_getShim: function(container){
		for(var i = 0, l = this._shimMap.length; i < l; i++){
			var item = this._shimMap[i];
			if(item.host == container){
				return item.shim;
			}
		}
		return null;
	},
	_setShim: function(host, shim){
		this._removeShim(host);
		this._shimMap.push({host: host, shim: shim});
	},
	_removeShim: function(host, isByShim){
		var key = isByShim ? "shim" : "host";
		for(var i = 0, l = this._shimMap.length; i < l; i++){
			var item = this._shimMap[i];
			if(item[key] == host){
				this._shimMap.splice(i, 1);
				return;
			}
		}
	},
	show: function(host){
		if(!host){
			host = document.body;
		}
		var shim = this._getShim(host);
		if(!shim){
			shim = new E.Shim({host: host});
			this._setShim(host, shim);
		}
		shim.show();
		return shim;
	},
	hide: function(shim, destroy){
		shim.hide();
		if(destroy){
			this._removeShim(shim, true);
			shim.destroy();
		}
		return shim;
	},
	_busyIndicatorShim: null,
	_busyIndicator:null,
	showBusyIndicator: function(size){
		if(!this._busyIndicatorShim){
			this._busyIndicatorShim = new E.Shim({host: document.body, cls:'ui-popup'});
			this._busyIndicatorShim.addChild(new E.BusyIndicator());
		}
		this._busyIndicatorShim.getChildAt(0).setSize(size);
		this._busyIndicatorShim.show();
		return this._busyIndicatorShim;
	},
	hideBusyIndicator: function(destroy){
		if(this._busyIndicatorShim){
			this._busyIndicatorShim.hide();
			if(destroy){
				this._busyIndicatorShim.destroy();
				this._busyIndicatorShim = null;
			}
		}
	}
	
});
/*!
 * @description Panel组件 
 * @extend Component
 * @example
 * <pre>
 * var panel = new E.Panel({
 *		container: "#container",
 *		children: [
 *			new E.Button({label: "button1", theme:"red"}),
 *			new E.Button({label: "button2", theme:"green"}),
 *			new E.Button({label: "button3", theme:"blue"})
 *		]
 * });
 * </pre>
 *
 * @method
 */

E.declare("Panel", {

	superclass: E.Container,
	defaultUIClass: 'ui-panel',

	createChildren: function(){
		E.Panel.superclass.prototype.createChildren.apply(this, arguments);
		var tpl = '<div class="ui-title">' +
						'<div class="title"></div>' +
						'<div class="ui-title-mask"></div>' +
					'</div>' +
					'<div class="ui-panel-content ui-card ui-container">' +
					'</div>' ;
		this.el.innerHTML = tpl;
		this._childrenContainer = this.el.querySelector(".ui-panel-content");
	},
	invalidate: function(){
		E.Panel.superclass.prototype.invalidate.apply(this, arguments);
		if(this.options.title == undefined){
			this.options.title = "";
		}
		this.setTitle(this.options.title);
	},
	setTitle: function(title){
		this.el.querySelector(".ui-title .title").innerText = title;
	}
});
/**
Alert
====
Alert组件。

继承
----
Shim

方法
----
- `setHost(host)`
设置浮层所在的DOM或Container。

- `getHost()`
设置浮层所在的DOM或Container。

静态方法
----
-`show(content, title, buttonFlags, closeFunction)`
显示Alert框

		var content = "html string",
			title = "alert title",
			buttonFlags = E.Alert.OK | E.Alert.CANCEL,
			closeFunction = function(button){
				if(button == E.Alert.OK){
					console.log("你点了OK按钮");
				}else{
					console.log("你点了CANCEL按钮");
				}
			};
		E.Alert.show(content, title, buttonFlags, closeFunction);

 */
E.declare("Alert", {
	superclass: E.Shim,
	contentRenderer: null, 
	_buttonFlags: 0x01,
	_autoClose: true,
	_content: null,
	defaultUIClass: "ui-alert ui-shim ui-popup",

	createSignals: function(){
		E.Alert.superclass.prototype.createSignals.apply(this, arguments);
		this.signals.ok = new E.Signal();
		this.signals.cancel = new E.Signal();
		this.signals.close = new E.Signal()
	},
	invalidate: function(){
		E.Alert.superclass.prototype.invalidate.apply(this, arguments);
		if(this.options.autoClose != undefined){
			this._autoClose = this.options.autoClose;
		}
		this._buildAlert();
	},
	_buildAlert: function(){
		var contentBox = this.contentBox = new E.Container({cls:'ui-alert-content'}),
			buttonBox = this.buttonBox = new E.HBox({cls:'ui-alert-buttons'}),
			flag = this.options.buttonFlags || this._buttonFlags;

		if(flag & E.Alert.OK){
			var okButton = this.okButton = new E.Button({label: this.options.okLabel || E.Alert.OK_LABEL});
			okButton.signals.click.add(this._onOkButtonClicked, this);
			buttonBox.addChild(okButton);
		}
		if(flag & E.Alert.CANCEL){
			var cancelButton = this.cancelButton = new E.Button({label: this.options.cancelLabel || E.Alert.CANCEL_LABEL});
			cancelButton.signals.click.add(this._onCancelButtonClicked, this);
			buttonBox.addChild(cancelButton);
		}
		var panel = this.panel = new E.Panel({
			title: (this.options.title || E.Alert.DEFAULT_TITLE),
			children:[contentBox, buttonBox]
		})
		this.addChild(panel);
		this.setContent(this.options.content);
	},
	setContent: function(content){
		if(content == this._content){
			return;
		}
		this._content = content;
		while(this.contentBox.children().length){
			this.contentBox.removeChildAt(0);
		}
		if(content instanceof E.Component){
			this.contentBox.addChild(content);
		}else if(content && E.isString(content)){
			this.contentBox.addChild(new E.HTML({value: content}));
		}
	},
	getContent: function(){
		return this._content;
	},
	setTitle: function(){
		this.panel.setTitle();
	},
	getTitle: function(){
		return this.panel.getTitle();
	},
	_onOkButtonClicked: function(){
		if(this._autoClose){
			this.close();
			this.signals.close.dispatch(E.Alert.OK);
		}
		this.signals.ok.dispatch();
	},
	_onCancelButtonClicked: function(){
		if(this._autoClose){
			this.close();
			this.signals.close.dispatch(E.Alert.CANCEL);
		}
		this.signals.cancel.dispatch();
	},
	show: function(){
		this.setHost(document.body);
	},
	close: function(){
		this.setHost(null);
	},
	destroy: function(){
		if(this.okButton){
			this.okButton.destroy();
		}
		if(this.cancelButton){
			this.cancelButton.destroy();
		}
		E.Alert.superclass.prototype.destroy.apply(this, arguments);
	}
},{
	OK: 0x01,
	CANCEL: 0x02,
	OK_LABEL: "确定",
	CANCEL_LABEL: "取消", 
	DEFAULT_TITLE: "提示",
	show: function(content, title, buttonFlags, closeFunction){
		var alert = new E.Alert({
			content: content,
			title: title,
			buttonFlags: buttonFlags
		});
		if(E.isFunction(closeFunction)){
			alert.signals.close.add(closeFunction);
		}
		alert.show();
		return alert;
	}
});
