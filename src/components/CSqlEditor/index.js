import CSqlEditor from "./CSqlEditor.vue";

const cSqlEditor = {
  install: function(Vue) {
    Vue.component("CSqlEditor", CSqlEditor);
  }
};

export default cSqlEditor;
