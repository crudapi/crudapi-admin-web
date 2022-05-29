<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="表关系管理" />
      <q-breadcrumbs-el label="编辑" />
      <q-breadcrumbs-el :label="metadataRelation.caption" />
    </q-breadcrumbs>

    <q-separator />

    <form @submit.prevent.stop="onSubmit" class="q-pb-md">
      <div class="row items-baseline content-center justify-start q-py-md">
        <div class="col-3 text-right text-subtitle2 q-pr-md">编号:</div>
        <div class="col-7 text-subtitle2">{{ metadataRelation.id }}</div>
      </div>

      <div class="row items-baseline content-center justify-start q-py-md">
        <div class="col-3 text-right required text-subtitle2 q-pr-md">类型:</div>
        <q-select
            class="col-7"
            outlined
            v-model="metadataRelation.relationType"
            :options="relationTypeOptions"
            emit-value
            map-options
          />
      </div>

      <div class="row items-baseline content-center justify-start q-py-md">
        <div class="col-3 text-right required text-subtitle2 q-pr-md">源表:</div>
        <q-select
            class="col-7"
            outlined
            v-model="metadataRelation.fromTable"
            :options="tableOptions"
            option-label="caption"
            option-value="id"
            map-options
            @input="onFromTableUpdate"
          />
      </div>

      <div class="row items-baseline content-center justify-start q-py-md">
        <div class="col-3 text-right required text-subtitle2 q-pr-md">源列:</div>
        <q-select
            class="col-7"
            outlined
            v-model="metadataRelation.fromColumn"
            :options="fromColumnOptions"
            option-label="caption"
            option-value="id"
            map-options
          />
      </div>

      <div class="row items-baseline content-center justify-start q-py-md">
        <div class="col-3 text-right required text-subtitle2 q-pr-md">目标表:</div>
        <q-select
            class="col-7"
            outlined
            v-model="metadataRelation.toTable"
            :options="tableOptions"
            option-label="caption"
            option-value="id"
            map-options
            @input="onToTableUpdate"
          />
      </div>

      <div class="row items-baseline content-center justify-start q-py-md">
        <div class="col-3 text-right required text-subtitle2 q-pr-md">目标列:</div>
        <q-select
            class="col-7"
            outlined
            v-model="metadataRelation.toColumn"
            :options="toColumnOptions"
            option-label="caption"
            option-value="id"
            map-options
          />
      </div>

      <div class="row items-baseline content-center justify-start">
        <div class="col-3 text-right required text-subtitle2 q-pr-md">英文名称:</div>
        <q-input
            class="col-7"
            placeholder="请输入关系英文名称，如products"
            ref="metadataRelation.name"
            v-model="metadataRelation.name"
            lazy-rules
            :rules="[val => (val && val.length > 0) || '不能为空']"
          />
      </div>

      <div class="row items-baseline content-center justify-start">
        <div class="col-3 text-right required text-subtitle2 q-pr-md">中文名称:</div>
        <q-input
            class="col-7"
            placeholder="请输入关系中文名称"
            ref="metadataRelation.caption"
            v-model="metadataRelation.caption"
            lazy-rules
            :rules="[val => (val && val.length > 0) || '不能为空']"
          />
      </div>

      <div class="row items-baseline content-center justify-start q-py-md">
        <div class="col-3 text-right text-subtitle2 q-pr-md">创建时间:</div>
        <div class="col-7 text-subtitle2">{{ metadataRelation.createdDate | dateTimeFormat }}</div>
      </div>

      <div class="row items-baseline content-center justify-start q-py-md">
        <div class="col-3 text-right text-subtitle2 q-pr-md">修改时间:</div>
        <div class="col-7 text-subtitle2">{{ metadataRelation.lastModifiedDate | dateTimeFormat }}</div>
      </div>

      <div class="row justify-center">
        <q-btn unelevated type="submit" color="primary" label="保存" />
      </div>
    </form>
  </div>
</template>

<style>
.required:before {
  content: "* ";
  color: red;
}
</style>

<script>
import { metadataRelationService, metadataTableService } from "../../../service";
import { date } from "../../../utils";

