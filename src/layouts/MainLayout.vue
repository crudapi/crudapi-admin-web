<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-layoutcolor">
      <q-toolbar class="text-white">
        <q-btn
          unelevated
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-btn
          v-show="isAllowBack === true"
          flat
          dense
          round
          @click="goBack"
          icon="arrow_back_ios"
          aria-label="Back"
        >
        </q-btn>
        <q-btn
          flat
          dense
          round
          @click="refresh"
          icon="refresh"
          aria-label="Refresh"
        >
        </q-btn>

        <q-space />
          <div class="q-px-md">
            <a class="text-white" target="_blank"  href="https://crudapi.cn">
              crudapi官网
            </a>
          </div>
          <div class="q-px-md">
            <a class="text-white" target="_blank"  href="https://help.crudapi.cn">
              帮助文档
            </a>
          </div>
          <div class="q-px-md">
            <a class="text-white" href="/about">
              联系我们
            </a>
          </div>
          <div class="q-px-md">
            <a class="text-white" target="_blank"  href="https://demo.crudapi.cn/swagger-ui.html">
              Swagger API
            </a>
          </div>
          <div class="q-px-md">
            <a class="text-white" target="_blank"  href="https://github.com/crudapi/crudapi-admin-web">
              Github源码
            </a>
          </div>
          <div class="q-px-md">
            <a class="text-white" target="_blank"  href="https://gitee.com/crudapi/crudapi-admin-web">
              Gitee源码
            </a>
          </div>

         <q-btn
          unelevated
          :label="userInfo.realname"
          flat
          no-caps
          icon-right="arrow_drop_down"
          class="q-mx-xs"
        >
          <q-menu transition-show="scale" transition-hide="scale">
            <div class="column bg-layoutcolor text-white profile-menu">
              <q-item
                clickable
                @click="logout"
                class="row items-center q-px-lg"
              >
                <q-icon name="exit_to_app" />
                <q-item-label class="q-pl-md menu-label">退出登录</q-item-label>
              </q-item>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="600"
      content-class="bg-white"
    >
      <div clickable v-ripple @click="goHome"
          class="bg-layoutcolor text-white"
          style="height: 50px;border: 1px #25272A solid;cursor:pointer"
        >
        <div class="text-center logo">
          <div class="text-center">crudapi</div>
        </div>
      </div>
      <q-tree
        selected-color="primary"
        :nodes="allMenu"
        :selected.sync="selected"
        @update:selected="onMenuClickAction()"
        ref="qTreeProxy"
        node-key="labelKey"
        default-expand-all
        no-connectors
      />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="stylus">
a
  text-decoration: none;
  
.profile-menu
  font-size:16px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height:22px;

.icon-xiala
  font-size: 6px !important;
.tree-title
  margin-top: 12px;
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  line-height:22px;

.logo
  font-size:30px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:500;
  img
    height:46px;
</style>

<script>
import { metadataTableService, metadataSequenceService } from "../service";
import { userService } from "../service";

export default {
  name: 'MainLayout',

  computed: {
    userInfo: {
      get() {
        return this.$store.state.user.userInfo;
      }
    },
    isAllowBack: {
      get() {
        return this.$store.state.config.isAllowBack;
      }
    }
  },
  data () {
    return {
      leftDrawerOpen: true,

      selected: null,

      metadataMenu: {
        label: "元数据",
        labelKey: "metadata",
        icon: "work_outline",
        children: [
          {
            label: "序列号",
            labelKey: "/metadata/sequences",
            icon: "format_list_numbered",
            children: [
            ]
          }, {
            label: "表",
            labelKey: "/metadata/tables",
            icon: "o_table_rows",
            children: [
            ]
          }, {
            label: "关系",
            labelKey: "/metadata/relations",
            icon: "content_copy",
            children: [
            ]
          }
        ]
      },

      businessMenu: {
        label: "业务数据",
        labelKey: "business",
        icon: "business",
        children: [
        ]
      },

      systemBusinessMenu: {
        label: "内置数据",
        labelKey: "systemBusiness",
        icon: "tab",
        children: [
        ]
      },

      systemMenu: {
        label: "系统",
        labelKey: "system",
        icon: "o_build",
        children: [
          {
            label: "设置",
            labelKey: "/setting",
            icon: "o_settings"
          },
          {
            label: "关于",
            labelKey: "/about",
            icon: "o_info"
          }
        ]
      },

      allMenu: [
      ]
    }
  },

  created() {
    this.$root.$on("updateMenuTree", this.updateMenuTreeCb);
    this.init();
  },

  mounted: function() {

  },

  activated: function() {

  },

  deactivated: function() {

  },

  updated: function() {

  },

  destroyed: function() {
    this.$root.$off("updateMenuTree", this.updateMenuTreeCb);
  },

  methods: {
    async init() {
      console.info("init");
      try {
        const tables = await metadataTableService.list(1, 9999);
        for (let i = 0; i < tables.length; i++) {
          let table = tables[i];
          // if (table.name === "table") {
          //   continue;
          // }

          if (table.systemable) {
            this.systemBusinessMenu.children.push({
                label: table.caption,
                labelKey: this.getBussinessPath(table.name),
                icon: "insert_chart_outlined"
            });
          } else {
            this.businessMenu.children.push({
                label: table.caption,
                labelKey: this.getBussinessPath(table.name),
                icon: "insert_chart_outlined"
            });
          }
        }

        this.allMenu.push(this.businessMenu);
        this.allMenu.push(this.systemBusinessMenu);
        this.allMenu.push(this.metadataMenu);
        this.allMenu.push(this.systemMenu);

        this.$refs.qTreeProxy.setExpanded("business", true);
        this.$refs.qTreeProxy.setExpanded("systemBusiness", true);
        this.$refs.qTreeProxy.setExpanded("metadata", true);
        this.$refs.qTreeProxy.setExpanded("system", true);
      } catch (error) {
        console.error(error);
      }
    },

    async updateMenu() {
      console.info("updateMenu");
      try {
        this.businessMenu.children.splice(0, this.businessMenu.children.length);
        const tables = await metadataTableService.list(1, 9999);
        for (let i = 0; i < tables.length; i++) {
          let table = tables[i];
          if (!table.systemable) {
            this.businessMenu.children.push({
                label: table.caption,
                labelKey: this.getBussinessPath(table.name),
                icon: "insert_chart_outlined"
            });
          }
        }
      } catch (error) {
        console.error(error);
        this.$q.notify(error);
      }
    },

    updateMenuTreeCb: function() {
      this.updateMenu();
    },

    getBussinessPath: function(tableName) {
      return "/business/" + tableName
    },

    getTablePath: function(id) {
      return "/metadata/tables/" + id
    },

    getSequencePath: function(id) {
      return "/metadata/sequences/" + id
    },

    onMenuClickAction() {
      console.info("onMenuClickAction");
      if (this.selected) {
        if (this.selected && this.selected.indexOf("/") === 0) {
          if (this.$router.currentRoute.fullPath !== this.selected) {
            console.info("onMenuClickAction push" + this.selected);
            this.$router.push(this.selected)
          } else {
            console.info("onMenuClickAction skip");
          }
        }
      }
    },
    refresh() {
      window.location.reload(true);
    },
    goBack() {
      this.$router.go(-1);
    },
    goHome() {
      this.$router.push("/");
    },
    logout() {
       this.$store
        .dispatch("user/logout")
        .then(async () => {
          this.$router.push("/login");
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
}
</script>
