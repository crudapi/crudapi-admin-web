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
      row-key="id"
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
              @click="onDeleteClickAction(props.row.id)"
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
            <q-select
                v-if="isOptionsByKey(colKey, props.cols)"
                style="min-width: 150px;height: 40px;"
                outlined
                option-label="name"
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
                :type="passwordMaps[props.key][colKey].isPwd ? 'password' : 'text'" >
                <template v-slot:append v-if="!passwordMaps[props.key][colKey].isText" >
                  <q-icon
                    :name="passwordMaps[props.key][colKey].isPwd ? 'visibility_off' : 'visibility'"
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
                <CTableNew
                :fkColumnName="item.fkColumnName"
                :ref="'rTableNewRef' + item.relationName + props.row.id"
                :tableName="item.tableName" ></CTableNew>
              </div>

              <div :key="item.relationName" v-for="item in oneToManySubTables">
                <CTableList
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

export default {
  name: "CTableList",
  props: {
    tableName: {
      required: true
    },
    fkColumnName: {
      required: false,
      type: String,
      default: "",
    }
  },

  data() {
    return {
      passwordMap: {},
      passwordMaps: {},
      tableCaption: "",
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
  filters: {},
  computed: {
  },
  methods: {
    async init(tableName) {
      this.insertColumns = [];

      await this.loadMeta();
    },

    filterRow(row) {
      let newRow = {};
      for (let key in row) {
        if (key != 'id') {
          newRow[key] = row[key];
        }
      }

      return newRow;
    },

    isOptionsByKey: function(key, cols) {
      const find = cols.find(t => t.name === key);
      if (find.options) {
        return true;
      }
      return false;
    },

    getOptionsByKey: function(key, cols) {
      const find = cols.find(t => t.name === key);
      if (find.options) {
        console.info(find.options);
        return find.options;
      }
      return null;
    },

    getFilterFnByKey: function(key, cols, val, update, abort) {
      const find = cols.find(t => t.name === key);
      if (find.options) {
        find.filterFn(val, update, abort);
      }
    },

    getAbortFilterFnByKey: function(key, cols) {
      const find = cols.find(t => t.name === key);
      if (find.options) {
        find.abortFilterFn();
      }
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

    isAttachmentTypeByKey: function(key, cols) {
      const find = cols.find(t => t.name === key);
      if (find) {
        if (find.dataType === "ATTACHMENT") {
          return true
        }
      }
      return false;
    },

    togglePwd(colKey, key) {
      let newPasswordMaps =  extend(true, {}, this.passwordMaps);

      let newPasswordMap = newPasswordMaps[key];
      newPasswordMap[colKey].isPwd = !newPasswordMap[colKey].isPwd;

      this.passwordMaps = newPasswordMaps;
    },

    getPlaceHolderByKey: function(key, cols) {
      const find = cols.find(t => t.name === key);
      if (find) {
        return find.placeHolder;
      }
      return null;
    },

    addRow() {
      const index = this.qTableData.length + 1;
      const newRow = { };

      this.insertColumns.forEach((column) => {
        newRow[column.name] = column.value;
      });
      newRow.id = (new Date()).valueOf();

      this.qTableData  = [ ...this.qTableData.slice(0, index), newRow, ...this.qTableData.slice(index) ];

      this.passwordMaps[newRow.id] = extend(true, {}, this.passwordMap);
    },

    removeRow(id) {
      const index = this.qTableData.findIndex(t => t.id === id);
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

    getData() {
      let newData = [];
      let index = 0;
      let that = this;
      this.qTableData.forEach((t) => {
          let newDataItem = {};
          for (let columnName in t) {
            const value = t[columnName];
            const relation = this.relationMap[columnName];
            if (relation) {
              newDataItem[relation.relation.name] = value;
            } else {
              if (value != undefined
                && value != null
                && value.toString().trim() !== "") {
                newDataItem[columnName] = value;
              }
            }
          }

          that.oneToOneMainToSubTables.forEach((oneToOneMainToSubTable) => {
            const ref = that.$refs['rTableNewRef' + oneToOneMainToSubTable.relationName + newDataItem.id];
            const subData = ref[0].getData();
            newDataItem[oneToOneMainToSubTable.relationName] = subData;
          });

          that.oneToManySubTables.forEach((oneToManySubTable) => {
            const ref = that.$refs['rTableListRef' + oneToManySubTable.relationName + newDataItem.id];
            const subData = ref[0].getData();
            newDataItem[oneToManySubTable.relationName] = subData;
          });

          delete newDataItem.id;
          delete newDataItem.createdDate;
          delete newDataItem.lastModifiedDate;
          newData.push(newDataItem);
      });
      console.dir(newData);
      return newData;
    },

    hideRefPopProxyAction(ref) {
      const proxys = this.$refs[ref];
      for (let i = 0; i < proxys.length; i++) {
        proxys[i].hide();
      }
    },

    async loadMeta() {
      this.loading = true;
      try {
        const table = await metadataTableService.getByName(this.tableName);
        this.tableCaption = table.caption;
        const tableRelations = await metadataRelationService.getByName(this.tableName);

        let oneToOneMainToSubTables = [];
        let oneToManySubTables = [];
        tableRelations.forEach((tableRelation) => {
          if (tableRelation.relationType === "OneToOneMainToSub") {
            oneToOneMainToSubTables.push({
              "relationName": tableRelation.name,
              "tableName": tableRelation.toTable.name,
              "fkColumnName": tableRelation.toColumn.name
            });
          } else if (tableRelation.relationType === "OneToMany") {
            oneToManySubTables.push({
              "relationName": tableRelation.name,
              "tableName": tableRelation.toTable.name,
              "fkColumnName": tableRelation.toColumn.name
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
             const toTableData = await tableService.list(tableRelation.toTable.name);

             const fromColumnName = tableRelation.fromColumn.name;

             relationMap[fromColumnName] = {
                "data": toTableData,
                "relation": tableRelation
             }
           }
        }));

        this.relationMap = relationMap;

        let insertColumns = [];
        for (let i = 0; i < table.columns.length; i++) {
          const column = table.columns[i];

          if (column.insertable) {
            const columnName = column.name;
            if (this.fkColumnName && columnName === this.fkColumnName) {
              continue;
            }

            if (column.defaultValue === "true") {
              column.value = true;
            } else if (column.defaultValue === "false") {
              column.value = false;
            } else {
              column.value = column.defaultValue;
            }

            if (column.dataType === 'PASSWORD') {
              column.isText = false;
              column.isPwd = true;
            } else {
              column.isText = true;
              column.isPwd = false;
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
        }

        this.insertColumns = insertColumns;
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
            options: column.options,
            filterFn: column.filterFn,
            abortFilterFn: column.abortFilterFn,
            isPwd: column.isPwd,
            isText: column.isText
          });
        });

        this.qTableColums = qTableColums;

        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    }
  }
};
</script>
