#喜钻
##一.项目结构
###index.html
    <body>
       <div id="wrap">--最外侧包裹容器
         <header>--头部区域
              <div class="header-top"></div>--登录，注册，收藏，
              <div class="header-bottom"></div>--logo，搜索,购物车，订单
         </header>
         <div id="content">--内容区域
               <div class="top">--上部区域
                 <div class="left"></div>--左侧列表导航区域
                 <div class="right">--右侧商品显示区域
                   <div class="showProduct"></div>--商品图片显示区域（使用轮播）
                   <div class="recommend"></div>--推荐商品显示区域
                 </div>
               </div>
               <div class="bottom">--下部区域
                  <div class="left"></div>--左侧珠宝列表导航区域
                  <div class="right"></div>右侧珠宝显示区域
               </div>
             <div class="list"></div>--列表显示区域
         </div>
          <div id="footer">--底部区域
             <div class="top"></div>--使用表格显示珠宝具体信息（形状，大小，证书号等）
             <div class="bottom"></div>--网站详细信息（地址，联系方式，登录方式）
          </div>
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


       $(document).ready
       $('.slideBox').slide({})
