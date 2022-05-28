<template>
    <div>
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
        <q-banner v-if="!readOnly && !table.readOnly" inline-actions class="text-black bg-listcolor">
            <template v-slot:action>
              <q-btn
                unelevated
                @click="onDeleteClickAction()"
                color="negative"
                label="批量删除"
              />
              <p class="q-px-sm"/>
              <q-btn
                unelevated
                @click="onExportClickAction()"
                color="positive"
                label="导出全部"
              />
              <p class="q-px-sm"/>
              <q-btn
                unelevated
                @click="onImportClickAction()"
                color="purple"
                label="批量导入"
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
          :selection="selection"
          :selected.sync="selected"
          @selection="onSelection"
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
                    v-if="!readOnly && !table.readOnly"
                    unelevated
                    @click="onDeleteClickAction(props.row)"
                    color="negative"
                    label="删除"
                    flat
                    dense
                  ></q-btn>
                  <q-btn
                    v-if="!readOnly && !table.readOnly"
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

<style lang="stylus">
.required:before
  content: "* ";
  color: red;

</style>

<script>
import { tableService } from "../../service";
import { metadataTableService } from "../../service";
import { metadataRelationService } from "../../service";
import { date } from "../../utils";
import { extend } from "quasar";
import CDownloadDialog from '../CDownload/CDownloadDialog'

