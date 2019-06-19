#vue源码分析
##分析 vue 作为一个 MVVM 框架的基本实现原理
###**数据代理(vm.name取代vm._data.name)**
   1.首先获取到配置对象的data属性 绑给vm实例对象

   2.将当前这个data对象所有的可枚举属性一一拿出来(数组)， 转绑给vm实例对象

    data中的属性都是数据描述符 => 转绑给vm实例对象时 全部变成访问描述符
               get 读原始数据源
               set 改原始的数据源
   3.实现流程
     
	 (1) 准备工作：
	  
	  a.new  mmvm({})
	       
	  b.mmvm.js-function mmvm(options){}--相当于vue的构造函数
	
	   Object.keys(data).forEach(function(key) {me._proxy(key);});
	
	 (2)真正实现数据代理
	
	  a. 通过 Object.defineProperty()给 vm 添加与 data 对象的属性对应的属性描述符
	
	  b. 所有添加的属性都包含 getter/setter
	
	  c. getter/setter 内部去操作 data 中对应的属性数据
   3.注意：
     
	 a.me.-proxy(key)---对指定的属性实现数据代理
	
	 b.好处: 更方便的操作 data 中的数据
	
	    
###**模板解析**

  1.基本流程
   
  (1)将挂载节点下的所有子节点剪切到文档碎片中--this.$fragment = this.node2Fragment(this.$el);
        
  (2)解析文档碎片--this.init();
   
	compileElement: 拿到文档碎片中的所有子节点,根据节点类型进行不一样的处理
		                        
		1)元素节点的指令属性进行解析
				                        
	    2)带{{}}的文本节点(大括号表达式文本节点解析)
		   compileText: 从工具类(compileUtil)中找到指定的工具
		                                
		     text:专门处理{{}}的编译工具
		                                   
		   		bind: 工具类依赖的核心函数;
		                              
		   			去找更新器,为更新器提供数据(node exp在data中所对应的值)
		                                        
		   				_getVMVal:找exp在data中所对应的值
		                                            
		   					updaterFn:更新器去修改文档碎片
       
  (3)将解析成功的文档碎片重新挂载回el底下---this.$el.appendChild(this.$fragment);
  
  2.三种模板解析 
         
      	大括号表达式解析
	
		1) 根据正则对象得到匹配出的表达式字符串: 子匹配/RegExp.$1 name
		2) 从 data 中取出表达式对应的属性值
		3) 将属性值设置为文本节点的 textContent

		  事件指令解析
		1) 从指令名中取出事件名
		2) 根据指令的值(表达式)从 methods 中得到对应的事件处理函数对象
		3) 给当前元素节点绑定指定事件名和回调函数的 dom 事件监听
		4) 指令解析完后, 移除此指令属性

		 一般指令解析
		1) 得到指令名和指令值(表达式) text/html/class msg/myClass
		2) 从 data 中根据表达式得到对应的值
		3) 根据指令名确定需要操作元素节点的什么属性
		* v-text---textContent 属性
		* v-html---innerHTML 属性
		* v-class--className 属性
		4) 将得到的表达式的值设置到对应的属性上
		5) 移除元素的指令属性

###**数据绑定（通过数据劫持技术来实现数据绑定的效果）**
     1.两种实现
	  a.初始化显示：页面(表达式/指令)能从data读取数据显示(编译/解析)
	  b.更新显示：更新data中的属性数据==>页面更新
       注意：一旦更新了 data 中的某个属性数据, 所有界面上直接使用或间接使用了此属性的节点都会
		更新

     2.数据劫持-用于实现数据绑定
	 1）是 vue 中用来实现数据绑定的一种技术
	 2）基本思想: 通过 defineProperty()来监视 data 中所有属性(任意层次)数据的变化, 一旦变化就去更新界面
     
     3.四个重要对象
     1) Observer
			a. 用来对 data 所有属性数据进行劫持的构造函数
			b. 给 data 中所有属性重新定义属性描述(get/set)
			c. 为 data 中的每个属性创建对应的 dep 对象
     2) Dep(Depend)
			a. 与data中的属性一一对应
			b. 什么时候创建:在初始化 define data 中各个属性时创建对应的 dep 对象
			 在 data 中的某个属性值被设置为新的对象时
			c. dep对象的结构
			{
			id, // 每个 dep 都有一个唯一的 id
			subs //包含 n 个对应 watcher 的数组(subscribes 的简写)
			}
			d. subs 属性说明
			 当 watcher 被创建时, 内部将当前 watcher 对象添加到对应的 dep 对象的 subs 中
			当此 data 属性的值发生改变时, subs 中所有的 watcher 都会收到更新的通知,从而最终更新对应的界面
     3) Compiler
			a. 作用:用来解析模板页面的对象的构造函数(一个实例)
			b. 利用 compile 对象解析模板页面
			c. 每解析一个表达式(非事件指令)都会创建一个对应的 watcher 对象, 并建立 watcher与 dep 的关系
            d.它的实例什么时候创建--初始化解析大括号表达式/一般指令时创建
     4) Watcher
			a. 理解:模板中每个非事件指令或表达式都对应一个 watcher 对象
			b. 作用:监视当前表达式数据的变化
			c. 什么时候创建: 在初始化编译模板时
			d. watcher对象的结构
                this.cb = cb;//更新界面的回调
			    this.vm = vm;
			    this.exp = exp;//表达式
			    this.depIds = {};//包含所有相关的dep的容器对象
			    this.value = this.get();//得到表达式的初始值保存
                this.value=this.get()//当前表达式对应的value
     4.dep与watcher的关系--多对多的关系
       
       关系：data属性-->dep-->n个watcher(模板中有多个表达式使用了此属性)：{{a}}/v-text="a"/表达式-->watcher-->n个dep(多层表达式：a.b.c)
       如何建立：vm.name='abc'-->data中的name属性值变化-->name的set()调用-->dep-->相关的所有watcher-->-->cb()-->Updater
       什么时候建立：初始化解析模块中的表达式创建watcher对象时
     5.数据绑定分类
      (1)单向数据绑定
        a.data中的数据必须产生改变
        b.命中数据劫持时的set方法
     （2）双向数据绑定（单向数据绑定+input事件）
           a. 在解析 v-model 指令时, 给当前元素添加 input 监听
		   b. 当 input 的 value 发生改变时, 将最新的值赋值给当前表达式所对应的 data 属性

   
