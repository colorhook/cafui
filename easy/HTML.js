/**
HTML
====
HTML文本组件。HTML文本组件继承自Label，它支持动态创建HTML内容。

		var html = new E.HTML({
			container: "#html-dom",
			value: "<b>html string</b>
		});

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
	defaultUIClass: 'e-html',
	
	setValue: function(value){
		this.el.innerHTML = value;
	},
	getValue: function(){
		return this.el.innerHTML;
	}
	
});