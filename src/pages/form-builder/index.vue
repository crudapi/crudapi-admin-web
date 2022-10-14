<template>
  <q-layout style="z-index: 1;" class="bg-page" view="hhh lpr lfr">
    <q-header class="bg-white text-black" height-hint="98">
      <q-toolbar>

       <!--  <q-btn dense flat round icon="menu" @click="left = !left" /> -->

        <q-toolbar-title>
          <q-breadcrumbs>
            <q-breadcrumbs-el :label="dataSource" clickable :to="dataSourceUrl" />
            <q-breadcrumbs-el label="表管理" :to="dataSourceUrl + '/metadata/tables'" />
            <q-breadcrumbs-el :label="table.caption" :to="dataSourceUrl + '/metadata/tables/' + table.id"/>
            <q-breadcrumbs-el label="页面构建" />
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
        <div class="q-pa-md"> 
          字段: {{currentElement.column.caption + ', ' + currentElement.column.name}}
        </div>

        <div v-show="type != 'list'">
          <div class="q-pa-md">
            栅格宽度:
          </div>
          <div class="q-pa-md">
            <q-slider
              v-model="currentElement.width"
              color="primary"
              :min="1"
              :step="1"
              :max="12"
              label
              label-always
            />
          </div>
        </div>
        <!-- <div class="col-3">
          <pre>{{ currentElement | jsonFormat }}</pre>
        </div> -->
      </div>
    </q-drawer>

    <q-page-container>
      <div class="q-pa-md form-build-body" 
          :class="device">
        <div class="q-pb-md row justify-right">
          <div class="q-px-md">
            <q-radio @input="deviceChange" v-model="device" val="pc" label="电脑" />
            <q-radio @input="deviceChange" v-model="device" val="pad" label="平板" />
            <q-radio @input="deviceChange" v-model="device" val="phone" label="手机" />
          </div>

          <div class="q-px-md">
            <q-radio @input="typeChange" v-model="type" val="create" label="创建" />
            <q-radio @input="typeChange" v-model="type" val="update" label="编辑" />
            <q-radio @input="typeChange" v-model="type" val="list" label="列表" />
          </div>

          <div class="q-px-md">
            <q-btn class="q-mx-md" unelevated @click="onSubmitClick" color="primary" label="保存" />
            <q-btn  unelevated @click="onDeleteClick" color="negative" label="删除" />
          </div>
        </div>
        
        <q-separator />

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
              <q-input v-if="isStringType(formElement)"
                readonly
                :placeholder="formElement.column.description"
                :type="formElement.isPwd ? 'password' : 'text'"
                v-model="formElement.column.value" >
                <template v-slot:append v-if="!formElement.isText" >
                  <q-icon
                    :name="formElement.isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="formElement.isPwd = !formElement.isPwd"
                  />
                </template>
              </q-input>

              <q-editor readonly v-else-if="isTextType(formElement)"
                v-model="textValue"
                :placeholder="formElement.column.description" >
              </q-editor>

              <q-input v-else-if="isDateTimeType(formElement)" readonly>
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date
                      mask="YYYY-MM-DD HH:mm:ss"
                      @input="hideRefPopProxyAction('qDateProxy')" />
                    </q-popup-proxy>
                  </q-icon>
                </template>

                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy ref="qTimeProxy" transition-show="scale" transition-hide="scale">
                      <q-time mask="YYYY-MM-DD HH:mm:ss"
                      format24h with-seconds
                      @input="hideRefPopProxyAction('qTimeProxy')" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

               <q-input v-else-if="isDateType(formElement)" readonly>
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date
                      mask="YYYY-MM-DD"
                      @input="hideRefPopProxyAction('qDateProxy')" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-input v-else-if="isTimeType(formElement)" readonly>
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy ref="qTimeProxy" transition-show="scale" transition-hide="scale">
                      <q-time  mask="HH:mm:ss"
                      format24h with-seconds
                      @input="hideRefPopProxyAction('qTimeProxy')" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-toggle v-else-if="isBoolType(formElement)" readonly
                v-model="formElement.column.value">
              </q-toggle>

              <q-input readonly
                v-else-if="isNumberType(formElement)"
                :placeholder="formElement.column.description"
                type="number"
                v-model="formElement.column.value" >
              </q-input>

              <CFile v-else-if="isAttachmentType(formElement)"
                v-model="formElement.column.value" >
              </CFile>

              <q-input v-else
                readonly
                :placeholder="formElement.column.description"
                :type="formElement.isPwd ? 'password' : 'text'"
                v-model="formElement.column.value" >
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

.form-build-body.phone
    max-width: 767px;

.form-build-body.pad
    max-width: 979px;
    
</style>

<script>
import draggable from 'vuedraggable'
import { metadataTableService, metadataSequenceService, tableService } from "../../service";
import { extend } from 'quasar'

