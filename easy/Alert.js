/**
Alert
====
提示组件。Alert用来弹出警告框或者提示框。默认Alert框只显示一个按钮，我们可以配置buttonFlags让Alert框显示两个按钮。

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

继承
----
Shim

方法
----
- `show()`
显示Alert框。
- `hide()`
关闭Alert框。
- `setHost(host)`
设置浮层所在的DOM或Container。
- `getHost()`
设置浮层所在的DOM或Container。

静态方法
----
- `show(content, title, buttonFlags, closeFunction)`
显示Alert框

	    - content 显示的内容，可以是HTML字符串，Component示例。
	    - title 显示的标题，字符串类型。
	    - buttonFlags  显示的按钮，可以是Alert.OK, Alert.CANCEL, 或者组合在一起。
	    - closeFunction 关闭后的处理函数。

<span></span>

		E.Alert.show("看文档要仔细哦~");
 */

E.declare("Alert", {
	superclass: E.Shim,
	contentRenderer: null, 
	_buttonFlags: 0x01,
	_autoClose: true,
	_content: null,
	defaultUIClass: "e-alert e-shim e-popup",

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
		var contentBox = this.contentBox = new E.Container({cls:'e-alert-content'}),
			buttonBox = this.buttonBox = new E.HBox({cls:'e-alert-buttons'}),
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
	hide: function(){
		this.close();
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