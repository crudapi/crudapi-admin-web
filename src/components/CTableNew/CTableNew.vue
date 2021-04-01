<template>
  <div>
    <q-banner inline-actions class="q-mb-md text-black bg-listcolor">
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
    <form v-show="expand" @submit.prevent.stop="onSubmit" class="q-pb-md">
      <div class="row items-baseline content-center justify-start q-pb-md"
          :key="item.name" v-for="item in insertColumns">
        <div class="col-3 text-right text-subtitle2 q-pr-md query-cond"
          v-bind:class="{ 'required': !item.nullable}">
        {{item.caption}}:</div>

        <div class="col-7">
          <q-select
            v-if="item.options"
            style="min-width: 150px;height: 40px;"
            outlined
            option-label="name"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            @filter="item.filterFn"
            @filter-abort="item.abortFilterFn"
            v-model="item.value"
            :options="item.options"
          />

           <q-input v-else-if="isDateTimeType(item.dataType)"
              v-model="item.value">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="item.value"
                  mask="YYYY-MM-DD HH:mm:ss"
                  @input="hideRefPopProxyAction('qDateProxy')" />
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy ref="qTimeProxy" transition-show="scale" transition-hide="scale">
                  <q-time v-model="item.value" mask="YYYY-MM-DD HH:mm:ss"
                  format24h with-seconds
                  @input="hideRefPopProxyAction('qTimeProxy')" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input v-else-if="isDateType(item.dataType)"
              v-model="item.value">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="item.value"
                  mask="YYYY-MM-DD"
                  @input="hideRefPopProxyAction('qDateProxy')" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input v-else-if="isTimeType(item.dataType)"
              v-model="item.value">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy ref="qTimeProxy" transition-show="scale" transition-hide="scale">
                  <q-time v-model="item.value" mask="HH:mm:ss"
                  format24h with-seconds
                  @input="hideRefPopProxyAction('qTimeProxy')" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-toggle v-else-if="isBoolType(item.dataType)"
            v-model="item.value">
          </q-toggle>

          <q-input
            v-else-if="isNumberType(item.dataType)"
            :placeholder="item.description"
            v-model="item.value"
            type="number" >
          </q-input>

          <CFile v-else-if="isAttachmentType(item.dataType)"
           v-model="item.value"
           @input="(data)=>{
            item.value = data.url;
           }"></CFile>

          <q-input
            v-else
            :placeholder="item.description"
            v-model="item.value"
            :type="item.isPwd ? 'password' : 'text'" >
            <template v-slot:append v-if="!item.isText" >
              <q-icon
                :name="item.isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="item.isPwd = !item.isPwd"
              />
            </template>
          </q-input>
        </div>
      </div>
    </form>
    <div :key="item.relationName" v-for="item in oneToOneMainToSubTables">
      <CTableNew
      :fkColumnName="item.fkColumnName"
      :ref="'rTableNewRef' + item.relationName"
      :tableName="item.tableName" ></CTableNew>
    </div>

    <div :key="item.relationName" v-for="item in oneToManySubTables">
      <CTableList
      :fkColumnName="item.fkColumnName"
      :ref="'rTableListRef' + item.relationName"
      :tableName="item.tableName"
       ></CTableList>
    </div>
  </div>
</template>

<style lang="stylus">
.required:before {
  content: "* ";
  color: red;
}
</style>

<script>
import { tableService } from "../../service";
import { metadataTableService } from "../../service";
import { metadataRelationService } from "../../service";
import { extend } from 'quasar'

export default {
  name: "CTableNew",
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
      loading:true,
      expand: true,
      tableCaption: "",
      insertColumns: [],
      relationMap: {},
      oneToOneMainToSubTables: [],
      oneToManySubTables: []
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
  computed: {},
  methods: {
    async init(tableName) {
      this.insertColumns = [];

      await this.loadMeta();
    },

    isStringType: function(dataType) {
      //console.info("isStringType:" + row.dataType);
      if (dataType === "CHAR"
        || dataType === "VARCHAR" ) {
        return true;
      } else {
        return false;
      }
    },

    isNumberType: function(dataType) {
      //console.info("isNumberType:" + row.dataType);
      if (dataType === "TINYINT"
        || dataType === "SMALLINT"
        || dataType === "MEDIUMINT"
        || dataType === "INT"
        || dataType === "BIGINT") {
        return true;
      } else {
        return false;
      }
    },

    isDateType: function(dataType) {
      //console.info("isNumberType:" + row.dataType);
      if (dataType === "DATE") {
        return true;
      } else {
        return false;
      }
    },

    isTimeType: function(dataType) {
      //console.info("isNumberType:" + row.dataType);
      if (dataType === "TIME") {
        return true;
      } else {
        return false;
      }
    },

    isDateTimeType: function(dataType) {
      if (dataType === "DATETIME") {
        return true;
      } else {
        return false;
      }
    },

    isBoolType: function(dataType) {
      if (dataType === "BOOL") {
        return true;
      } else {
        return false;
      }
    },

    isAttachmentType: function(dataType) {
      if (dataType === "ATTACHMENT") {
        return true;
      } else {
        return false;
      }
    },

    getData() {
      let data = {};
      for (let i = 0; i < this.insertColumns.length; i++) {
        const insertColumn = this.insertColumns[i];
        const columnName = insertColumn.name;

        const relation = this.relationMap[columnName];
        if (relation) {
          data[relation.relation.name] = insertColumn.value;
        } else {
          if (insertColumn.value != undefined
            && insertColumn.value != null
            && insertColumn.value.toString().trim() !== "") {
            data[columnName] = insertColumn.value;
          }
        }
      }
      console.info(data);
      console.dir(this.$refs);

      this.oneToOneMainToSubTables.forEach((oneToOneMainToSubTable) => {
        const ref = this.$refs['rTableNewRef' + oneToOneMainToSubTable.relationName];
        console.dir(ref);
        const subData = ref[0].getData();
        data[oneToOneMainToSubTable.relationName] = subData;
      });

      this.oneToManySubTables.forEach((oneToManySubTable) => {
        const ref = this.$refs['rTableListRef' + oneToManySubTable.relationName];
        console.dir(ref);
        const subData = ref[0].getData();
        data[oneToManySubTable.relationName] = subData;
      });
      return data;
    },

    hideRefPopProxyAction(ref) {
      console.info("hideRefPopProxyAction:" + this.$refs[ref]);
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
        }

        this.insertColumns = insertColumns;
        console.info(this.insertColumns);

        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    }
  }
};
</script>
