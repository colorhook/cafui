/**
Input
====
输入文本框组件。
		
		//文本框
		var input = new E.Input();
		input.signals.change.add(function(value){
			console.log("文本框的值变为了:"+value);
		});
		//创建数字文本框
		var digitInput = new E.Input({type:"number",placeholder:"请输入数字"});

继承
----
- FormElement

 */
E.declare("Input", {

	superclass: E.FormElement,
	defaultUIClass: 'e-input'
	
});