export default {
  name: "formBulder",
  components: {
    draggable
  },
  data () {
    return {
      dataSource: "",
      dataSourceUrl: "",
      left: true,
      right: true,
      unselectedList: [],
      selectedList: [],
      loading: true,
      type: 'create',
      device: 'pc',
      table: {},
      formBuilders: [],
      currentElement: {},
      textValue: "",
      fileValue: ""
    }
  },

  async created() {
    await this.init();
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
      if (formElement.width) {
        value = "col-" + formElement.width;
      }

      if (currentElement 
        && currentElement.column 
        && currentElement.column.id === formElement.column.id) {
        value += " selected";
      }

      //console.log(formElement.column.name + ": " + value);
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

      this.dataSource = this.$route.params.dataSource;
      this.dataSourceUrl = "/dataSource/" + this.dataSource;
      await this.loadData(id);
    },

    isTextType: function(formElement) {
      if (formElement.column.dataType === "TEXT"
        || formElement.column.dataType === "LONGTEXT" ) {
        return true;
      } else {
        return false;
      }
    },

    isStringType: function(formElement) {
      if (formElement.column.dataType === "CHAR"
        || formElement.column.dataType === "VARCHAR" ) {
        return true;
      } else {
        return false;
      }
    },

    isNumberType: function(formElement) {
      if (formElement.column.dataType === "TINYINT"
        || formElement.column.dataType === "SMALLINT"
        || formElement.column.dataType === "MEDIUMINT"
        || formElement.column.dataType === "INT"
        || formElement.column.dataType === "BIGINT") {
        return true;
      } else {
        return false;
      }
    },

    isDateType: function(formElement) {
      if (formElement.column.dataType === "DATE") {
        return true;
      } else {
        return false;
      }
    },

    isTimeType: function(formElement) {
      if (formElement.column.dataType === "TIME") {
        return true;
      } else {
        return false;
      }
    },

    isDateTimeType: function(formElement) {
      if (formElement.column.dataType === "DATETIME") {
        return true;
      } else {
        return false;
      }
    },

    isBoolType: function(formElement) {
      if (formElement.column.dataType === "BOOL") {
        return true;
      } else {
        return false;
      }
    },

    isAttachmentType: function(formElement) {
      if (formElement.column.dataType === "ATTACHMENT") {
        return true;
      } else {
        return false;
      }
    },

    hideRefPopProxyAction(ref) {
      const proxys = this.$refs[ref];
      for (let i = 0; i < proxys.length; i++) {
        proxys[i].hide();
      }
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
        const tableId = id || this.$route.params.id;
        const table = await metadataTableService.get(this.dataSource, tableId);
        this.table = table;

        let query = {
          tableId:tableId
        };
        this.formBuilders = await tableService.list(this.dataSource, "tableFormBuilder", 0, 999, null, query, null);

        this.setFormBuilder();

        this.loading = false;
        this.$q.loading.hide();
      } catch (error) {
        console.error(error);
        this.loading = false;
        this.$q.loading.hide();
        this.$q.notify(error);
      }
    },
    deviceChange(value, evt) {
      console.log(value);
      this.currentElement =  {};
      this.setFormBuilder();
    },
    typeChange(value, evt) {
      console.log(value);
      this.currentElement =  {};
      this.setFormBuilder();
    },
    setFormBuilder() {
      const columns = this.table.columns;
      let formBuilder = this.formBuilders.find(t => t.device === this.device 
        && t.type === this.type);

      let unselectedList = [];
      let selectedList = [];
      if (!formBuilder) {
        columns.forEach((column) => {
          let formElement = {
            columnId: column.id,
            column: column,
            width: 12
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
      } else {
        const rowSelectedList = JSON.parse(formBuilder.body);
        console.dir(rowSelectedList);

        rowSelectedList.forEach((formElement) => {
          if (columns.find(t => t.id === formElement.columnId)) {
            selectedList.push(formElement);
          }
        });
        console.dir(selectedList);

        selectedList.forEach((formElement) => {
          formElement.column = columns.find(t => t.id === formElement.columnId);
        });

        columns.forEach((column) => {
          let formElement = {
            columnId: column.id,
            column: column,
            width: 12
          };

          if (column.dataType === 'PASSWORD') {
            formElement.isText = false;
            formElement.isPwd = true;
          } else {
            formElement.isText = true;
            formElement.isPwd = false;
          }

          if (selectedList.findIndex(t => t.columnId === formElement.columnId) < 0) {
            unselectedList.push(formElement);
          }
        });
      }

      this.unselectedList = unselectedList;
      this.selectedList = selectedList;
    },
    async onSubmitClick() {
      this.$q.loading.show({
        message: "提交中"
      });
      try {
        let selectedList = extend(true, [], this.selectedList);
        selectedList.forEach((t) => {
          delete t.column;
        });

        const data = {
          name: this.device + " " + this.type,
          device: this.device,
          type: this.type,
          body: JSON.stringify(selectedList),
          tableId: this.table.id
        };

        let formBuilder = this.formBuilders.find(t => t.device === this.device
          && t.type === this.type);
        if (!formBuilder) {
          await tableService.create(this.dataSource, "tableFormBuilder", data);
        } else {
          await tableService.update(this.dataSource, "tableFormBuilder", formBuilder.id, data);
        }

        this.$q.loading.hide();
        this.$q.notify("保存成功");
        await this.loadData(this.table.id);
      } catch (error) {
        this.$q.loading.hide();
        console.info(error);
      }
    },
    async onDeleteClick() {
      this.$q.loading.show({
        message: "提交中"
      });
      try {
        let formBuilder = this.formBuilders.find(t => t.type === this.type);
        if (formBuilder) {
          await tableService.delete(this.dataSource, "tableFormBuilder", formBuilder.id);
          this.$q.loading.hide();
          this.$q.notify("删除成功");
          await this.loadData(this.table.id);
        } else {
          this.$q.loading.hide();
          this.$q.notify("已经为空");
        }
      } catch (error) {
        this.$q.loading.hide();
        console.info(error);
      }
    }
  }
}
</script>