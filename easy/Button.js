/**
Button
====
按钮组件。我们可以在构造函数中定义组件的信号回调函数：

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
	defaultUIClass: 'e-button',

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