<template>
  <q-dialog ref="dialog" @hide="onDialogHide" full-width full-height  persistent>
    <q-card class="q-dialog-plugin">
      <div class="q-pa-md" style="height: 600px;">
        <iframe
          id="iframeEdb"
          ref="iframeEdb"
          frameborder="0"
          scrolling="no"
          :src="url"
          allowfullscreen="true" style="width: 100%;height: 100%;">
          <p>Your browser does not support iframes.</p >
        </iframe>
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