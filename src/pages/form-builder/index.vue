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
          :list="unselectedList"
          :group="{ name: 'people'}"
          @change="log"
        >
          <q-list bordered separator
            v-for="formElement in unselectedList"
            :key="formElement.columnId"
          >
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon :name="formElement | iconFormat" color="primary" text-color="white" />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">{{ formElement.column.caption }}</q-item-label>
                <q-item-label caption>{{ formElement.column.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </draggable>
      </div>
    </q-drawer>

    <q-drawer show-if-above v-model="right" side="right" bordered>
      <div v-if="!!currentElement.column"  class="q-pa-md">
        <div class="q-py-md"> 
          宽度:
        </div>

        <q-select
          outlined
          v-model="currentElement.class"
          :options="withOptions"
          @input="currentElementWidthInput" 
          emit-value
          map-options
        /> 
        <div class="col-3">
          <pre>{{ currentElement | jsonFormat }}</pre>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <div class="q-pa-md">
        <draggable
          class="dragArea list-group row"
          :list="selectedList"
          group="people"
          @change="log"
        >
          <div class="list-group-item q-pa-md" 
            v-for="formElement in selectedList"
            :key="formElement.columnId"
            :class="formElement | classFormat(currentElement)"
            @click="selectForEdit(formElement)"
          > 
            <div>
              <div 
                v-bind:class="{ 'required': !formElement.column.nullable}">
                {{formElement.column.caption}}:
              </div>
              <q-input
                readonly
                :placeholder="formElement.column.description"
                :type="formElement.isPwd ? 'password' : 'text'" >
                <template v-slot:append v-if="!formElement.isText" >
                  <q-icon
                    :name="formElement.isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="formElement.isPwd = !formElement.isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div class="row reverse editable-element-action-buttons">
              <div class="justify-end q-pt-xs">
                <q-btn 
                  @click="deleteElement(formElement)"
                  v-if="isSelectedForEdit(formElement)" 
                  class="editable-element-button" 
                  color="red" 
                  icon="delete" 
                  round unelevated  size="xs">
                  <q-tooltip>移除</q-tooltip>
                </q-btn>
              </div>
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

.q-item
  cursor: move !important;
   
.list-group
  min-height: 20px;

.list-group-item
  cursor: move;

.sortable-chosen
  opacity: 0.3;
  background: $primary;
  
.sortable-ghost
  opacity: 0.5;
  background: #c8ebfb;

.selected
  background: #c8ebfb;

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
      unselectedList: [],
      selectedList: [],
      loading: true,
      table: {},
      currentElement: {},
      sequenceLongOptions: [],
      sequenceStringOptions: [],
      withOptions: [
        {
          value: "col-1",
          label: "1/12"
        },
        {
          value: "col-2",
          label: "2/12"
        },
        {
          value: "col-3",
          label: "3/12"
        },
        {
          value: "col-4",
          label: "4/12"
        },
        {
          value: "col-5",
          label: "5/12"
        },
        {
          value: "col-6",
          label: "6/12"
        },
        {
          value: "col-7",
          label: "7/12"
        },
        {
          value: "col-8",
          label: "8/12"
        },
        {
          value: "col-9",
          label: "9/12"
        },
        {
          value: "col-10",
          label: "10/12"
        },
        {
          value: "col-11",
          label: "11/12"
        },
        {
          value: "col-12",
          label: "12/12"
        }
      ],
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
    iconFormat: function(formElement) {
      const value = formElement.column;
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
    },

    classFormat: function(formElement, currentElement) {
      let value = "";
      if (formElement.class) {
        value = formElement.class;
      }

      if (currentElement 
        && currentElement.column 
        && currentElement.column.id === formElement.column.id) {
        value += " selected";
      }

      console.log(formElement.column.name + ": " + value);
      return value;
    },
    
    jsonFormat(value) {
      return JSON.stringify(value, null, 2);
    }
  },
  computed: {
    
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

    selectForEdit (formElement) {
      this.currentElement = formElement;
    },
    isSelectedForEdit (formElement) {
      return this.currentElement 
      && this.currentElement.column
      && this.currentElement.column.id === formElement.column.id;
    },
    currentElementWidthInput(value) {
      console.log("currentElementWidthInput");
      this.$forceUpdate();
    },
    deleteElement (formElement) {
      const index = this.selectedList.findIndex(t => t.column.id === formElement.column.id);
      if (index >= 0) {
        this.selectedList = [ ...this.selectedList.slice(0, index), ...this.selectedList.slice(index + 1) ];
        this.unselectedList.push(formElement);
      }
      this.currentElement =  {};
      this.$forceUpdate();
    },
    async loadData(id) {
      this.$q.loading.show({
        message: "加载中"
      });
      try {
        this.loading = true;
        const table = await metadataTableService.get(id || this.$route.params.id);
        this.table = table;
        const unselectedList = [];
        const selectedList = [];

        table.columns.forEach((column) => {
          let formElement = {
            columnId: column.id,
            column: column,
            class: "col-12"
          }

          if (column.dataType === 'PASSWORD') {
            formElement.isText = false;
            formElement.isPwd = true;
          } else {
            formElement.isText = true;
            formElement.isPwd = false;
          }

          if (column.name === 'createdDate' 
            || column.name === 'lastModifiedDate'
            || column.name === 'fullTextBody') {
            unselectedList.push(formElement);
          } else {
            selectedList.push(formElement);
          }
        });

        this.unselectedList = unselectedList;
        this.selectedList = selectedList;

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