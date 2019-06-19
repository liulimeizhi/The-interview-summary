#vue项目分析  
##一.项目名称-安可达
##二.项目技术-react
##三.项目简介
####Agoda是一家在线酒店预订网站。
##四.责任描述
####1.配合后台开发人员实现前端页面的功能效果
####2.实现产品UI和交互方面的开发需求，确保产品有优质的用户体验
##五.主要技术
	  1.使用swiper实现页面滑动的效果 
	  2.使用js对页面dom进行操作
	  3.使用jQuery对进行动态事件绑定
	  4.使用axios发ajax请求与后端进行数据交互，获取数据
	  5.使用react-router-dom实现单页面应用
      6.使用redux做状态管理
##六.项目结构
    src
		api		与后台交互文件夹
		commonn		通用文件夹，如fonts，img，stulus
		components	非路由组件文件夹
		filters		自定义过滤器模块文件夹
		mock		模拟数据接口文件夹
		pages		路由组建文件夹
		router		路由器文件夹
		redux		状态管理文件夹
		App.vue		应用组件
		main.js		入口JS
	    static	静态资源文件夹
        index.html 
##七.项目开发流程
###一.拆分静态组件界面-非路由组件
####1.App--项目根组件
     1）显示路由组件界面
     2）显示非路由组件界面
####2.Header--头部组件
        使用命令式路由跳转到侧边栏组件
####3.Main组件--主页面组件
#####1.Search--搜索组件
#####2.Popular--人气目的地组件
#####3.HotCities--热门城市组件
###二.搭建路由（vue-router）
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
###二.拆分静态组件界面-路由组件
####Asides-侧边栏组件
#####1.Profile--个人中心组件
      Login-登录在组建
      Register-注册组件
      Favorite-收藏组件
      Reserve-预定组件
      Plan-计划回馈组件
#####2.Set-设置组件
      Language-语言设置组件
      PriceShow-价格显示组件
#####3.Info-信息组件
      DownloadClient-下载客户端组件
      CustomerService-客户端服务组件
      ProblemResolve-问题与解答组件
      Secret-隐私政策组件
      Cookie-cookie政策组件间
      UseItem-使用条款组件
      License-营业执照组件
##八.项目准备
###1.使用create-react-app(脚手架)搭建项目 react+webpack+es6项目的脚手架
	    npm install -g create-react-app : 全局下载工具
        create-react-app react-admin :下载模板项目
        cd react-admin
        npm start
        访问: localhost:3000
###2.编码测试与打包发布项目
      	1)编码测试
        npm start
        访问: http://localhost:3000
        编码, 自动编译打包刷新(live-reload), 查看效果
        2)打包发布
        npm run build
        npm install -g serve
        serve build
        访问: http://localhost:5000
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