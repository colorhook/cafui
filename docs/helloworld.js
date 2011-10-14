//创建一个顶级容器
var view = new E.Container({container:"#container"});

//创建一个导航条
var navbar = new E.NavBar({title: "Hello World"});
view.addChild(navbar);

//创建一个选项卡
var tab = new E.Tab({data: ["好友", "最近", "我的群"]});
view.addChild(tab);

//创建可切换试图组件
var viewstack = new E.ViewStack();
viewstack.addItem(new E.Container({
	  children:[
		new E.Label({value: "这个是好友页面"})
	  ]
}));
viewstack.addItem(new E.Container({
	  children:[
		new E.Label({value: "这个是最近页"})
	  ]
}));
viewstack.addItem(new E.Container({
	  children:[
		new E.Label({value: "这个是我的群"})
	  ]
}));
view.addChild(viewstack);

//绑定选项卡和可切换试图
tab.signals.change.add(function(selectedIndex){
	viewstack.setSelectedIndex(selectedIndex);
});

//弹出一个提示框
E.Alert.show("你成功地创建了一个应用！", "恭喜你");