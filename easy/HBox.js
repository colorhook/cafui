/**
HBox
====
HBox组件。HBox组件中的子组件会以水平方向排列。
		
		var hbox = new E.HBox({
			childen: [
				{className:"Button", label:"Button A"},
				{className:"Button", label:"Button B"},
				{className:"Button", label:"Button C"}
			]
		});

继承
----
- Box

 */
E.declare("HBox", {

	superclass: E.Box,
	defaultUIClass: 'e-hbox'
	
});
