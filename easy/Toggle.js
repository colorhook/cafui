/**
Toggle
====
开关组件。开关组件用于在两种状态下进行切换。比如网络的打开或关闭。

		var toggle = new E.Toggle({
			container:"#toggle-dom",
			onLabel: "开",
			offLabel: "关"
		});

组件的关闭状态默认是灰色，有些时候，需要关闭状态也保持高亮，比如上午和下午的切换。这时候需要保证closeHighlight这个配置项为true。

		var toggle = new E.Toggle({
			container:"#toggle-dom",
			onLabel: "上午",
			offLabel: "下午",
			closeHighlight: true
		});

开关组件有个名为change的信号，我们可以通过该信号处理组件的变更。

		toggle.signals.change.add(function(isOn){
			var state = isOn ? "打开" : "关闭";
			console.log("开关现在是"+state+"状态");
		});

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
	defaultUIClass: 'e-toggle',
	_onLabel: 'ON',
	_offLabel: 'OFF',
	_on: false,
	_closeHighlight: false,
	_closeHighlightClass: "e-close-highlight",

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
			E(this.el)[method](this._closeHighlightClass);
		}
	}
	
});