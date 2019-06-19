#webpack--模块化打包工具


##一.公共配置


###一.使用

  1.下载：

     npm install webpack@3.10.0
  
  2.打包项目

    webpack  ---（默认找webpack.config.js文件）

    依赖图：由入口js关联上的所有相关模块组成的网

     注意:react为livereload（实时刷新）

         vue为热模替换

###二.版本
 
 1.webpack v1.0.0  ---编译，打包，热模替换，代码分割，文件处理

 2.webpack v2.0.0   ---tree shaking，ES module,动态import，更友好的文档

 3.webpack v3.0.0   ---作用域提升（内部特性，减少闭包），魔法注释

 4.webpack v4.0.0   ---（还在挖掘）

###三.四个核心概念

1.entry（入口文件）
  1）一般为一个字符串

  2）结构：

     entry:`${__dirname}/src/app.js`,
 
   
  3）路径一般为绝对路径

2.output

  1）一般为一个对象
  
  2）结构
    
     output:{
	    path:path.resolve(__dirname,"dist"),
	    filename:"index.js"
     }

3.loader （将非js模块转换为js模块）
   
  1）一个loader一般用一个对象表示

  2)结构
    
	    module:{
	    rules:[
	      {
	        test:/\.js$/,
	        use:{
	          loader:"babel-loader"
	        }
	      }
	    ]
	   }

4.plugins（插件）---（webpack和loader干不了的，如压缩js等）

###四.三个引申概念

 1）module（模块）

 2）chunk（代码块，一个chunk有多个模块组成，最终浏览器执行的是webpack打包生成的chunk文件）

 3）bundle（代码块）

###五.webpack编译ES6(需要引入babel)---使用babel-loader

    处理commonjs--->es6的语法加babel--->第三方文件怎么引入

 1. babel的概念（！！！）
    a.transform.js--改造你的代码

    b.browserify.js--改造浏览器
   
    共同点：支持es6的新增API
 2.ES6中的babel（set和map）

  1）babel的使用及配置：
     
    下载babel-loader--npm i babel-loader -D

       npm i babel-core --D

       npm i babel-presetrenv -D

       npm i babel-polyfill -s(不用配置，直接引入)



       .browserslistrc  --用来控制支持哪一个浏览器
   
       .babelrc--给babel用，需要哪些插件

     
       设置别名：
	    resolve:{
	    alias:{
	      lodash$:path.resolve(__dirname,"lib/lodash.js")//先去包中找，再去找此文件下的
	    }
	  },

###六.webpack处理css（使用style-loader和css-loder，css-module）


     npm i webpack@3.10.0 css-loader style-loader

     配置loader---css-loader用来解决css模块化

			  ---style-loader生成style标签

        {
        test:/\.css/,
        use:
          [
            {
              loader:"style-loade/useable"
              options:{
                   module；true  //一般情况下不用
				}    
            {
              loader:"css-loader"
            }
          ]

      }
        useable

		 	obj.use()--插入对应样式的style标签
		    obj.unuse() --不插入对应样式的style标签
		                效果是通过style-loader实现
		
						拿到的obj是css-loader的
		
		                缺一不可
###七.webpack处理less
   
    less-loader---让webpack认识less文件

    less--真正编译    
       
###八.css后置处理器--postcss

	下载--npm i postcss-cli 

    使用--postcss ./src...

   	autoprefix---自动加前缀 

    配置--必须在less-loader和css-loader之后

###九.webpack处理img资源

    1.	file-loader-默认不管任何路径，处理图片时路径是错误的

     问题：发请求太多
     
     {
        test:/\.(jpg|jpeg|png|gif)$/,
        use:[
          {loader:"file-loader",
            options:{
              publicPath:"./dist/img",//发布目录
              outputPath:"img"//输出目录
			  name:"[name],[hash:8],[ext]"
            }
          }
        ]
      }
   	2. url-loader--base64--file-loader的包装

    npm i url-loader

	{
        test:/\.(jpg|jpeg|png|gif)$/,
        use:[
          {loader:"url-loader",
            options:{
              publicPath:"./dist/img",//发布目录
              outputPath:"img",//输出目录
			  name:"[name],[hash:8],[ext]",
              limit:10000
            }
          }
        ]
      }
###十.webpack处理html

   1.自动生成html--使用HtmlWebpackPlugin插件(html中没有script引入）

    使用：1)下载  

		npm i html-webpack-plugin

        npm i html-loader--让webpack认识html
         
        2) 使用---引入

        const htmlWebpackPlugin=require（"html-webpack-plugin"）

  2.配置

      1） htmlWebpackPlugin插件的配置

	    plugins:[
	    new webpack.ProvidePlugin({
	      _:"lodash"
	    }),
	    new htmlWebpackPlugin({
	      template:`${__dirname}/index.html`,
	      filename:'index.html'
	    })
	  ]

      2）html-loader的配置
      {
        test:/\'html$/,
        use:[
          {loader:"html-loader",
            options:{
             attrs:['img:src']
            }
          }
        ]
      }

