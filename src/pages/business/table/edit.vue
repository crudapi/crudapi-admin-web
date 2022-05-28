<template>
  <div class="q-pa-md q-gutter-sm bg-page">
    <q-breadcrumbs>
      <q-breadcrumbs-el :label="tableCaption" clickable :to="listUrl" />
      <q-breadcrumbs-el label="编辑" />
    </q-breadcrumbs>

    <q-separator />

    <div class="q-py-md bg-white">
      <CTableEdit
      :recId="recId"
      ref="rTableEditRef"
      :dataSource="dataSource"
      :tableName="tableName" ></CTableEdit>
      <div class="row justify-center q-py-md">
        <q-btn unelevated @click="onSubmit" color="primary" label="保存" />
      </div>
    </div>
  </div>
</template>

<style>

</style>

<script>
import { tableService } from "../../../service";
import { metadataTableService } from "../../../service";
import { metadataRelationService } from "../../../service";
import { date } from "../../../utils";

export default {
  name: "PageTableEdit",
  data() {
    return {
      listUrl: "",
      dataSource: "",
      tableName: "",
      tableCaption: "",
      oldData: {},
      recId: null
    };
  },
  async created() {
    await this.init();
  },
  mounted: function() {

  },
  activated: function() {

  },
  deactivated: function() {

  },
  updated: function() {

  },
  destroyed: function() {

  },
  async beforeRouteUpdate (to, from, next) {
    console.info('beforeRouteUpdate');
    await this.init(to.params.dataSource, to.params.tableName, to.params.recId);
    next();
  },
  filters: {
    dateTimeFormat: function(value) {
      return date.dateTimeFormat(value);
    },
    dateFormat: function(value) {
      return date.dateFormat(value);
    },
    dataFormat: function(value) {
      if (value && value.name) {
        return value.name;
      }
      return value;
    }
  },
  methods: {
    async init(dataSource, tableName, recId) {
      this.$store.commit(
        "config/updateIsAllowBack",
        this.$route.meta.isAllowBack
      );

      this.dataSource = dataSource || this.$route.params.dataSource;
      this.tableName = tableName || this.$route.params.tableName;
      this.recId = recId || this.$route.params.recId;

      await this.loadMeta();
    },

    async onSubmit() {
      this.$q.loading.show({
        message: "提交中"
      });
      const data = this.$refs.rTableEditRef.getData();
      try {
        await tableService.update(this.dataSource, this.tableName, this.recId, data);
        this.$q.loading.hide();
        this.$q.notify("修改成功");
        this.$router.go(-1);
      } catch (error) {
        this.$q.loading.hide();
        console.info(error);
      }
    },

    async loadMeta() {
      this.loading = true;
      try {
        const table = await metadataTableService.getByName(this.dataSource, this.tableName);
        this.tableCaption = table.caption;
        this.listUrl = "/business/" + this.tableName;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    }
  }
};
</script>
