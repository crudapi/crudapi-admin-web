<template>
   <div class="q-pa-md q-gutter-sm bg-page">
    <q-breadcrumbs>
      <q-breadcrumbs-el :label="tableCaption" clickable :to="listUrl" />
      <q-breadcrumbs-el label="批量导入" />
    </q-breadcrumbs>

    <q-separator />

    <div class="q-py-md bg-white">
      <div class="row justify-center q-py-md">
        <q-file v-model="localFile" label="请上传EXCEL文件">
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </div>

      <div class="row justify-center q-py-md">
        <q-btn unelevated @click="onSubmitClick" color="primary" label="提交" />
         <p class="q-px-sm"/>
        <q-btn unelevated @click="onDownloadClick" color="purple" label="下载模板" />
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
      listUrl: "",
      dataSource: "",
      tableName: "",
      tableCaption: "",
      localFile: null
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
  filters: {},
  computed: {},
  methods: {
     async init(dataSource, tableName) {
      console.info("import->init");
      this.$store.commit(
        "config/updateIsAllowBack",
        this.$route.meta.isAllowBack
      );

      this.tableName = dataSource || this.$route.params.tableName;
      this.tableName = tableName || this.$route.params.tableName;

      this.loadMeta();
    },

    async loadMeta() {
      this.loading = true;
      try {
        const table = await metadataTableService.getByName(this.dataSource, this.tableName);
        this.tableCaption = table.caption;
        this.listUrl = "/business/" + this.tableName;
        console.info(this.listUrl);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    },

    async onSubmitClick() {
      console.info("import->onSubmitClick");

      this.$q.loading.show({
        message: "上传中"
      });

      try {
        let form = new FormData()
        form.append('file', this.localFile);

        this.fileInfo = await tableService.import(this.dataSource, this.tableName, form, (e)=> {
          console.info(e);
        });
        this.$q.notify("导入成功");
        this.$router.go(-1);
        this.$q.loading.hide();
      } catch (error) {
        this.$q.loading.hide();
        console.error(error);
      }
    },

    async onDownloadClick() {
      console.info("import->onDownloadClick");

      this.$q.loading.show({
        message: "生成中"
      });

      try {
        let form = new FormData()
        form.append('file', this.localFile);

        const url = await tableService.getImportTemplate(this.dataSource, this.tableName);
        this.$q.notify("模板生成成功，请等待下载完成后查看！");

        window.open(url, "_blank");

        this.$q.loading.hide();
      } catch (error) {
        this.$q.loading.hide();
        console.error(error);
      }
    }
  }
};
</script>
