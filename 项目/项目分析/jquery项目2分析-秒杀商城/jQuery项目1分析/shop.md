#秒杀商城
##一.项目结构
###index.html
    <body>
       <div id="wrap">--最外侧包裹容器
         <header>--头部区域
              <div class="header-top"></div>--登录，注册，收藏，下载手机app
              <div class="header-bottom"></div>--logo，搜索
         </header>
         <div id="conWrap">--内容区域
               <div class="nav"></div>--导航区域--tab搜索列表（ul->li）
               <div class="recommend"></div>--推荐区域
             <div class="list"></div>--列表显示区域
          <div id="scrollBar"></div>--滚动条区域
       </div>
    </body>
###js
####index.js--主js文件
       //响应缩放逻辑 window.onresize=function(){}
       //头部交互
       //鼠标滚轮逻辑
       //自动轮播
####changeClass.js--class操作函数模块
      function addClass(node,className){
      	var reg=new RegExp("\\b"+className+"\\b");
      	if(!reg.test(node.className)){
      		node.className +=(" "+className);
      	}
      }
      function removeClass(node,className){
      	if(node.className){
      		var reg=new RegExp("\\b"+className+"\\b");
      		var classes = node.className;
      		node.className=classes.replace(reg,"");
      		if(/^\s*$/g.test(node.className)){
      			node.removeAttribute("class");
      		}
      	}else{
      		node.removeAttribute("class");
      	}
      }
####drag.js--实现拖拽的js文件
      w.contentDrag=fucntion(navWrap,callback){
            //竖向滑屏，橡皮筋效果（越来越难拖，回弹），加速,即点即停,滚动条，防抖动
            //拖拽原理： 元素初始位置 + 手机距离差 = 元素最终位置
            //模拟加速与回弹，tween算法
      }
###css
      样式文件夹
###img
      图片文件夹

