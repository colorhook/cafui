/**
Signal
====

信号(Signal)是观察者模式的一种实现。用于在应用程序中发布消息。在JavaScript中使用信号，可以让任何一个对象都可以简易的发布消息。

		var target = {};
		target.customSignal = new E.Signal();
		//监听信号
		target.customSignal.add(function(a, b, c){
			//处理信号
		});
		//发出信号，信号可以携带任意类型，任意多个参数。
		target.customSignal.dispatch(1, 2, 3);

方法
-----

- `add(listener, scope, priority)`
为信号添加监听器
		
			var signal = new E.Signal();
			signal.add(function(msg){
				console.log("default handler");
			});
			signal.dispatch();
- `addOnce(listener, scope, priority)`
为信号添加一次性监听器，监听函数执行后能自动解绑监听器

			var signal = new E.Signal();
			signal.addOnce(function(msg){
				console.log("default handler");
			});
			signal.dispatch(); //有输出
			signal.dispatch(); //没有输出
- `remove(listener)`
为信号移除监听器

			var signal = new E.Signal(),
				handler = function(){
					console.log("default handler");
					signal.remove(handler);
				};
			signal.add(handler);
			signal.dispatch(); //有输出
			signal.dispatch(); //没有输出
- `removeAll()`
移除信号的所有监听器
			
			var signal = new E.Signal(),
				handler = function(){
					console.log("default handler");
				};
			signal.add(handler);
			signal.add(function(){
				console.log("another handler");
				signal.removeAll();
			});
			signal.dispatch(); //有输出
			signal.dispatch(); //没有输出
- `dispatch(...)`
派发信号
			
			var signal = new E.Signal(),
				handler = function(a, b){
					console.log(a + " + " + b + " = " + (a+b));
				};
			signal.add(handler);
			signal.dispatch(3, 4); //输出：3 + 4 = 7
- `halt()`
终止信号的传播

			var signal = new E.Signal(),
				handler = function(msg){
					signal.halt();
					console.log("default handler");
				};
			signal.add(handler);
			signal.add(function(){
				console.log("another handler");
			});
			signal.dispatch(); //输出：default handler

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