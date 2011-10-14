/**
Option
====
选项切换组件。

		var option = new E.Option({
				container: "#option-dom",
				signals: {
					change: function(selectedIndex){
						E.Alert.show("第" + selectedIndex + "个选项被激活了");
					}
				}
		 });

继承
----
- ListComponent

 */

E.declare("Option", {

	superclass: E.ListComponent,
	defaultUIClass: 'e-option',
	defaultItemClass: "e-optionitem",
	_selectedIndex: 0,

	_onItemClicked: function(index, target){
		this.setSelectedIndex(index);
		E.Option.superclass.prototype._onItemClicked.apply(this, arguments);
	}
	
});