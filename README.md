# Crudapi Admin Web (crudapi-admin-web)

## Language
[中文](README_CN.md)

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

## Install the dependencies
```bash
npm install
```

## Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
npm run dev
```

## Lint the files
```bash
npm run lint
```

## Build the app for production
```bash
npm run build
```

## Config
update file quasar.conf.js, set devServer->proxy->target
quasar.conf.js
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

## Docker
```bash
docker build -t crudapi-admin-web:latest .
docker rm -f crudapi-admin-web
docker run -d -p 80:80 --name crudapi-admin-web crudapi-admin-web:latest
```
Visit [ http://127.0.0.1/crudapi ](http://127.0.0.1/crudapi)

## Documentation

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

Ongoing updates...

## Demo
Demo url：[https://demo.crudapi.cn/crudapi/](https://demo.crudapi.cn/crudapi/)

![table](./img/table.png)
Metadata table

![table](./img/relation.png)
Table relation

![customer](./img/customer.png)
Bussiness Data

## Java SDK development
### GitHub repo
[https://github.com/crudapi/crudapi-example](https://github.com/crudapi/crudapi-example)

### Gitee repo
[https://gitee.com/crudapi/crudapi-example](https://gitee.com/crudapi/crudapi-example)

## Contact
#### Email
admin@crudapi.cn

#### QQ
1440737304

#### QQQun
632034576

#### Weixin
undefinedneqnull

<div align="left">
  <img width = "200" src="./img/crudapiweixin.jpeg">
</div>

#### WeixinQun
<div align="left">
  <img width = "200" src="./img/weixinqun.png">
</div>

If you have any questions, please contact us!

## License

Copyright (c) 2021-present crudapi

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
