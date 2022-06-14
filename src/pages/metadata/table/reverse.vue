<template>
  <div class="q-pa-md q-gutter-sm bg-page">
    <q-breadcrumbs>
      <q-breadcrumbs-el :label="dataSource" clickable :to="dataSourceUrl" />
      <q-breadcrumbs-el label="表管理" :to="dataSourceUrl + '/metadata/tables'" />
      <q-breadcrumbs-el label="数据库逆向" />
    </q-breadcrumbs>

    <q-separator />

    <div class="bg-table-list">
      <q-banner inline-actions class="text-black bg-listcolor">
          <template v-slot:action>
            <q-btn
              :disable="selected.length == 0"
              unelevated
              @click="onReverseClickAction()"
              color="primary"
              label="批量逆向"
            />
          </template>

      </q-banner>
      <q-table
        :data="data"
        :columns="columns"
        row-key="id"
        selection="multiple"
        :selected.sync="selected"
        :visible-columns="visibleColumns"
        :pagination.sync="tablePagination"
        :loading="loading"
        hide-bottom
        flat>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td>
              <q-checkbox v-model="props.selected" />
            </q-td>
            <q-td key="dataClickAction" :props="props">
              <q-btn
                unelevated
                @click="onReverseClickAction(props.row.tableName)"
                color="primary"
                label="逆向"
                flat
                dense
              ></q-btn>
            </q-td>
            <q-td key="id" :props="props">{{ props.row.id }}</q-td>

            <q-td key="tableSchema" :props="props">
              <span>{{ props.row.tableSchema }}</span>
            </q-td>
            <q-td key="tableName" :props="props">
              <span>{{ props.row.tableName }}</span>
            </q-td>
            <q-td key="comment" :props="props">
              <span>{{ props.row.comment }}</span>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-separator v-if="data.length > 0" />
        <div class="q-py-md">
          <CPage v-model="pagination" @input="onRequestAction"></CPage>
        </div>
    </div>
  </div>
</template>

<script>
import { metadataTableService } from "../../../service";

export default {
  data () {
    return {
      dataSource: "",
      dataSourceUrl: "",
      data: [],
      loading: true,
      selected: [],
      search: "",
      queryColumns: [],
      pagination: {
        page: 1,
        rowsPerPage: 100,
        count: 0
      },
      tablePagination: {
        rowsPerPage: 100
      },
      visibleColumns: [
        "id",
        "tableSchema",
        "tableName",
        "comment",
        "dataClickAction"
      ],
      columns: [
        {
          name: "dataClickAction",
          align: "center",
          label: "操作",
          field: "dataClickAction",
          sortable: true
        },
        {
          name: "id",
          label: "编号",
          align: "left",
          field: row => row.id,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "tableSchema",
          required: true,
          label: "表架构",
          align: "left",
          field: row => row.tableSchema,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "tableName",
          required: true,
          label: "表名称",
          align: "left",
          field: row => row.tableName,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "comment",
          required: true,
          label: "表注释",
          align: "left",
          field: row => row.comment,
          format: val => `${val}`,
          sortable: true
        }
      ]
    }
  },

  async created() {
    await this.init()
    await this.onRefresh();
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

  async beforeRouteUpdate (to, from, next) {
    console.info('beforeRouteUpdate');
    await this.init();
    await this.onRefresh();
    next();
  },
  filters: {
  },
  methods: {
    async onRefresh() {
      this.selected =[];
      await this.fetchFromServer();
    },

    onRequestAction(value) {
      console.info("onRequestAction");
      console.info(value);
      this.tablePagination.rowsPerPage = value.rowsPerPage;
      this.fetchFromServer();
    },

    async onReverseClickAction(tableName) {
      let tableNames = [];
      this.selected.forEach(function(val){
          tableNames.push(val.tableName);
      });
      console.info(JSON.stringify(tableNames));

      try {
        this.$q
          .dialog({
            title: "逆向",
            message: "确认逆向吗？",
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
            if (tableName) {
              await metadataTableService.reverse(this.dataSource, tableName);
            } else {
              await metadataTableService.batchReverse(this.dataSource, tableNames);
            }

            this.$q.notify("逆向成功");
            this.$root.$emit("updateMenuTree");
            this.onRefresh();
          })
          .onCancel(() => {})
          .onDismiss(() => {
            console.info("I am triggered on both OK and Cancel");
          });
      } catch (error) {
        this.$q.notify("逆向失败");
      }
    },

    async fetchFromServer() {
      this.loading = true;
      this.data = [];
      try {
        let query = {};

        console.info("query" + JSON.stringify(query));

        let data = await metadataTableService.getMetadatas(this.dataSource,
          this.pagination.page,
          this.pagination.rowsPerPage,
          this.search,
          query);

        this.pagination.count = data.length;
        let i = 0;
        data.forEach((t) => {
          if (!t.id) {
            t.id = ++i;
          }
        });
        this.data = data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    },

    async init() {
      console.info("init");
      this.$store.commit(
        "config/updateIsAllowBack",
        this.$route.meta.isAllowBack
      );

      this.selected =[];
      this.search = "";
      this.dataSource = this.$route.params.dataSource;
      this.dataSourceUrl = "/dataSource/" + this.dataSource;
    }
  }
}
</script>
