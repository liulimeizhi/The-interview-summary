#版本控制系统
####1.版本控制是什么？（软件）
     版本控制是一种记录一个或若干文件内容变化，以便将来查阅特定版本修订情况的系统

####2.发展历程
#####1.Ctrl c+ctrl v
       复制文件夹的形式进行项目管理
#####2.本地版本控制系统
		只能对自已的代码进行版本控制，团队之间不能进行协同开发
#####3.集中化的版本控制系统-svn
      缺点
		1.如果中央服务器宕机，导致团队在宕机这个时间段所做的所有工作没有历史记录，风险太大。
        2.要是中央服务器的磁盘发生故障，碰巧没做备份，或者备份不够及时，就会有丢失数据的风险。最坏的情况是彻底丢失整个项目的所有历史更改记录

#####4.分布式的版本控制系统-（git+Github）
     
      在管理项目是时，存放的不是项目版本与项目版本之间的差异，它存的是索引，是项目的快照（所需要占用的空间极小，所以每个客户端都可以放下整个项目的历史记录）。
#Git--键值对的数据库
####一.开发需求
     1.备份修改
     2.协同开发（github）
     3.权限管理
####二.设计目标
      1.速度(容量小)	简单的设计	完全分布式
	  2.对非线性开发模式的强力支持（允许上千个并行开发的分支）
	  3.有能力高效管理类似 Linux 内核一样的超大规模项目（速度和数据量）
####三.安装
    1.安装网址：https://gitforwindows.org
####四.配置
####用户信息的配置
      第一个要配置的是你个人的用户名称和电子邮件地址。这两条配置很重要，每次 Git 提交时都会引用这两条信息，说明是谁提交了更新，所以会随更新内容一起被永久纳入历史记录：
		$ git config --global user.name "John Doe"
		$ git config --global user.email johndoe@example.com
        $ git config --list  检查已有的配置信息
####六.2.git文件目录
    1.hooks 目录包含客户端或服务端的钩子脚本
    2.info目录包含一个全局性排除文件，用以放置那些不希望被记录在 .gitignore 文件中的忽略模式
    3.logs目录存储所有日志信息；
    4.objects 目录存储所有数据内容；
    5.refs 目录存储指向数据（分支）的提交对象的指针
    6.COMMIT_EDITMSG  不知道干嘛的 暂时忽略
    7.config 文件包含项目特有的配置选项
    8.description 文件仅供 GitWeb 程序使用，我们无需关心
    9.HEAD 文件指示目前被检出的分支
    10.index 文件保存暂存区信息
####七.命令
#####1.linux命令
    1.clear : 清屏

    2.echo 'test content'         向控制台打印输出流
    3.echo "xxx" > damu.txt       初始化一个文件

    4.find .git/objects           平铺对应目录下的目录
    5.find .git/objects -type f   平铺对应目录下的文件
    
    6.ll : 列出对应目录下的所有子目录
    
    7.cat 文件url   获取对应文件的内容
    
    8.vim编辑器:
        vim 文件url
        按 i 键切入插入模式
            随意编辑内容
        按 esc 键进入普通模式
            :wq 保存退出    
            :!q 强制退出(不会保存内容)    
            :set nu   显示行号
  
  
#####2.git底层命令
       1.echo 'test content' | git hash-object -w --stdin--往git数据库存储内容（来自标准输出流）
      
       git cat-file -p d670460b4b4aece5915caf5c68d12f560a9fe3e4--根据hash读取git数据库中的内容

       2.文件的存取
         git hash-object -w 文件名  -往git数据库存取文件内容
         git hash-object  文件名   -返回对应文件在git数据库中的hash
	      
	   3.git cat-file -p      83baae61804e65cc73a7201a7252750c76066a30--根据hash读取git数据库中的内容
    
        git cat-file -p 83baae61804e65cc73a7201a7252750c76066a30--根据hash读取git数据库中存储内容的数据类型（blob）
