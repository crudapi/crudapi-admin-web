<template>
  <div>
      <div class="q-py-md">
        <q-file v-model="localFile">
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
          <template v-slot:after>
            <q-btn round dense flat icon="send" @click="onSubmitClick" />
          </template>
        </q-file>
      </div>

      <div class="q-py-md">
        <q-file v-model="bigFile" @input="fileAdded">
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
          <template v-slot:after>
            <q-btn round dense flat icon="flight_land" @click="onBigSubmitClick" />
          </template>
        </q-file>
      </div>

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
import FileMd5 from '../../models/file-md5.js'

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
      bigFile: null,
      chunkSize: 20971520, //20MB
      md5: null,
      chunkInfo: {},
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
    },

    fileAdded(f) {
      this.$q.loading.show({
        message: "文件准备中"
      });

      console.info("CFile->fileAdded");
      console.log(this.bigFile);

      FileMd5(f, this.chunkSize, (e, md5) => {
        this.md5 = md5;
        console.log(e);
        console.log(md5);
        this.$q.loading.hide();
      });
    },

    getChunks() {
      const size = this.bigFile.size;
      const chunkSize = this.chunkSize;
      const chunks = Math.ceil( size / chunkSize);

      return chunks;
    },

    uploadWithBlock(chunk) {
      let chunks = this.getChunks();

      let form = new FormData();
      form.append('file', this.bigFile);

      form.append('name', this.bigFile.name);
      form.append('md5', this.md5);
      form.append('size', this.bigFile.size);
      form.append('chunks', chunks);
      form.append('chunk', chunk);

      return fileService.bigUpload(form, (e)=> {
        //console.info(e);
      });
    },

    checkFinished(datas) {
      for (let i = 0; i < datas.length; ++i) {
         let data = datas[i];
         if (data.isFinished) {
            console.info("CFile->checkFinished");
            this.$emit("input", this.fileInfo);
            this.$q.loading.hide();
         }
      }
    },

    async onBigSubmitClick() {
      console.info("CFile->onBigSubmitClick");

      this.$q.loading.show({
        message: "上传中"
      });

      try {
        let chunks = this.getChunks();

        let reqs = [];
        for (let i = 0; i < chunks; ++i) {
          reqs.push(this.uploadWithBlock(i));
        }

        await Promise.all(reqs)
        .then((datas) => {
          console.info(datas);
          this.checkFinished(datas);
        });
      } catch (error) {
        this.$q.loading.hide();
        console.error(error);
      }
    }
  }
};
</script>
