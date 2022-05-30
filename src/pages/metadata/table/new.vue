<template>
  <div class="q-pa-md q-gutter-sm bg-page">
    <q-breadcrumbs>
      <q-breadcrumbs-el :label="dataSource" clickable :to="dataSourceUrl" />
      <q-breadcrumbs-el label="表管理" :to="dataSourceUrl + '/metadata/tables'" />
      <q-breadcrumbs-el label="添加" />
    </q-breadcrumbs>

    <q-separator />

    <div class="q-pb-md bg-white">
     <q-banner inline-actions class="text-black bg-listcolor">
      基本信息
     </q-banner>
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
              @click="onLoadMetadataClickAction()"
              color="primary"
              label="加载元数据"
            />
            <p class="q-px-sm"/>
            <q-btn
              unelevated
              @click="onIndexClickAction()"
              color="purple"
              :label="`联合索引（${indexCount}）`"
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
        <template v-slot:top="props">
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
            label="添加字段"
          />

          <p class="q-px-sm"  v-show="!reverse"/>
          <q-btn v-show="!reverse"
            unelevated
            @click="onBatchNewClickAction()"
            color="positive"
            label="批量添加字段"
          />

          <q-space />

          <q-btn
            flat round dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-ml-md"
          />
        </template>
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
            </q-td>
            <q-td key="displayOrder" :props="props">
              <q-btn @click="onTopClick(props.row)" round size="sm" color="primary" icon="vertical_align_top" flat dense />
              <q-btn @click="onUpClick(props.row)" round size="sm" color="primary" icon="north" flat dense />
              <q-btn @click="onDownClick(props.row)" round size="sm" color="primary" icon="south" flat dense />
              <q-btn @click="onBottomClick(props.row)" round size="sm" color="primary" icon="vertical_align_bottom" flat dense />
            </q-td>
            <q-td key="caption" :props="props">
              <q-input style="width: 80px;" v-model="props.row.caption" />
            </q-td>
            <q-td key="name" :props="props">
              <q-input  style="width: 120px;" v-model="props.row.name" />
            </q-td>
            <q-td key="description" :props="props">
              <q-input style="width: 150px;" v-model="props.row.description" />
            </q-td>
            <q-td key="unsigned" :props="props">
              <q-toggle  v-model="props.row.unsigned"/>
            </q-td>
            <q-td key="dataType" :props="props">
              <q-select
                outlined
                v-model="props.row.dataType"
                :options="dataTypeOptions"
                emit-value
                map-options
              />
            </q-td>
            <q-td key="indexType" :props="props">
              <q-select
                outlined
                v-model="props.row.indexType"
                :options="indexTypeOptions"
                emit-value
                map-options
              />
            </q-td>
            <q-td key="indexStorage" :props="props">
              <q-select
                outlined
                v-model="props.row.indexStorage"
                :options="indexStorageOptions"
                emit-value
                map-options
              />
            </q-td>
            <q-td key="indexName" :props="props">
              <q-input style="width: 150px;" v-model="props.row.indexName" />
            </q-td>
            <q-td key="length" :props="props">
              <q-input style="width: 60px;"  type="number" v-model="props.row.length" />
            </q-td>
            <q-td key="precision" :props="props">
              <q-input style="width: 50px;"  type="number" v-model="props.row.precision" />
            </q-td>
            <q-td key="scale" :props="props">
              <q-input style="width: 40px;" type="number" v-model="props.row.scale" />
            </q-td>
            <q-td key="autoIncrement" :props="props">
              <q-toggle v-model="props.row.autoIncrement"/>
            </q-td>
            <q-td key="nullable" :props="props">
              <span><q-toggle v-model="props.row.nullable"/></span>
            </q-td>
            <q-td key="defaultValue" :props="props">
              <q-input style="width: 80px;" v-model="props.row.defaultValue" />
            </q-td>
            <q-td key="seqId" :props="props">
              <q-select v-if="isStringType(props.row)"
                outlined
                v-model="props.row.seqId"
                :options="sequenceStringOptions"
                option-value="id"
                option-label="caption"
                emit-value
                map-options
              />
              <q-select v-else-if="isNumberType(props.row)"
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
              <span><q-toggle v-model="props.row.insertable"/></span>
            </q-td>
            <q-td key="updatable" :props="props">
              <span><q-toggle v-model="props.row.updatable"/></span>
            </q-td>
            <q-td key="queryable" :props="props">
              <span><q-toggle v-model="props.row.queryable"/></span>
            </q-td>
            <q-td key="displayable" :props="props">
              <span><q-toggle v-model="props.row.displayable"/></span>
            </q-td>
            <q-td key="multipleValue" :props="props">
              <span><q-toggle v-model="props.row.multipleValue"/></span>
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

    <q-dialog v-model="showBatchDialog"  persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">批量添加</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-input  style="width:500px;"
            v-model="columnNames"
            filled
            type="textarea"
            label="逗号或者换行隔开"
          />
        </q-card-section>

        <q-card-actions align="center">
          <q-btn label="取消" unelevated color="negative" v-close-popup />
          <q-btn @click="onConfirmBatchClick" label="确定" unelevated color="primary" v-close-popup />
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
      dataSource: "",
      dataSourceUrl: "",
      reverse: false,
      indexCount: 0,
      isLoadMetadataValid: true,
      selected: [],
      loading: false,
      tablePagination: {
        rowsPerPage: 9999
      },
      showIndexDialog: false,
      showBatchDialog: false,
      columnNames: "",
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
        "displayable",
        "multipleValue",
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
        }, {
          name: "displayable",
          align: "left",
          label: "显示",
          field: "displayable",
          sortable: false
        }, {
          name: "multipleValue",
          align: "left",
          label: "多值",
          field: "multipleValue",
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
          value: "NONE",
          label: "无"
        },
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
          value: "NONE",
          label: "无"
        },
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
      this.dataSource = this.$route.params.dataSource;
      this.dataSourceUrl = "/dataSource/" + this.dataSource;
      await this.fetchFromServer();
    },

    getInitColumn(tableCount) {
      return [{
              "id": 1,
              "autoIncrement": true,
              "caption": "编号",
              "dataType": "BIGINT",
              "description": "主键",
              "displayOrder": 0,
              "indexName": "primary_key_" + tableCount,
              "indexType": "PRIMARY",
              "insertable": false,
              "length": 20,
              "name": "id",
              "nullable": false,
              "queryable": false,
              "displayable": false,
              "unsigned": true,
              "updatable": false,
              "systemable": false,
              "multipleValue": false
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
              "displayable": true,
              "unsigned": false,
              "updatable": true,
              "systemable": false,
              "multipleValue": false
          },{
              "id": 3,
              "autoIncrement": false,
              "caption": "全文索引",
              "dataType": "TEXT",
              "description": "全文索引",
              "displayOrder": 2,
              "indexName": "ft_fulltext_body_" + tableCount,
              "indexType": "FULLTEXT",
              "insertable": false,
              "name": "fullTextBody",
              "nullable": true,
              "queryable": false,
              "displayable": false,
              "unsigned": false,
              "updatable": false,
              "systemable": false,
              "multipleValue": false
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
              "displayable": false,
              "unsigned": false,
              "updatable": false,
              "systemable": false,
              "multipleValue": false
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
              "displayable": false,
              "unsigned": false,
              "updatable": false,
              "systemable": false,
              "multipleValue": false
          }];
    },

    async fetchFromServer() {
      this.$q.loading.show({
        message: "加载中"
      });
      try {
        const tableCount = await metadataTableService.count(this.dataSource);
        console.info(tableCount);
        let table = {};
        table.caption = "新建表" + tableCount;
        table.description = "";
        table.name = "newTable" + tableCount;
        table.pluralName = table.name + "s";
        table.tableName = "ca_newtable" + tableCount;
        table.engine = "INNODB";
        if (!this.reverse) {
          table.columns = this.getInitColumn(tableCount);
        }
        this.table = table;
        let sequences = await metadataSequenceService.list(this.dataSource, 1, 999);

        let sequenceLongOptions = sequences.filter(t => t.sequenceType === "LONG");
        let sequenceStringOptions = sequences.filter(t => t.sequenceType === "STRING"
          || t.sequenceType === "GUID");
        sequenceLongOptions.unshift({
          "id": null,
          "caption": "无"
        });

        sequenceStringOptions.unshift({
          "id": null,
          "caption": "无"
        });

        this.sequenceLongOptions = sequenceLongOptions;
        this.sequenceStringOptions = sequenceStringOptions;
        this.$q.loading.hide();
      } catch (error) {
        this.$q.loading.hide();
        console.error(error);
      }
    },

    async onLoadMetadataClickAction() {
      try {
        this.$q.loading.show();
        let metadata = await metadataTableService.getMetadata(this.dataSource, this.table.tableName);
        console.dir(metadata);

        this.table.name = this.table.tableName;
        this.table.pluralName = this.table.tableName;
        this.table.caption = metadata.Comment ? metadata.Comment : this.table.tableName;
        this.table.engine = metadata.Engine.toUpperCase();

        this.table.columns = [];

        let indexColumns = this.getIndexColumns(metadata.indexs);

        let baseId = (new Date()).valueOf();
        metadata.columns.forEach((t) => {
          this.addRowFromMetadata(baseId++, t, indexColumns.single);
        });

        this.addIndexFromMetadata(indexColumns.union);

        this.isLoadMetadataValid = true;

        this.$q.loading.hide();
      } catch (error) {
        console.error(error);
        this.$q.loading.hide();
      }
    },

    onNewClickAction() {
      this.addRow();
    },

    onBatchNewClickAction() {
      this.showBatchDialog = true;
    },
    
    indexsGroupBy(indexs) {
      const groups = {};
      indexs.forEach(function (t) {
        if (groups[t.Key_name]) {
          groups[t.Key_name].push(t);
        } else {
          groups[t.Key_name] = [t];
        }
      });

      return groups;
    },

    getIndexColumns(indexs) {
      let single = {};
      let union = {};
      const groups = this.indexsGroupBy(indexs);
      for (let key in groups) {
        const group = groups[key];
        if (group.length > 1) {
          console.info(key + "is union index");
          union[group[0].Key_name] = group;
        } else {
          single[group[0].Column_name] = group[0];
        }
      }
      return {
        single: single,
        union: union
      };
    },


    addIndexFromMetadata(union) {
      let baseId = (new Date()).valueOf();

      let newIndexs = [];
      const tableColumns = this.table.columns;
      console.dir(tableColumns);

      for (let key in union) {
        const unionLines = union[key];
        const newIndexLines = [];

        unionLines.forEach((item) => {
          const columnName = item.Column_name;
          const columnId = tableColumns.find(t => t.name === columnName).id;

          newIndexLines.push({
            column: {
              id: columnId,
              name: columnName
            }
          });
        });

        const unionLineFirst = unionLines[0];
        let indexType = null;
        let indexStorage = null;
        if (unionLineFirst.Key_name === "PRIMARY") {
          indexType = "PRIMARY";
        } else if (unionLineFirst.Non_unique === 0) {
          indexType = "UNIQUE";
          indexStorage = unionLineFirst.Index_type;
        } else {
          indexType = "INDEX";
          indexStorage = unionLineFirst.Index_type;
        }

        const indexComment = unionLineFirst.Index_comment ? unionLineFirst.Index_comment:  unionLineFirst.Key_name;

        const newIndex = {
          id: baseId++,
          isNewRow: true,
          caption: indexComment,
          description: indexComment,
          indexStorage: indexStorage,
          indexType: indexType,
          name: unionLineFirst.Key_name,
          indexLines: newIndexLines
        }

        newIndexs.push(newIndex);
      }

      this.table.indexs = newIndexs;
      if (this.table.indexs) {
        this.indexCount = this.table.indexs.length;
      } else {
        this.indexCount = 0;
      }
    },

    addRowFromMetadata(id, t, singleIndexColumns) {
      const columns = this.table.columns;
      const index = columns.length + 1;
      const type = t.Type.toUpperCase();
      const name = t.Field;

      let length = null;
      let precision = null;
      let scale = null;

      let typeArr = type.split("(");
      if (typeArr.length > 1) {
        const lengthOrprecisionScale = typeArr[1].split(")")[0];
        if (lengthOrprecisionScale.indexOf(",") > 0) {
          precision = lengthOrprecisionScale.split(",")[0];
          scale = lengthOrprecisionScale.split(",")[1];
        } else {
          length = lengthOrprecisionScale;
        }
      }

      let indexType = null;
      let indexStorage = null;
      let indexName = null;
      let indexColumn = singleIndexColumns[name];
      if (indexColumn) {
        //console.dir(indexColumn);
        if (indexColumn.Key_name === "PRIMARY") {
          indexType = "PRIMARY";
        } else if (indexColumn.Index_type === "FULLTEXT") {
          indexType = "FULLTEXT";
          indexName = indexColumn.Key_name;
        } else if (indexColumn.Non_unique === 0) {
          indexType = "UNIQUE";
          indexName = indexColumn.Key_name;
          indexStorage = indexColumn.Index_type;
        } else {
          indexType = "INDEX";
          indexName = indexColumn.Key_name;
          indexStorage = indexColumn.Index_type;
        }
      }
      const comment = t.Comment ? t.Comment : name;

      let dataType = typeArr[0].replace("UNSIGNED", "").trim();
      if (dataType === "BIT") {
        dataType = "BOOL";
        length = null;
      }

      const newRow = {
        id: id,
        autoIncrement:  (t.Extra === "auto_increment"),
        displayOrder: columns.length,
        insertable: true,
        nullable: (t.Null === "YES"),
        queryable: true,
        displayable: false,
        unsigned: type.indexOf("UNSIGNED") >= 0,
        updatable: true,
        dataType : dataType,
        indexType: indexType,
        indexStorage: indexStorage,
        indexName: indexName,
        name: name,
        caption: comment,
        description: comment,
        length: length,
        precision: precision,
        scale: scale,
        systemable: false,
        multipleValue: false
      };
      //console.dir(newRow);
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
        displayable: false,
        unsigned: false,
        updatable: true,
        dataType : "VARCHAR",
        name: "col" + columns.length,
        caption: "列" + columns.length,
        description: "描述" + columns.length,
        length: 200,
        systemable: false,
        multipleValue: false
      };
      this.table.columns  = [ ...columns.slice(0, index), newRow, ...columns.slice(index) ];
    },

    addRow2(id, columnRaw) {
      const columns = this.table.columns;
      const index = columns.length + 1;
      const newRow = {
        id: id,
        autoIncrement: false,
        displayOrder: columns.length,
        insertable: true,
        nullable: true,
        queryable: true,
        displayable: false,
        unsigned: false,
        updatable: true,
        dataType : columnRaw.dataType,
        name: "col" + columns.length,
        caption: columnRaw.caption,
        description: columnRaw.caption,
        length: columnRaw.length,
        precision: columnRaw.precision,
        scale: columnRaw.scale,
        systemable: false,
        multipleValue: false
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
        ids.push(row.id);
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
        table.columns.forEach((column) => {
            const n = Number(column.name);
            if (!isNaN(n)) {
              const error = "字段英文名称" + column.name + "不能为数字";
              this.$q.notify(error);
              throw error;
            }

            column.displayOrder = displayOrder++;
            delete column.id;
        });

        table.reverse = this.reverse;
        await metadataTableService.create(this.dataSource, table);
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
    },
    onConfirmBatchClick: function() {
      console.info(this.columnNames);
      const that = this;
      if (this.columnNames) {
        let columnNames = this.columnNames
        .replaceAll("\r\n", ",")
        .replaceAll("\n", ",")
        .replaceAll("，", ",")
        .split(",");

        let baseId = (new Date()).valueOf();
        columnNames.forEach((t) => {
          that.addRow2(baseId++, {
            length: 200,
            caption: t.trim()
          })
        });
      }
    }
  }
}
</script>