export default {
  data () {
    return {
      dataSource: "",
      loading : true,
      tableOptions: [],
      relationTypeOptions: [
        {
          value: "OneToMany",
          label: "一对多"
        },
        {
          value: "ManyToOne",
          label: "多对一"
        },
        {
          value: "OneToOneMainToSub",
          label: "一对一(主子)"
        },
        {
          value: "OneToOneSubToMain",
          label: "一对一(子主)"
        }
      ],
      fromColumnOptions: [],
      toColumnOptions: [],
      metadataRelation: {},
      fromColumn: null,
      toColumn: null
    }
  },

  created() {
    this.init();
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

  beforeRouteUpdate (to, from, next) {
    console.info('beforeRouteUpdate');
    this.init(to.params.id);
    next();
  },
  filters: {
    dateTimeFormat: function(value) {
      return date.dateTimeFormat(value);
    }
  },
  methods: {
    async init(id) {
      console.info("init");
      this.$store.commit(
        "config/updateIsAllowBack",
        this.$route.meta.isAllowBack
      );
      this.dataSource = this.$route.params.dataSource;
      await this.loadData(id);
    },

    isCanRelation: function(column) {
      if (column.dataType === "TINYINT"
        || column.dataType === "SMALLINT"
        || column.dataType === "MEDIUMINT"
        || column.dataType === "INT"
        || column.dataType === "BIGINT"
        || column.dataType === "CHAR"
        || column.dataType === "VARCHAR") {
        return true;
      } else {
        return false;
      }
    },

    onFromTableUpdate() {
      console.info("onFromTableUpdate");
      this.fromColumn = null;
      if (this.metadataRelation.fromTable) {
        this.fromColumnOptions = this.metadataRelation.fromTable.columns
        .filter(t => this.isCanRelation(t));
      } else {
        this.fromColumnOptions = [];
      }
    },

    onToTableUpdate() {
      console.info("onToTableUpdate");
      this.toColumn = null;
      if (this.metadataRelation.toTable) {
        this.toColumnOptions = this.metadataRelation.toTable.columns
        .filter(t => this.isCanRelation(t));
      } else {
        this.toColumnOptions = [];
      }
    },

    async loadData(id) {
      try {
        this.loading = true;
        const metadataRelation = await metadataRelationService.get(this.dataSource, id || this.$route.params.id);

        this.metadataRelation = metadataRelation;
        const tables = await metadataTableService.list(this.dataSource, 1, 999);

        this.tableOptions = tables;

        this.metadataRelation.fromTable =
          this.tableOptions.find(t => t.id === this.metadataRelation.fromTable.id);

        this.metadataRelation.toTable =
          this.tableOptions.find(t => t.id === this.metadataRelation.toTable.id);

        this.fromColumnOptions = this.metadataRelation.fromTable.columns
          .filter(t => this.isCanRelation(t));

        this.fromColumn = this.fromColumnOptions.find(t => t.id === this.metadataRelation.fromColumn.id);

        this.toColumnOptions = this.metadataRelation.toTable.columns
          .filter(t => this.isCanRelation(t));

        this.toColumn = this.toColumnOptions.find(t => t.id === this.metadataRelation.toColumn.id);

        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$q.notify(error);
        console.error(error);
      }
    },

    async onSubmit() {
      if (!this.fromColumn) {
         this.$q.notify("源列不能为空！");
         return;
      }

      if (!this.toColumn) {
         this.$q.notify("目标列不能为空！");
         return;
      }

      this.$q.loading.show({
        message: "提交中"
      });

      try {
        let data = {
          relationType: this.metadataRelation.relationType,
          name: this.metadataRelation.name,
          caption: this.metadataRelation.caption,
          fromTable: {
            id: this.metadataRelation.fromTable.id
          },
          fromColumn: {
            id: this.fromColumn.id
          },
          toTable: {
            id: this.metadataRelation.toTable.id
          },
          toColumn: {
            id: this.toColumn.id
          }
        }
        await metadataRelationService.update(this.dataSource, this.$route.params.id, data);
        this.$q.loading.hide();
        this.$q.notify("修改成功");
        this.loadData();
      } catch (error) {
        this.$q.loading.hide();
        console.info(error);
      }
    },
  }
}
</script>
