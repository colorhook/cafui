/**
TextArea
====
文本域组件。文本域组件可以让用户输入多行的文本。

		var textArea = new E.TextArea({
			container: "#textarea-dom",
			placeholder: "请输入详情"
		});

继承
----
- FormElement

 */
E.declare("TextArea", {

	superclass: E.FormElement,
	defaultUITag: "textarea",
	defaultUIClass: 'e-textarea'
	
});