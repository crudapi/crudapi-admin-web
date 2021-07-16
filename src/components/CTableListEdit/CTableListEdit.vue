<template>
  <div>
    <q-banner inline-actions class="text-black bg-listcolor">
        {{ tableCaption }}
        <template v-slot:action>
          <q-btn
            dense
            flat
            unelevated
            round
            color="primary"
            @click="expand = !expand" :icon="expand ? 'expand_less' : 'expand_more'"
          />
        </template>
    </q-banner>
    <q-table v-show="expand"
      :data="qTableData"
      :columns="qTableColums"
      :row-key="getRecId"
      selection="multiple"
      :selected.sync="selected"
      :pagination.sync="tablePagination"
      :loading="loading"
      separator="cell"
      hide-bottom
      flat>
      <template v-slot:top>
        <q-btn
          :disable="selected.length == 0"
           dense flat unelevated round
          @click="onDeleteClickAction()"
          color="negative"
          icon="delete_forever"
        />
        <q-btn
          dense flat unelevated round
          @click="onNewClickAction()"
          color="primary"
          icon="add"
        />
      </template>

      <template v-slot:body="props">

        <q-tr :props="props">
          <q-td>
            <q-checkbox v-model="props.selected" />
          </q-td>
          <q-td key="dataClickAction" :props="props">
            <q-btn unelevated
              @click="onDeleteClickAction(props.row)"
              color="negative"
              icon="delete_forever"
              flat
              round
              dense
            ></q-btn>
            <q-btn
            v-if="(oneToOneMainToSubTables.length + oneToManySubTables.length) > 0"
            color="primary"
            dense flat unelevated round
            @click="props.expand = !props.expand"
            :icon="props.expand ? 'expand_less' : 'expand_more'"/>
          </q-td>
          <q-td :key="index" v-for="(value, colKey, index) in filterRow(props.row)">
              <span v-if="!isUpdatableByKey(colKey, props.cols)">
                {{ value | dataFormat(colKey, props.cols)}}
              </span>

              <q-select
                v-else-if="isOptionsByKey(colKey, props.cols)"
                style="min-width: 150px;height: 40px;"
                outlined
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                @filter="(val, update, abort) => {
                  getFilterFnByKey(colKey, props.cols, val, update, abort)
                }"
                @filter-abort="(val, update, abort) => {
                  getAbortFilterFnByKey(colKey, props.cols)
                }"
                v-model="props.row[colKey]"
                :options="getOptionsByKey(colKey, props.cols)"
                option-label="name"
                option-value="id"
                map-options
              />

              <q-input v-else-if="isDateTimeTypeByKey(colKey, props.cols)"
                v-model="props.row[colKey]">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="props.row[colKey]"
                    mask="YYYY-MM-DD"
                    @input="hideRefPopProxyAction('qDateProxy')" />
                  </q-popup-proxy>
                </q-icon>
              </template>
              </q-input>

              <q-input
                v-else-if="isNumberTypeByKey(colKey, props.cols)"
                v-model="props.row[colKey]"
                style="min-width: 80px;"
                type="number" >
              </q-input>

              <q-toggle v-else-if="isBoolTypeByKey(colKey, props.cols)"
                v-model="props.row[colKey]">
              </q-toggle>

              <q-input
                v-else style="min-width: 80px;"
                :placeholder="getPlaceHolderByKey(colKey, props.cols)"
                v-model="props.row[colKey]"
                :type="getInputTextType(props, colKey)" >
                <template v-slot:append 
                v-if="isPasswordTextType(props, colKey)" >
                  <q-icon
                    :name="getInputIcon(props, colKey)"
                    class="cursor-pointer"
                    @click="togglePwd(colKey, props.key)"
                  />
                </template>
              </q-input>
          </q-td>
        </q-tr>

        <q-tr v-if="(oneToOneMainToSubTables.length + oneToManySubTables.length) > 0"
          v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              <div :key="item.relationName" v-for="item in oneToOneMainToSubTables">
                <CTableEdit v-if="!!item.recIdMap[props.row.id]"
                  :recId="item.recIdMap[props.row.id]"
                  :fkColumnName="item.fkColumnName"
                  :ref="'rTableNewOrEditRef' + item.relationName + props.row.id"
                  :tableName="item.tableName" ></CTableEdit>

                <CTableNew v-else
                  :fkColumnName="item.fkColumnName"
                  :ref="'rTableNewOrEditRef' + item.relationName + props.row.id"
                  :tableName="item.tableName" ></CTableNew>
              </div>

              <div :key="item.relationName" v-for="item in oneToManySubTables">
                <CTableListEdit
                 v-if="item.recIdsMap[props.row.id]
                 && item.recIdsMap[props.row.id].length > 0"
                :recIds="item.recIdsMap[props.row.id]"
                :fkColumnName="item.fkColumnName"
                :ref="'rTableListRef' + item.relationName + props.row.id"
                :tableName="item.tableName"
                 ></CTableListEdit>

                <CTableList  v-else
                :fkColumnName="item.fkColumnName"
                :ref="'rTableListRef' + item.relationName + props.row.id"
                :tableName="item.tableName"
                 ></CTableList>
              </div>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-separator v-if="qTableData.length > 0" />
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
import { extend } from 'quasar'
import { date } from "../../utils";

