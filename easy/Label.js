/**
Label
====
文本组件。文本组件表示一段文本。
		
		var label = new E.Label({
			container: "#label-dom",
			value: "this is a label"
		});

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
	defaultUIClass: 'e-label',
	

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