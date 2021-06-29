<template>
  <div>
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
  </div>
</template>

<style>
.required:before {
  content: "* ";
  color: red;
}
</style>

<script>
import { metadataTableService } from "../../service";
import { date } from "../../utils";
import { extend } from "quasar";


export default {
  name: "CIndexList",
  props: {
    value: {
      required: true
    }
  },
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

  async created() {
    console.info('CIndexList component->created');
    await this.init();
  },

  mounted: function() {
    console.info('CIndexList component->mounted');
  },

  activated: function() {
    console.info('CIndexList component->activated');
  },

  deactivated: function() {
    console.info('CIndexList component->deactivated');
  },

  updated: function() {
    console.info('CIndexList component-updated');
  },

  destroyed: function() {
    console.info('CIndexList component->destroyed');
  },
  filters: {
    dateTimeFormat: function(value) {
      return date.dateTimeFormat(value);
    }
  },
  methods: {
    async init() {
      console.info("CIndexList component->init");
      this.$store.commit(
        "config/updateIsAllowBack",
        this.$route.meta.isAllowBack
      );

      await this.loadData();
    },

    async loadData() {
      try {
        console.info("CIndexList component->loadData");

        this.loading = true;

        const table = extend(true, {}, this.value);

        let columnOptions = table.columns;
        if (table) {
          if (table.indexs) {
              table.indexs.forEach(function(item){
              let columns = [];
              item.indexLines.forEach(function(indexLine) {
                columns.push(columnOptions.find(t => t.id === indexLine.column.id));
              });

              item.columns = columns;
            });
          } else {
            table.indexs = [];
          }

          this.table = table;
        }

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
      const indexs = this.table.indexs || [];
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

    getData() {
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

      return data;
    }
  }
}
</script>
