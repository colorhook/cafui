/**
E
====

全局函数和对象，用于查找和修改DOM元素。

		var nodeList = E("#container .item");
		nodeList.addClass("focus").show();


方法
--------
- `css(name, value)`
设置或获取DOM元素的样式。
		
			var el = E("#el");
			console.log(el.css("background-color")); //获取背景颜色
			el.css("background-color", "red"); //设置背景颜色
			el.css({padding: '10px 20px'}); //通过hash对象设置元素的样式
- `hide()`
隐藏元素。

			var el = E("#el");
			el.hide(); //隐藏元素
- `show()`
显示元素。
		
			var el = E("#el");
			el.hide().show(); //显示元素
- `item(index)`
在查找到的NodeList中获得第N个DOM元素。

			var nodeList = E("a");
			console.log(nodeList.item(0)); //获取第一个超链接
- `index()`
获得元素在NodeList中的索引。
		
			var nodeList = E("a"),
				anchor = nodeList.item(0);
			console.log(anchor.index());
- `addClass(className)`
为DOM元素添加css class。
		
			var el = E("#el");
			el.addClass("active"); //添加css类
- `removeClass(className)`
为DOM元素移除css class。

			var el = E("#el");
			el.addClass("active").removeClass("active"); //移除css类
- `hasClass(className)`
判断DOM元素有css class。

			var el = E("#el");
			console.log(el.hasClass("active");
- `get(name)`
获取DOM元素的属性。
		
			var el = E("#myInput");
			console.log(el.get("value")); //获得input的值
- `set(name, value)`
设置DOM元素的属性。
		
			var el = E("#myInput");
			el.set("value", "default value"); //设置input的值
- `getAttribute(name)`
获取DOM元素的attribute值。

			var el = E("#image");
			console.log(el.getAttribute("src"));
- `setAttribute(name, value)`
设置DOM元素的attribute值。

			var el = E("#image");
			el.setAttribute("src", "new src"));


静态属性和方法
--------
- `guid()`
生成GUID

			var guid = E.guid();
			console.log(guid);
- `mix(receiver, supplier, overwrite, whitelist, mode, merge)`
合并两个对象。
    * receiver 合并的目标对象。
    * supplier 合并的供给对象。
    * overwrite 布尔值，如果目标对象上已经存在某个属性，是否覆盖成供给对象上对应属性的值。
    * whitelist 合并白名单，合并过程中，如果指定了此参数，则至于哦在此名单内的属性会被合并。
    * mode 合并模式，值可以为0,1,2,3,4。默认是0。
	        * 当mode为0时，合并supplier到receiver上；
		    * 当mode为1,时，合并supplier的原型链到receiver的原型链上；
		    * 当mode为2时，既合并supplier到receiver上，又合并supplier的原型链到receiver的原型链上；
		    * 当mode为3时，合并supplier的原型链到receiver上；
		    * 为mode为4时，合并supplier到receiver的原型链上。
    * merge 布尔值，默认false，如果改参数为true，在合并过程中，则供给对象类型为Array或Object的属性会合并到目标对象对应的属性上。如果overwrite为true，则该参数无意义。
<span></span>

				var a = {a: 1}, b = {b: 2};
				console.log(E.mix(a, b)); // {a: 1, b: 2}
	
- `merge(...)`
合并多个对象。
	
			var a = {a:1}, b = {b:2}, c = {c:3};
			var merged = E.merge(a, b, c);
			console.log(merged); // {a: 1, b: 2, c: 3}
- `namespace(ns)`
生成命名空间。

			var model = E.namespace("app.model");
			console.log(E.app); //[Object]
			console.log(E.app.model); //[Object]
- `extend(sub, parent, prop, static)`
类继承
    * sub 子类。
    * parent 父类。
    * prop 子类原型链上的属性和方法。
    * static 子类的静态属性和方法。

<span></span>

		//定义父类
		var Parent = function(){
		}
		Parent.prototype.method = function(){
		}
		//定义子类
		var Sub = function(){
		}
		//建立继承关系
		E.extend(Sub, Parent);

- `declare(className, options, staticOptions)`
类定义，定义一个类的模式如下：
    * className 定义的类名，字符串类型。
    * options 类的构造函数，父类和方法。
    * staticOptions 类的静态属性和方法。

<span></span>

		E.declare("ClassName", {
			superclass: Superclass
			instanceProperty: value, //基本类型
			constructor: function(){
			},
			instanceMethod: function(){}
		}, {
			staticProperty: staticPropertyValue,
			staticMethod: function(){}
		});

 -	`isFunction(o)`
 判断对象是否是函数
		
			console.log(E.isFunction(function(){})); //true
 -	`isArray(o)`
 判断对象是否是数组
		
			console.log(E.isArray([])); //true
 - `isNumber(o)`
  判断对象是否是数值

			console.log(E.isNumber(0)); //true
 - `isBoolean(o)`
 判断对象是否是布尔值

			console.log(E.isBoolean(false)); //true
 - `isString(o)`
 判断对象是否是字符串

			console.log(E.isString('')); //true
 - `isUndefined(o)`
 判断对象是否未定义
		
			console.log(E.isUndefined(null)); //false
 - `Array`
 数组辅助对象
	 - `Array.indexOf(array, item)`
	 查询item在数组array中的索引
			
				var array = ["Cloud", "Application", "is", "Cool"];
				var index = E.Array.indexOf(array, "Cool");
				console.log(index);
	 - `Array.each(array, func)`
	 遍历整个数组

				var array = ["Cloud", "Application", "is", "Cool"];
				var index = E.Array.each(array, function(item, index){
					console.log("第"+index+"个元素是"+item);
				});
	 -	 `Array.remove(array, item)`
	 从数组中删除一个元素

				var array = ["Cloud", "Application", "is", "Cool"];
				var index = E.Array.remove(array, "Application");
				console.log(array);
 */
