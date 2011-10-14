/**
Shim
====
半透明遮罩组件。
	
		//创建满屏的半透明黑色遮罩。
		var shim = new E.Shim({
			host: document.body
		})

		//在某个区域显示遮罩
		var shim2 = new E.Shim();
		shim2.setHost(document.getElementById("shim-dom"));

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
- `show(host)`
在指定容器中显示一个黑色遮罩，默认是满屏遮罩。

			E.Shim.show();

- `hide()`
隐藏遮罩。

			E.Shim.hide();

- `showBusyIndicator()`
显示忙指示器。
		
			E.Shim.showBusyIndicator();

- `hideBusyIndicator()`
隐藏忙指示器。
		
			E.Shim.hideBusyIndicator();


 */
E.declare("Shim", {

	superclass: E.Container,
	defaultUIClass: "e-shim",
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
			this._busyIndicatorShim = new E.Shim({host: document.body, cls:'e-popup'});
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