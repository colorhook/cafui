/**
VBox
====
VBox组件。VBox组件中的子组件会以竖直方向排列。
		
		var vbox = new E.VBox({
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
E.declare("VBox", {
	superclass: E.Box,
	defaultUIClass: 'e-vbox'
});
