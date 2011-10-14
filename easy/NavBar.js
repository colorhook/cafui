/**
NavBar
====
NavBar组件。

		var navBar = new NavBar({
			container: "#navContainer",
			title: "Caf UI"
		});

继承
----
- Component

方法
-----
- `getTitle()`
获取标题文本
- `setTitle(title)`
设置标题文本

 */

E.declare("NavBar", {

	superclass: E.Component,
	defaultUIClass: 'e-navbar',

	createChildren: function(){
		var tpl ='<div class="e-view title"></div>' + 
					'<div class="e-flexrow">' + 
						'<div class="e-backbutton"></div>' + 
					'</div>' ;
		this.el.innerHTML = tpl;
	},
	invalidate: function(){
		if(this.options.title === undefined){
			this.options.title = "";
		}
		this.setTitle(this.options.title);
	},
	createSignal: function(){
		this.signals.back = new E.Signal();
	},
	initEvents: function(){
		this.on(this.el.querySelector(".e-backbutton"), "click", function(){
			if(this.getEnabled()){
				this.signals.back.dispatch();
			}
		}, this);
	},
	setTitle: function(title){
		this.el.querySelector(".title").innerText = title;
	},
	getTitle: function(){
		return this.el.querySelector(".title").innerText;
	}
});