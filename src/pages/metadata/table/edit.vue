<template>
  <div class="q-pa-md q-gutter-sm bg-page">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="表管理" />
      <q-breadcrumbs-el label="编辑" />
      <q-breadcrumbs-el :label="table.caption" />
    </q-breadcrumbs>

    <q-separator />

    <div class="q-pb-md bg-white">
     <q-banner inline-actions class="text-black bg-listcolor">
      基本信息
     </q-banner>
     <div class="row justify-start items-baseline content-center items-center">
        <div class="row justify-start items-baseline content-center items-center">
          <div class="q-px-md">
            <q-item-label class="required query-cond">对象名称:</q-item-label>
          </div>
          <div class="q-pt-md">
            <q-input
            outlined
            v-model="table.name"
            placeholder="如product" />
          </div>
        </div>

        <div class="row justify-start items-baseline content-center items-center">
          <div class="q-px-md">
            <q-item-label class="required query-cond">对象复数:</q-item-label>
          </div>
          <div class="q-pt-md">
            <q-input
            outlined
            v-model="table.pluralName"
            placeholder="如products" />
          </div>
        </div>

        <div class="row justify-start items-baseline content-center items-center">
          <div class="q-px-md">
            <q-item-label class="required query-cond">表名称:</q-item-label>
          </div>
          <div class="q-pt-md">
            <q-input
            outlined
            v-model="table.tableName"
            placeholder="如ca_product" />
          </div>
        </div>

        <div class="row justify-start items-baseline content-center items-center">
          <div class="q-px-md">
            <q-item-label class="required query-cond">中文名称:</q-item-label>
          </div>
          <div class="q-pt-md">
            <q-input
            outlined
            v-model="table.caption"
            placeholder="如产品" />
          </div>
        </div>

        <div class="row justify-start items-baseline content-center items-center">
          <div class="q-px-md">
            <q-item-label class="query-cond">引擎:</q-item-label>
          </div>
          <div class="q-pt-md">
            <q-select
              outlined
              v-model="table.engine"
              :options="engineOptions"
              emit-value
              map-options
            />
          </div>
        </div>
      </div>
    </div>

    <div class="bg-table-list">
      <q-banner inline-actions class="text-black bg-listcolor">
          列信息
          <template v-slot:action>
            <q-btn
              unelevated
              @click="onIndexClickAction()"
              color="purple"
              :label="`联合索引（${indexLength}）`"
            />
            <p class="q-px-sm"/>
            <q-btn
              :disable="selected.length == 0"
              unelevated
              @click="onDeleteClickAction()"
              color="negative"
              label="批量删除"
            />
            <p class="q-px-sm"/>
            <q-btn
              unelevated
              @click="onNewClickAction()"
              color="primary"
              label="添加列"
            />
          </template>
      </q-banner>

      <q-table
        :data="table.columns"
        :columns="columns"
        :pagination.sync="tablePagination"
        row-key="id"
        selection="multiple"
        :selected.sync="selected"
        :loading="loading"
        flat
        separator="cell"
        hide-bottom>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td>
              <q-checkbox  v-model="props.selected" />
            </q-td>
            <q-td key="dataClickAction" :props="props">
              <q-btn 
                unelevated
                @click="onDeleteClickAction(props.row.id)"
                color="negative"
                label="删除"
                flat
                dense
              ></q-btn>
            </q-td>
             <q-td key="displayOrder" :props="props">
               <q-btn @click="onTopClick(props.row)" round size="sm" color="primary" icon="vertical_align_top" flat dense />
              <q-btn @click="onUpClick(props.row)" round size="sm" color="primary" icon="north" flat dense />
              <q-btn @click="onDownClick(props.row)" round size="sm" color="primary" icon="south" flat dense />
              <q-btn @click="onBottomClick(props.row)" round size="sm" color="primary" icon="vertical_align_bottom" flat dense />
            </q-td>
            <q-td key="caption" :props="props">
              <q-input style="width: 80px;" v-model="props.row.caption" />
            </q-td>
            <q-td key="name" :props="props">
              <q-input style="width: 120px;" v-model="props.row.name" />
            </q-td>
            <q-td key="description" :props="props">
              <q-input style="width: 150px;" v-model="props.row.description" />
            </q-td>
            <q-td key="unsigned" :props="props">
              <q-toggle v-model="props.row.unsigned"/>
            </q-td>
            <q-td key="dataType" :props="props">
              <q-select
                outlined
                v-model="props.row.dataType"
                :options="dataTypeOptions"
                emit-value
                map-options
              />
            </q-td>
            <q-td key="indexType" :props="props">
              <q-select
                outlined
                v-model="props.row.indexType"
                :options="indexTypeOptions"
                emit-value
                map-options
              />
            </q-td>
            <q-td key="indexStorage" :props="props">
              <q-select 
                outlined
                v-model="props.row.indexStorage"
                :options="indexStorageOptions"
                emit-value
                map-options
              />
            </q-td>
            <q-td key="indexName" :props="props">
              <q-input style="width: 150px;" v-model="props.row.indexName" />
            </q-td>
            <q-td key="length" :props="props">
              <q-input style="width: 60px;" type="number" v-model="props.row.length" />
            </q-td>
            <q-td key="precision" :props="props">
              <q-input style="width: 50px;" type="number" v-model="props.row.precision" />
            </q-td>
            <q-td key="scale" :props="props">
              <q-input style="width: 40px;" type="number" v-model="props.row.scale" />
            </q-td>
            <q-td key="autoIncrement" :props="props">
              <q-toggle v-model="props.row.autoIncrement"/>
            </q-td>
            <q-td key="nullable" :props="props">
              <span><q-toggle v-model="props.row.nullable"/></span>
            </q-td>
            <q-td key="defaultValue" :props="props">
              <q-input style="width: 80px;" v-model="props.row.defaultValue" />
            </q-td>
            <q-td key="seqId" :props="props">
              <q-select v-if="isStringType(props.row)"
                outlined
                v-model="props.row.seqId"
                :options="sequenceStringOptions"
                option-value="id"
                option-label="caption"
                emit-value
                map-options
              />
              <q-select v-else-if="isNumberType(props.row)"
                outlined
                v-model="props.row.seqId"
                :options="sequenceLongOptions"
                option-value="id"
                option-label="caption"
                emit-value
                map-options
              />
            </q-td>
            <q-td key="insertable" :props="props">
              <span><q-toggle v-model="props.row.insertable"/></span>
            </q-td>
            <q-td key="updatable" :props="props">
              <span><q-toggle v-model="props.row.updatable"/></span>
            </q-td>
            <q-td key="queryable" :props="props">
              <span><q-toggle v-model="props.row.queryable"/></span>
            </q-td>
            <q-td key="createdDate" :props="props">
              <span>{{ props.row.createdDate | dateTimeFormat }}</span>
            </q-td>
            <q-td key="lastModifiedDate" :props="props">
              <span>{{ props.row.lastModifiedDate | dateTimeFormat }}</span>
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <q-separator v-if="!!table.columns && table.columns.length > 0" />
      <div class="q-py-md">
        <div class="row justify-center">
          <q-btn unelevated
            @click="onSubmitClick"
            color="primary"
            label="保存"
            />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.required:before {
  content: "* ";
  color: red;
}
</style>

