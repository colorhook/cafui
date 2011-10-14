/**
Container
====
容器组件的基类。容器组件可以包含其它组件，也可以动态移除组件。

		var container = new E.Container({
			container: "#container",
			children: [
				new E.Button({label: "button1", theme:"red"}),
				new E.Button({label: "button2", theme:"green"}),
				new E.Button({label: "button3", theme:"blue"})
			]
		});

继承
----
- Component

方法
-----
- `addChild(child)`
添加组件到容器
- `addChildAt(child, index)`
添加组件到容器的指定位置
- `removeChild(child)`
从容器中移除组件
- `removeChildAt(index)`
从容器指定位置移除组件
- `getChildAt(index)`
获取指定位置的组件
- `hasChild(child)`
是否包含某个组件
- `children()`
返回容器中的组件列表

 */
E.declare("Container", {

	superclass: E.Component,
	defaultUIClass: 'e-container',

	createChildren: function(){
		this._children = [];
		this._childrenContainer = this.el;
	},

	invalidate: function(){
		var self = this,
			children = this.options.children;
		if(E.isArray(children)){
			E.Array.each(children, function(item){
				self.addChild(item);
			});
		}
	},
	addChild: function(child){
		return this.addChildAt(child);
	},
	addChildAt: function(child, index){
		if(!(child instanceof E.Component) && E.isFunction(E[child.className])){
			return this.addChildAt(new E[child.className](child), index);
		}
		if(isNaN(index) || index > this._children.length){
			index = this._children.length;
		}else if(index < 0){
			index = 0;
		}
		var parent = child.getParent();
		parent && parent.removeChild(child);
		child._parent = this;
		this._addChild(child, index);
		this._children.splice(index, 0, child);
		return child;
	},
	_addChild: function(child, index){
		if(index >= this._children.length){
			this._childrenContainer.appendChild(child.el);
		}else{
			this._childrenContainer.insertBefore(child.el, this.getChildAt(index).el);
		}
	},
	getChildAt: function(index){
		return this._children[index];
	},
	removeChild: function(child){
		if(!this.hasChild(child)){
			return null;
		}
		E.Array.remove(this._children, child);
		child._parent = null;
		this._removeChild(child);
		return child;
	},
	removeChildAt: function(index){
		var child = this.getChildAt(index);
		if(child){
			return this.removeChild(child);
		}
		return null;
	},
	_removeChild: function(child){
		try{
			child.el.parentNode.removeChild(child.el);
		}catch(e){}
	},
	hasChild: function(child){
		return child.getParent() == this;
	},
	children: function(){
		return this._children;
	}
});