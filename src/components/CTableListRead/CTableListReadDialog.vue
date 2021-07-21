<template>
  <q-dialog ref="dialog" @hide="onDialogHide" full-width full-height  persistent>
    <q-card class="q-dialog-plugin">

      <CTableListRead
        ref="rTablelistRead"
        v-model="selected"
        :tableName="tableName"
        readOnly="true"
        selectionProp="single" >
      </CTableListRead>
      <q-card-actions align="center">
        <q-btn color="primary" label="确定" unelevated no-caps @click="onOKClick" />
        <q-btn color="negative" label="取消" unelevated no-caps @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    tableName: {
      required: true
    },
    data: {
      required: false
    }
  },

  data () {
    return {
      selected: []
    }
  },

  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.selected = this.data;
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok', this.selected)
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>