<template>
  <div class="q-pa-md bg-page">
    <div class="text-h6">简介</div>
    <div class="q-pa-md">crudapi是crud+api组合，表示增删改查接口，是一款零代码可配置的产品。使用crudapi可以告别枯燥无味的增删改查代码，让您更加专注业务，节约大量成本，从而提高工作效率。crudapi的目标是让处理数据变得更简单，所有人都可以免费使用！无需编程，通过配置自动生成crud增删改查RESTful API，提供后台Web管理UI。基于主流的开源框架，前端采用Vue + Quasar，后端采用Spring Boot + Jdbc 数据库支持MySql，拥有自主知识产权，支持二次开发，包括API和SDK两种方式。个人使用永久免费，商业使用和定制开发请联系客服！</div>

    <div class="text-h6">Web管理UI</div>
    <div class="q-pa-md">
      基于Material Design风格的UI，界面美观，使用方面。支持元数据的管理和业务数据的增删改查操作！前端Vue代码crudapi-admin-web免费开源！<a target="_blank" href="https://help.crudapi.cn/crudapi-admin-web/helloworld.html">前端Vue环境搭建</a>
    </div>

    <div class="text-h6">后台Java服务</div>
    <div class="q-pa-md">基于Java+Spring boot默认生成标准的RESTful CRUD API，支持标准的POST，PATCH，GET，DELETE等操作，丰富的Swagger API文档. <a target="_blank" href="https://help.crudapi.cn/crudapi-example/helloworld.html">后台Java环境搭建</a>
    </div>


    <div class="text-h6">价格</div>
    <div class="q-pa-md">
      <div>个人版免费使用，购买商业版，送所有源码，包括前端Vue源码和后台Java源码.</div>
      <img width="450" alt="logo" src="price.png" />
    </div>

    <div class="q-pt-md text-h6">联系方式</div>
      <div class="q-pa-md">
      
      添加客服微信（暗号crudapi），加入crudapi交流群可享商业版5折限时优惠！
      <div align="left">
        <img width = "200" src="crudapiweixin.jpeg">
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
export default {
  name: "PageHome",

  created() {
    console.info("home->created");
    this.init();
  },
  mounted: function() {
    console.info("home->mounted");
  },
  activated: function() {
    console.info("home->activated");
  },
  deactivated: function() {
    console.info("home->deactivated");
  },
  updated: function() {
    console.info("home->updated");
  },
  destroyed: function() {
    console.info("home->destroyed");
  },
  methods: {
    init() {
      console.info("home->init");
      this.$store.commit(
        "config/updateIsAllowBack",
        this.$route.meta.isAllowBack
      );
    },

    loginAction() {
      this.$router.push("/login");
    }
  }
};
</script>
