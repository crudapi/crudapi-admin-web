<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el :label="dataSource" clickable :to="dataSourceUrl" />
      <q-breadcrumbs-el label="SQL管理" :to="dataSourceUrl + '/metadata/sqls'" />
      <q-breadcrumbs-el label="添加" />
    </q-breadcrumbs>

    <q-separator />

    <form @submit.prevent.stop="onSubmit" class="q-pb-md">
      <div class="row items-baseline content-center justify-start">
        <div class="col-3 text-right required text-subtitle2 q-pr-md">名称:</div>
        <q-input
            class="col-7"
            placeholder="请输入SQL名称"
            ref="sql.name"
            v-model="sql.name"
            lazy-rules
            :rules="[val => (val && val.length > 0) || '不能为空']"
          />
      </div>

      <div class="row items-baseline content-center justify-start">
        <div class="col-3 text-right required text-subtitle2 q-pr-md">SQL:</div>
        <div class="col-7 sql-box">
          <CSqlEditor
            ref="sqleditor"
            :value="sql.sql"
            @changeTextarea="changeTextarea($event)">
          </CSqlEditor>
        </div>
      </div>

      <div class="row justify-center q-py-md">
        <q-btn class="q-mx-md" unelevated type="submit" color="primary" label="保存" />
        <q-btn unelevated color="positive" @click="formaterSql()" label="格式化" />
      </div>
    </form>
  </div>
</template>

<style>
.required:before {
  content: "* ";
  color: red;
}
.CodeMirror {
  color: black;
  /* direction: ltr; */
  line-height: 22px;
}
.CodeMirror-hints {
  z-index: 9999 !important;
}
.sql-box {
  border: 1px solid #ddd;
}
</style>

<script>
import { metadataSequenceService } from "../../../service";
import { date } from "../../../utils";
import { extend } from 'quasar';
import { format } from 'sql-formatter';

export default {
  data () {
    return {
      sql: {
        sql: "SELECT * FROM spring_useer WHERE `name` = 'superadmin'"
      },
      dataSource: "",
      dataSourceUrl: ""
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
  computed: {
  },
  methods: {
    async init(id) {
      console.info("init");
      this.$store.commit(
        "config/updateIsAllowBack",
        this.$route.meta.isAllowBack
      );

      this.dataSource = this.$route.params.dataSource;
      this.dataSourceUrl = "/dataSource/" + this.dataSource;
    },

    async onSubmit() {
      this.$q.loading.show({
        message: "提交中"
      });
      try {
        this.$q.loading.hide();
        this.$q.notify("添加成功");
      } catch (error) {
        this.$q.loading.hide();
        console.info(error);
      }
    },

    changeTextarea(val) {
      this.$set(this.sql, "sql", val);
    },
    formaterSql() {
      let dom = this.$refs.sqleditor;
      const oldValue = dom.editor.getValue();
      console.log(oldValue);
      const newValue = format(oldValue);
      console.log(newValue);
      dom.editor.setValue(newValue);
    }
  }
}
</script>