(function(){

	var E = function(query) {
      return new E.init(query);
    },
    doc = document;

	E.init = function(query) {
		if (query.nodeType) {
		  query = [query];
		} else if (typeof query == 'string') {
		  query = doc.querySelectorAll(query);
		} else if (!(query instanceof Array)) {
		  return null;
		}
		this.length = query.length;
		for (var i = 0; i < this.length; i++) {
		  this[i] = query[i];
		}
		return this;
	};

	E.data = {};

	  E.init.prototype = {
		each: function(callbacM) {
		  for (var i = 0; i < this.length; i++) {
			callbacM.call(this[i]);
		  }
		  return this;
		},
		css: function(attrib, value) {
		  var o = {};
		  
		  if (typeof attrib === 'string' && value === undefined) {
			return window.getComputedStyle(this[0], null).getPropertyValue(attrib);
		  }
		  if (typeof attrib !== 'object') {
			o[attrib] = value;
		  } else {
			o = attrib;
		  }      
		  return this.each(function() {
			for (var i in o) {
			  this.style[i] = o[i];
			}
		  });
		},
		hide: function() {
		  this.each(function() {
			this.style.display = "none";
		  })
		},
		show: function() {
		  this.each(function() {
			this.style.display = "block";
		  })
		},
		item : function (index) {
		  return this[index];
		},
		set: function(key, val) {
		  this.each(function() {
			this[key] = val;
		  })
		},
		get: function(key) {
		  return this.item(0)[key];
		},
		setAttribute: function(key, val) {
		  this.each(function() {
			this.setAttribute(key, val);
		  })
		},
		getAttribute: function(key) {
		  this.item(0).getAttribute(key);
		},
		addClass: function(c) {
		  this.each(function() {
			var t = new RegExp("(^|\\s)" + c + "(\\s|$)").test(this.className);
			if (!t) {
			  this.className += this.className ? " " + c : c;
			}
		  });
		},
		removeClass: function(c) {
		  this.each(function() {
			var r = this.className.match(' ' + c) ? ' ' + c : c;
			this.className = this.className.replace(r, '');
		  })
		},
		hasClass: function(c) {
		  return new RegExp("(^|\\s)" + c + "(\\s|$)").test(this.className);
		},
		index: function(){
		  var pa = this[0].parentNode.childNodes;
		  for( var i = 0; i< pa.length; i++ ){
			if( pa[i] == this[0] ){
			  return i;
			}
		  }
		}
	 };
	
	 window.E = E;
})();


