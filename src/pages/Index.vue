<template>
  <div class="q-pa-md bg-page">
    <div class="text-h6">Hello, crudapi!</div>
    <div class="q-pa-md">crudapi是crud+api组合，表示增删改查接口，是一款零代码可配置的产品。使用crudapi可以告别枯燥无味的增删改查代码，让您更加专注业务，节约大量成本，从而提高工作效率。crudapi的目标是让处理数据变得更简单，所有人都可以免费使用！无需编程，通过配置自动生成crud增删改查RESTful API，提供后台UI管理业务数据。基于主流的开源框架，拥有自主知识产权，支持二次开发。</div>

    <div class="text-h6">无需编程</div>
    <div class="q-pa-md">以元数据为基础，无需编程，只需配置表单和关系即可。以最少的配置帮助你专注于业务。支持主子表，级联保存等。</div>

    <div class="text-h6">标准的RESTful API</div>
    <div class="q-pa-md">默认生成CRUD API，支持标准的POST，PATCH，GET，DELETE等操作，丰富的Swagger API文档: <a target="_blank"  href="https://demo.crudapi.cn/swagger-ui.html">https://demo.crudapi.cn/swagger-ui.html</a></div>

    <div class="text-h6">Web后台UI</div>
    <div class="q-pa-md">
      基于Material Design风格的UI，界面美观，使用方面。支持元数据的管理和业务数据的增删改查操作！目前前端代码crudapi-admin-web免费开源！
    </div>
    <div class="q-px-md">
      Github地址：
      <a target="_blank"  href="https://github.com/crudapi/crudapi-admin-web">
        https://github.com/crudapi/crudapi-admin-web
      </a>
    </div>
    <div class="q-px-md">
      Gitee国内镜像：
      <a target="_blank"  href="https://gitee.com/crudapi/crudapi-admin-web">
        https://gitee.com/crudapi/crudapi-admin-web
      </a>
    </div>

    <div class="q-pt-md text-h6">帮助文档</div>
    <div class="q-pa-md"><a target="_blank"  href="https://help.crudapi.cn">https://help.crudapi.cn</a></div>

    <div class="text-h6">官网</div>
    <div class="q-pa-md"><a target="_blank"  href="https://crudapi.cn">https://crudapi.cn</a></div>
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
