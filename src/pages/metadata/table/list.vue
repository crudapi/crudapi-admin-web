<template>
  <div class="q-pa-md q-gutter-sm bg-page">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="表管理" />
      <q-breadcrumbs-el label="列表" />
    </q-breadcrumbs>

    <q-separator />

    <div class="q-pb-md bg-white">
      <div class="row justify-start items-baseline content-center items-center">
        <div class="row justify-start items-baseline content-center items-center">
          <div class="q-px-md">
            <q-item-label class="query-cond">关键字:</q-item-label>
          </div>
          <div class="q-pt-md">
            <q-input
            outlined
            v-model="search"
            placeholder="请输入关键字"
            v-on:keyup.enter="onQueryClickAction" />
          </div>
        </div>

        <div class="row justify-start items-baseline content-center items-center"
          :key="item.name" v-for="item in queryColumns">
          <div class="q-px-md">
            <q-item-label class="query-cond">{{item.label}}:</q-item-label>
          </div>
          <div class="q-pt-md">
            <q-input
            outlined
            v-model="item.value"
            placeholder=""
            v-on:keyup.enter="onQueryClickAction" />
          </div>
        </div>
      </div>

      <div class="q-pt-md row justify-start items-center">
        <div class="q-px-md">
          <q-btn
            unelevated
            color="primary"
            label="查询"
            @click="onQueryClickAction"
          />
        </div>
        <div class="q-px-md">
          <q-btn
            unelevated
            @click="onResetClickAction()"
            color="grey"
            label="重置"
          />
        </div>
      </div>
    </div>

    <div class="bg-table-list">
      <q-banner
        inline-actions class="text-black bg-listcolor">
          <template v-slot:action>
            <q-btn
              unelevated
              @click="onExportClickAction()"
              color="purple"
              label="导出全部"
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
              label="添加"
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
              <q-btn v-if="!props.row.systemable"
                unelevated
                @click="onDeleteClickAction(props.row.id)"
                color="negative"
                label="删除"
                flat
                dense
              ></q-btn>
              <q-btn
                unelevated
                @click="onEditClickAction(props.row.id)"
                color="primary"
                label="编辑"
                flat
                dense
              ></q-btn>
            </q-td>
            <q-td key="id" :props="props">{{ props.row.id }}</q-td>
            <q-td key="name" :props="props">
              <span>{{ props.row.name }}</span>
            </q-td>
            <q-td key="caption" :props="props">
              <span>{{ props.row.caption }}</span>
            </q-td>
            <q-td key="pluralName" :props="props">
              <span>{{ props.row.pluralName }}</span>
            </q-td>
            <q-td key="tableName" :props="props">
              <span>{{ props.row.tableName }}</span>
            </q-td>
            <q-td key="engine" :props="props">
              <span>{{ props.row.engine }}</span>
            </q-td>
            <q-td key="createdDate" :props="props">
              <span>{{ props.row.createdDate | dateFormat }}</span>
            </q-td>
            <q-td key="lastModifiedDate" :props="props">
              <span>{{ props.row.lastModifiedDate | dateFormat }}</span>
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
import { date } from "../../../utils";

export default {
  data () {
    return {
      data: [],
      tableName: "",
      tableCaption: "",
      listUrl: "",
      loading: true,
      selected: [],
      search: "",
      queryColumns: [],
      pagination: {
        page: 1,
        rowsPerPage: 10,
        count: 0
      },
      tablePagination: {
        rowsPerPage: 10
      },
      visibleColumns: [
        "id",
        "name",
        "caption",
        "pluralName",
        "tableName",
        "engine",
        "createdDate",
        "lastModifiedDate",
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
          name: "name",
          required: true,
          label: "名称",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "caption",
          required: true,
          label: "中文名称",
          align: "left",
          field: row => row.caption,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "pluralName",
          required: true,
          label: "复数",
          align: "left",
          field: row => row.pluralName,
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
          name: "engine",
          required: true,
          label: "引擎",
          align: "left",
          field: row => row.engine,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "createdDate",
          required: true,
          label: "创建时间",
          align: "left",
          field: row => row.createdDate,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "lastModifiedDate",
          required: true,
          label: "修改时间",
          align: "left",
          field: row => row.lastModifiedDate,
          format: val => `${val}`,
          sortable: true
        }
      ],
      relationMap: {}
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
    dateFormat: function(value) {
      return date.dateTimeFormat(value);
    },
    seqTypeFormat: function(value) {
      if (value === "STRING") {
        return "字符串";
      } else if (value === "LONG") {
        return "数字";
      } else {
        return value;
      }
    }
  },
  methods: {
    async onRefresh() {
      this.selected =[];
      await this.fetchFromServer();
    },

    reload() {
      this.$root.$emit("updateMenuTree");
      this.onRefresh();
    },

    onRequestAction(value) {
      this.tablePagination.rowsPerPage = value.rowsPerPage;
      this.fetchFromServer();
    },

    getQuery() {
      let query = {};
      for (let i = 0; i < this.queryColumns.length; i++) {
        const queryColumn = this.queryColumns[i];
        if (queryColumn.value && queryColumn.value.trim() !== "") {
          query[queryColumn.name] = queryColumn.value
        }
      }
      return query;
    },

    onQueryClickAction() {
      this.onRefresh();
    },

    onResetClickAction() {
      this.search = "";
       for (let i = 0; i < this.queryColumns.length; i++) {
         this.queryColumns[i].value = "";
      }
      this.onRefresh();
    },


    onNewClickAction() {
      this.$router.push("/metadata/tables/new");
    },

    onEditClickAction(id) {
      this.$router.push("/metadata/tables/" + id);
    },

    onExportClickAction(id) {
      window.open("/api/metadata/tables/export", "_blank");
    },

    async onDeleteClickAction(id) {
      let ids = [];
      this.selected.forEach(function(val){
          ids.push(val.id);
      });

      try {
        this.$q
          .dialog({
            title: "删除",
            message: "确认删除吗？",
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
            if (id) {
              await metadataTableService.delete(id);
            } else {
              await metadataTableService.batchDelete(ids);
            }

            this.$q.notify("删除成功");
            this.reload();
          })
          .onCancel(() => {})
          .onDismiss(() => {
            console.info("I am triggered on both OK and Cancel");
          });
      } catch (error) {
        this.$q.notify("删除失败");
      }
    },

    async fetchFromServer() {
      this.loading = true;
      this.data = [];
      this.$q.loading.show({
        message: "加载中"
      });
      try {
        let query = this.getQuery();

        this.pagination.count = await metadataTableService.count(this.search, query);

        let data = await metadataTableService.list(
          this.pagination.page,
          this.pagination.rowsPerPage,
          this.search,
          query);

        this.data = data;
        this.loading = false;
        this.$q.loading.hide();
      } catch (error) {
        this.loading = false;
        this.$q.loading.hide();
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
    }
  }
}
</script>
