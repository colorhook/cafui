/**
ListComponent
====
列表组件基类。列表组件是List, Option, Tab, ViewStack等组件的基类。

继承
----
- Component

方法
-----

- `setData(data)`
设置列表的数据
- `getData()`
获取列表的数据
- `addItem(item)`
添加一个列表项
- `addItemAt(item, index)`
从指定位置添加一个列表项
- `getItemAt(index)`
从指定位置获取列表的数据
- `removeItem(item)`
移除某个列表项
- `removeItemAt(index)`
根据索引移除列表项
- `getSelectedIndex()`
获取当前选中的列表索引
- `setSelectedIndex(index)`
设置当前选中的列表索引
- `getSelectedItem()`
获取当前选中的列表数据项
- `setSelectedItem(item)`
设置当前选中的列表数据项

信号
----
- `change`
选中的列表索引发生改变了。

- `itemClick`
列表项被点击了。

 */


E.declare("ListComponent", {
	superclass: E.Component,
	_items: null,
	_nodes: null,
	_selectedIndex: -1,
	itemRenderer: null,
	defaultItemTag: "div",
	defaultUIClass: "e-listcomponent",
	defaultItemClass: "e-item",

	createChildren: function(){
		E.ListComponent.superclass.prototype.createChildren.apply(this, arguments);
		this._itemContainer = this.el;
	},
	invalidate: function(){
		E.ListComponent.superclass.prototype.invalidate.apply(this, arguments);
		this.setData(this.options.data);
		if(this._selectedIndex != -1){
			this.setSelectedIndex(this._selectedIndex, true, true);
		}
		if(E.isNumber(this.options.selectedIndex)){
			this.setSelectedIndex(this.options.selectedIndex, true);
		}
	},
	createSignals: function(){
		this.signals.change = new E.Signal();
		this.signals.itemClick = new E.Signal();
	},
	defineActivable: function(){
		return "."+this.defaultItemClass;
	},
	initEvents: function(){
		var itemClass =  "."+this.defaultItemClass;
		this.delegate(this.el, itemClass, "click", function(e){
			var nodeList = Array.prototype.slice.call(this.el.querySelectorAll(itemClass), 0);
			this._onItemClicked(E.Array.indexOf(nodeList, e.currentTarget), e.currentTarget);
		}, this);
	},
	_onItemClicked: function(index, target){
		this.signals.itemClick.dispatch(index, this.getItemAt(index), target);
	},
	//////////////////////////////
	// public 
	//////////////////////////////
	setData: function(data){
		this.destroyList();
		if(data == null){
			data = [];
		}else if(!E.isArray(data)){
			data = [data];
		}
		this._items = [];
		this._nodes = [];
		this.createList(data);
	},
	getData: function(){
		return this._items;
	},
	addItem: function(item){
		return this.addItemAt(item, this._items.length);
	},
	addItemAt: function(item, index){
		if(isNaN(index) || index > this._items.length){
			index = this._items.length;
		}else if(index < 0){
			index = 0;
		}
		var node = this.createNode(item);
		if(index == this._items.length){
			this._itemContainer.appendChild(node);
		}else{
			var relativeNode = this._nodes[index];
			this._itemContainer.insertBefore(node, relativeNode);
		}
		this._addItemAndNode(item, node, index);
		if(this._items.length == 1){
			this.setSelectedIndex(this._selectedIndex, true, true);
		}
	},
	getItemAt: function(index){
		return this._items[index];
	},
	removeItem: function(item){
		return this.removeItemAt(E.Array.indexOf(this._items, item));
	},
	removeItemAt: function(index){
		if(index<0 || index>=this._items.length){
			return null;
		}
		var dom = this._nodes[index];
		try{
			dom && dom.parentNode.removeChild(dom);
		}catch(err){}
		this._removeItemAtNodeByIndex(index);
		return this._items[index];
	},
	setSelectedIndex: function(index, silence, forceChange){
		if(!this._items || this._items.length == 0){
			return;
		}
		if(this._selectedIndex != index || forceChange){
			var node = this._nodes[this._selectedIndex];
			node && E(node).removeClass("selected");
			this._selectedIndex = index;
			node = this._nodes[this._selectedIndex];
			node && E(node).addClass("selected");
			if(!silence){
				this.onSelectedIndexChange(index, this.getSelectedItem());
			}
		}
	},
	getSelectedIndex: function(){
		return this._selectedIndex;
	},
	setSelectedItem: function(item, silence){
		if(this.getSelectedItem() != item){
			var index = E.Array.indexOf(this._items, item);
			this.setSelectedIndex(index, silence)
		}
	},
	getSelectedItem: function(){
		return this._items[this._selectedIndex];
	},
	getCellAt: function(index){
		return this._nodes[index]
	},
	////////////////////////////
	// protected
	////////////////////////////
	_addItemAndNode: function(item, node, index){
		this._nodes.splice(index, 0, node);
		this._items.splice(index, 0, item);
	},
	_removeItemAtNodeByIndex: function(index){
		if(index >=0 && index <= this._nodes.length){
			this._nodes.splice(index, 1);
			this._items.splice(index, 1);
		}
	},
	createList: function(data){
		var self = this;
		E.Array.each(data, function(item){
			self.addItem(item);
		});
	},
	destroyList: function(){
		if(!this._items){
			return;
		}
		while(this._items.length){
			this.removeItemAt(0);
		}
	},
	
	createNode: function(item){
		var renderer;
		if(this.itemRenderer && E.isFunction(this.itemRenderer.createNode)){
			renderer = this.itemRenderer.createNode(item);
			if(renderer instanceof HTMLElement){
				return renderer;
			}else if(renderer instanceof E.Component){
				return renderer.el;
			}
		}
		if(item instanceof E.Component){
			return item.el;
		}
		var node = document.createElement(this.defaultItemTag);
		node.className = this.defaultItemClass;
		if(E.isString(renderer)){
			node.innerHTML = renderer;
		}else if(E.isString(item)){
			node.innerText = item;
		}else if(item && !E.isUndefined(item.label)){
			node.innerText = item.label;
		}else{
			node.innerText = String(item);
		}
		return node;
	},
	onSelectedIndexChange: function(index, item, oldItem){
		this.signals.change.dispatch(index, item, oldItem);
	},
	destroy: function(){
		this.destroyList();
		E.ListComponent.superclass.prototype.destroy.apply(this, arguments);
	}
});