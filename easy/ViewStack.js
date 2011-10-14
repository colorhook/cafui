/**
ViewStack
====
可切换的视图组件。

		var viewStack = new E.ViewStack({
			data: [
				new E.Label("第1张视图"),
				new E.Label("第2张视图"),
				new E.Label("第3张视图")
			]
		});
		//切换到第3张视图
		viewStack.setSelectedIndex(2);

继承
----
- ListComponent

 */

E.declare("ViewStack", {
	
	superclass: E.ListComponent,
	defaultUIClass: 'e-viewstack',
	_selectedIndex: 0,
	
	defineActivable: function(){
		return null;
	}
	
});