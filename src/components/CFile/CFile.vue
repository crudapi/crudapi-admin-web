<template>
  <div>
      <q-file v-model="localFile">
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
        <template v-slot:after>
          <q-btn round dense flat icon="send" @click="onSubmitClick" />
        </template>
      </q-file>
      <div class="q-py-md">
        <q-img
          :src="fileInfo.url"
          spinner-color="white"
          style="height: 140px; max-width: 150px;border: 1px solid gray"
        />
      </div>
  </div>
</template>

<style lang="stylus">

</style>

<script>
import { extend } from "quasar";
import FormData from 'form-data';
import { fileService } from "../../service";

export default {
  name: "CFile",
  props: {
    value: {
      required: true
    }
  },

  data() {
    return {
      localFile: null,
      fileInfo: {}
    };
  },

  created() {
    console.info("CFile created");
    this.init();
  },
  mounted: function() {
    console.info("CFile mounted");
  },
  activated: function() {
    console.info("CFile->activated");
  },
  deactivated: function() {
    console.info("CFile->deactivated");
  },
  updated: function() {
    console.info("CFile->updated");
  },
  destroyed: function() {
    console.info("CFile->destroyed");
  },
  filters: {},
  computed: {},
  methods: {
    init() {
      console.info("CFile->init");
      this.fileInfo.url = this.value;
    },
    async onSubmitClick() {
      console.info("CFile->onSubmitClick");

      this.$q.loading.show({
        message: "上传中"
      });

      try {
        let form = new FormData()
        form.append('file', this.localFile);

        this.fileInfo = await fileService.upload(form, (e)=> {
          console.info(e);
        });
        this.$q.loading.hide();
        this.$emit("input", this.fileInfo);
      } catch (error) {
        this.$q.loading.hide();
        console.error(error);
      }
    }
  }
};
</script>
