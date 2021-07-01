<template>
  <div class="q-pa-md q-gutter-sm bg-page">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="表管理" />
      <q-breadcrumbs-el label="添加" />
    </q-breadcrumbs>

    <q-separator />

    <div class="q-pb-md bg-white">
      <div class="row justify-start items-baseline content-center items-center">
        <div class="row justify-start items-baseline content-center items-center">
          <div class="q-px-md">
            <q-item-label class="required query-cond">对象名称:</q-item-label>
          </div>
          <div class="q-pt-md">
            <q-input
            outlined
            v-model="table.name"
            placeholder="如product" />
          </div>
        </div>

        <div class="row justify-start items-baseline content-center items-center">
          <div class="q-px-md">
            <q-item-label class="required query-cond">对象复数:</q-item-label>
          </div>
          <div class="q-pt-md">
            <q-input
            outlined
            v-model="table.pluralName"
            placeholder="如products" />
          </div>
        </div>

        <div class="row justify-start items-baseline content-center items-center">
          <div class="q-px-md">
            <q-item-label class="required query-cond">表名称:</q-item-label>
          </div>
          <div class="q-pt-md">
            <q-input
            outlined
            v-model="table.tableName"
            placeholder="如ca_product" />
          </div>
        </div>

        <div class="row justify-start items-baseline content-center items-center">
          <div class="q-px-md">
            <q-item-label class="query-cond">中文名称:</q-item-label>
          </div>
          <div class="q-pt-md">
            <q-input
            outlined
            v-model="table.caption"
            placeholder="如产品" />
          </div>
        </div>

        <div class="row justify-start items-baseline content-center items-center">
          <div class="q-px-md">
            <q-item-label class="query-cond">引擎:</q-item-label>
          </div>
          <div class="q-pt-md">
            <q-select
              outlined
              v-model="table.engine"
              :options="engineOptions"
              emit-value
              map-options
            />
          </div>
        </div>
      </div>
    </div>

    <div class="bg-table-list">
      <q-banner inline-actions class="text-black bg-listcolor">
          <template v-slot:action>
            <q-toggle
              v-model="reverse"
              label="数据库逆向"
              @input="onReverseClick"
            />
            <p class="q-px-sm" v-show="reverse"/>
            <q-btn v-show="reverse"
              unelevated
              @click="onLoadMetadata2ClickAction()"
              color="purple"
              label="加载元数据"
            />
            <p class="q-px-sm"  v-show="!reverse"/>
            <q-btn v-show="!reverse"
              unelevated
              @click="onIndexClickAction()"
              color="purple"
              :label="`联合索引（${indexCount}）`"
            />
            <p class="q-px-sm"  v-show="!reverse"/>
            <q-btn v-show="!reverse"
              :disable="selected.length == 0"
              unelevated
              @click="onDeleteClickAction()"
              color="negative"
              label="批量删除"
            />
            <p class="q-px-sm"  v-show="!reverse"/>
            <q-btn v-show="!reverse"
              unelevated
              @click="onNewClickAction()"
              color="primary"
              label="添加列"
            />
          </template>
      </q-banner>

      <q-table
        :data="table.columns"
        :columns="columns"
        :visible-columns="visibleColumns"
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
              <q-checkbox v-if="isCanEdit(props.row)" v-model="props.selected" />
            </q-td>
            <q-td key="dataClickAction" :props="props">
              <q-btn v-if="isCanEdit(props.row)"
                unelevated
                @click="onDeleteClickAction(props.row.id)"
                color="negative"
                label="删除"
                flat
                dense
              ></q-btn>
            </q-td>
            <q-td key="displayOrder" :props="props">
              <q-btn @click="onTopClick(props.row)" round size="sm" color="primary" icon="vertical_align_top" flat dense />
              <q-btn @click="onUpClick(props.row)" round size="sm" color="primary" icon="north" flat dense />
              <q-btn @click="onDownClick(props.row)" round size="sm" color="primary" icon="south" flat dense />
              <q-btn @click="onBottomClick(props.row)" round size="sm" color="primary" icon="vertical_align_bottom" flat dense />
            </q-td>
            <q-td key="caption" :props="props">
              <q-input v-if="isCanEdit(props.row)" style="width: 80px;" v-model="props.row.caption" />
              <span v-else> {{ props.row.caption }}</span>
            </q-td>
            <q-td key="name" :props="props">
              <q-input v-if="isCanEdit(props.row)" style="width: 120px;" v-model="props.row.name" />
              <span v-else> {{ props.row.name }}</span>
            </q-td>
            <q-td key="description" :props="props">
              <q-input v-if="isCanEdit(props.row)"  style="width: 150px;" v-model="props.row.description" />
              <span v-else> {{ props.row.description }}</span>
            </q-td>
            <q-td key="unsigned" :props="props">
              <q-toggle :disable="!isCanEdit(props.row)" v-model="props.row.unsigned"/>
            </q-td>
            <q-td key="dataType" :props="props">
              <q-select
                :disable="!isCanEdit(props.row)"
                outlined
                v-model="props.row.dataType"
                :options="dataTypeOptions"
                emit-value
                map-options
              />
            </q-td>
            <q-td key="indexType" :props="props">
              <q-select
                :disable="!isCanEdit(props.row)"
                outlined
                v-model="props.row.indexType"
                :options="indexTypeOptions"
                emit-value
                map-options
              />
            </q-td>
            <q-td key="indexStorage" :props="props">
              <q-select v-if="isCanEdit(props.row)"
                outlined
                v-model="props.row.indexStorage"
                :options="indexStorageOptions"
                emit-value
                map-options
              />
            </q-td>
            <q-td key="indexName" :props="props">
              <q-input v-if="isCanEdit(props.row)"  style="width: 150px;" v-model="props.row.indexName" />
              <span v-else> {{ props.row.indexName }}</span>
            </q-td>
            <q-td key="length" :props="props">
              <q-input style="width: 60px;" v-if="isCanEdit(props.row)" type="number" v-model="props.row.length" />
              <span v-else> {{ props.row.length }}</span>
            </q-td>
            <q-td key="precision" :props="props">
              <q-input style="width: 50px;" v-if="isCanEdit(props.row)" type="number" v-model="props.row.precision" />
              <span v-else> {{ props.row.precision }}</span>
            </q-td>
            <q-td key="scale" :props="props">
              <q-input style="width: 40px;" v-if="isCanEdit(props.row)" type="number" v-model="props.row.scale" />
              <span v-else> {{ props.row.scale }}</span>
            </q-td>
            <q-td key="autoIncrement" :props="props">
              <q-toggle v-if="!isCanEdit(props.row) && props.row.name=='id'"
                disable v-model="props.row.autoIncrement"/>
            </q-td>
            <q-td key="nullable" :props="props">
              <span><q-toggle :disable="!isCanEdit(props.row)" v-model="props.row.nullable"/></span>
            </q-td>
            <q-td key="defaultValue" :props="props">
              <q-input v-if="isCanEdit(props.row)"  style="width: 80px;" v-model="props.row.defaultValue" />
              <span v-else> {{ props.row.defaultValue }}</span>
            </q-td>
            <q-td key="seqId" :props="props">
              <q-select v-if="isCanEdit(props.row) && isStringType(props.row)"
                outlined
                v-model="props.row.seqId"
                :options="sequenceStringOptions"
                option-value="id"
                option-label="caption"
                emit-value
                map-options
              />
              <q-select v-else-if="isCanEdit(props.row) && isNumberType(props.row)"
                outlined
                v-model="props.row.seqId"
                :options="sequenceLongOptions"
                option-value="id"
                option-label="caption"
                emit-value
                map-options
              />
            </q-td>
            <q-td key="insertable" :props="props">
              <span><q-toggle :disable="!isCanEdit(props.row)" v-model="props.row.insertable"/></span>
            </q-td>
            <q-td key="updatable" :props="props">
              <span><q-toggle :disable="!isCanEdit(props.row)" v-model="props.row.updatable"/></span>
            </q-td>
            <q-td key="queryable" :props="props">
              <span><q-toggle :disable="!isCanEdit(props.row)" v-model="props.row.queryable"/></span>
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <q-separator v-if="!!table.columns && table.columns.length > 0" />
      <div class="q-py-md">
        <div class="row justify-center">
          <q-btn v-show="!reverse || !!isLoadMetadataValid" unelevated
            @click="onSubmitClick"
            color="primary"
            label="保存"
            />
        </div>
      </div>
    </div>

    <q-dialog v-model="showIndexDialog" full-width full-height  persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">联合索引</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll">
          <CIndexList
            ref="cIndexListRef"
            v-model="table">
          </CIndexList>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn label="取消" unelevated color="negative" v-close-popup />
          <q-btn @click="onConfirmIndexClick" label="确定" unelevated color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style>
