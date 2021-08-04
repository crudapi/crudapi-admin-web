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

              <div class="row items-baseline content-center"
              style="border-bottom: 1px solid rgba(0,0,0,0.12)" 
               v-else-if="isHasRelationTableNameByKey(colKey, props.cols)">
                <div class="col-10">
                  <span >{{ props.row[colKey] | relationDataFormat(colKey, props.cols) }}</span>
                </div>
                <div class="col-2">
                  <q-btn round dense flat icon="zoom_in" @click="openDialogClickAction(props, colKey)" />
                </div>
              </div>

              <q-input v-else-if="isDateTimeTypeByKey(colKey, props.cols)"
                  v-model="props.row[colKey]">
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="props.row[colKey]"
                      mask="YYYY-MM-DD HH:mm:ss"
                      @input="hideRefPopProxyAction('qDateProxy')" />
                    </q-popup-proxy>
                  </q-icon>
                </template>

                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy ref="qTimeProxy" transition-show="scale" transition-hide="scale">
                      <q-time v-model="props.row[colKey]" mask="YYYY-MM-DD HH:mm:ss"
                      format24h with-seconds
                      @input="hideRefPopProxyAction('qTimeProxy')" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-input v-else-if="isDateTypeByKey(colKey, props.cols)"
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

              <q-input v-else-if="isTimeTypeByKey(colKey, props.cols)"
                v-model="props.row[colKey]">
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy ref="qTimeProxy" transition-show="scale" transition-hide="scale">
                      <q-time v-model="props.row[colKey]" mask="HH:mm:ss"
                      format24h with-seconds
                      @input="hideRefPopProxyAction('qTimeProxy')" />
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
               
                <CTableEdit 
                  v-if="isExistCTableEdit(item.recIdMap, props.row)"
                  :recId="getCTableEditRecId(item.recIdMap, props.row)"
                  :fkColumnName="item.fkColumnName"
                  :ref="getRefName('rTableNewOrEditRef', item.relationName, props.row)"
                  :tableName="item.tableName" >
                </CTableEdit>

                <CTableNew v-else
                  :fkColumnName="item.fkColumnName"
                  :ref="getRefName('rTableNewOrEditRef', item.relationName, props.row)"
                  :tableName="item.tableName" >
                </CTableNew>
              </div>

              <div :key="item.relationName" v-for="item in oneToManySubTables">
                <CTableListEdit
                  v-if="isExistCTableListEdit(item.recIdsMap, props.row)"
                  :recIds="getCTableListEditRecIds(item.recIdsMap, props.row)"
                  :fkColumnName="item.fkColumnName"
                  :ref="getRefName('rTableListRef', item.relationName, props.row)"
                  :tableName="item.tableName">
                </CTableListEdit>

                <CTableList  v-else
                  :fkColumnName="item.fkColumnName"
                  :ref="getRefName('rTableListRef', item.relationName, props.row)"
                  :tableName="item.tableName">
                </CTableList>
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
import CTableListReadDialog from '../../components/CTableListRead/CTableListReadDialog'

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
      relationMetadataMap: {},
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
    },
    relationDataFormat: function(value, colKey, cols) {
       console.log("relationDataFormat:" +  JSON.stringify(value));
       const item = cols.find(t => t.name === colKey);
       let ret = value;
       if (value) {
         if (item.relationDisplayColumns.length > 0) {
            let displayValues = [];
            item.relationDisplayColumns.forEach((t) => {
                value[t.name] && displayValues.push(value[t.name]);
            });

            if (displayValues.length > 0) {
              ret = displayValues.join("|");
            } else {
              ret = value[item.relationColumnName];
            }
         } else {
            ret = value[item.relationColumnName];
         }
       } 
       return ret ? ret : value;
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

    isHasRelationTableNameByKey: function(key, cols) {
      const find = cols.find(t => t.name === key);
      if (find.relationTableName) {
        return true;
      }
      return false;
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
        if (find.dataType === "DATETIME") {
          return true
        }
      }
      return false;
    },

    isDateTypeByKey: function(key, cols) {
      const find = cols.find(t => t.name === key);
      if (find) {
        if (find.dataType === "DATE") {
          return true
        }
      }
      return false;
    },

    isTimeTypeByKey: function(key, cols) {
      const find = cols.find(t => t.name === key);
      if (find) {
        if (find.dataType === "TIME") {
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

    getRefName: function(prefix, relationName, row) {
      const refName = prefix + relationName + this.getRecId(row);
      console.log(refName);
      return refName;
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

    isExistCTableListEdit: function(recIdsMap, row) {
      console.log("isExistCTableListEdit");
      const recIds = this.getCTableListEditRecIds(recIdsMap, row);
      if (recIds && recIds.length > 0) {
        return true;
      }

      return false;
    },

    getCTableListEditRecIds: function(recIdsMap, row) {
      if (recIdsMap && row) {
        const recIds = recIdsMap[this.getRecId(row)];
        console.log("getCTableListEditRecIds: " + JSON.stringify(recIds));
        return recIds;
      } else {
        console.log("getCTableListEditRecIds empty");
        return [];
      }
    },

    isExistCTableEdit: function(recIdMap, row) {
      console.log("isExistCTableEdit");
      const recId = this.getCTableEditRecId(recIdMap, row);
      if (recId) {
        return true;
      }

      return false;
    },

    getCTableEditRecId: function(recIdMap, row) {
      if (recIdMap && row) {
        const recId = recIdMap[this.getRecId(row)];
        console.log("getCTableEditRecId: " + recId);
        return recId;
      } else {
        console.log("getCTableEditRecId empty");
        return null;
      }
    },

    addRow() {
      console.log("CTableListEdit-> addRow");
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
            const value = t[columnName];
            const relation = this.relationMap[columnName];
            if (relation) {
              newDataItem[relation.name] = value;
              newDataItem[columnName] = value && value[relation.toColumn.name];
            } else {
              if (value != undefined
              && value != null
              && value.toString().trim() !== "") {
                newDataItem[columnName] = value;
              }
            }
          }

          console.info(newDataItem);

          that.oneToOneMainToSubTables.forEach((oneToOneMainToSubTable) => {
            const refName = 'rTableNewOrEditRef' + oneToOneMainToSubTable.relationName + this.getRecId(newDataItem);
            console.dir(refName);
            const ref = that.$refs[refName];
            console.dir(ref);
            const subData = ref[0].getData();
            newDataItem[oneToOneMainToSubTable.relationName] = subData;
          });

          that.oneToManySubTables.forEach((oneToManySubTable) => {
            const refName = 'rTableListRef' + oneToManySubTable.relationName + this.getRecId(newDataItem);
            console.dir(refName);
            const ref = that.$refs[refName];
            console.dir(ref);
            const subData = ref[0].getData();
            newDataItem[oneToManySubTable.relationName] = subData;
          });

          if (newDataItem.isNewRow) {
            delete newDataItem.isNewRow;
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
        return row[this.primaryNames[0]] || null;
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

    getRecIdByTableAndDataMap(tableDTO, dataMap) {
      const primaryNames = tableDTO.primaryNames;
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

    openDialogClickAction(props, colKey) {
      const col = props.cols.find(t => t.name === colKey);
      const row = props.row;
      this.$q.dialog({
        component: CTableListReadDialog,

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
        tableName: col.relationTableName,
        data: row[colKey]
        // ...more.props...
      }).onOk((data) => {
        row[colKey] = data;
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      });
    },

    async loadMeta() {
      const that = this;
      this.loading = true;
      try {
        /* 主表元数据 */
        const table = await metadataTableService.getByName(this.tableName);
        this.tableCaption = table.caption;
        this.primaryNames = table.primaryNames;

        /* 关联关系 */
        const tableRelations = await metadataRelationService.getByName(this.tableName);

        /* 关联表元数据 */
        let relationMetadataMap = {};
        await Promise.all(tableRelations.map(async (tableRelation) => {
            const relationTable = await metadataTableService.getByName(tableRelation.toTable.name);
            relationMetadataMap[tableRelation.toTable.name] = relationTable;
        }));
        this.relationMetadataMap = relationMetadataMap;

        /* 主表业务数据 */
        let tableDatas = await tableService.listByIds(this.tableName, this.recIds);
        console.dir(tableDatas);

        let relationMap = {};
        let oneToOneMainToSubTables = [];
        let oneToManySubTables = [];
        tableRelations.forEach((tableRelation) => {
          if (tableRelation.relationType === "OneToOneMainToSub") {
            let recIdMap = {};
            tableDatas.forEach((tableData) => {
              if (tableData[tableRelation.name]) {
                let mainRecId = that.getRecIdByTableAndDataMap(table, tableData);
                let relationRecId = that.getRecIdByTableAndDataMap(relationMetadataMap[tableRelation.toTable.name], tableData[tableRelation.name]);
                recIdMap[mainRecId] = relationRecId;
              }
            });
            console.info("OneToOneMainToSub recIdMap" + JSON.stringify(recIdMap));

            oneToOneMainToSubTables.push({
              "relationName": tableRelation.name,
              "tableName": tableRelation.toTable.name,
              "fkColumnName": tableRelation.toColumn.name,
              "recIdMap": recIdMap
            });
          } else if (tableRelation.relationType === "OneToMany") {
            let recIdsMap = {};
            tableDatas.forEach((tableData) => {
              console.log("[1]recIdsMap->table:" + table.caption + tableData.name);
              let mainRecId = that.getRecIdByTableAndDataMap(table, tableData);
              console.log("[1]recIdsMap->mainRecId:" + mainRecId);
              let recIds = [];
              if (tableData[tableRelation.name]) {
                tableData[tableRelation.name].forEach((item) => {
                  let relationRecId = that.getRecIdByTableAndDataMap(relationMetadataMap[tableRelation.toTable.name], item);
                  recIds.push(relationRecId);
                  console.info("[1]recIdsMap->relationRecId:" + recIds);
                });
              }
              recIdsMap[mainRecId] = recIds;
              console.info("[1]recIdsMap:" + JSON.stringify(recIdsMap));
            });
            

            oneToManySubTables.push({
              "relationName": tableRelation.name,
              "tableName": tableRelation.toTable.name,
              "fkColumnName": tableRelation.toColumn.name,
              "recIdsMap": recIdsMap
            });
          } else if (tableRelation.relationType === "ManyToOne"
            || tableRelation.relationType === "OneToOneSubToMain") {
             const fromColumnName = tableRelation.fromColumn.name;
             relationMap[fromColumnName] = tableRelation;
          }
        });
        this.oneToOneMainToSubTables = oneToOneMainToSubTables;
        this.oneToManySubTables = oneToManySubTables;
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

          if (column.dataType === 'DATE') {
            tableDatas.forEach((tableData) => {
              tableData[columnName] =  date.dateFormat(tableData[columnName]);
            });
          } else if (column.dataType === 'DATETIME') {
            tableDatas.forEach((tableData) => {
              tableData[columnName] =  date.dateTimeFormat(tableData[columnName]);
            });
          }

          const relation = this.relationMap[columnName];
          if (relation) {
            column.relationTableName = relation.toTable.name;
            column.relationColumnName = relation.toColumn.name;
            column.relationDisplayColumns= that.getDisplayableColumns(relationMetadataMap[column.relationTableName]);

            tableDatas.forEach((tableData) => {
              tableData[columnName] = tableData[relation.name];
            });

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
            relationTableName: column.relationTableName,
            relationColumnName: column.relationColumnName,
            relationDisplayColumns: column.relationDisplayColumns,
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
        console.dir(tableDatas);
        //this.addRow();

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