export default {
  name: "CTableListRead",
  props: {
    dataSource: {
      required: true
    },
    tableName: {
      required: true
    },
    selectionProp: {
      required: false
    },
    value: {
      required: false
    },
    readOnly: {
      required: false
    }
  },
  data () {
    return {
      data: [],
      table: {},
      tableCaption: "",
      primaryNames: [],
      listUrl: "",
      loading: true,
      selected: [],
      selection: 'multiple',
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
    console.info('CTableListRead mounted');
  },

  activated: function() {
    console.info('CTableListRead activated');
  },

  deactivated: function() {
    console.info('CTableListRead deactivated');
  },

  updated: function() {
    console.info('CTableListRead updated');
  },

  destroyed: function() {
    console.info('CTableListRead destroyed');
  },

  async beforeRouteUpdate (to, from, next) {
    console.info('CTableListRead beforeRouteUpdate');
    await this.init();
    await this.onRefresh();
    next();
  },
  filters: {
    dataFormat: function(value, key, cols) {
      const find = cols.find(t => t.name === key);
      if (find) {
        if (find.relationTableName) {
          const dicFormat = function(v) {
            let data = null;

            if (v) {
             if (find.relationDisplayColumns.length > 0) {
                let displayValues = [];
                find.relationDisplayColumns.forEach((t) => {
                    v[t.name] && displayValues.push(v[t.name]);
                });


                if (displayValues.length > 0) {
                  data = displayValues.join("|");
                } else {
                  data = v[find.relationColumnName];
                }
             } else {
                data = v[find.relationColumnName];
             }
            }

            return data;
          }

          let ret = value;

          if (value) {
            if (Array.isArray(value)) {
               let values = [];
               value.forEach((t) => {
                  const subV = dicFormat(t);
                  if (subV) {
                    values.push(subV);
                  }
               });

               ret = values.join(",");
            } else {
              ret = dicFormat(value);
            }
          }

          return (ret != null && ret != undefined) ? ret : value;
        } else if (find.dataType === "DATETIME") {
          return date.dateTimeFormat(value);
        } else if (find.dataType === "DATE") {
          return date.dateFormat(value);
        } else if (find.dataType === "TIME") {
          return date.timeFormat(value);
        } else if (find.dataType === "BOOL") {
          if (value === true) {
            return "是"
          } else {
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
      this.$router.push("/dataSource/" + this.dataSource + "/business/" + this.tableName + "/new",);
    },

    onEditClickAction(row) {
      const recId = this.getRecId(row);
      console.log(recId);

      this.$router.push("/dataSource/" + this.dataSource + "/business/" + this.tableName + "/" + recId);
    },

    onImportClickAction() {
      this.$router.push("/dataSource/" + this.dataSource + "/business/" + this.tableName + "/import");
    },

    getRecId(row) {
      if (!row) {
        return null;
      }
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

    onSelection({ rows, added, evt }) {
      console.log("onSelection");
      console.dir(rows);
      console.dir(added);

      if (this.selectionProp === 'multiple') {

        let allRows = [];
        this.selected.forEach((t) => {
          allRows.push(t);
        });

        if (added) {
          allRows = allRows.concat(rows);
        } else {
          rows.forEach((r) => {
            const index = allRows.findIndex(t => t.id === r.id);
            if (index >= 0) {
              allRows = [ ...allRows.slice(0, index), ...allRows.slice(index + 1) ];
            }
          });
        }

        this.$emit("input", allRows);
      } else {
        if (added) {
          this.$emit("input", rows[0]);
        } else {
          this.$emit("input", null);
        }
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
              await tableService.delete(this.dataSource, this.tableName, this.getRecId(row));
            } else {
              await tableService.batchDelete(this.dataSource, this.tableName, ids);
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

    async onExportClickAction() {
      this.$q.loading.show({
        message: "生成中"
      });

      try {
        let query = this.getQuery();

        const url = await tableService.export(this.dataSource, this.tableName, this.search, query);
        //this.$q.notify("数据导出成功，请等待下载完成后查看！");

        this.$q.dialog({
          component: CDownloadDialog,

          // optional if you want to have access to
          // Router, Vuex store, and so on, in your
          // custom component:
          parent: this, // becomes child of this Vue node
                        // ("this" points to your Vue component)
                      // (prop was called "root" in < 1.1.0 and
                      // still works, but recommending to switch
                      // to data: the more appropriate "parent" name)

          // props forwarded to component
          // (everything except "component" and "parent" props above):
          url: url,
          data: {}
          // ...more.props...
        }).onOk((data) => {
          item.value = data;
        }).onCancel(() => {
          console.log('Cancel')
        }).onDismiss(() => {
          console.log('Called on OK or Cancel')
        });

        this.$q.loading.hide();
      } catch (error) {
        this.$q.loading.hide();
        console.error(error);
      }
    },

    async fetchFromServer() {
      this.loading = true;
      this.data = [];
      try {
        let query = this.getQuery();

        this.pagination.count = await tableService.count(this.dataSource, this.tableName, this.search,  query);

        let data = await tableService.list(this.dataSource, this.tableName,
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
            if (relation) {
              obj[columnName] = row[relation.name];
            } else {
              obj[columnName] = row[columnName];
            }
          });
          newData.push(obj);
        }

        this.data = newData;


        let selectedRecIds = [];
        if (Array.isArray(this.value)) {
          this.value.forEach((t) => {
              const selectedRecId = this.getRecId(t);
              console.log(selectedRecId);
              selectedRecIds.push(selectedRecId);
          });
        } else {
          const selectedRecId = this.getRecId(this.value);
          console.log(selectedRecId);
          selectedRecIds.push(selectedRecId);
        }

        let selected = [];
        for (let i = 0; i < this.data.length; i++) {
          const recId = this.getRecId(this.data[i]);
          const index = selectedRecIds.findIndex(t => t  === recId);
          if (index >= 0) {
            selected.push(this.data[i]);
          }
        }
        this.selected = selected;

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

      this.selection = this.selectionProp || 'multiple';

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
      const that = this;
      this.loading = true;
      try {
        const table = await metadataTableService.getByName(this.dataSource, this.tableName);
        this.table = table;
        this.tableCaption = table.caption;
        this.primaryNames = table.primaryNames;
       
        const tableRelations = await metadataRelationService.getByName(this.dataSource, this.tableName);

        /* 关联表元数据 */
        let relationMetadataMap = {};
        await Promise.all(tableRelations.map(async (tableRelation) => {
          const relationTable = await metadataTableService.getByName(this.dataSource, tableRelation.toTable.name);
          relationMetadataMap[tableRelation.toTable.name] = relationTable;
        }));
        this.relationMetadataMap = relationMetadataMap;


        let relationMap = {};
        await Promise.all(tableRelations.map(async (tableRelation) => {
           if (tableRelation.relationType === "ManyToOne"
            || tableRelation.relationType === "OneToOneSubToMain") {
             const fromColumnName = tableRelation.fromColumn.name;
             relationMap[fromColumnName] = tableRelation
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
            if (relation) {
              column.relationTableName = relation.toTable.name;
              column.relationColumnName = relation.toColumn.name;
              column.relationDisplayColumns= that.getDisplayableColumns(relationMetadataMap[column.relationTableName]);

              // tableDatas.forEach((tableData) => {
              //   tableData[columnName] = tableData[relation.name];
              // });
            }

            let newColumn = {
                name: column.name,
                align: "left",
                label: column.caption,
                field: column.name,
                dataType: column.dataType,
                sortable: true,
                relationTableName: column.relationTableName,
                relationColumnName: column.relationColumnName,
                relationDisplayColumns: column.relationDisplayColumns,
            };

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
    },


    getDisplayableColumns(tableMetadata) {
      const displayableColumns = tableMetadata.columns.filter(t => t.displayable === true);
      return displayableColumns;
    }
  }
};
</script>