###十一.webpack处理字体图标(font)

	   1）安装配置url-loader之后，webpack就可以自动处理了

       2）配置url-loader

		   {
		        test:/\.(jpg|jpeg|png|gif)$/,
		        use:[
		          {loader:"url-loader",
		            
		        
		        ]
		  }
			
##二.开发环境


   1.搭建开发环境

    打包速度快，bug定位准

     1.开发服务器
      
        安装：npm install webpack-dev-server --save-dev
		注意：
         a.不用引入
	     b.webpack-dev-server不会生成打包文件。其打包的所有资源都存在于内存中
		配置：
			devServer:{
			port:3333
		  }

     webpack-dev-server
       
		a.为谁去起服务--当前项目目录

        b.将打包后的文件塞到哪--当前项目目录


     live-reloading--修改代码，自动刷新浏览器，不会保存数据状态

     模块热更新--修改代码，不刷新浏览器，可是应用你的修改

         三个等级  
                
			html热更新--不做

 			css热更新--自带，通过styleloader

            js热更新--自已写配置
				module.hot.accept(
				  dependencies, // 可以是一个字符串或字符串数组
				  callback // 用于在模块更新后触发的函数
				);

   2.优化代码调试 (Source Map--指定bug)

        作用：优化调试。
		安装：不需要任何安装
		引入：不需要任何引入
		配置：
			 devtool:'inline-source-map'
					  给处理css的每一个loader都加上
						options:{
			sourceMap:true
		}

   3.强约束eslint

##3.生产环境 （需性能优化）  
 
###一.优化js

####  提取公共代码

    注意：在webpack中公共代码的提取是针对于多entry的（多页应用）
	     当你对单entry的应用进行公共代码提取时，我们发现只能将Webpack的生成代码提取出来。
    一.基础配置
    1.安装配置-npm install webpack --save-dev
	2.引入：
		const webpack = require('webpack');
    3.配置
       entry--为对象
       plugins:[
	      new webpack.optimize.CommonsChunkPlugin({
	          name:"common",
	      })
	  ]

      minChunk：2----当公共代码出现多少次时，我们才需要提取
   
     1）.单entry
     name:"common"
     	 a.将A入口的所有代码都打到了一个单独的文件里去
         b.将webpack的runtime代码也打到了一个单独的文件里去
         c.在单entry的情况下，commonchunkplugin只能帮我们剥离webpack的runtime代码
         d.将common.js的代码单独剥离出来，需要webpack帮我们提供接口来处理这个文件

     2）.多entry
       name:"common"
         a.将A,B入口的代码都打到了一个单独的文件里去（A.JS,B.JS）
         b.将webpack的runtime代码和AB的公共代码也打到了一个单独的文件里去
     3）name:"buscommon"
        name:"webpackcommon"

          a.将A,B入口的代码都打到了一个单独的文件里去（A.JS,B.JS）
          b.将AB的公共业务代码打到buscommon
          c.将webpack的runtime代码也打到了webpackcommon

      二.错误的配置
           1.
             new webpack.optimize.CommonsChunkPlugin({
         		 name:"A",//entry chunk
      			})
   
             new webpack.optimize.CommonsChunkPlugin({
         		 name:"B",
      			})
             new webpack.optimize.CommonsChunkPlugin({
         		 name:"webpackcommon",//common chunk
      			})

           2.
              new webpack.optimize.CommonsChunkPlugin({
         		 name:"xxx",//entry chunk
      			})
   
             new webpack.optimize.CommonsChunkPlugin({
         		 name:"B",
      			})
             new webpack.optimize.CommonsChunkPlugin({
         		 name:"webpackcommon",//common chunk
      			})
   
     三.标准配置（引入第三方库）
        entry: {
		      A:"./src/A.JS",
		      B:"./src/B.JS",
		      vender:["lodash","jQuery"]
		  },

       new webpack.optimize.CommonsChunkPlugin({
          name:"buscommon",
          chunks:["A","B"]
       }),
      new webpack.optimize.CommonsChunkPlugin({
          name:"vender",
         
       }),
      new webpack.optimize.CommonsChunkPlugin({
          name:"webpackcommon"
       }) 

####缓存
     1.//内容改变，哈希改变；否则不变
     output：｛
             filename:"[name].[chunkhash].js"
             ｝

     2.//模块改变，哈希都乱了，破坏了chunk的ID。若想要模块改变时，哈希不乱也使用缓存，chunks不应该使用ID，而应该使用name---解决：使用插件

        new webpack.NameModulePlugin()

####代码分割和懒加载
#####一.代码分割（不是配置，改变代码编写方式）-分割出来的代码也是chunk

       1.解决的问题
	
	   1).其可以解决单entry无法分离业务代码 和 第三方依赖的问题（插件可以解决）
	
	   2).其可以解决单entry无法分离业务代码 和 业务公共代码 和 第三方依赖的问题
	
      2.代码分割实现方式
      1）webpack的方式实现
          require.ensure(["要分割的文件"],()=>{})
          output：｛
             filename:"[name].[chunkhash].js",
			 chunkFilename:"[name].[chunkhash]-hash.js"
             ｝
        
      2）动态import
