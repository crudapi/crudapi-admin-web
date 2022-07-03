<template>
   <div class="q-pa-md q-gutter-sm bg-page">
    <q-breadcrumbs>
      <q-breadcrumbs-el :label="dataSource" clickable :to="dataSourceUrl" />
      <q-breadcrumbs-el label="表管理" :to="dataSourceUrl + '/metadata/tables'" />
      <q-breadcrumbs-el label="批量导入" />
    </q-breadcrumbs>

    <q-separator />

    <div class="q-py-md bg-white">
      <div class="row justify-center q-py-md">
        <q-file v-model="localFile"
        @input="checkFiles"
        :filter="checkFileType"
        @rejected="onRejected"
        label="请上传JSON文件">
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </div>

      <div class="q-pt-md">
        <q-banner inline-actions class="text-black bg-listcolor">
          <span class="title">序列号</span>
          <template v-slot:action>
            <q-btn
              dense
              flat
              unelevated
              round
              color="primary"
              @click="sequenceExpand = !sequenceExpand"
              :icon="sequenceExpand ? 'expand_less' : 'expand_more'"
            />
          </template>
        </q-banner>

        <q-table v-show="sequenceExpand"
          :data="metadata.sequences"
          :columns="sequenceColumns"
          :visible-columns="sequenceVisibleColumns"
          :pagination.sync="tablePagination"
          row-key="id"
          flat
          separator="cell"
          hide-bottom>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">
                <span>{{ props.row.id }}</span>
              </q-td>
              <q-td key="caption" :props="props">
                <q-input v-model="props.row.caption" />
              </q-td>
              <q-td key="name" :props="props">
                <q-input v-model="props.row.name" />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>

      <div class="q-pt-md">
        <q-banner inline-actions class="text-black bg-listcolor">
          <span class="title">表</span>
          <template v-slot:action>
            <q-btn
              dense
              flat
              unelevated
              round
              color="primary"
              @click="tableExpand = !tableExpand"
              :icon="tableExpand ? 'expand_less' : 'expand_more'"
            />
          </template>
        </q-banner>
        <q-table v-show="tableExpand"
          :data="metadata.tables"
          :columns="tableColumns"
          :visible-columns="tableVisibleColumns"
          :pagination.sync="tablePagination"
          row-key="id"
          flat
          separator="cell"
          hide-bottom>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">
                <span>{{ props.row.id }}</span>
              </q-td>
              <q-td key="caption" :props="props">
                <q-input v-model="props.row.caption" />
              </q-td>
              <q-td key="name" :props="props">
                <q-input v-model="props.row.name" />
              </q-td>
              <q-td key="pluralName" :props="props">
                <q-input v-model="props.row.pluralName" />
              </q-td>
              <q-td key="tableName" :props="props">
                <q-input v-model="props.row.tableName" />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>

      <div class="q-pt-md">
        <q-banner inline-actions class="text-black bg-listcolor">
          <span class="title">表关系</span>
          <template v-slot:action>
            <q-btn
              dense
              flat
              unelevated
              round
              color="primary"
              @click="tableRelationExpand = !tableRelationExpand"
              :icon="tableRelationExpand ? 'expand_less' : 'expand_more'"
            />
          </template>
        </q-banner>
        <q-table v-show="tableRelationExpand"
          :data="metadata.tableRelations"
          :columns="tableRelationColumns"
          :pagination.sync="tablePagination"
          row-key="id"
          flat
          separator="cell"
          hide-bottom>
          <template v-slot:body="props">
            <q-tr :props="props">
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
                color="primary"
                :label="props.row.toTable.caption"
                flat
                dense
              ></q-btn>
            </q-td>
            <q-td key="toColumn" :props="props">
              <span>{{ props.row.toColumn.caption }}</span>
            </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>

      <div class="row justify-center q-py-md">
        <q-btn unelevated @click="onSubmitClick" color="primary" label="提交" />
      </div>
    </div>
  </div>

</template>

<style lang="stylus">

</style>

<script>
import { extend } from "quasar";
import FormData from 'form-data';
import { fileService } from "../../../service";
import { metadataTableService } from "../../../service";
import { tableService } from "../../../service";

export default {
  data() {
    return {
      sequenceExpand: true,
      tableExpand: true,
      tableRelationExpand: true,
      dataSource: "",
      dataSourceUrl: "",
      localFile: null,
      metadata: {
        sequences:[],
        tables:[],
        tableRelations:[]
      },
      tablePagination: {
        rowsPerPage: 999
      },
      sequenceVisibleColumns: [
        "id",
        "name",
        "caption"
      ],
      sequenceColumns: [
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
          label: "编码",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "caption",
          required: true,
          label: "名称",
          align: "left",
          field: row => row.caption,
          format: val => `${val}`,
          sortable: true
        }
      ],
      tableVisibleColumns: [
        "id",
        "caption",
        "name",
        "pluralName",
        "tableName",
      ],
      tableColumns: [
        {
          name: "id",
          label: "编号",
          align: "left",
          field: row => row.id,
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
          name: "name",
          required: true,
          label: "名称",
          align: "left",
          field: row => row.name,
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
        }
      ],
      tableRelationColumns: [
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
        }
      ]
    };
  },
  async created() {
    await this.init();
  },
  mounted: function() {
    console.info("import mounted");
  },
  activated: function() {
    console.info("import->activated");
  },
  deactivated: function() {
    console.info("import->deactivated");
  },
  updated: function() {
    console.info("import->updated");
  },
  destroyed: function() {
    console.info("import->destroyed");
  },

  filters: {
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
  computed: {},
  methods: {
     async init() {
      console.info("import->init");
      this.$store.commit(
        "config/updateIsAllowBack",
        this.$route.meta.isAllowBack
      );

      this.dataSource = this.$route.params.dataSource;
      this.dataSourceUrl = "/dataSource/" + this.dataSource;
    },

    checkFileType (files) {
      return files.filter(file => file.type === 'application/json')
    },

    checkFiles (file) {
      const that = this;
      if (file) {
        console.dir(file);
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (e) {
          that.metadata = JSON.parse(e.target.result);
          console.log(that.metadata);
        }
      } else {
        console.log("clear");
      }
    },

    onRejected (rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },

    async onSubmitClick() {
      console.info("import->onSubmitClick");

      this.$q.loading.show({
        message: "上传中"
      });

      try {
        this.fileInfo = await metadataTableService.import(this.dataSource, this.metadata);
        this.$q.notify("导入成功");
        this.$root.$emit("updateMenuTree");
        this.$router.go(-1);
        this.$q.loading.hide();
      } catch (error) {
        this.$q.loading.hide();
        console.error(error);
      }
    }
  }
};
</script>
