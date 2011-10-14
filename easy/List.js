/**
List
====
列表组件。列表组件可以纯粹的是展现一些数据，也可以相应用户的点击事件。列表组件的单元格可以自定义，可以自定义左右图标。如果想要更复杂的单元格，可以设计自己的单元格规则。
		
		var list = new E.List({
			container: "#list-dom"
		});
		var data = ["鲁菜","川菜","粤菜","苏菜","闽菜","浙菜","湘菜","徽菜",
			"京菜","津菜","辽菜","豫菜","鄂菜","赣菜","吉菜",
			"黔菜","滇菜","客家菜","清真菜","台湾菜"];
		list.setData(data);
		//监听信号
		list.signals.itemClick.add(function(index, item){
			E.Alert.show("你选择了："+item);
		});

我们可以通过rendererOptions配置项来定制列表组件的单元格，比如列表左边有头像，列表中间有标题和详情两行文字等等。下面的例子可以使得列表右部有一个统一的图标：

		var list = new E.List({
			container: "#list-dom",
			rendererOptions: {
				rightInterface: E.Icon,
				rightInterfaceOptions: {
					cls: 'e-icon-expando'
				}
			}
		});

继承
------
- ListComponent

 */

E.declare("List", {

	superclass: E.ListComponent,
	defaultUIClass: "e-list",
	defaultItemClass: "e-listitem",
	constructor: function(options){
		options = options || {};
		this.itemRenderer = new E.List.ItemRenderer(options.rendererOptions);
		E.List.superclass.prototype.constructor.apply(this, arguments);
	}
});

E.declare("List.ItemRenderer", {
		constructor: function(options){
			this.options = options || {};
		},
		createNode: function(item){
			var container = new E.Container(),
				hbox = new E.HBox({cls:"e-listitem"}),
				hrule = new E.HRule(),
				options = this.options;

			if(E.isString(item)){
				item = {label:item}
			}
			
			var leftInterface = item.leftInterface || options.leftInterface;
			if(leftInterface){
				if(leftInterface instanceof E.Component){
					hbox.addChild(leftInterface);
				}else{
					hbox.addChild(new leftInterface(item.leftInterfaceOptions || options.leftInterfaceOptions));
				}
			}

			if(item.label){
				var vbox = new E.VBox();
				vbox.addChild({className:"Label", cls:'label', value:item.label});
				if(item.description){
					vbox.addChild(new E.Label({cls:'desc', value:item.description}));
				}
				hbox.addChild(vbox);
			}

			var rightInterface = item.rightInterface || options.rightInterface;
			if(rightInterface){
				if(rightInterface instanceof E.Component){
					hbox.addChild(rightInterface);
				}else{
					hbox.addChild(new rightInterface(item.rightInterfaceOptions || options.rightInterfaceOptions));
				}
			}

			container.addChild(hbox);
			container.addChild(hrule);
			return container;
		}
});