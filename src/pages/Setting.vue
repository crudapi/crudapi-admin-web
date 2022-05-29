<template>
  <div class="q-pa-md">
    <div class="q-pa-md">
      <q-item-label>
        <div>crudapi-admin-web v1.6.0</div>
        <div>Quasar v{{ $q.version }}</div>
      </q-item-label>
      <div class="q-py-md">
        <q-btn unelevated color="primary" no-caps @click="resetAction">
          清除浏览器缓存
        </q-btn>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import { settingService } from "../service";

export default {
  name: "PageSetting",

  data() {
    return {};
  },

  created() {
    console.info("setting->created");
    this.init();
  },

  methods: {
    init() {
      console.info("setting->init");
      this.$store.commit("config/updateIsAllowBack", this.$route.meta.isAllowBack);
    },

    resetAction() {
      this.$q
        .dialog({
          title: "提示",
          message: "确认清除浏览器缓存并刷新吗？",
          ok: {
            unelevated: true
          },
          cancel: {
            color: "negative",
            unelevated: true
          },
          persistent: false
        })
        .onOk(() => {
          settingService.clear();
          window.location.reload(true);
        })
        .onCancel(() => {})
        .onDismiss(() => {
          log.info("I am triggered on both OK and Cancel");
        });
    }
  }
};
</script>
