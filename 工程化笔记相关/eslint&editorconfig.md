##ESlint--JS代码检查工具
###与git结合使用
    1.pre-commit
      a.下载
        npm install --save-dev pre-commit
      b.配置package.json
        "scripts": {
		    "test": "echo \"Error: I SHOULD FAIL LOLOLOLOLOL \" && exit 1",
		    "foo": "echo \"fooo\" && exit 0",
		    "bar": "echo \"bar\" && exit 0"
		  },
		  "pre-commit": [
		    "foo",
		    "bar",
		    "test"
		  ]
		}
    2.husky
    
      a.下载
        npm install husky --save-dev
      b.配置package.json
          {
			  "husky": {
			    "hooks": {
			      "pre-commit": "npm test",
			   
			    }
			  }
			}
      
       package.json
        "scripts": {
		    "test": "echo \"Error: no test specified\" && exit 1",
		    "lint:lint":"eslint --lint",
		    "lint-check":"eslint ./src"
		  },
		  "husky": {
		    "hooks": {
		    "pre-commit": "npm test"
		    }
		},
###eslint(检查项目代码的风格)
    1.安装:
        npm i eslint -D  (下到是第三方命令行工具)
    2.生成eslint配置
        eslint --init     (很多问题需要选择)   
            ---> .eslintrc.js
    3.检查代码:
        eslint ./src (目录)
    4. 与git结合
        pre-commit
        husky
        
###eslint语法
    1.当你的项目命中eslint的规则时  我们去找它的规则表(https://cn.eslint.org/docs/rules/)
        查看规则的具体描述
    
    
    2.跳过规则检查
        魔法注释
            单行  // eslint-disable-line
            多行     
                /* eslint-disable */
                /* eslint-enable */
                
    3.自动修复语法层面的错误
            eslint ./src  --fix
            
            
### eslint的常用规则
    1)space-infix-ops : 要求操作符周围有空格
    2)no-unused-vars  : 禁止出现未使用过的变量
    3)space-before-function-paren 强制在 function的左括号之前使用一致的空格
    4)indent :强制使用一致的缩进
    5)comma-spacing:	强制在逗号前后使用一致的空格
    6)eol-last: 要求或禁止文件末尾存在空行
    7)quotes: 强制使用一致的反勾号、双引号或单引号
    
### 自定义eslint的配置!
    'rules': {
        "object-shorthand":2,
        "prefer-arrow-callback":2,
        "no-trailing-spaces":2
      }
      2:错误
      1:警告
      0:关闭
     
# editConfig(控制编辑器的统一编码风格)
    root = true          // 代表当前配置是根配置文件
    
    [*]                  //[]以下的配置适用于哪些类型的文件
    charset = utf-8      // 字符编码
    indent_style = space //缩进风格
    indent_size = 2      //缩进需要几个空格
    end_of_line = lf     //换行的风格 linux windows
    insert_final_newline = true  // 代码的最后又换行
    trim_trailing_whitespace = true //每行代码的末尾没有空格
      
# 工程化
    Webpack:
        模块化打包工具 (es6 commonjs amd)
            js
        编译(loader)
            es6
           vue  (vue-loader) 
           ....   
        优化代码(piugin)
            html(压缩 混淆)
            js(压缩 混淆)
            css(压缩 混淆)
        性能优化 (piugin)   
            tree shaking(去除废代码)
            缓存(缓存)
            
        
            

    Git + github(svn) + Webpack(glup grunt browserify fis3 rollup) 
        + babel + Eslint + editconfig + less(sass styuls) + postcss
    