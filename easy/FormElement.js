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
获取表单组件的值
- `setValue(value)`
设置表单组件的值
- `getPlaceholder()`
获取表单组件的placeholder
- `setPlaceholder(value)`
设置表单组件的placeholder

信号
----
- `change`
表单数据发生改变时触发。

 */
E.declare("FormElement", {

	superclass: E.Component,
	defaultUITag: "input",
	defaultUIClass: 'e-form',
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
		if(this.options.placeholder){
			this.setPlaceholder(this.options.placeholder);
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