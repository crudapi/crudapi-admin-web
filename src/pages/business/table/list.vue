<template>
  <div class="q-pa-md q-gutter-sm bg-page">
    <q-breadcrumbs>
      <q-breadcrumbs-el :label="tableCaption" clickable :to="listUrl" />
      <q-breadcrumbs-el label="列表" />
    </q-breadcrumbs>

    <q-separator />

    <CTableListRead
      v-if="isShow"
      ref="rTablelistRead"
      :tableName="tableName" ></CTableListRead>
  </div>
</template>

<script>
import { tableService } from "../../../service";
import { metadataTableService } from "../../../service";
import { metadataRelationService } from "../../../service";
import { date } from "../../../utils";

export default {
  data () {
    return {
      tableName: "",
      tableCaption: "",
      listUrl: "",
      isShow: false
    }
  },

  async created() {
    await this.init();
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

  async beforeRouteUpdate (to, from, next) {
    console.info('beforeRouteUpdate');
    await this.init(to.params.tableName);
    next();
  },
  filters: {
  },
  methods: {
    async init(tableName) {
      console.info("init:" + tableName);
      this.$store.commit(
        "config/updateIsAllowBack",
        this.$route.meta.isAllowBack
      );
      this.isShow = false;
      this.tableName = tableName || this.$route.params.tableName;
      this.$nextTick(() => {
        this.isShow= true;
      });
      await this.loadMeta();
    },

    async loadMeta() {
      this.loading = true;
      try {
        const table = await metadataTableService.getByName(this.tableName);
        this.tableCaption = table.caption;
        this.listUrl = "/business/" + this.tableName;

        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    }
  }
}
</script>
