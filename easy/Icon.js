/**
Icon
====
图标组件。图标组件用来自定义图标，使用图标组件时，需要自定义图标的class，然后根据class在CSS中定义图标的样式。

		var icon = new E.Icon({
			container: '#icon',
			cls: 'custom-icon-cls'
		})

继承
----
- Component

 */
E.declare("Icon", {

	superclass: E.Component,
	defaultUIClass: 'e-icon'
	
});