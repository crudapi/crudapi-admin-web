<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card flat bordered class="my-card col" :key="item.id" v-for="item in modules">
      <q-card-section class="text-white" :class="item.color ? item.color: 'bg-primary'">
        <div class="text-h6">{{item.name}}</div>
        <div class="text-subtitle2">共{{item.moduleLines.length}}个表</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn @click="onConfigClick(item)" unelevated  color="primary">配置</q-btn>
        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="item.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="item.expanded = !item.expanded"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="item.expanded">
          <q-separator />
          <q-card-section class="text-subitle2">
            <q-list dense>
              <q-item clickable v-ripple @click="onModuleLineClick(moduleLine)" 
              :key="moduleLine.id" v-for="moduleLine in item.moduleLines">
                <!-- <q-item-section>
                  <a style="text-decoration: none;color: black;" :href="'business/' + moduleLine.table.name">{{moduleLine.table.caption}}</a>
                </q-item-section> -->
                <q-item-section>
                  {{moduleLine.table.caption + ' ' + moduleLine.table.name}}
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>

<style lang="stylus">
.my-card
  min-width: 200px !important;  

</style>

<script>
import { tableService } from "../service";

export default {
  name: "PageHome",
  data () {
    return {
      modules:[]
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
            modules[i].expanded = false;
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
    }
  }
};
</script>
