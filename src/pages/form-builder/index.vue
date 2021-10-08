<template>
  <q-layout class="bg-page" view="hhh lpr lfr">
    <q-header  class="bg-white text-black" height-hint="98">
      <q-toolbar>

       <!--  <q-btn dense flat round icon="menu" @click="left = !left" /> -->

        <q-toolbar-title>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="页面构建" />
            <q-breadcrumbs-el :label="table.caption" />
          </q-breadcrumbs>
        </q-toolbar-title>

       <!--  <q-btn dense flat round icon="menu" @click="right = !right" /> -->
      </q-toolbar>
      <q-separator />
    </q-header>
    <q-drawer show-if-above v-model="left" side="left" bordered>
      <div>
        <draggable
          class="dragArea list-group"
          :list="list1"
          :group="{ name: 'people'}"
          @change="log"
        >
          <div
            class="list-group-item"
            v-for="element in list1"
            :key="element.name"
          >
            {{ element.caption }}
          </div>
        </draggable>
      </div>
    </q-drawer>

    <q-drawer show-if-above v-model="right" side="right" bordered>
      <CRawDisplayer class="col-3" :value="list1" title="List 1" />
      <CRawDisplayer class="col-3" :value="list2" title="List 2" />
    </q-drawer>

    <q-page-container>
      <div>
        <draggable
          class="dragArea list-group"
          :list="list2"
          group="people"
          @change="log"
        >
          <div
            class="list-group-item"
            v-for="element in list2"
            :key="element.name"
          >
            {{ element.caption }}
          </div>
        </draggable>
      </div>
    </q-page-container>

  </q-layout>
</template>

<style lang="stylus" scoped>
.dragArea
  min-height: 50px;
  
.list-group
  min-height: 20px;

.list-group-item
  cursor: move;
  position: relative;
  display: block;
  padding: .75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,.125);
  
.list-group-item i
  cursor: pointer;
  
</style>

<script>
import draggable from 'vuedraggable'
import { metadataTableService, metadataSequenceService } from "../../service";

export default {
  name: "formBulder",
  components: {
    draggable
  },
  data () {
    return {
      left: true,
      right: true,
      list1: [],
      list2: [],
      loading: true,
      table: {},
      sequenceLongOptions: [],
      sequenceStringOptions: []
    }
  },

  created() {
    this.init();
    console.info('created');
  },

  mounted: function() {
    console.info('mounted');
  },

  activated: function() {
    console.info('activated');
  },

  deactivated: function() {
    console.info('deactivated');
  },

  updated: function() {
    console.info('updated');
  },

  destroyed: function() {
    console.info('destroyed');
  },

  methods: {
    log: function(evt) {
      window.console.log(evt);
    },
    async init(id) {
      this.$store.commit(
        "config/updateIsAllowBack",
        this.$route.meta.isAllowBack
      );

      await this.loadData(id);
    },

    async loadData(id) {
      this.$q.loading.show({
        message: "加载中"
      });
      try {
        this.loading = true;
        const table = await metadataTableService.get(id || this.$route.params.id);
        this.table = table;
        this.list1 = table.columns;

        let sequences = await metadataSequenceService.list(1, 999);
        let sequenceLongOptions = sequences.filter(t => t.sequenceType === "LONG");
        let sequenceStringOptions = sequences.filter(t => t.sequenceType === "STRING");
        sequenceLongOptions.unshift({
          "id": -1,
          "caption": "无"
        });

        sequenceStringOptions.unshift({
          "id": -1,
          "caption": "无"
        });
        this.sequenceLongOptions = sequenceLongOptions;
        this.sequenceStringOptions = sequenceStringOptions;
        
        this.loading = false;
        this.$q.loading.hide();
      } catch (error) {
        console.error(error);
        this.loading = false;
        this.$q.loading.hide();
        this.$q.notify(error);
      }
    }
  }
}
</script>