#####3.git高层命令
     1.初始化本地仓库  git init
     2.查看当前工作目录的状态 git status
           红色：该文件还没有被跟踪；该文件被修改后没有加入暂存区
           绿色：该文件已经被存入到版本库，而且还加入到了暂存区
           白色：天下太平  nothing to commit，working tree clear 
     3..将文件纳入到git管理  git add 文件名/目录
               1）将文件纳入到版本库-->git对象
               2）将文件加入到暂存区--没有树对象
     4.将暂存区的内容提交到版本库  git commit   [-m || 进入vm编辑模式]
               1）根据暂存区里的内容生成树对象
               2）生成一个包裹树对象的提交对象
     5.查看已暂存和未暂存的更新  git diff [--staged]
     6.跳过使用暂存区域 git commit -a
         面试题：git add后文件就会丢不了
         只要工作目录里的文件纳入git的管理，这个文件就丢不掉
     7.删除文件
        1）在工作目录中手动删除当前要干掉的文件
        2）注册删除  git rm/git add 删除的文件名
        3）提交 git commit
     8.重命名文件  git mv file.from file.to
     9.查看历史记录  git log -oneline
     10.撤销命令  
           撤销工作目录中的修改 git checkout --文件名
           将暂存区的内容撤回到工作目录  git reset HEAD 文件名
           覆盖上一次的提交（配合git log） git commit --amend -m "..."
           
####撤销命令
    撤销工作目录中的修改                   git checkout -- 文件名
    撤销工作目录中的修改                   git checkout  commit -- 文件名
  
                                           git reset [--hard] HEAD 文件名   (跑不起来 git语法不支持  但是等于 git checkout -- 文件名 )  
                                               hard:   覆盖HEAD   覆盖暂存区  覆盖工作目录
                                               git checkout -- 文件名: 覆盖工作目录 
                                               git checkout  commit -- 文件名: 覆盖暂存区  覆盖工作目录                       
                                           
    将暂存区中的内容撤回到工作目录         git reset [--mixed] HEAD 文件名
                                                mixed  : 覆盖HEAD   覆盖暂存区
                                                文件名 : 覆盖暂存区
                                                
    覆盖上一次提交(配合git log)            git commit --amend -m "..." 
                                           git reset --soft HEAD~    
####八.git核心概念-1
#####1.git对象
        key:文件内容对应的hash
        val：文件的内容
        注意：没有存取文件名
  
       问题:1.记住文件的每一个版本所对应的 SHA-1 值并不现实
		    2.在Git中，文件名并没有被保存——我们仅保存了文件的内容
           
         注意:没有经过暂存区
         解决：树对象
#####2.树对象（blobck）
      树对象（tree object），它能解决文件名保存的问题，也允许我们将多个文件组织到一起
		1.构建树对象
           git update-index --add --cacheinfo 100644 \
			83baae61804e65cc73a7201a7252750c76066a30 test.txt
		   git write-tree
		2.查看树对象

#####3.提交对象（commit）
      
     三者之间的关系：提交对象->树对象->git对象
####九.git核心概念-2
#####1.工作区
#####2.暂存区
#####3.版本区
####十.git特点
#####1.近乎所有操作都是本地执行
#####2.时刻保持数据完整性(每一个提交对象对应整个项目)
#####3.多数操作仅添加数据
#####4.文件的三种状态 
        已提交（committed）
        已修改（modified）
        已暂存（staged）
####十一分支--指向提交对象的索引
       需求：版本穿梭  新增需求  不污染主分支
#####新建分支            
        git branch 分支名  (在当前的提交对象上新建分支)
        git branch name commitHash(指定的提交对象  版本穿梭)切换分支           
        git checkout 分支名 !!!!!! 每次切换分支时一定要将当前工作目录中的修改 add commit 掉如果不这么做 基于checkout的安全机制 它是不允许直接覆盖工作目录 它会做一个检查尽可能的保留你的修改这样很容易启冲突.!!!!!!
                                
#####新建 + 切换分支     
        git checkout -b 分支名
#####删除分支            
        git branch -d 已合并的分支
        git branch -D 未合并的分支
#####查看分支列表          
        git branch    总的分支
        git branch --merged     已合并的分支
        git branch --no-merged  未合并的分支
        git branch -v           查看某一个分支的最后一次提交
        git log --oneline --decorate --graph --all  查看完整的分支图分支合并
        快进合并  a merge b   b是a的直接后代
        典型合并  a merge b   a跟a不在同一条线上
                    起冲突:   手动去修改文件  
                    标记解决冲突: 将冲突文件加入暂存区
                    提交成功后即完成典型合并
                        



  