;(function(){
	
	var kernelName = "E", 
		core = window[kernelName] || (window[kernelName] = {}),
		_guid = 0,
		_forceEnum = [
			'hasOwnProperty',
			'isPrototypeOf',
			'propertyIsEnumerable',
			'toString',
			'toLocaleString',
			'valueOf'
		],
		_hasEnumBug = !{valueOf: 0}.propertyIsEnumerable('valueOf'),
		hasOwn   = Object.prototype.hasOwnProperty,
		TO_STRING = Object.prototype.toString,

		isFunction = function(o) {
			return TO_STRING.call(o) === '[object Function]';
		},
		isObject = function(o, failfn) {
			var t = typeof o;
			return (o && (t === 'object' ||
				(!failfn && (t === 'function' || isFunction(o))))) || false;
		},
		
		mix = function(receiver, supplier, overwrite, whitelist, mode, merge) {
			var alwaysOverwrite, exists, from, i, key, len, to;

			if (!receiver || !supplier) {
				return receiver;
			}

			if (mode) {
				if (mode === 2) {
					mix(receiver.prototype, supplier.prototype, overwrite,
							whitelist, 0, merge);
				}

				from = mode === 1 || mode === 3 ? supplier.prototype : supplier;
				to   = mode === 1 || mode === 4 ? receiver.prototype : receiver;

				if (!from || !to) {
					return receiver;
				}
			} else {
				from = supplier;
				to   = receiver;
			}

			alwaysOverwrite = overwrite && !merge;

			if (whitelist) {
				for (i = 0, len = whitelist.length; i < len; ++i) {
					key = whitelist[i];

					if (!hasOwn.call(from, key)) {
						continue;
					}
					exists = alwaysOverwrite ? false : key in to;

					if (merge && exists && isObject(to[key], true)
							&& isObject(from[key], true)) {
						mix(to[key], from[key], overwrite, null, 0, merge);
					} else if (overwrite || !exists) {
						to[key] = from[key];
					}
				}
			} else {
				for (key in from) {
					if (!hasOwn.call(from, key)) {
						continue;
					}
					exists = alwaysOverwrite ? false : key in to;

					if (merge && exists && isObject(to[key], true)
							&& isObject(from[key], true)) {
						mix(to[key], from[key], overwrite, null, 0, merge);
					} else if (overwrite || !exists) {
						to[key] = from[key];
					}
				}
				if (_hasEnumBug) {
					mix(to, from, overwrite, _forceEnum, mode, merge);
				}
			}

			return receiver;
		};



	mix(core, {
			mix: mix,
			guid: function(pre) {
				var id = (_guid++) + "";
				return pre ? pre + id : id;
			},
			isFunction: isFunction,
			isObject: isObject,
			isUndefined: function(o) {
				return o === undefined;
			},

			isBoolean: function(o) {
				return TO_STRING.call(o) === '[object Boolean]';
			},

			isString: function(o) {
				return TO_STRING.call(o) === '[object String]';
			},

			isNumber: function(o) {
				return TO_STRING.call(o) === '[object Number]' && isFinite(o);
			},

			isArray: function(o) {
				return TO_STRING.call(o) === '[object Array]';
			},
			'Array': {
				indexOf: function(arr, item){
					if(arr.indexOf){
						return arr.indexOf(item);
					}
					for(var i = 0, l = arr.length; i < l; i++){
						if(arr[i] === item){
							return i;
						}
					}
					return -1;
				},
				each: function(arr, callback){
					for(var i = 0, l = arr.length; i < l; i++){
						callback(arr[i], i, arr);
					}
				},
				remove: function(arr, item){
					var index = this.indexOf(arr, item);
					if(index != -1){
						return arr.splice(index, 1);
					}
				}
			},
			merge: function() {
				var a = arguments, o = {}, i, l = a.length;
				for (i=0; i<l; i=i+1) {
					mix(o, a[i], true);
				}
				return o;
			},
			namespace: function(name){
				var a=arguments, o=null, i, j, d, l;
				for (i=0; i<a.length; i=i+1) {
					d = ("" + a[i]).split(".");
					o = this;
					l = d.length;
					for (j=(d[0] == kernelName) ? 1 : 0; j < l; j = j+1) {
						o[d[j]] = o[d[j]] || {} ;
						o = o[d[j]];
					}
				}
				return o;
			},
			extend: function(r, s, px, sx) {
				if (!s||!r) {
					return r;
				}
				var OP = Object.prototype,
					O = function (o) {
						function F() {
						}

						F.prototype = o;
						return new F();
					},
					sp = s.prototype,
					rp = O(sp);


				r.prototype=rp;
				rp.constructor=r;
				r.superclass=sp;

				if (s != Object && sp.constructor == OP.constructor) {
					sp.constructor=s;
				}

				if (px) {
					mix(rp, px, true);
				}

				if (sx) {
					mix(r, sx, true);
				}
				r.superclass = s;
				return r;
			},
			declare: function(className, prop, statics){
				var self = this;

				if(this.isFunction(prop)){
					var p = prop();
					if(!self.isUndefined(p)){
						self.declare(className, p, statics);
					}else{
						mix(this.namespace(className), statics);
					}
					return;
				};

				prop = prop || {};
				var superclass = prop.superclass,
					 newclass,
					 d, l, i, o;

				if(prop.hasOwnProperty("constructor") && this.isFunction(prop.constructor)){
					newclass = prop.constructor;
				}else if(!superclass){
					newclass = function(){}
				}else{
					newclass = function(){
						superclass.prototype.constructor.apply(this, arguments);
					};
				}
				delete prop.constructor;

				if(!superclass){
					this.mix(newclass.prototype, prop);
					this.mix(newclass, statics);
				}else{
					newclass = this.extend(newclass, superclass, prop, statics);
				}

				d = ("" + className).split(".");
				i = (d[0]==kernelName) ? 1 : 0;
				l = d.length;
				o = this;
				for(; i < l; i++){
					if(i == l-1){
						o[d[i]] = newclass;
					}else{
						o[d[i]] = o[d[i]] || {} ;
					}
					o = o[d[i]];
				}
				return o;
			}
	});

})();