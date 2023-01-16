![2LgzN.png](https://i.328888.xyz/2023/01/17/2LgzN.png)
# 简介
作为一个菜鸟程序员，记录自己的学习历程是一个很有仪式感的事情，同时，写博客也是一个将所学内容内化并输出的过程。
一般来说，互联网上有许多成熟的博客框架，如VuePress、Hexo等，甚至有Docker镜像，一键部署就可以使用了，还有些甚至不需要自己拥有服务器。  
**但是**，还有什么能比自己造一个博客出来更有成就感呢？即实践自己所学，又高度客制化，打造一个完全符合自己喜好的博客。
本项目开始于2022年11月25日，基本结束于2022年12月29日，边学边做边调试，这段时间里学到了不少，也踩了不少坑。
所幸，项目完成了，结果并不错。
> 感谢众多开源开发者愿意贡献他们的成果，能让这个项目开展的轻松一些，我也愿意分享我的成果，希望能帮到别人。
# 界面展示
本项目使用TailwindCSS作为CSS框架，我适配了三个尺寸的响应式外观，PC端和移动端都能有很好的浏览体验。
![2LrJX.png](https://i.328888.xyz/2023/01/17/2LrJX.png)
![2LNBP.png](https://i.328888.xyz/2023/01/17/2LNBP.png)
![2LRDt.png](https://i.328888.xyz/2023/01/17/2LRDt.png)
![2LcrJ.png](https://i.328888.xyz/2023/01/17/2LcrJ.png)
# 功能介绍
| 技术栈方向 | 名称           | 备注                                |
| ---------- | -------------- | ----------------------------------- |
| 前端       | Vue3           | 渐进式JavaScript框架，前端开发必备  |
| 前端       | TypeScript     | JavaScript的超集，目前学的稀碎      |
| 前端       | Naive UI界面库 | 很好看，组件很多                    |
| 后端       | MySQL + Redis  | 数据库，分别存放整站数据和JWT Token |
| 后端       | Flask          | 后端框架，所有API的基础 |
本项目使用了Flask作为后端API服务，对我来说确实很趁手（只会Python，不会Java），但是感觉后端的代码我写的非常烂，还有很大的提升空间。
![2Lm5c.png](https://i.328888.xyz/2023/01/17/2Lm5c.png)
## 用户类接口
- 用户登录
- 用户注册
- 修改密码
- 用户登出
- 获取指定用户信息
- 获取本人信息
- 站内消息
## 轮播图、侧栏位接口
- 获取Banner数据
- 获取侧边栏数据
- 网站统计数据
## 文章接口
- 获取全部文章
- 获取热门文章
- 获取文章内容
- 发表文章
- 获取本人文章
- 编辑文章
- 文章标签
- 文章发表时间
## 分类、评论类接口
- 获取评论
- 发表评论
- 回复评论
- 获取文章分类
## 数据库设计
这一部分主要是操作一对多、多对一的外键查询，我认为还有提升空间，本项目数据库设计可以存在更优雅的方式
- 用户表
- 网站信息表
- 站内消息
- 文章表
  - 文章分类表
  - 文章详情表
  - 文章标签表
- 评论表
- 标签表
- 导航地址表
- 网站信息表
- 轮播图表
- 广告数据表
- 文章分类表
# 使用方法
## 前端部分
前端部分的运行很容易，只需要下面三个步骤即可，如果一切顺利会进入Vite的开发环境。
```shell
git clone git@github.com:TAHD3R/tahder-blog-vue3.git
cd tahder-blog-vue3
npm install
npm run dev
```
## 后端部分
运行环境需要安装redis存放jwt数据，需要使用python虚拟环境，配置完成后导入一下SQL文件
```shell
git clone git@github.com:TAHD3R/tahder-blog-flask-backend.git
cd tahder-blog-flask-backend
python3 -m venv venv
source .venv/bin/activate # 系统不同可能会不一样，可以查查Python虚拟环境怎么进入
pip install -r requirements.txt # 安装项目依赖
pip install gunicorn
vim config.py # 修改数据库和redis数据
gunicorn -w 5 -D -b 127.0.0.1:5000 application:app # 本项目使用Gunicorn
```
# 写在后面
这个项目还只是一个菜鸟的拙作，还有许多可以优化的地方，如果你有兴趣，看得上我的小作品，可以和我一起完善它！