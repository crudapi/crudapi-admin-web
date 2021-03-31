<template>
  <div class="q-pa-md q-gutter-sm bg-page">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="表关系" />
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
      <q-banner inline-actions class="text-black bg-listcolor">
          <template v-slot:action>
            <q-btn
              unelevated
              @click="onExportClickAction()"
              color="purple"
              label="导出全部"
            />
            <p class="q-px-sm"/>
            <q-btn
              unelevated
              @click="onGraphClickAction()"
              color="blue"
              label="查看关系图"
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
            <q-td key="relationType" :props="props">
              <span>{{ props.row.relationType | relationTypeFormat }}</span>
            </q-td>
            <q-td key="fromTable" :props="props">
              <q-btn
                unelevated
                @click="onTableClickAction(props.row.fromTable)"
                color="primary"
                :label="props.row.fromTable.caption"
                flat
                dense
              ></q-btn>
            </q-td>
            <q-td key="fromColumn" :props="props">
              <span>{{ props.row.fromColumn.caption }}</span>
            </q-td>
            <q-td key="toTable" :props="props">
              <q-btn
                unelevated
                @click="onTableClickAction(props.row.toTable)"
                color="primary"
                :label="props.row.toTable.caption"
                flat
                dense
              ></q-btn>
            </q-td>
            <q-td key="toColumn" :props="props">
              <span>{{ props.row.toColumn.caption }}</span>
            </q-td>
            <q-td key="description" :props="props">
              <span>{{ props.row.description }}</span>
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

<style lang="stylus">
.bg-table-list
  a
    color: $primary;
    text-decoration:none;

</style>

<script>
import { metadataRelationService } from "../../../service";
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
          label: "英文名称",
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
          name: "relationType",
          required: true,
          label: "关系类型",
          align: "left",
          field: row => row.relationType,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "fromTable",
          required: true,
          label: "源表",
          align: "left",
          field: row => row.fromTable,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "fromColumn",
          required: true,
          label: "源列",
          align: "left",
          field: row => row.fromColumn,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "toTable",
          required: true,
          label: "目标表",
          align: "left",
          field: row => row.toTable,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "toColumn",
          required: true,
          label: "目标列",
          align: "left",
          field: row => row.toColumn,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "description",
          required: true,
          label: "备注",
          align: "left",
          field: row => row.description,
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
    relationTypeFormat: function(value) {
      if (value === "OneToMany") {
        return "一对多";
      } else if (value === "ManyToOne") {
        return "多对一";
      } else if (value === "OneToOneMainToSub") {
        return "一对一(主子)";
      } else if (value === "OneToOneSubToMain") {
        return "一对一(子主)";
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
      this.$router.push("/metadata/relations/new");
    },

    onEditClickAction(id) {
      this.$router.push("/metadata/relations/" + id);
    },


    onGraphClickAction(id) {
      this.$router.push("/metadata/relations/graph");
    },

    onTableClickAction(table) {
      this.$router.push("/metadata/tables/" + table.id);
    },

    onExportClickAction(id) {
      window.open("/api/metadata/tablerelations/export", "_blank");
    },

    async onDeleteClickAction(id) {
      let ids = [];
      this.selected.forEach(function(val){
          ids.push(val.id);
      });
      console.info(JSON.stringify(ids));

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
              await metadataRelationService.delete(id);
            } else {
              await metadataRelationService.batchDelete(ids);
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

        this.pagination.count = await metadataRelationService.count(this.search, query);

        let data = await metadataRelationService.list(
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