.required:before {
  content: "* ";
  color: red;
}
</style>

<script>

import { metadataTableService, metadataSequenceService } from "../../../service";
import { date } from "../../../utils";
import { extend } from 'quasar'

export default {
  data () {
    return {
      reverse: false,
      indexCount: 0,
      isLoadMetadataValid: true,
      selected: [],
      loading: false,
      tablePagination: {
        rowsPerPage: 9999
      },
      showIndexDialog: false,
      visibleColumns: [
        "dataClickAction",
        "displayOrder",
        "caption",
        "name",
        "unsigned",
        "dataType",
        "indexType",
        "indexStorage",
        "indexName",
        "length",
        "precision",
        "scale",
        "autoIncrement",
        "nullable",
        "defaultValue",
        "seqId",
        "insertable",
        "updatable",
        "queryable",
        "description"
      ],
      columns: [
        {
          name: "dataClickAction",
          align: "center",
          label: "操作",
          field: "dataClickAction",
          sortable: false
        },
        {
          name: "displayOrder",
          align: "left",
          label: "顺序",
          field: "displayOrder",
          sortable: false
        }, {
          name: "caption",
          align: "left",
          label: "中文名称",
          field: "caption",
          sortable: false
        }, {
          name: "name",
          align: "left",
          label: "英文字段",
          field: "name",
          sortable: false
        }, {
          name: "description",
          align: "left",
          label: "描述",
          field: "description",
          sortable: false
        }, {
          name: "unsigned",
          align: "left",
          label: "无符号",
          field: "unsigned",
          sortable: false
        }, {
          name: "dataType",
          align: "left",
          label: "数据类型",
          field: "dataType",
          sortable: false
        }, {
          name: "indexType",
          align: "left",
          label: "索引类型",
          field: "indexType",
          sortable: false
        }, {
          name: "indexStorage",
          align: "left",
          label: "索引存储",
          field: "indexStorage",
          sortable: false
        }, {
          name: "indexName",
          align: "left",
          label: "索引名称",
          field: "indexName",
          sortable: false
        }, {
          name: "length",
          align: "left",
          label: "长度",
          field: "length",
          sortable: false
        }, {
          name: "precision",
          align: "left",
          label: "精度",
          field: "precision",
          sortable: false
        }, {
          name: "scale",
          align: "left",
          label: "小数",
          field: "scale",
          sortable: false
        }, {
          name: "autoIncrement",
          align: "left",
          label: "自增长",
          field: "autoIncrement",
          sortable: false
        }, {
          name: "nullable",
          align: "left",
          label: "空",
          field: "nullable",
          sortable: false
        }, {
          name: "defaultValue",
          align: "left",
          label: "默认值",
          field: "defaultValue",
          sortable: false
        },{
          name: "seqId",
          align: "left",
          label: "序列号",
          field: "seqId",
          sortable: false
        }, {
          name: "insertable",
          align: "left",
          label: "插入",
          field: "insertable",
          sortable: false
        }, {
          name: "updatable",
          align: "left",
          label: "编辑",
          field: "updatable",
          sortable: false
        }, {
          name: "queryable",
          align: "left",
          label: "查询",
          field: "queryable",
          sortable: false
        }
      ],
      table: {},
      engineOptions: [
        {
          value: "INNODB",
          label: "InnoDB"
        },
        {
          value: "MYISAM",
          label: "MyISAM"
        }
      ],

      indexTypeOptions: [
        {
          value: "PRIMARY",
          label: "主键"
        },
        {
          value: "UNIQUE",
          label: "唯一"
        },
        {
          value: "INDEX",
          label: "普通"
        },
        {
          value: "FULLTEXT",
          label: "全文"
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
      ],
      dataTypeOptions: [
        {
          value: "CHAR",
          label: "定长字符串CHAR"
        },
        {
          value: "VARCHAR",
          label: "变长字符串VARCHAR"
        },
        {
          value: "PASSWORD",
          label: "密码PASSWORD"
        },
        {
          value: "ATTACHMENT",
          label: "附件ATTACHMENT"
        },
        {
          value: "BOOL",
          label: "布尔BOOL"
        },
        {
          value: "TINYINT",
          label: "小整数INT"
        },
        {
          value: "INT",
          label: "整数INT"
        },
        {
          value: "BIGINT",
          label: "长整数BIGINT"
        },
        {
          value: "FLOAT",
          label: "浮点数FLOAT"
        },
        {
          value: "DOUBLE",
          label: "双精度DOUBLE"
        },
        {
          value: "DECIMAL",
          label: "精确小数DECIMAL"
        },
        {
          value: "DATE",
          label: "日期DATE"
        },
        {
          value: "TIME",
          label: "时间TIME"
        },
        {
          value: "DATETIME",
          label: "日期时间DATETIME"
        },
        {
          value: "TEXT",
          label: "文本TEXT"
        },
        {
          value: "LONGTEXT",
          label: "长文本LONGTEXT"
        },
        {
          value: "BLOB",
          label: "二进制BLOB"
        },{
          value: "LONGBLOB",
          label: "大二进制LONGBLOB"
        }
      ],
      sequenceLongOptions: [],
      sequenceStringOptions: []
    }
  },

  async created() {
    await this.init();
    console.info('created');
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

  filters: {
    dateTimeFormat: function(value) {
      return date.dateTimeFormat(value);
    }
  },
  computed: {
    indexLength: function() {
      if (this.table.indexs) {
        return this.table.indexs.length;
      } else {
        return 0;
      }
    }
  },
  methods: {
    async init(id) {
      this.$store.commit(
        "config/updateIsAllowBack",
        this.$route.meta.isAllowBack
      );

      await this.fetchFromServer();
    },

    getInitColumn() {
      return [{
              "id": 1,
              "autoIncrement": true,
              "caption": "编号",
              "dataType": "BIGINT",
              "description": "主键",
              "displayOrder": 0,
              "indexType": "PRIMARY",
              "insertable": false,
              "length": 20,
              "name": "id",
              "nullable": false,
              "queryable": false,
              "unsigned": true,
              "updatable": false,
              "systemable": true
          }, {
              "id": 2,
              "autoIncrement": false,
              "caption": "名称",
              "dataType": "VARCHAR",
              "description": "名称",
              "displayOrder": 1,
              "insertable": true,
              "length": 200,
              "name": "name",
              "nullable": false,
              "queryable": true,
              "unsigned": false,
              "updatable": true,
              "systemable": true
          },{
              "id": 3,
              "autoIncrement": false,
              "caption": "全文索引",
              "dataType": "TEXT",
              "description": "全文索引",
              "displayOrder": 2,
              "indexName": "ft_fulltext_body",
              "indexType": "FULLTEXT",
              "insertable": false,
              "name": "fullTextBody",
              "nullable": true,
              "queryable": false,
              "unsigned": false,
              "updatable": false,
              "systemable": true
          }, {
              "id": 4,
              "autoIncrement": false,
              "caption": "创建时间",
              "dataType": "DATETIME",
              "description": "创建时间",
              "displayOrder": 3,
              "insertable": false,
              "name": "createdDate",
              "nullable": false,
              "queryable": false,
              "unsigned": false,
              "updatable": false,
              "systemable": true
          }, {
              "id": 5,
              "autoIncrement": false,
              "caption": "修改时间",
              "dataType": "DATETIME",
              "description": "修改时间",
              "displayOrder": 4,
              "insertable": false,
              "name": "lastModifiedDate",
              "nullable": true,
              "queryable": false,
              "unsigned": false,
              "updatable": false,
              "systemable": true
          }];
    },

    async fetchFromServer() {
      this.$q.loading.show({
        message: "加载中"
      });
      try {
        const tableCount = await metadataTableService.count();
        console.info(tableCount);
        let table = {};
        table.caption = "新建表" + tableCount;
        table.description = "";
        table.name = "newTable" + tableCount;
        table.pluralName = table.name + "s";
        table.tableName = "ca_newtable" + tableCount;
        table.engine = "INNODB";
        if (!this.reverse) {
          table.columns = this.getInitColumn();
        }
        this.table = table;
        let sequences = await metadataSequenceService.list(1, 999);
        this.sequenceLongOptions = sequences.filter(t => t.sequenceType === "LONG");
        this.sequenceStringOptions = sequences.filter(t => t.sequenceType === "STRING");
        this.$q.loading.hide();
      } catch (error) {
        this.$q.loading.hide();
        console.error(error);
      }
    },

    async onLoadMetadata2ClickAction() {
      try {
        this.$q.loading.show();
        let metadata = await metadataTableService.getMetadata(this.table.tableName);
        console.dir(metadata);

        this.table.name = this.table.tableName;
        this.table.pluralName = this.table.tableName;

        this.table.columns = [];

        metadata.columns.forEach((t) => {
          this.addRowFromMetadata(t);
        });

        this.isLoadMetadataValid = true;

        this.$q.loading.hide();
      } catch (error) {
        console.error(error);
        this.$q.loading.hide();
      }
    },


    async onLoadMetadataClickAction() {
      try {
        this.$q.loading.show();
        let metadata = await metadataTableService.getMetadata(this.table.tableName);
        console.dir(metadata);

        this.table.name = this.table.tableName;
        this.table.pluralName = this.table.tableName;

        this.table.columns = this.getInitColumn();

        let isHasId = false;
        let isHasName = false;
        let isHasFullTextBody = false;
        let isHasCreatedDate = false;
        let isHasLastModifiedDate = false;

        metadata.columns.forEach((t) => {
          if (t.Field === "id") {
            isHasId = true;
          } else if (t.Field === "name") {
            isHasName = true;
          } else if (t.Field === "fullTextBody") {
            isHasFullTextBody = true;
          } else if (t.Field === "createdDate") {
            isHasCreatedDate = true;
          } else if (t.Field === "lastModifiedDate") {
            isHasLastModifiedDate = true;
          }
        });

        // isHasId = true;
        // isHasName = true;
        // isHasFullTextBody = true;
        // isHasCreatedDate = true;
        // isHasLastModifiedDate = true;
        // ALTER TABLE `spring_user`
        // ADD `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
        // ADD `fullTextBody` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

        if (!isHasId) {
          this.$q.notify("缺少字段：主键id");
        } else if (!isHasName) {
          this.$q.notify("缺少字段：名称name");
        } else if (!isHasFullTextBody) {
          this.$q.notify("缺少字段：全文索引fullTextBody");
        } else if (!isHasCreatedDate) {
          this.$q.notify("缺少字段：创建时间createdDate");
        }  else if (!isHasLastModifiedDate) {
          this.$q.notify("缺少字段：修改时间lastModifiedDate");
        } else {
          metadata.columns.forEach((t) => {
            if (t.Field !== "id"
              && t.Field !== "name"
              && t.Field !== "fullTextBody"
              && t.Field !== "createdDate"
              && t.Field !== "lastModifiedDate" ) {
              this.addRowFromMetadata(t);
            }
          });

          this.isLoadMetadataValid = true;
        }

        if (!this.isLoadMetadataValid) {
          let repairColumns = [];

          if (!isHasId) {
            repairColumns.push("id");
          }

          if (!isHasName) {
            repairColumns.push("name");
          }

          if (!isHasFullTextBody) {
            repairColumns.push("fullTextBody");
          }
          if (!isHasCreatedDate) {
            repairColumns.push("createdDate");
          }

          if (!isHasLastModifiedDate) {
            repairColumns.push("lastModifiedDate");
          }

          this.repairMetadata(this.table.tableName, repairColumns);
        }

        this.$q.loading.hide();
      } catch (error) {
        console.error(error);
        this.isLoadMetadataValid = false;
        this.$q.loading.hide();
      }
    },

    async repairMetadata(tableName, repairColumns) {
      try {
        this.$q
          .dialog({
            title: "修复元数据，添加系统字段",
            message: "确认修复吗？",
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
            await metadataTableService.repairMeataData(tableName, repairColumns);
            this.$q.notify("修复成功");
          })
          .onCancel(() => {})
          .onDismiss(() => {
            console.info("I am triggered on both OK and Cancel");
          });
      } catch (error) {
        this.$q.notify("修复失败");
      }
    },

    onNewClickAction() {
      this.addRow();
    },

    addRowFromMetadata(t) {
      const columns = this.table.columns;
      const index = columns.length + 1;
      const type = t.Type.toUpperCase();

      let length = 10;
      let typeArr = type.split("(");
      if (typeArr.length > 1) {
          length = typeArr[1].split(")")[0];
      }

      let indexType = null;
      if (t.Key === "PRI") {
        indexType = "PRIMARY";
      } else if (t.Key === "UNI") {
        indexType = "UNIQUE";
      } else if (t.Key === "MUL") {
        indexType = "INDEX";
      }

      const newRow = {
        id: (new Date()).valueOf(),
        autoIncrement: false,
        displayOrder: columns.length,
        insertable: true,
        nullable: (t.Null === "YES"),
        queryable: true,
        unsigned: type.indexOf("UNSIGNED") >= 0,
        updatable: true,
        dataType : typeArr[0].replace("UNSIGNED", "").trim(),
        indexType: indexType,
        name: t.Field,
        caption: t.Field,
        description: t.Field,
        length: length,
        systemable: false
      };
      this.table.columns  = [ ...columns.slice(0, index), newRow, ...columns.slice(index) ];
    },

    addRow() {
      const columns = this.table.columns;
      const index = columns.length + 1;
      const newRow = {
        id: (new Date()).valueOf(),
        autoIncrement: false,
        displayOrder: columns.length,
        insertable: true,
        nullable: true,
        queryable: true,
        unsigned: false,
        updatable: true,
        dataType : "VARCHAR",
        name: "col" + columns.length,
        caption: "列" + columns.length,
        description: "描述" + columns.length,
        length: 200,
        systemable: false
      };
      this.table.columns  = [ ...columns.slice(0, index), newRow, ...columns.slice(index) ];
    },

    removeRow(id) {
      const columns = this.table.columns;
      const index = columns.findIndex(t => t.id === id);
      if (index >= 0) {
        this.table.columns = [ ...columns.slice(0, index), ...columns.slice(index + 1) ];
      }
    },

    batchRemoveRow(ids) {
      ids.forEach((id) => {
        this.removeRow(id);
      });
    },

    onIndexClickAction() {
      this.showIndexDialog = true;
    },

    async onDeleteClickAction(id) {
      let ids = [];
      this.selected.forEach((row) => {
        if (this.isCanEdit(row)) {
          ids.push(row.id);
        }
      });
      if (id) {
        this.removeRow(id);
      } else {
        this.batchRemoveRow(ids);
        this.selected = [];
      }
    },

    async onSubmitClick() {
      try {
        this.$q
          .dialog({
            title: "提交",
            message: "确认提交吗？",
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
            await this.onSubmit();
          })
          .onCancel(() => {})
          .onDismiss(() => {
            console.info("I am triggered on both OK and Cancel");
          });
      } catch (error) {
        this.$q.notify("添加失败");
      }
    },

    async onSubmit() {
      this.$q.loading.show({
        message: "提交中"
      });
      try {
        let table = extend(true, {}, this.table);

        if (table.indexs) {
          table.indexs.forEach(function(index){
            index.indexLines.forEach(function(indexLine){
                const columnId = indexLine.column.id;
                const column = table.columns.find(t => t.id === columnId);
                indexLine.column.name = column.name;
                delete indexLine.column.id;
            });

            delete index.id;
            delete index.isNewRow;
          });
        }

        let displayOrder = 0;
        table.columns.forEach(function(column){
            column.displayOrder = displayOrder++;
            delete column.id;
        });

        table.reverse = this.reverse;
        await metadataTableService.create(table);
        this.$q.loading.hide();
        this.$q.notify("添加成功");
        this.$root.$emit("updateMenuTree");
        this.$router.go(-1);
      } catch (error) {
        this.$q.loading.hide();
        console.error(error);
      }
    },

    async onReverseClick() {
      if (this.reverse) {
        this.isLoadMetadataValid = false;
      }
      await this.fetchFromServer();
    },

    isCanEdit: function(row) {
      if (row.systemable) {
        return false;
      } else {
        return true;
      }
    },

    isStringType: function(row) {
      if (row.dataType === "CHAR"
        || row.dataType === "VARCHAR" ) {
        return true;
      } else {
        return false;
      }
    },

    isNumberType: function(row) {
      if (row.dataType === "TINYINT"
        || row.dataType === "SMALLINT"
        || row.dataType === "MEDIUMINT"
        || row.dataType === "INT"
        || row.dataType === "BIGINT") {
        return true;
      } else {
        return false;
      }
    },

    onTopClick: function(row) {
      const columns = this.table.columns;
      const index = columns.findIndex(t => t.id === row.id);
      if (index != 0){
        columns.unshift(columns.splice(index, 1)[0]);
      }
    },
    onUpClick: function(row) {
      const columns = this.table.columns;
      const index = columns.findIndex(t => t.id === row.id);
      if (index != 0){
        columns[index] = columns.splice(index - 1, 1, columns[index])[0];
        console.dir(columns);
      }
    },
    onDownClick: function(row) {
      const columns = this.table.columns;
      const index = columns.findIndex(t => t.id === row.id);
      if (index != columns.length - 1){
        columns[index] = columns.splice(index + 1, 1, columns[index])[0];
      }
    },
    onBottomClick: function(row) {
      const columns = this.table.columns;
      const index = columns.findIndex(t => t.id === row.id);
      if (index != columns.length - 1){
        columns.push(columns.splice(index, 1)[0]);
      }
    },

    onConfirmIndexClick: function() {
      const ref = this.$refs['cIndexListRef'];
      const data = ref.getData();
      console.info(data);
      this.table.indexs  = data.indexs;
      if (this.table.indexs) {
        this.indexCount = this.table.indexs.length;
      } else {
        this.indexCount = 0;
      }
    }
  }
}
</script>