export default {
  name: "CTableListEdit",
  props: {
    tableName: {
      required: true
    },
    fkColumnName: {
      required: false,
      type: String,
      default: "",
    },
    recIds: {
      type: Array
    }
  },

  data() {
    return {
      passwordMap: {},
      passwordMaps: {},
      tableCaption: "",
      primaryNames: [],
      expand: true,
      insertColumns: [],
      relationMap: {},
      oneToOneMainToSubTables: [],
      oneToManySubTables: [],

      qTableData: [],
      selected: [],
      loading: true,
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
      qTableColums: [
      ]
    };
  },

  created() {
    console.info("CTableNew created");
    this.init();
  },
  mounted: function() {
    console.info("CTableNew mounted");
  },
  activated: function() {
    console.info("CTableNew->activated");
  },
  deactivated: function() {
    console.info("CTableNew->deactivated");
  },
  updated: function() {
    console.info("CTableNew->updated");
  },
  destroyed: function() {
    console.info("CTableNew->destroyed");
  },
  filters: {
    dateTimeFormat: function(value) {
      return date.dateTimeFormat(value);
    },
    dateFormat: function(value) {
      return date.dateFormat(value);
    },
    timeFormat: function(value) {
      return date.timeFormat(value);
    },
    dataFormat: function(value, key, cols) {
      const find = cols.find(t => t.name === key);
      if (find) {
        if (find.dataType === "DATETIME") {
          return date.dateTimeFormat(value);
        } else if (find.dataType === "DATE") {
          return date.dateFormat(value);
        } else if (find.dataType === "TIME") {
          return date.timeFormat(value);
        }
      }
      if (value && value.name) {
        return value.name;
      }
      return value;
    }
  },
  computed: {},
  methods: {
    async init(tableName) {
      this.insertColumns = [];

      await this.loadMeta();
    },

    filterRow(row) {
      //console.dir(row);

      let newRow = {};
      this.insertColumns.forEach((column) => {
        newRow[column.name] = row[column.name];
      });

      //console.dir(newRow);
      return newRow;
    },

    isOptionsByKey: function(key, cols) {
      //console.info("isOptionsByKey");
      const find = cols.find(t => t.name === key);
      if (find && find.options) {
        console.info("isOptionsByKey:" + key);
        console.info("isOptionsByKey:" + JSON.stringify(cols));
        return true;
      }
      return false;
    },

    getOptionsByKey: function(key, cols) {
      //console.info("getOptionsByKey");
      const find = cols.find(t => t.name === key);
      if (find && find.options) {
        console.info(find.options);
        return find.options;
      }
      return null;
    },

    getFilterFnByKey: function(key, cols, val, update, abort) {
      console.info("getFilterFnByKey");
      const find = cols.find(t => t.name === key);
      if (find && find.options) {
        find.filterFn(val, update, abort);
      }
    },

    getAbortFilterFnByKey: function(key, cols) {
      console.info("getAbortFilterFnByKey");
      const find = cols.find(t => t.name === key);
      if (find && find.options) {
        find.abortFilterFn();
      }
    },

    isUpdatableByKey: function(key, cols) {
      const find = cols.find(t => t.name === key);
      if (find) {
        return find.updatable;
      }
      return false;
    },

    isDateTimeTypeByKey: function(key, cols) {
      const find = cols.find(t => t.name === key);
      if (find) {
        if (find.dataType === "DATETIME"
          || find.dataType === "DATE"
          || find.dataType === "TIME") {
          return true
        }
      }
      return false;
    },

    isNumberTypeByKey: function(key, cols) {
      const find = cols.find(t => t.name === key);
      if (find) {
        if (find.dataType === "TINYINT"
          || find.dataType === "SMALLINT"
          || find.dataType === "MEDIUMINT"
          || find.dataType === "INT"
          || find.dataType === "BIGINT") {
          return true
        }
      }
      return false;
    },

    isBoolTypeByKey: function(key, cols) {
      const find = cols.find(t => t.name === key);
      if (find) {
        if (find.dataType === "BOOL") {
          return true
        }
      }
      return false;
    },

    togglePwd(colKey, key) {
      console.info("togglePwd:" + colKey + "," + key);
      //Vue.set(this.passwordMap[key], 'isPwd', !old.isPwd);

      let newPasswordMaps =  extend(true, {}, this.passwordMaps);

      let newPasswordMap = newPasswordMaps[key];
      if (newPasswordMap) {
        newPasswordMap[colKey].isPwd = !newPasswordMap[colKey].isPwd;
      }
      
      this.passwordMaps = newPasswordMaps;
    },

    getPlaceHolderByKey: function(key, cols) {
      const find = cols.find(t => t.name === key);
      //console.dir(find);
      if (find) {
        return find.placeHolder;
      }
      return null;
    },

    getInputTextType: function(props, colKey) {
      if (this.passwordMaps[props.key] && this.passwordMaps[props.key][colKey].isPwd) {
        return "password";
      } else {
        return "text";
      }
    },

    isPasswordTextType: function(props, colKey) {
      if (this.passwordMaps[props.key] && this.passwordMaps[props.key][colKey].isPwd) {
        return true;
      } else {
        return false;
      }
    },

    getInputIcon: function(props, colKey) {
      if (this.passwordMaps[props.key] && this.passwordMaps[props.key][colKey].isPwd) {
        return "visibility_off";
      } else {
        return "visibility";
      }
    },

    addRow() {
      const index = this.qTableData.length + 1;
      const newRow = { isNewRow: true };

      this.insertColumns.forEach((column) => {
        newRow[column.name] = column.value;
      });
    
      this.qTableData  = [ ...this.qTableData.slice(0, index), newRow, ...this.qTableData.slice(index) ];
      
      const id = this.getRecIdByDataMap(newRow);

      this.passwordMaps[id] = extend(true, {}, this.passwordMap);
    },

    removeRow(id) {
      console.log("removeRow = " + id);
      const index = this.qTableData.findIndex(t => this.getRecId(t) === id);
      if (index >= 0) {
        this.qTableData = [ ...this.qTableData.slice(0, index), ...this.qTableData.slice(index + 1) ];
      }

      delete this.passwordMaps[id];
    },

    batchRemoveRow(ids) {
      ids.forEach((id) => {
        this.removeRow(id);
      });
    },

    onNewClickAction() {
      this.addRow();
    },

    async onDeleteClickAction(row) {
      let ids = [];
      this.selected.forEach((item) => {
        ids.push(this.getRecId(item));
      });
      console.info(JSON.stringify(ids));
      if (row) {
        this.removeRow(this.getRecId(row));
      } else {
        this.batchRemoveRow(ids);
        this.selected = [];
      }
    },

    getData() {
      let newData = [];
      let index = 0;
      let that = this;
      this.qTableData.forEach((t) => {
          //const newDataItem = extend(false, t);

          let newDataItem = {};
          let relationNames = [];
          for (let columnName in t) {
            if (relationNames.findIndex(t => t === columnName) < 0) {
              const value = t[columnName];
              const relation = this.relationMap[columnName];
              if (relation) {
                if (value && value.id) {
                  newDataItem[relation.relation.name] = value;
                } else {
                  newDataItem[relation.relation.name] = {"id": value};
                }
                relationNames.push(relation.relation.name);
                console.info(relation.relation.name);
              } else {
                if (value != undefined
                && value != null
                && value.toString().trim() !== "") {
                  newDataItem[columnName] = value;
                }
              }
            }
          }

          console.info(newDataItem);
          // const relation = this.relationMap[columnName];
          // if (relation) {
          //   data[relation.relation.name] = insertColumn.value;
          // } else {
          //   if (insertColumn.value && insertColumn.value.trim() !== "") {
          //     data[columnName] = insertColumn.value;
          //   }
          // }


          that.oneToOneMainToSubTables.forEach((oneToOneMainToSubTable) => {
            const ref = that.$refs['rTableNewOrEditRef' + oneToOneMainToSubTable.relationName + newDataItem.id];
            console.dir(ref);
            const subData = ref[0].getData();
            newDataItem[oneToOneMainToSubTable.relationName] = subData;
          });

          that.oneToManySubTables.forEach((oneToManySubTable) => {
            const ref = that.$refs['rTableListRef' + oneToManySubTable.relationName + newDataItem.id];
            console.dir(ref);
            const subData = ref[0].getData();
            newDataItem[oneToManySubTable.relationName] = subData;
          });

          if (newDataItem.isNewRow) {
            delete newDataItem.isNewRow;
            delete newDataItem.id;
          }

          delete newDataItem.createdDate;
          delete newDataItem.lastModifiedDate

          newData.push(newDataItem);
      });
      console.dir(newData);
      return newData;
    },

    hideRefPopProxyAction(ref) {
      console.info("hideRefPopProxyAction:" + this.$refs[ref]);
      const proxys = this.$refs[ref];
      for (let i = 0; i < proxys.length; i++) {
        proxys[i].hide();
      }
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

    getRecIdByDataMap(dataMap) {
      const primaryNames = this.primaryNames;
      if (primaryNames.length === 1) {
        return dataMap[primaryNames[0]];
      } else {
        let recIds = [];
        primaryNames.forEach((primaryName) => {
          recIds.push(primaryName + "=" + dataMap[primaryName]);
        });

        const recId = recIds.join(",");
        console.log(recId);

        return recId;
      }
    },

    async loadMeta() {
      this.loading = true;
      try {
        const table = await metadataTableService.getByName(this.tableName);
        this.tableCaption = table.caption;
        this.primaryNames = table.primaryNames;
        const tableRelations = await metadataRelationService.getByName(this.tableName);

        console.dir("listByIds:" + this.tableName);
        let tableDatas = await tableService.listByIds(this.tableName, this.recIds);
        console.dir(tableDatas);

        let oneToOneMainToSubTables = [];
        let oneToManySubTables = [];
        tableRelations.forEach((tableRelation) => {
          if (tableRelation.relationType === "OneToOneMainToSub") {
            let recIdMap = {};
            tableDatas.forEach((tableData) => {
              let recId = null;
              if (tableData[tableRelation.name]) {
                recId = tableData[tableRelation.name].id;
              }
              recIdMap[tableData.id] = recId;
            });
            console.info("recIdMap" + JSON.stringify(recIdMap));

            oneToOneMainToSubTables.push({
              "relationName": tableRelation.name,
              "tableName": tableRelation.toTable.name,
              "fkColumnName": tableRelation.toColumn.name,
              "recIdMap": recIdMap
            });
          } else if (tableRelation.relationType === "OneToMany") {
            let recIdsMap = {};
            tableDatas.forEach((tableData) => {
              let recIds = [];
              if (tableData[tableRelation.name]) {
                tableData[tableRelation.name].forEach((item) => {
                  recIds.push(item.id);
                });
              }
              recIdsMap[tableData.id] = recIds;
            });
            console.info("recIdsMap" + JSON.stringify(recIdsMap));

            oneToManySubTables.push({
              "relationName": tableRelation.name,
              "tableName": tableRelation.toTable.name,
              "fkColumnName": tableRelation.toColumn.name,
              "recIdsMap": recIdsMap
            });
          }
        });
        this.oneToOneMainToSubTables = oneToOneMainToSubTables;
        this.oneToManySubTables = oneToManySubTables;

        let optionsMap = {};
        let optionValueColumnNameMap = {};
        let relationMap = {};

        await Promise.all(tableRelations.map(async (tableRelation) => {
           if (tableRelation.relationType === "ManyToOne"
            || tableRelation.relationType === "OneToOneSubToMain") {
             console.info("tableRelation:" + JSON.stringify(tableRelation));

             const toTableData = await tableService.list(tableRelation.toTable.name);
             console.info("toTableData:" + JSON.stringify(toTableData));

             const fromColumnName = tableRelation.fromColumn.name;

             relationMap[fromColumnName] = {
                "data": toTableData,
                "relation": tableRelation
             }
           }
        }));

        this.relationMap = relationMap;

        console.info("relationMap:" + JSON.stringify(this.relationMap));

        let insertColumns = [];
        for (let i = 0; i < table.columns.length; i++) {
          const column = table.columns[i];
          const columnName = column.name;

          if (column.indexType === "FULLTEXT") {
            continue;
          }
          // if (this.fkColumnName && columnName === this.fkColumnName) {
          //   continue;
          // }


          if (column.dataType === 'PASSWORD') {
            column.isText = false;
            column.isPwd = true;
          } else {
            column.isText = true;
            column.isPwd = false;
          }

          let columnValue = null;
          if (column.defaultValue === "true") {
            columnValue = true;
          } else if (column.defaultValue === "false") {
            columnValue = false;
          } else {
            columnValue = column.defaultValue;
          }


          if (column.dataType === 'DATE' && columnValue) {
            column.value = date.dateFormat(columnValue);
          } else if (column.dataType === 'DATETIME' && columnValue) {
            column.value = date.dateTimeFormat(columnValue);
          } else if (column.dataType === 'TIME' && columnValue) {
            column.value = date.timeFormat(columnValue);
          } else {
            column.value = columnValue;
          }

          const relation = this.relationMap[columnName];
          if (relation) {
            column.options = relation.data;
            column.optionValueColumnName = relation.relation.toColumn.name;
            if (column.options) {
              column.value = column.options.find(t =>
                t[column.optionValueColumnName] + "" === column.defaultValue + "");
            }

            column.filterFn = (val, update, abort) => {
              // call abort() at any time if you can't retrieve data somehow
              console.info('filterFn:' + val)
              tableService.list(relation.relation.toTable.name, 0, 10, val)
              .then((data) => {
                update(() => {
                  if (val === '') {
                    column.options = relation.data;
                  }
                  else {
                    column.options = data;
                  }
                })
              });
            };

            column.abortFilterFn = () => {
              console.info('delayed filter aborted')
            }

            insertColumns.push(column);
          } else {
            insertColumns.push(column);
          }
        }

        this.insertColumns = insertColumns;
        console.info(this.insertColumns);

        let qTableColums = [];
        qTableColums.push({
          name: "dataClickAction",
          align: "center",
          label: "操作",
          field: "dataClickAction",
          sortable: true
        });

        insertColumns.forEach((column) => {
          this.passwordMap[column.name] = {
            isPwd: column.isPwd,
            isText: column.isText
          };

          qTableColums.push({
            name: column.name,
            align: "left",
            label: column.caption,
            field: column.name,
            dataType: column.dataType,
            sortable: false,
            placeHolder: column.description,
            updatable: column.updatable,
            options: column.options,
            filterFn: column.filterFn,
            abortFilterFn: column.abortFilterFn,
            isPwd: column.isPwd,
            isText: column.isText
          });
        });

        this.qTableColums = qTableColums;

        tableDatas.forEach((tableData) => {
          console.log(tableData);
          const key = this.getRecIdByDataMap(tableData);
          this.passwordMaps[key] = extend(true, {}, this.passwordMap);
        });

        this.qTableData = tableDatas;
        //this.addRow();

        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    }
  }
};
</script>
