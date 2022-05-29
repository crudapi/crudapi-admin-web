<template>
  <div class="q-pa-md q-gutter-sm bg-page">
    <q-breadcrumbs>
      <q-breadcrumbs-el :label="dataSource" clickable :to="dataSourceUrl" />
      <q-breadcrumbs-el :label="tableCaption" clickable :to="listUrl" />
      <q-breadcrumbs-el label="添加" />
    </q-breadcrumbs>

    <q-separator />

    <div class="q-py-md bg-white">
      <CTableNew ref="rTableNewRef" :dataSource="dataSource" :tableName="tableName" ></CTableNew>

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

export default {
  name: "PageTableNew",
  data() {
    return {
      listUrl: "",
      dataSource: "",
      dataSourceUrl: "",
      tableName: "",
      tableCaption: "",
      tableData: {}
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
    await this.init(to.params.dataSource, to.params.tableName);
    next();
  },

  methods: {
    async init(dataSource, tableName) {
      this.$store.commit(
        "config/updateIsAllowBack",
        this.$route.meta.isAllowBack
      );

      this.dataSource = dataSource || this.$route.params.dataSource;
      this.tableName = tableName || this.$route.params.tableName;
      this.dataSourceUrl = "/dataSource/" + this.dataSource;
      this.loadMeta();
    },

    async loadMeta() {
      this.loading = true;
      try {
        const table = await metadataTableService.getByName(this.dataSource, this.tableName);
        this.tableCaption = table.caption;
        this.listUrl = "/dataSource/" + this.dataSource + "/business/" + this.tableName;
        console.info(this.listUrl);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    },

    async onSubmit() {
      this.$q.loading.show({
        message: "提交中"
      });
      const data = this.$refs.rTableNewRef.getData();
      try {
        await tableService.create(this.dataSource, this.tableName, data);
        this.$q.loading.hide();
        this.$q.notify("添加成功");
        this.$router.go(-1);
      } catch (error) {
        this.$q.loading.hide();
        console.info(error);
      }
    }
  }
};
</script>
