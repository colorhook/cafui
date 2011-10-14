/**
Group
====
Group组件。这个组件可以用来做一个表单的容器，内面的表单会竖直排列。

		var group = new E.Group({container:"#group-dom"});
		group.addChild(new E.Input());
		group.addChild(new E.Input({type:"password"}));
		group.addChild(new E.HBox{
			children: [
				new E.Label("复选框："),
				new E.Checkbox()
			]
		});
		group.addChild(new E.HBox{
			children: [
				new E.Label("单选框："),
				new E.Radio()
			]
		});
		group.addChild(new E.TextArea());

继承
----
- Container

 */
E.declare("Group", {

	superclass: E.Container,
	defaultUIClass: 'e-group'

});