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
- `getParent()`
返回组件所在的容器。
- `setFocus()`
设置改组件为focus状态。
- `destroy()`
销毁组件。
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
	
	defaultUIClass: 'e-component',
	defaultUITag: 'div',
	
	constructor: function(options){
		this.utils = E.Component.Utils;
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
			this.utils.addToActiveList(this.el, aList); 
		}else if(aList instanceof NodeList){
			aList = Array.prototype.slice.call(aList, 0);
			this._autoBindActivable(aList);
		}else if(E.isArray(aList)){
			E.Array.each(aList, function(item){
				self._autoBindActivable(item);
			});
		}else{
			this.utils.addToActiveList(aList);
		}
	},
	_autoUnbindActivable: function(){
		var self = this,
			aList = this.defineActivable();
		if(aList == null){
			return;
		}else if(E.isString(aList)){
			this.utils.removeFromActiveList(this.el, aList); 
		}else if(E.isArray(aList)){
			E.Array.each(aList, function(item){
				self._unbindActivable(item);
			});
		}else{
			this.utils.removeFromActiveList(aList);
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
	getParent: function(){
		return this._parent;
	},
	on: function(){
		this.utils.on.apply(this.utils, arguments);
	},
	delegate: function(){
		this.utils.delegate.apply(this.utils, arguments);
	},
	detach: function(){
		this.utils.detach.apply(this.utils, arguments);
	},
	setFocus: function(el){
		if(el === undefined){
			el = this.el;
		}
		if(el instanceof E.Component){
			el = el.el;
		}
		this.utils.setFocus(el);
	}
	

}, {
	Utils: (function(){
		
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
						var clone = {__proto__: e, currentTarget: item};
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