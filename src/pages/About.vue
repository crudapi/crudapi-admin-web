<template>
  <div class="q-pa-md bg-page">
    <div class="text-h6">简介</div>
    <div class="q-pa-md">crudapi是crud+api组合，表示增删改查接口，是一款零代码可配置的产品。使用crudapi可以告别枯燥无味的增删改查代码，让您更加专注业务，节约大量成本，从而提高工作效率。crudapi的目标是让处理数据变得更简单，所有人都可以使用！无需编程，通过配置自动生成crud增删改查RESTful API，提供后台Web管理UI。基于主流的开源框架，前端采用Vue + Quasar，后端采用Spring Boot + Jdbc， 数据库支持MySQL、PostgreSQL、SQL Server和Oracle，支持二次开发，包括API和SDK两种方式。</div>

    <div class="text-h6">Web管理UI</div>
    <div class="q-pa-md">
      基于Material Design风格的UI，界面美观，使用方面。支持元数据的管理和业务数据的增删改查操作！前端Vue代码crudapi-admin-web开源！<a target="_blank" href="https://help.crudapi.cn/crudapi-admin-web/helloworld.html">前端Vue环境搭建</a>
    </div>

    <div class="text-h6">后台Java服务</div>
    <div class="q-pa-md">基于Java+Spring boot默认生成标准的RESTful CRUD API，支持标准的POST，PATCH，GET，DELETE等操作，丰富的Swagger API文档. <a target="_blank" href="https://help.crudapi.cn/crudapi-example/helloworld.html">后台Java环境搭建</a>
    </div>

    <div class="q-pt-md text-h6">联系方式</div>
      <div class="q-pa-md">
        QQ群：632034576<br/>
        QQ：1440737304
      </div>
      <div class="q-pa-md">
      添加微信（暗号crudapi），加入crudapi开发者群！
      <div align="left">
        <img width = "200" src="crudapiweixin.jpeg">
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
export default {
  name: "PageAbout",

  created() {
    console.info("about->created");
    this.init();
  },
  mounted: function() {
    console.info("about->mounted");
  },
  activated: function() {
    console.info("about->activated");
  },
  deactivated: function() {
    console.info("about->deactivated");
  },
  updated: function() {
    console.info("about->updated");
  },
  destroyed: function() {
    console.info("about->destroyed");
  },
  methods: {
    init() {
      console.info("about->init");
      this.$store.commit(
        "config/updateIsAllowBack",
        this.$route.meta.isAllowBack
      );
    }
  }
};
</script>
