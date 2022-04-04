<template>
  <q-dialog ref="dialog" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <div class="q-pa-md">
        <div class="row items-baseline content-center justify-start">
          <div class="col-10 text-right q-pr-md">文件已经生成，请点击下载！</div>
          <div class="col-2"><a target="_blank" :href="url">立即下载</a></div>
        </div>
      </div>

      <q-card-actions align="center">
        <q-btn color="primary" label="关闭" unelevated no-caps @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    url: {
      required: true
    },
    data: {
      required: false
    }
  },

  data () {
    return {
    }
  },

  methods: {
    show () {
      this.$refs.dialog.show()
    },

    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      this.$emit('hide')
    },

    onOKClick () {
      this.hide()
    }
  }
}
</script>