<template>
  <div class="q-pa-md">
    <q-item-label>
      <div>crudapi v1.0.0</div>
      <div>Quasar v{{ $q.version }}</div>
    </q-item-label>
  </div>
</template>

<style></style>

<script>
export default {
  name: "PageAbout",

  created() {
    console.info("about->created");
    this.init();
  },
  mounted: function() {
    console.info("about->mounted");
  },
  activated: function() {
    console.info("about->activated");
  },
  deactivated: function() {
    console.info("about->deactivated");
  },
  updated: function() {
    console.info("about->updated");
  },
  destroyed: function() {
    console.info("about->destroyed");
  },
  methods: {
    init() {
      console.info("about->init");
      this.$store.commit(
        "config/updateIsAllowBack",
        this.$route.meta.isAllowBack
      );
    }
  }
};
</script>
