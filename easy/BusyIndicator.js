/**
BusyIndicator
====
忙指示器。忙指示器可以用来告知用户应用程序正在做较为耗时的工作，比如发出了一个HTTP请求正在等待数据响应。

		var indicator = new BusyIndicator({
			container:"#indicator-dom",
			size: "M"
		});

继承
----
Component

方法
----
- `setSize(size)`
设置忙指示器的大小，可以为S, M, L, XL, XXL。默认为L
- `getSize()`
获取忙指示器的大小。
 */
E.declare("BusyIndicator", {

	superclass: E.Component,
	defaultUIClass: 'e-busyindicator',
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