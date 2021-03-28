<template>
  <div class="q-pa-md q-gutter-sm bg-page">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="表管理" />
      <q-breadcrumbs-el label="联合索引" />
      <q-breadcrumbs-el :label="table.caption" />
    </q-breadcrumbs>

    <q-separator />

    <div class="bg-table-list">
      <q-banner inline-actions class="text-black bg-listcolor">
          <template v-slot:action>
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
              label="添加索引"
            />
          </template>
      </q-banner>

      <q-table
        :data="table.indexs"
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
              <q-checkbox v-model="props.selected" />
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
            <q-td key="caption" :props="props">
              <q-input style="width: 80px;" v-model="props.row.caption" />
            </q-td>
            <q-td key="name" :props="props">
              <q-input style="width: 120px;" v-model="props.row.name" />
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
            <q-td key="columns" :props="props">
              <q-select
                style="min-width: 150px;"
                outlined
                v-model="props.row.columns"
                :options="table.columns"
                multiple
                option-label="caption"
                option-value="id"
              />
            </q-td>
            <q-td key="description" :props="props">
              <q-input style="width: 150px;" v-model="props.row.description" />
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

      <q-separator v-if="!!table.indexs && table.indexs.length > 0" />
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
import { metadataTableService } from "../../../service";
import { date } from "../../../utils";

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
          sortable: true
        },
        {
          name: "caption",
          align: "left",
          label: "中文名称",
          field: "caption",
          sortable: true
        }, {
          name: "name",
          align: "left",
          label: "索引名称",
          field: "name",
          sortable: true
        }, {
          name: "indexType",
          align: "left",
          label: "索引类型",
          field: "indexType",
          sortable: true
        }, {
          name: "indexStorage",
          align: "left",
          label: "索引存储",
          field: "indexStorage",
          sortable: true
        },
        {
          name: "columns",
          align: "left",
          label: "列",
          field: "columns",
          sortable: true
        },
        {
          name: "description",
          align: "left",
          label: "描述",
          field: "description",
          sortable: true
        }, {
          name: "createdDate",
          align: "left",
          label: "创建时间",
          field: "createdDate",
          format: val => `${val}`,
          sortable: true
        }, {
          name: "lastModifiedDate",
          align: "left",
          label: "修改时间",
          field: "lastModifiedDate",
          sortable: true
        }
      ],
      table: {},

      indexTypeOptions: [
        {
          value: "UNIQUE",
          label: "唯一"
        },
        {
          value: "INDEX",
          label: "普通"
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
      ]
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
  methods: {
    async init(id) {
      console.info("init");
      this.$store.commit(
        "config/updateIsAllowBack",
        this.$route.meta.isAllowBack
      );

      await this.loadData(id);
    },

    async loadData(id) {
      try {
        this.loading = true;
        const table = await metadataTableService.get(id || this.$route.params.id);

        let columnOptions = table.columns;

        table.indexs.forEach(function(item){
          let columns = [];
          item.indexLines.forEach(function(indexLine) {
            columns.push(columnOptions.find(t => t.id === indexLine.column.id));
          });

          item.columns = columns;
        });

        this.table = table;
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.loading = false;
        this.$q.notify(error);
      }
    },

    onNewClickAction() {
      this.addRow();
    },

    addRow() {
      const indexs = this.table.indexs;
      const cursor = indexs.length + 1;
      const newRow = {
        id: (new Date()).valueOf(),
        indexStorage: null,
        indexType : null,
        name: "index" + indexs.length,
        caption: "索引" + indexs.length,
        description: "描述" + indexs.length,
        columns:[],
        isNewRow: true
      };
      this.table.indexs  = [ ...indexs.slice(0, cursor), newRow, ...indexs.slice(cursor) ];
    },

    removeRow(id) {
      const indexs = this.table.indexs;
      const index = indexs.findIndex(t => t.id === id);
      if (index >= 0) {
        this.table.indexs = [ ...indexs.slice(0, index), ...indexs.slice(index + 1) ];
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
      console.info(JSON.stringify(ids));
      if (id) {
        this.removeRow(id);
      } else {
        this.batchRemoveRow(ids);
        this.selected = [];
      }
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
            this.$q.notify("修改成功");
            this.loadData();
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
      let newIndexs = [];
      this.table.indexs.forEach(function(item){
          if (item.isNewRow) {
            delete item.id;
            delete item.isNewRow;
          }

          const newIndexLines = [];
          item.columns.forEach(function(column){
            newIndexLines.push({
              column: {
                id: column.id,
                name: column.name
              }
            })
          });

          const newIndex = {
            id: item.id,
            caption: item.caption,
            description: item.description,
            indexStorage: item.indexStorage,
            indexType: item.indexType,
            name: item.name,
            indexLines: newIndexLines
          }

          newIndexs.push(newIndex);
      });

      let data = {
        indexs: newIndexs
      }

      await metadataTableService.update(this.$route.params.id, data);
    }
  }
}
</script>
