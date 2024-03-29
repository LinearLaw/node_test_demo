#   node_test
        node练习

##  启动数据库
        首先，安装好mongodb数据库。

        接着，安装依赖，打开命令行，npm i
        
        然后，安装依赖后，在当前目录创建文件夹，MongoData
            tips:若已经存在MongoData文件夹导致出错，删除MongoData文件夹重新创建即可

        双击 mongodb_start.bat，即可开启数据库，
        运行应用时，应保持数据库的链接，黑框不要关闭。
        
        打开命令行
            mongod --dbpath ~\MongoData     启动数据库
            mongo       在cmd中进入mongo环境，可以对数据库进行操作

##  启动node应用

    到指定目录，命令行执行
        node app.js


##  前后端分离项目线上部署思路

```
    后台：java
    前台：html
    
    1、前后端交互使用ajax进行；

    2、前端本地开发搭建代理服务器请求java接口；

    3、前端本地开发，
        多页面采用artTemplate模板、jquery、bootstrap等随意，
        或采用vue、react等单页面框架当做页面模板引擎，可单页面可多页面。
        最后使用webpack打包，打包后的文件作为项目部署的前端文件。

        Tips：使用vue、react等框架需要注意其不适合在PC端执行单一页面，
            主要问题在于搜索引擎优化（SEO）、广告插入、页面渲染时长等问题。
            单页面应用如果太过庞大，有三种方案，
                第一种是直接放弃高度集中的单页面，拆分成多页面，
                    （很有效，但需要配置webpack，需要拆分业务规则）
                第二种是使用webpack的延迟加载功能，减少单次加载资源大小，
                    （可以缓解应用过大的压力，但对于本身庞大的页面会有加载慢的情况）
                第三种是改变前端架构，部署服务，架设node同构直出，有nuxt.js、next.js
                    （项目如果开发进度比较后期，改动较大）。
        Tips：单页面打包可以使用脚手架。
            多页面需要配置webpack。
    
    4、上线部署，这时候有了后端API服务，有前端html两个东西，于是有两套解决方案，
        第一种，html页面放到后端服务中去，以静态资源的形式部署，
            资源呈递的路由规则由后端进行控制；
            
        第二种，前端和后端分成两种服务，后端部署API服务，前端使用nginx来做代理转发，
            呈递html页面、静态资源、前端请求后端API都由nginx转发，

        第三种，nodejs中间层，nodejs调用后台API进行数据首屏加载，并呈递静态页面
```
### 前端需要处理的问题

- html、css布局，按钮、颜色、背景、链接
- 动态效果，css动画，过渡效果
- 数据处理，信息展现，列表展现、详情展现，
- 表单校验，表单提交，信息提示
- 用户交互操作，弹窗提示、确认信息
- 数据上报，数据可视化
- 用户权限控制，登录控制，主要是水平权限校验
- 摄像头、录音机、音频视频播放器控制
- 单元测试

### 后端需要处理的问题

- 呈递静态资源，图片、文件、html、css、
- 数据接口API，增删改查，数据库查询，数据处理拼装，
- 用户权限管理，水平权限校验、垂直权限校验，登录拦截，权限拦截
- 日志记录，接口日志、错误日志、状态信息
- 缓存管理，热点资源缓存，快速响应，
- 文件服务、文件下载、上传
- 邮件服务、短信服务、对外接口调用
- 单元测试

# Calender

> 以下为个人所需的学习清单。   

Todo List：

- Nodejs应用
  - 日志管理
  - 服务持久化，自重启机制
  - Linux系统维护、应用部署（在做了在做了）

- 登录注册   
  - 登录状态维持：SessionID、token
  - 权限管理：用户 - 角色 - 权限 三级结构（初步构想）

- 文件上传   
  - 静态资源服务
  - 图片文件上传
  - 下载业务，二进制流返回
  - 非图片文件上传，二进制流存储

- 数据库管理
  - 数据库持久化
  - 数据库表结构规则
  - 多类型数据库：Mogodb、Redis、MySQL，各自对应的场景；
  - 读写锁控制，缓存控制

- 安全防御
  - XSS
  - CSRF

- 分布式结构
- 面向切面
