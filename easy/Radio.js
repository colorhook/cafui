/**
Radio
====
单选框组件。

		var radio = new E.Radio({
			container:"#radio-dom"
		});

继承
----
- Checkbox

 */

E.declare("Radio", {

	superclass: E.Checkbox,
	defaultUITag: "input",
	defaultUIClass: 'e-radio',
	type: "radio"

});