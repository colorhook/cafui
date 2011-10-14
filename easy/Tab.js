/**
Tab
====
选项卡组件。选项卡组件继承自Option，用法跟Option一致，只是样式略有不同。

		var tab = new E.Tab({
			container: "#tab-dom",
			data: ["好友", "最近", "我的群"]
		});
		tab.signals.change.add(function(selectedIndex){
			E.Alert.show("选项卡的第"+ selectedIndex + "个选项被选中了");
		});

继承
----
- Option

 */
E.declare("Tab", {

	superclass: E.Option,
	defaultUIClass: 'e-tab',
	defaultItemClass: "e-tabitem"
	
});