<script>
import { metadataTableService, metadataSequenceService } from "../../../service";
import { date } from "../../../utils";
import { extend } from 'quasar'

export default {
  data () {
    return {
      selected: [],
      loading: true,
      tablePagination: {
        rowsPerPage: 9999
      },
      columns: [
        {
          name: "dataClickAction",
          align: "center",
          label: "操作",
          field: "dataClickAction",
          sortable: false
        },
        {
          name: "displayOrder",
          align: "left",
          label: "序号",
          field: "displayOrder",
          sortable: false
        }, {
          name: "caption",
          align: "left",
          label: "中文名称",
          field: "caption",
          sortable: false
        }, {
          name: "name",
          align: "left",
          label: "英文字段",
          field: "name",
          sortable: false
        }, {
          name: "description",
          align: "left",
          label: "描述",
          field: "description",
          sortable: false
        },  {
          name: "unsigned",
          align: "left",
          label: "无符号",
          field: "unsigned",
          sortable: false
        }, {
          name: "dataType",
          align: "left",
          label: "数据类型",
          field: "dataType",
          sortable: false
        }, {
          name: "indexType",
          align: "left",
          label: "索引类型",
          field: "indexType",
          sortable: false
        }, {
          name: "indexStorage",
          align: "left",
          label: "索引存储",
          field: "indexStorage",
          sortable: false
        }, {
          name: "indexName",
          align: "left",
          label: "索引名称",
          field: "indexName",
          sortable: false
        }, {
          name: "length",
          align: "left",
          label: "长度",
          field: "length",
          sortable: false
        }, {
          name: "precision",
          align: "left",
          label: "精度",
          field: "precision",
          sortable: false
        }, {
          name: "scale",
          align: "left",
          label: "小数",
          field: "scale",
          sortable: false
        }, {
          name: "autoIncrement",
          align: "left",
          label: "自增长",
          field: "autoIncrement",
          sortable: false
        }, {
          name: "nullable",
          align: "left",
          label: "空",
          field: "nullable",
          sortable: false
        }, {
          name: "defaultValue",
          align: "left",
          label: "默认值",
          field: "defaultValue",
          sortable: false
        },{
          name: "seqId",
          align: "left",
          label: "序列号",
          field: "seqId",
          sortable: false
        }, {
          name: "insertable",
          align: "left",
          label: "插入",
          field: "insertable",
          sortable: false
        }, {
          name: "updatable",
          align: "left",
          label: "编辑",
          field: "updatable",
          sortable: false
        }, {
          name: "queryable",
          align: "left",
          label: "查询",
          field: "queryable",
          sortable: false
        }, {
          name: "createdDate",
          align: "left",
          label: "创建时间",
          field: "createdDate",
          format: val => `${val}`,
          sortable: false
        }, {
          name: "lastModifiedDate",
          align: "left",
          label: "修改时间",
          field: "lastModifiedDate",
          sortable: false
        }
      ],
      table: {},
      engineOptions: [
        {
          value: "INNODB",
          label: "InnoDB"
        },
        {
          value: "MYISAM",
          label: "MyISAM"
        }
      ],

      indexTypeOptions: [
        {
          value: "PRIMARY",
          label: "主键"
        },
        {
          value: "UNIQUE",
          label: "唯一"
        },
        {
          value: "INDEX",
          label: "普通"
        },
        {
          value: "FULLTEXT",
          label: "全文"
        }
      ],

      indexStorageOptions: [
        {
          value: "BTREE",
          label: "B树"
        },
        {
          value: "HASH",
          label: "哈希"
        }
      ],
      dataTypeOptions: [
        {
          value: "CHAR",
          label: "定长字符串CHAR"
        },
        {
          value: "VARCHAR",
          label: "变长字符串VARCHAR"
        },
        {
          value: "PASSWORD",
          label: "密码PASSWORD"
        },
        {
          value: "ATTACHMENT",
          label: "附件ATTACHMENT"
        },
        {
          value: "BOOL",
          label: "布尔BOOL"
        },
        {
          value: "TINYINT",
          label: "小整数INT"
        },
        {
          value: "INT",
          label: "整数INT"
        },
        {
          value: "BIGINT",
          label: "长整数BIGINT"
        },
        {
          value: "FLOAT",
          label: "浮点数FLOAT"
        },
        {
          value: "DOUBLE",
          label: "双精度DOUBLE"
        },
        {
          value: "DECIMAL",
          label: "精确小数DECIMAL"
        },
        {
          value: "DATE",
          label: "日期DATE"
        },
        {
          value: "TIME",
          label: "时间TIME"
        },
        {
          value: "DATETIME",
          label: "日期时间DATETIME"
        },
        {
          value: "TEXT",
          label: "文本TEXT"
        },
        {
          value: "LONGTEXT",
          label: "长文本LONGTEXT"
        },
        {
          value: "BLOB",
          label: "二进制BLOB"
        },{
          value: "LONGBLOB",
          label: "大二进制LONGBLOB"
        }
      ],
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

  beforeRouteUpdate (to, from, next) {
    console.info('beforeRouteUpdate');
    this.init(to.params.id);
    next();
  },
  filters: {
    dateTimeFormat: function(value) {
      return date.dateTimeFormat(value);
    }
  },
  computed: {
    indexLength: function() {
      if (this.table.indexs) {
        return this.table.indexs.length;
      } else {
        return 0;
      }
    }
  },

  methods: {
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

        let sequences = await metadataSequenceService.list(1, 999);
        this.sequenceLongOptions = sequences.filter(t => t.sequenceType === "LONG");
        this.sequenceStringOptions = sequences.filter(t => t.sequenceType === "STRING");

        this.loading = false;
        this.$q.loading.hide();
      } catch (error) {
        console.error(error);
        this.loading = false;
        this.$q.loading.hide();
        this.$q.notify(error);
      }
    },


    onNewClickAction() {
      this.addRow();
    },

    addRow() {
      const columns = this.table.columns;
      const index = columns.length + 1;
      const newRow = {
        id: (new Date()).valueOf(),
        autoIncrement: false,
        displayOrder: columns.length,
        insertable: true,
        nullable: true,
        queryable: true,
        unsigned: false,
        updatable: true,
        dataType : "VARCHAR",
        name: "col" + columns.length,
        caption: "列" + columns.length,
        description: "描述" + columns.length,
        length: 200,
        systemable: false,
        isNewRow: true
      };
      this.table.columns  = [ ...columns.slice(0, index), newRow, ...columns.slice(index) ];
    },

    removeRow(id) {
      const columns = this.table.columns;
      const index = columns.findIndex(t => t.id === id);
      if (index >= 0) {
        this.table.columns = [ ...columns.slice(0, index), ...columns.slice(index + 1) ];
      }
    },

    batchRemoveRow(ids) {
      ids.forEach((id) => {
        this.removeRow(id);
      });
    },

    async onDeleteClickAction(id) {
      let ids = [];
      this.selected.forEach((row) => {
        ids.push(row.id);
      });
      if (id) {
        this.removeRow(id);
      } else {
        this.batchRemoveRow(ids);
        this.selected = [];
      }
    },

    onIndexClickAction() {
      this.$router.push("/metadata/tables/" +  this.$route.params.id +   "/indexs");
    },

    async onSubmitClick() {
      try {
        this.$q
          .dialog({
            title: "提交",
            message: "确认提交吗？",
            ok: {
              unelevated: true
            },
            cancel: {
              color: "negative",
              unelevated: true
            },
            persistent: false
          })
          .onOk(async () => {
            await this.onSubmit();
          })
          .onCancel(() => {})
          .onDismiss(() => {
            console.info("I am triggered on both OK and Cancel");
          });
      } catch (error) {
        this.$q.notify("修改失败");
      }
    },

    async onSubmit() {
      this.$q.loading.show({
        message: "提交中"
      });
      try {
        let table = extend(true, {}, this.table);
        let displayOrder = 0;
        table.columns.forEach(function(column){
            column.displayOrder = displayOrder++;
            if (column.isNewRow) {
              delete column.id;
              delete column.isNewRow;
            }
        });
        await metadataTableService.update(this.$route.params.id, table);
        this.$q.loading.hide();
        this.$q.notify("修改成功");
        this.$root.$emit("updateMenuTree");
        this.loadData();
      } catch (error) {
        this.$q.loading.hide();
        console.error(error);
      }
    },

    isStringType: function(row) {
      if (row.dataType === "CHAR"
        || row.dataType === "VARCHAR" ) {
        return true;
      } else {
        return false;
      }
    },

    isNumberType: function(row) {
      if (row.dataType === "TINYINT"
        || row.dataType === "SMALLINT"
        || row.dataType === "MEDIUMINT"
        || row.dataType === "INT"
        || row.dataType === "BIGINT") {
        return true;
      } else {
        return false;
      }
    },
    onTopClick: function(row) {
      const columns = this.table.columns;
      const index = columns.findIndex(t => t.id === row.id);
      if (index != 0){
        columns.unshift(columns.splice(index, 1)[0]);
      }
    },
    onUpClick: function(row) {
      const columns = this.table.columns;
      const index = columns.findIndex(t => t.id === row.id);

      if (index != 0){
        columns[index] = columns.splice(index - 1, 1, columns[index])[0];
        console.dir(columns);
      }
    },
    onDownClick: function(row) {
      const columns = this.table.columns;
      const index = columns.findIndex(t => t.id === row.id);

      if (index != columns.length - 1){
        columns[index] = columns.splice(index + 1, 1, columns[index])[0];
      }
    },
    onBottomClick: function(row) {
      const columns = this.table.columns;
      const index = columns.findIndex(t => t.id === row.id);

      if (index != columns.length - 1){
        columns.push(columns.splice(index, 1)[0]);
      }
    }
  }
}
</script>
