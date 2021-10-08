<template>
  <q-layout style="z-index: 1;" class="bg-page" view="hhh lpr lfr">
    <q-header class="bg-white text-black" height-hint="98">
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
      <div class="q-pa-md">
        <draggable
          class="dragArea list-group"
          :list="list1"
          :group="{ name: 'people'}"
          @change="log"
        >
          <q-list bordered separator
            v-for="element in list1"
            :key="element.name"
          >
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon :name="element | iconFormat" color="primary" text-color="white" />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">{{ element.caption }}</q-item-label>
                <q-item-label caption>{{ element.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </draggable>
      </div>
    </q-drawer>

    <q-drawer show-if-above v-model="right" side="right" bordered>
      <CRawDisplayer class="col-3" :value="list1" title="List 1" />
      <CRawDisplayer class="col-3" :value="list2" title="List 2" />
    </q-drawer>

    <q-page-container>
      <div class="q-pa-md">
        <draggable
          class="dragArea list-group"
          :list="list2"
          group="people"
          @change="log"
        >
          <div class="editable-element-container q-pa-md" 
            v-for="element in list2"
            :key="element.name"
            @click="selectForEdit(element)"
          > 
            <div 
              v-bind:class="{ 'required': !element.nullable}">
              {{element.caption}}:
            </div>
            <q-input
              :placeholder="element.description"
              v-model="element.value"
              :type="element.isPwd ? 'password' : 'text'" >
              <template v-slot:append v-if="!element.isText" >
                <q-icon
                  :name="element.isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="element.isPwd = !element.isPwd"
                />
              </template>
            </q-input>
            <div class="editable-element-action-buttons">
              <q-btn v-if="isSelectedForEdit(element)" class="editable-element-button" color="red" icon="delete" round size="xs"><q-tooltip>移除</q-tooltip></q-btn><!-- 
              <q-btn class="editable-element-button" color="secondary" icon="file_copy" round size="xs"><q-tooltip>Duplicate this field</q-tooltip></q-btn> -->
            </div>
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

.sortable-chosen
  opacity: 0.3;
  background: $primary;
  
.sortable-ghost
  opacity: 0.5;
  background: #c8ebfb;

.editable-element-container
  position relative

.editable-element-action-buttons
  position absolute
  bottom -11 px
  right 0
  z-index 2

.editable-element-button
  float right
  margin-right 5px
  
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
      currentColumn: {},
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
  filters: {
    iconFormat: function(value) {
      let icon = 'text_rotate_vertical';
      if (value.dataType === 'PASSWORD' ) {
        icon = 'lock' ;
      } else if (value.dataType === 'DATETIME' ) {
        icon = 'calendar_today' ;
      } else if (value.dataType === 'DATE' ) {
        icon = 'event' ;
      } else if (value.dataType === 'TIME' ) {
        icon = 'schedule' ;
      } else if (value.dataType === 'TIME' ) {
        icon = 'schedule' ;
      } else if (value.dataType === 'ATTACHMENT' ) {
        icon = 'upload_file' ;
      } else if (value.dataType === 'LONGBLOB' ) {
        icon = 'attachment' ;
      } else if (value.dataType === 'DECIMAL' ) {
        icon = 'format_list_numbered' ;
      } 

      return icon;
    }
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

    selectForEdit (column) {
      this.currentColumn = column;
    },
    isSelectedForEdit (column) {
      return column && this.currentColumn.id === column.id;
    },

    async loadData(id) {
      this.$q.loading.show({
        message: "加载中"
      });
      try {
        this.loading = true;
        const table = await metadataTableService.get(id || this.$route.params.id);
        this.table = table;
        const list1 = [];
        const list2 = [];

        table.columns.forEach((column) => {
          if (column.dataType === 'PASSWORD') {
            column.isText = false;
            column.isPwd = true;
          } else {
            column.isText = true;
            column.isPwd = false;
          }

          if (column.name === 'createdDate' 
            || column.name === 'lastModifiedDate'
            || column.name === 'fullTextBody') {
            list1.push(column);
          } else {
            list2.push(column);
          }
        });

        this.list1 = list1;
        this.list2 = list2;

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