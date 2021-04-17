# Git

**创建版本库**

1. 创建一个空目录（空文件夹）
2. cd切换到空目录中
3. 打开git bash使用git init命令把目录变成Git可管理的仓库

**添加文件到版本库**

1. 编写一个readme.txt文件，放到该目录下（或子目录）

2. 用git add命令把文件添加到仓库，可以一次提交多个文件

   ```bash
   git add readme.txt
   git add file1.txt file2.txt
   ```

3. 用git commit命令把文件提交到仓库

   ```
   git commit -m 'description'
   ```

**查看仓库目前状态**

```bash
git status
```

**查看difference，查看文件修改的内容**

```bash
git diff readme.txt
```

**查看历史记录，显示从最近到最远的提交日志**

```bash
git log
git log --pretty=oneline//只显示commit id和描述信息
```

**回退到上一版本**，HEAD表示当前版本，HEAD^表示上一版本，上100个版本HEAD~100

```bash
git reset --hard HEAD^
```

git log也会删去后面的版本信息

**取消回退**，找到最新版本的commit id

```bash
git reset --hard a3f484
```

**显示每一次命令**

```bash
git reflog
```

**工作区和暂存区**

工作区：在电脑中能看到的目录

版本库：工作区中的隐藏目录.git

Git的版本库中最重要的是称为stage的暂存区，以及Git自动创建的第一个分支master，指向master的指针叫HEAD

git add就是把文件修改添加到暂存区

git commit就是把暂存区内容提交到当前分支

**实例**

修改readme.txt文件，添加一个LICENSE文本文件

git status查看状态：readme.txt被修改但没有放到stage中，LICENSE没有被跟踪（Untracked）

git add添加到暂存区

git commit提交到分支

提交完后，工作区是干净的

**管理修改**

Git跟踪的是修改而不是文件

怎么提交两次修改：

1）每次修改后分别add和commit

2）每次修改后分别add，最后commit

**撤销修改**

```bash
git checkout -- readme.txt
```

分为两种情况：

1. readme.txt修改后没有放到暂存区，把readme.txt在工作区的修改全部撤销
2. readme.txt已经添加到暂存区后，又作了修改，回到添加到暂存区后的状态并清空暂存区

撤销已经提交到暂存区的修改，把暂存区的修改回退到工作区

```bash
git reset HEAD readme.txt
```

**删除文件**

本地删除test.txt后，工作区与版本库不一致

从版本库中删除该文件

```bash
git rm test.txt
```

恢复该文件从版本库中

```bash
git checkout -- test.txt
```

**添加远程库**，20001028是Github账户名，gittest1是仓库名

```bash
git remote add origin git@github.com:20001028/gittest1.git
git push -u origin master//把本地库内容推送到远程库上
git push origin master//后面的提交不需要-u
git remote -v//查看远程库信息
git remote rm origin//删除远程库
```

**从远程库克隆**

```bash
git clone git@github.com:20001028/gittest1.git
```

**创建与合并分支**

```bash
git checkout -b dv//创建并切换到dev分支
git branch dev//创建dev分支
git checkout dev//切换到dev分支
git branch//列出所有分支，当前分支前面有*号
git merge dev//合并dev分支的工作成果到master上
git branch -d dev//删除分支dev
git switch -c dev//创建并切换到dev分支
git switch master//切换到master分支
```

**解决冲突**

```

```

**分支管理策略**

--no-ff参数表示禁用Fast forward

合并分支会创建一个新的commit

```bash
git merge --no-ff -m 'merge with no-ff' dev
```

**Bug分支**

```bash
git stash//把当前工作现场储藏起来，以后恢复现场继续工作
git stash list//查看工作现场
git stash apply//stash内容不删除
git stash pop//恢复的同时删除stash内容
```

**Feature分支**

```bash
git switch -c feature-vulcan
git add vulcan.py
git switch dev
git branch -d feature-vulcan//分支没有合并，删除会丢失修改
git branch -D feature-vulcan//
```

**多人协作**

```bash
git remote -v//显示可以抓取和推送的地址
git push origin master//推送分支
//master是主分支要同步
//dev分支是开发分支，也要同步
//bug和feature分支具体情况
git pull//拉取分支
```

