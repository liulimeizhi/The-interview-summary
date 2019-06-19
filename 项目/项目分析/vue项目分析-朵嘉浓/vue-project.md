#vue项目分析  
##一.项目名称-朵嘉浓
##二.项目技术-vue
##三.项目简介
####该网站是一个专注于敏感肌护肤的品牌。
##四.责任描述
####1.配合后台开发人员实现前端页面的功能效果
####2.实现产品UI和交互方面的开发需求，确保产品有优质的用户体验
##五.主要技术
	  1.使用swiper实现页面滑动的效果 
	  2.使用js对页面dom进行操作
	  3.使用jQuery对进行动态事件绑定
	  4.使用axios发ajax请求与后端进行数据交互，获取数据
	  5.使用vue-router实现单页面应用
      6.使用vuex做状态管理
##六.项目结构
    src
		api		与后台交互文件夹
		commonn		通用文件夹，如fonts，img，stulus
		components	非路由组件文件夹
		filters		自定义过滤器模块文件夹
		mock		模拟数据接口文件夹
		pages		路由组建文件夹
		router		路由器文件夹
		store		vuex相关模块文件夹
		App.vue		应用组件
		main.js		入口JS
	    static	静态资源文件夹
        index.html 
##七.项目开发流程
###一.拆分静态组件界面-非路由组件
####1.App--项目根组件
     1）显示路由组件界面
     2）显示Footer组件--根据路由配置的meta属性判断是否显示
####2.Header--头部组件--定义为全局组件（不同的结构使用插槽）
####3.Footer--底部组件--使用命令式路由跳转到对应的组件
###二.拆分静态组件界面-路由组件
###三.搭建路由（vue-router）
####1，首页--Home
#####1.Nav--导航组件
#####2.NewProducts--新品首发组件
#####3.Recommend--好物推荐组件
#####4.Popular--热销榜组件
#####5.Gift--优惠券组件
####2.全部商品---AllGoods
####3.促销---Sales
####4.商品分类---CategoryList
####5.联系卖家---ContactSeller
####6.搜索--Search组件
####7.登录到京东账号--Login
##八.项目准备
###1.使用vue-cli2(脚手架)搭建项目
	    1、npm i vue-cli -g    --全局安装Vue
		2、vue -V   --查看Vue版本
		3、vue list   --查看对应的模板类型
		4、vue init webpack + 项目名    --创建脚手架
###2.编码测试与打包发布项目
      	1、编码测试
		npm run dev  / npm start
		访问: http://localhost:8080
		编码, 自动编译打包(HMR), 查看效果
	    2、打包发布
		npm run build
		npm install -g serve
		serve dist
###3.css预编译器-stylus
       1、安装stylus依赖包
        npm install stylus stylus-loader --save-dev
       2、编写样式
        <style lang="stylus" rel="stylesheet/stylus" scoped>

        </style>
###4.引入reset样式
       新建文件：static/css/reset.css
###5.移动端配置
      1.rem适配
	       等分rem--降低单位rem的大小，提高页面精确度
      2.解决点击响应延时0.3s问题
      3.点透
      4.取消浏览器默认行为
      5.设置meta标签	
###六.定义混合
		1.项目主题色
	    2.一像素下边框
	    3.一像素上边框
	    4.根据像素比缩放1px像素边框
		5.根据像素比来使用 2x图 3x图
	    6.清除浮动