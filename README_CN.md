# crudapi后台管理WEB (crudapi-admin-web)

## 语言
[English](README.md)

### crudapi👋
crudapi is a combination of crud and api, which stands for create, delete, update and retrieve interface. It is a zero-code product by configuring. crudapi allows you to focus on your business, save a lot of money, and improve your work efficiency by eliminating the tedious process of crud code. crudapi aims to make working with data easier and is free for everyone! 

### 增删改查接口👋
crudapi是crud+api组合，表示增删改查接口，是一款零代码可配置的产品。使用crudapi可以告别枯燥无味的增删改查代码，让您更加专注业务，节约大量成本，从而提高工作效率。crudapi的目标是让处理数据变得更简单，所有人都可以免费使用！

## GIT地址
名称 | 类型 | 授权 | GitHub仓库 | Gitee仓库
--- | --- | --- | --- | ---
crudapi-admin-web | Vue Qusar源码 | 开源 | [crudapi-admin-web](https://github.com/crudapi/crudapi-admin-web) | [crudapi-admin-web](https://gitee.com/crudapi/crudapi-admin-web)
crudapi (main)| Java源码(1.0稳定版) | 开源 | [crudapi](https://github.com/crudapi/crudapi) | [crudapi](https://gitee.com/crudapi/crudapi)
crudapi (ft-crudapi-2)| Java源码(2.0开发中) | 开源 | [crudapi](https://github.com/crudapi/crudapi/tree/ft-crudapi-2) | [crudapi](https://gitee.com/crudapi/crudapi/tree/ft-crudapi-2)
crudapi-example| Java集成SDK Demo | 开源 | [crudapi-example](https://github.com/crudapi/crudapi-example) | [crudapi-example](https://gitee.com/crudapi/crudapi-example)

## 安装npm依赖包
```bash
npm install
```

## 调试模式运行（代码热加载，错误提示等）
```bash
npm run dev
```

## 代码静态检查
```bash
npm run lint
```

## 编译发布
```bash
npm run build
```

## 修改配置
修改quasar.conf.js文件中devServer->proxy->target

```javascript
devServer: {
  https: false,
  port: 8080,
  open: true,
  proxy: {
    "/api/*": {
      target: "http://127.0.0.1:8888",
      changeOrigin: true
    }
  }
}
```

## Docker部署
```bash
docker build -t crudapi-admin-web:latest .
docker rm -f crudapi-admin-web
docker run -d -p 80:80 --name crudapi-admin-web crudapi-admin-web:latest
```
访问[ http://127.0.0.1/crudapi ](http://127.0.0.1/crudapi)


## 文档

[https://help.crudapi.cn](https://help.crudapi.cn)

1. [ 基于Vue和Quasar的前端SPA项目实战之环境搭建（一）](https://help.crudapi.cn/crudapi-admin-web/helloworld.html)
2. [ 基于Vue和Quasar的前端SPA项目实战之用户登录（二）](https://help.crudapi.cn/crudapi-admin-web/login.html)
3. [ 基于Vue和Quasar的前端SPA项目实战之布局菜单（三）](https://help.crudapi.cn/crudapi-admin-web/layout.html)
4. [ 基于Vue和Quasar的前端SPA项目实战之序列号（四）](https://help.crudapi.cn/crudapi-admin-web/sequence.html)
5. [ 基于Vue和Quasar的前端SPA项目实战之动态表单（五）](https://help.crudapi.cn/crudapi-admin-web/metadatatable.html)
6. [ 基于Vue和Quasar的前端SPA项目实战之表关系（六）](https://help.crudapi.cn/crudapi-admin-web/metadatarelation.html)
7. [ 基于Vue和Quasar的前端SPA项目实战之业务数据（七）](https://help.crudapi.cn/crudapi-admin-web/business.html)
8. [ 基于Vue和Quasar的前端SPA项目实战之docker部署（八）](https://help.crudapi.cn/crudapi-admin-web/docker.html)
9. [ 基于Vue和Quasar的前端SPA项目实战之数据导入（九）](https://help.crudapi.cn/crudapi-admin-web/import.html)
10. [ 基于Vue和Quasar的前端SPA项目实战之文件上传（九）](https://help.crudapi.cn/crudapi-admin-web/fileupload.html)
11. [ 基于Vue和Quasar的前端SPA项目实战之联合索引（十一）](https://help.crudapi.cn/crudapi-admin-web/unionindex.html)
12. [ 基于Vue和Quasar的前端SPA项目实战之数据库逆向（十二）](https://help.crudapi.cn/crudapi-admin-web/dbfirst.html)
13. [ 基于Vue和Quasar的前端SPA项目实战之数据导出（十三）](https://help.crudapi.cn/crudapi-admin-web/export.html)
14. [ 基于Vue和Quasar的前端SPA项目实战之模块管理（十四）](https://help.crudapi.cn/crudapi-admin-web/module.html)
15. [ 基于Vue和Quasar的前端SPA项目实战之元数据导出导入（十五）](https://help.crudapi.cn/crudapi-admin-web/metadataexportimport.html)
16. [ 基于Vue和Quasar的前端SPA项目实战之拖拽表单定制（十六）](https://help.crudapi.cn/crudapi-admin-web/formbuilder.html)

持续更新中。。。

## 演示
演示地址：[https://demo.crudapi.cn/crudapi/](https://demo.crudapi.cn/crudapi/)

![table](./img/table.png)
表单对应不同的对象

![relation](./img/relation.png)
表关系图显示不同对象之间的关系

![customer](./img/customer.png)
业务数据操作

## Java SDK 二次开发
### GitHub仓库
[https://github.com/crudapi/crudapi-example](https://github.com/crudapi/crudapi-example)

### Gitee仓库
[https://gitee.com/crudapi/crudapi-example](https://gitee.com/crudapi/crudapi-example)


## 联系方式
#### 邮箱
admin@crudapi.cn

#### QQ
1440737304

#### QQ群
632034576

#### 微信
undefinedneqnull

<div align="left">
  <img width = "200" src="./img/crudapiweixin.jpeg">
</div>

#### 微信群
<div align="left">
  <img width = "200" src="./img/weixinqun.png">
</div>

如有任何问题，欢迎咨询和交流！

## 授权

Copyright (c) 2021-present crudapi

[MIT License](https://baike.baidu.com/item/MIT许可证)
