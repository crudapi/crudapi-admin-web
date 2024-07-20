<template>
  <q-dialog  full-width full-height
    ref="dialog" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin" >
      <q-card-section style="height: 90%">
        <iframe
          id="extIframe"
          ref="extIframe"
          frameborder="0"
          scrolling="no"
          :src="columnExtProperty.url"
          allowfullscreen="true" style="width: 100%;height: 100%;">
          <p>您的浏览器不支持iframes，请使用chrome浏览器.</p >
        </iframe>
      </q-card-section>

      <q-card-actions align="center" style="height: 10%">
        <q-btn color="primary" label="确定" unelevated no-caps @click="onOKClick" />
        <q-btn color="negative" label="取消" unelevated no-caps @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    columnExtProperty: {
      required: true
    },
    data: {
      required: true
    },
    json: {
      required: false
    }
  },

  data () {
    return {
      small: false,
      medium: false,
      fullWidth: true,
      fullHeight: false
    }
  },

  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      console.dir(this.columnExtProperty);
      if (!window.crudapi) {
        window.crudapi = {}
      };

      const that = this;
      window.crudapi.getParentValue = function() {
        return that.getParentValue();
      };
      window.crudapi.getParentJson = function() {
        return that.getParentJson();
      };
      this.$refs.dialog.show();
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide();
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide');
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok', this.getIframeValue());
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide();
    },

    onCancelClick () {
      // we just need to hide dialog
      this.hide();
    },

    getIframeValue() {
      try {
        if (window.frames["extIframe"]) {
          const extIframeWindow = window.frames["extIframe"].contentWindow;
          if (extIframeWindow.crudapi.getIframeValue) {
            return extIframeWindow.crudapi.getIframeValue();
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    getParentValue() {
      console.info("getParentValue:" + this.data);
      return this.data;
    },
    getParentJson() {
      console.info("getParentJson:" + this.json);
      return this.json;
    }
  }
}
</script>