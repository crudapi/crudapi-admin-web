<template>
  <div class="q-pa-md q-gutter-sm bg-page">
    <q-breadcrumbs>
      <q-breadcrumbs-el :label="tableCaption" clickable :to="listUrl" />
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
              @click="onImportClickAction()"
              color="purple"
              label="批量导入"
            />
            <p class="q-px-sm"/>
            <q-btn
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
        :row-key="getRecId"
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
            <q-td :key="index" v-for="(value, key, index) in props.row">
              <div v-if="key.indexOf('dataClickAction') >= 0">
                <q-btn
                  unelevated
                  @click="onDeleteClickAction(props.row)"
                  color="negative"
                  label="删除"
                  flat
                  dense
                ></q-btn>
                <q-btn
                  unelevated
                  @click="onEditClickAction(props.row)"
                  color="primary"
                  label="编辑"
                  flat
                  dense
                ></q-btn>
              </div>

              <div v-else-if="isAttachmentTypeByKey(key, props.cols)">
                <a target="_blank" :href="value">查看</a>
              </div>

              <div v-else>
                {{ value | dataFormat(key, props.cols)}}
              </div>
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
import { tableService } from "../../../service";
import { metadataTableService } from "../../../service";
import { metadataRelationService } from "../../../service";
import { date } from "../../../utils";

export default {
  data () {
    return {
      data: [],
      tableName: "",
      tableCaption: "",
      primaryNames: [],
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
      ],
      columns: [
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
    await this.init(to.params.tableName);
    await this.onRefresh();
    next();
  },
  filters: {
    dataFormat: function(value, key, cols) {
      const find = cols.find(t => t.name === key);
      if (find) {
        if (find.dataType === "DATETIME") {
          return date.dateTimeFormat(value);
        } else if (find.dataType === "DATE") {
          return date.dateFormat(value);
        } else if (find.dataType === "TIME") {
          return date.timeFormat(value);
        } else if (find.dataType === "BOOL") {
          if (value === true) {
            return "是"
          } else if (value === false) {
            return "否"
          }
        }
      }
      return value;
    }
  },
  methods: {
    isAttachmentTypeByKey: function(key, cols) {
      const find = cols.find(t => t.name === key);
      if (find) {
        if (find.dataType === "ATTACHMENT") {
          return true
        }
      }
      return false;
    },

    async onRefresh() {
      this.selected =[];
      await this.fetchFromServer();
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
      this.$router.push("/business/" + this.tableName + "/new",);
    },

    onEditClickAction(row) {
      const recId = this.getRecId(row);
      console.log(recId);

      this.$router.push("/business/" + this.tableName + "/" + recId);
    },

    onImportClickAction() {
      this.$router.push("/business/" + this.tableName + "/import");
    },

    getRecId(row) {
      if (this.primaryNames.length === 1) {
        return row[this.primaryNames[0]];
      } else {
        let recIds = [];
        this.primaryNames.forEach((primaryName) => {
          recIds.push(primaryName + "=" + row[primaryName]);
        });

        const recId = recIds.join(",");
        console.log(recId);

        return recId;
      }
    },

    async onDeleteClickAction(row) {
      let ids = [];
      this.selected.forEach((item) => {
          ids.push(this.getRecId(item));
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
            if (row) {
              await tableService.delete(this.tableName, this.getRecId(row));
            } else {
              await tableService.batchDelete(this.tableName, ids);
            }

            this.$q.notify("删除成功");
            this.onRefresh();
          })
          .onCancel(() => {})
          .onDismiss(() => {
            console.info("I am triggered on both OK and Cancel");
          });
      } catch (error) {
        console.error(error);
        this.$q.notify("删除失败");
      }
    },

    async fetchFromServer() {
      this.loading = true;
      this.data = [];
      try {
        let query = this.getQuery();

        this.pagination.count = await tableService.count(this.tableName, this.search,  query);

        let data = await tableService.list(this.tableName,
          this.pagination.page,
          this.pagination.rowsPerPage,
          this.search,
          query);
        let newData = [];
        const relationMap = this.relationMap;

        for (let i = 0; i < data.length; i++) {
          const row = data[i];
          let obj = {};
          this.columns.forEach(function(item, index, arr) {
            const columnName = item.name;
            const relation = relationMap[columnName];
            if (relation && row[relation.relation.name]) {
              obj[relation.relation.name] = row[relation.relation.name].name;
            } else {
              obj[columnName] = row[columnName];
            }
          });
          newData.push(obj);
        }

        this.data = newData;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    },

    async init(tableName) {
      console.info("init");
      this.$store.commit(
        "config/updateIsAllowBack",
        this.$route.meta.isAllowBack
      );

      this.tableName = tableName || this.$route.params.tableName;
      this.selected =[];
      this.columns = [];
      this.visibleColumns = [];
      this.pagination = {
        page: 1,
        rowsPerPage: 10,
        count: 0
      };

      this.search = "";

      await this.loadMeta();
    },

    async loadMeta() {
      this.loading = true;
      try {
        const table = await metadataTableService.getByName(this.tableName);
        this.tableCaption = table.caption;
        this.primaryNames = table.primaryNames;
        this.listUrl = "/business/" + this.tableName;

        const tableRelations = await metadataRelationService.getByName(this.tableName);

        let optionsMap = {};
        let optionValueColumnNameMap = {};
        let relationMap = {};

        await Promise.all(tableRelations.map(async (tableRelation) => {
           if (tableRelation.relationType === "ManyToOne"
            || tableRelation.relationType === "OneToOneSubToMain") {

             const toTableData = await tableService.list(tableRelation.toTable.name);
             const fromColumnName = tableRelation.fromColumn.name;

             relationMap[fromColumnName] = {
                "data": toTableData,
                "relation": tableRelation
             }
           }
        }));

        this.relationMap = relationMap;

        let columns = [{
          name: "dataClickAction",
          align: "center",
          label: "操作",
          field: "dataClickAction",
          sortable: true
        }];
        let visibleColumns = [];
        let queryColumns = [];
        for (let i = 0; i < table.columns.length; i++) {
          const column = table.columns[i];
          const columnName = column.name;
          if (column.indexType !== "FULLTEXT"
            && column.dataType !== "PASSWORD") {
            const relation = this.relationMap[columnName];
            let newColumn = {
                name: column.name,
                align: "left",
                label: column.caption,
                field: column.name,
                dataType: column.dataType,
                sortable: true
            };

            if (relation) {
              newColumn.isRelation = true
            } else {
              newColumn.isRelation = false
            }

            columns.push(newColumn);

            visibleColumns.push(column.name);

            if (column.queryable) {
              queryColumns.push({
                  name: column.name,
                  label: column.caption,
                  value: ""
              });
            }
          }
        }


        visibleColumns.push("dataClickAction");

        this.columns = columns;
        this.visibleColumns = visibleColumns;
        this.queryColumns = queryColumns;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    }
  }
}
</script>
