# node_test
        node练习

## 启动数据库
        在当前目录创建文件夹，MongoData

        双击 mongodb_start.bat，即可开启数据库，
        运行应用时，应保持数据库的链接，黑框不要关闭。
        
        打开命令行
            mongod --dbpath ~\MongoData     启动数据库
            mongo       进入mongo环境，可以对数据库进行操作

## 启动node应用

    到指定目录，命令行执行
        node app.js