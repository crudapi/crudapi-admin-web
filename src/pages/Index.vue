<template>
  <div class="q-pa-md home">
    <div>
      <q-banner inline-actions class="text-black bg-listcolor">
          <span class="title">元数据</span>
          <template v-slot:action>
            <q-btn
              dense
              flat
              unelevated
              round
              color="primary"
              @click="metadataExpand = !metadataExpand" 
              :icon="metadataExpand ? 'expand_less' : 'expand_more'"
            />
          </template>
      </q-banner>
      <div v-show="metadataExpand" class="q-py-md q-pl-md row items-start q-gutter-md">
          <q-card clickable v-ripple flat bordered class="my-card click-card col"
              @click="onMetadataSeqClick()" >
            <q-card-section class="bg-primary text-white">
              <div class="text-h6">序列号</div>
              <div class="text-subtitle2">流水号配置</div>
            </q-card-section>
          </q-card>

          <q-card clickable v-ripple flat bordered class="my-card click-card col"
            @click="onMetadataTableClick()">
            <q-card-section class="bg-teal text-white">
              <div class="text-h6">表</div>
              <div class="text-subtitle2">动态表单设计</div>
            </q-card-section>
          </q-card>

          <q-card clickable v-ripple flat bordered class="my-card click-card col"
            @click="onMetadataRelationClick()">
            <q-card-section class="bg-orange text-white">
              <div class="text-h6">关系</div>
              <div class="text-subtitle2">表关联管理</div>
            </q-card-section>
          </q-card>
      </div>
    </div>
    
    <div class="q-pt-md">
      <q-banner inline-actions class="text-black bg-listcolor">
          <span class="title">业务数据</span>
          <template v-slot:action>
            <q-btn
              dense
              flat
              unelevated
              round
              color="primary"
              @click="businessExpand = !businessExpand" 
              :icon="businessExpand ? 'expand_less' : 'expand_more'"
            />
          </template>
      </q-banner>

      <div v-show="businessExpand">
        <div class="q-pt-md  q-pl-md " :key="item.id" v-for="item in modules">
          <q-banner clickable inline-actions class="text-black bg-listcolor">
              <span class="title">{{item.name}}</span>
              <template v-slot:action>
                <q-btn
                  dense
                  flat
                  unelevated
                  round
                  color="primary"
                  @click="onConfigClick(item)"
                  icon="settings"
                />
                <q-btn
                  dense
                  flat
                  unelevated
                  round
                  color="primary"
                  @click="item.expanded = !item.expanded" 
                  :icon="item.expanded ? 'expand_less' : 'expand_more'"
                />
              </template>
          </q-banner>

          <div v-show="item.expanded" class="q-pt-md row items-start q-gutter-md">
              <q-item 
              :active="active" active-class="text-primary"
              clickable v-ripple @click="onModuleLineClick(moduleLine)" 
              :key="moduleLine.id" v-for="moduleLine in item.moduleLines"
              > 
                <q-item-section>
                  <q-item-label>{{moduleLine.table.caption}}</q-item-label>
                  <q-item-label caption>{{moduleLine.table.name}}</q-item-label>
                </q-item-section>
              </q-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
.home
  .title
    font-size: 16px;
    
  .my-card
    min-width: 150px !important;  
    max-width: 250px !important;

  .click-card
    cursor:pointer

</style>

<script>
import { tableService } from "../service";

export default {
  name: "PageHome",
  data () {
    return {
      metadataExpand: true,
      businessExpand: true,
      modules:[],
      active: true
    }
  },

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
    async init() {
      console.info("home->init");
      this.$store.commit(
        "config/updateIsAllowBack",
        this.$route.meta.isAllowBack
      );

      await this.loadData();
    },

    async loadData() {
      try {
        const modules = await tableService.list("module", 0, 9999, null, null, null);
        
        for (let i = 0; i < modules.length; i++) {
            modules[i].expanded = true;
        }

        this.modules = modules;
      } catch (error) {
        console.error(error);
      }
    },
    onConfigClick(module) {
       this.$router.push("/business/module/" + module.id);
    },
    onModuleLineClick(moduleLine) {
       this.$router.push("/business/" + moduleLine.table.name);
    },
    onMetadataSeqClick() {
       this.$router.push("/metadata/sequences");
    },
    onMetadataTableClick() {
       this.$router.push("/metadata/tables");
    },
    onMetadataRelationClick() {
       this.$router.push("/metadata/relations");
    }
  }
};
</script>
