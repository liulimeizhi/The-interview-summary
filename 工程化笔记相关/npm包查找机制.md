#npm及包查找机制

### npm
  npm 是node社区最大的包管理平台
  
### npm平台(第三方命令行工具)
    第三方库
    第三方命令行工具  (必须全局安装 再 本地安装)
        ---
        全局安装: 让命令可以在任意的目录下运行
        本地安装: 统一项目中命令行工具的版本
        
        ---
        还是不希望在全局安装任何东西  我们只想本地安装
            npx 命令工具
            
        ---   
        连npx都不想要
            使用npm脚本    
            
### npm平台(第三方库)  
    node包查找机制    
    1.
	    1）.node内建包
	    2）. 自己文件的路径 （不会主动加 ./ ../ /）
	    3）. 第三方包
	         module.paths[0]
	            ---> 找包名
	             ---> 找包底下的package.json
	               ---> package.json  main字段所指向的文件
	                 ---> 如果main字段不存在 直接找包名底下的index.js  index.json
	                 
    2.在vue-cli中找包:
       1)先看别名（webpack.base.config->alias）
       2)再走 node的查找包的机制 
       如:查找lodash包的流程  
      		node_modules--->lodash的package.json(查找有无main字段所指向的文件)--->无查找它的index.js（通过modeule.exports暴露）--->lodash.js
###exports与module.exports
	  1.初始化时指向的是同一个对象
	  2.外部使用时，都是使用module.exports暴露的
	    exports拿到的是空对象

    图示
     
###node中打断点
	 1.chrome://inspect
	 2.node --inspect-brk hello.js
          
            
