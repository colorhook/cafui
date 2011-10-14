/**
Checkbox
====
复选框组件。
	
		var checkbox = new E.Checkbox({
			container:"#checkbox-dom",
			checked: true
		});
		checkbox.signals.change.add(function(isChecked){
			console.log("复选框的状态是：" + (isChecked ? "选中" : "未选中");
		});

继承
----
- FormElement

方法
----
- `setChecked(b)`
设置组件的check状态
- `getChecked()`
组件是否是check状态
 */
E.declare("Checkbox", {

	superclass: E.FormElement,
	defaultUIClass: "e-checkbox",
	type: "checkbox",
	_checked: false,

	onFormElementChange: function(){
		this.signals.change.dispatch(this.el.checked);
	},
	
	invalidate: function(){
		E.Checkbox.superclass.prototype.invalidate.apply(this, arguments);
		this.setChecked(Boolean(this.options.checked));
	},
	setChecked: function(b){
		if(this.getChecked() != b){
			if(b){
				this.el.setAttribute("checked", "checked");
			}else{
				this.el.sremoveAttribute("checked");
			}
		}
	},
	getChecked: function(){
		return Boolean(this.el.checked);
	}
	
});