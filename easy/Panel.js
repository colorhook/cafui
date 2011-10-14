/**
Panel
====
面板组件。面板组件有一个标题区和一个内容区。可以动态的增减内容区的元素。

		var panel = new E.Panel({
			container: "#container",
			title: "Panel Title",
			children: [
				new E.Button({label: "button1", theme:"red"}),
				new E.Button({label: "button2", theme:"green"}),
				new E.Button({label: "button3", theme:"blue"})
			]
		});
		//移除第一个子组件
		panel.removeChildAt(0);
		//添加一个子组件
		panel.addChild(new E.BusyIndicator());

继承
----
Container

方法
----
- `setTitle(title)`
设置面板的标题。
- `getTitlet()`
获取面板的标题
- `setHTMLTitle(title)`
设置面板的HTML标题。
- `getHTMLTitlet()`
获取面板的HTML标题
 */
E.declare("Panel", {

	superclass: E.Container,
	defaultUIClass: 'e-panel',
	createChildren: function(){
		E.Panel.superclass.prototype.createChildren.apply(this, arguments);
		var tpl = '<div class="e-title">' +
						'<div class="title"></div>' +
						'<div class="e-title-mask"></div>' +
					'</div>' +
					'<div class="e-panel-content e-card e-container">' +
					'</div>' ;
		this.el.innerHTML = tpl;
		this._childrenContainer = this.el.querySelector(".e-panel-content");
	},
	invalidate: function(){
		E.Panel.superclass.prototype.invalidate.apply(this, arguments);
		if(this.options.title == undefined){
			this.options.title = "";
		}
		this.setTitle(this.options.title);
	},
	setTitle: function(title){
		this.el.querySelector(".e-title .title").innerText = title;
	},
	getTitle: function(){
		return this.el.querySelector(".e-title .title").innerText;
	},
	setHTMLTitle: function(title){
		this.el.querySelector(".e-title .title").innerHTML = title;
	},
	getHTMLTitle: function(){
		return this.el.querySelector(".e-title .title").innerHTML;
	}
});