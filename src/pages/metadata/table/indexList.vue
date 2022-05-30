<template>
  <div class="q-pa-md q-gutter-sm bg-page">
    <q-breadcrumbs>
      <q-breadcrumbs-el :label="dataSource" clickable :to="dataSourceUrl" />
      <q-breadcrumbs-el label="表管理" :to="dataSourceUrl + '/metadata/tables'" />
      <q-breadcrumbs-el label="联合索引" />
      <q-breadcrumbs-el :label="table.caption" />
    </q-breadcrumbs>

    <q-separator />

    <div class="bg-table-list">
      <CIndexList
        ref="cIndexListRef"
        v-if="!!table.id"
        v-model="table">
      </CIndexList>

      <q-separator />

      <div class="q-py-md">
        <div class="row justify-center">
          <q-btn unelevated
            @click="onSubmitClick"
            color="primary"
            label="保存"
            />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.required:before {
  content: "* ";
  color: red;
}
</style>

<script>
import { metadataTableService } from "../../../service";
import { date } from "../../../utils";
import { extend } from 'quasar'

export default {
  data () {
    return {
      dataSource: "",
      dataSourceUrl: "",
      loading: true,
      table: {}
    }
  },

  async created() {
    console.info("indexList->created");
    await this.init();
  },

  mounted: function() {
    console.info('indexList->mounted');
  },

  activated: function() {
    console.info('indexList->activated');
  },

  deactivated: function() {
    console.info('indexList->deactivated');
  },

  updated: function() {
    console.info('indexList->updated');
  },

  destroyed: function() {
    console.info('indexList->destroyed');
  },

  filters: {
    dateTimeFormat: function(value) {
      return date.dateTimeFormat(value);
    }
  },
  methods: {
    async init(id) {
      console.info("indexList->init");
      this.$store.commit(
        "config/updateIsAllowBack",
        this.$route.meta.isAllowBack
      );
      this.dataSource = this.$route.params.dataSource;
      await this.loadData(id);
    },

    async loadData(id) {
      try {
        console.info("indexList->loadData");

        this.loading = true;

        this.table = {};

        const table = await metadataTableService.get(this.dataSource, id || this.$route.params.id);

        this.table = table;
        this.loading = false;
        console.info("indexList->loadData done");
      } catch (error) {
        console.error(error);
        this.loading = false;
        this.$q.notify(error);
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
        this.$q.notify("修改失败");
      }
    },

    async onSubmit() {
      this.$q.loading.show({
        message: "提交中"
      });

      try {
        const ref = this.$refs['cIndexListRef'];
        const data = ref.getData();

        let indexData = extend(true, {}, data);
        indexData.indexs.forEach(function(item) {
          if (item.isNewRow) {
            delete item.id;
            delete item.isNewRow;
          }
        });

        await metadataTableService.update(this.dataSource, this.$route.params.id, indexData);

        this.$q.notify("修改成功");
        this.$q.loading.hide();

        this.loadData();
      } catch (error) {
        console.error(error);
        this.$q.loading.hide();
      }
    }
  }
}
</script>