#####二.懒加载
####Tree shaing

     1.本地代码 

         引入：
			const webpack = require("webpack");
		配置：
			plugins:[
			   		new webpack.optimize.UglifyJsPlugin()
			]

     2.第三方库（以lodash为例-bug（需下载babel及相关配置））

      安装：
		   npm install lodash --save
		   npm install babel-plugin-lodash --save-dev
		   npm install babel-loader  babel-core babel-preset-env --save-dev

	  babel配置
			{
 			 "presets":[
       			 	["babel-preset-env",{
          				"targets":{
           			 	"browsers":[">1%"],
            			"chrome":65
         			 }
        			}]
    			],
    		"plugins":["lodash"]
		}
		webpack配置
		plugins:[
		   		new webpack.optimize.UglifyJsPlugin()
		]
####提取css（style->link）

    1.使用相关插件
	npm install extract-text-webpack-plugin webpack --save-dev
	2.配置
	module:{
        rules:[
            {
                test:/\.less/,
                use:ExtractTextWebpackPlugin.extract({
                    fallback: {
                        loader:'style-loader'
                    },
                    use:[
                        {
                            loader:'css-loader',
                        },
                        {
                            loader:'postcss-loader',
                            options:{
                                ident:'postcss',
                                plugins:[
                                    require('autoprefixer')(),
                                    // require('cssnano')(),
                                ]
                            }
                        },
                        {
                            loader:'less-loader',
                        }
                    ]
                })
            }
        ]
   	},
  	plugins:[
      	new ExtractTextWebpackPlugin({
          	filename:'[name].min.css'
      	})
  	]

####css Tree Shaing

		安装purifycss-webapck(purifycss在webapck下的插件)：
		安装glob-all（处理多路径）
	    npm install purifycss-webpack glob-all  purify-css --save-dev
	
	  	引入：
			const PurifyCSS = require("purifycss-webpack");
		const glob = require("glob-all");
		配置：
		要配合ExtractTextWebpackPlugin插件使用 且PurifyCSS在后面配置
		plugins:[
        new ExtractTextWebpackPlugin({
            filename:'[name].min.css',
            allChunks:false
        }),
        new PurifyCSS({
          paths:glob.sync([
              path.join(__dirname,'./*.html')//检查html文件
          ])
        })
    ]
####html优化

    本地化webpack生成代码
    安装配置相关插件
	npm install html-webpack-inline-chunk-plugin --save-dev
    引入
	const HtmlWebpackInlineChunkPlugin = require('html-webpack-inline-chunk-plugin');
    配置
	plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:"common"
        }),
        new HtmlWebpackPlugin({
            filename:"index.html",
            template:"./index.html"
        }),
        new HtmlWebpackInlineChunkPlugin({
            inlineChunks:['common']
        })  
	      
####资源的压缩

    html的压缩
    css的压缩
    js的压缩
    图片的压缩	

#自制脚手架

  1.开发环境

    devServer

    devtool

    热模替换

  2.生产环境

    共同点：entry，output，生成html，目录复制

 3.文件目录结构

    config(配置文件)
     --webpack.config.base.js

     --webpack.config.dev.js

     --webpack.config.prod.js
 4.合并(开发配置与公共配置合并)

	  const merge=require(webpack-merge)
	
	  return merge(baseConfig,devConfig)

 5.开发环境打包与生产环境打包

    开发环境: webpack-dev-serve --env dev 

    生成环境打包：webpack --env pro

    
     

     
				     