<template>
  <div
    class="q-pa-md row justify-center items-center"
    v-if="pagination.count > 0"
  >
    <div class="q-pr-sm">
      <q-item-label
        >共 {{ pagination.count }} 条记录 第 {{ pagination.page }} /
        {{ Math.ceil(pagination.count / pagination.rowsPerPage) }}
        页</q-item-label
      >
    </div>
    <div>
      <div class="flex flex-center page-border">
        <q-pagination
          unelevated
          v-model="pagination.page"
          :max="Math.ceil(pagination.count / pagination.rowsPerPage)"
          :max-pages="10"
          :direction-links="true"
          :ellipses="false"
          :boundary-numbers="true"
          :boundary-links="true"
          @input="onRequestAction"
        >
        </q-pagination>
      </div>
    </div>
    <div>
      <div class="row justify-center items-center">
        <div class="q-pl-sm">
          <q-select
            style="width: 120px;"
            outlined
            v-model="pageSize"
            :options="pageSizeOptions"
            @input="onPageSizeAction"
          />
        </div>
        <div class="q-px-sm">
          <div class="row justify-center items-center">
            <q-item-label>跳至</q-item-label>
            <div class="q-px-sm page-input">
              <q-input
                outlined
                v-model.number="pagination.page"
                type="number"
                style="width: 80px;"
                @input="onRequestAction"
              >
              </q-input>
            </div>
            <q-item-label>页</q-item-label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
.page-border
  .non-selectable
    width:32px;
    height:32px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(217,217,217,1);
    margin-left:2px;
    margin-right:2px;
    .q-btn__content
      width:32px;
      //height:32px;
      font-size:14px;
      font-family:HelveticaNeue;
      color: rgba(0,0,0,0.65);
      line-height:14px;
  .bg-primary
    .q-btn__content
      color: white
</style>

<script>
import { extend } from "quasar";

export default {
  name: "CPage",
  props: {
    value: {
      required: true
    }
  },

  data() {
    return {
      pageSize: { label: "10/页", value: 10 },
      pageSizeOptions: [
        {
          label: "5条/页",
          value: 5
        },
        {
          label: "10条/页",
          value: 10
        },
        {
          label: "15条/页",
          value: 15
        },
        {
          label: "20条/页",
          value: 20
        },
        {
          label: "30条/页",
          value: 30
        },
        {
          label: "50条/页",
          value: 50
        },
        {
          label: "100条/页",
          value: 100
        }
      ]
    };
  },

  created() {
    console.info("CPage created");
    this.init();
  },
  mounted: function() {
    console.info("CPage mounted");
  },
  activated: function() {
    console.info("CPage->activated");
  },
  deactivated: function() {
    console.info("CPage->deactivated");
  },
  updated: function() {
    console.info("CPage->updated");
  },
  destroyed: function() {
    console.info("CPage->destroyed");
  },
  filters: {},
  computed: {
    pagination: function() {
      return extend(true, {}, this.value);
    }
  },
  methods: {
    init() {
      console.info("CPage->init");
      if (this.pageSize.value !== this.value.rowsPerPage) {
        const find = this.pageSizeOptions.find(
          t => t.value === this.value.rowsPerPage
        );
        if (!find) {
          throw "invalid rowsPerPage";
        }
        console.info(find);
        this.pageSize = {
          value: find.value,
          label: find.label
        };
      }
    },
    onRequestAction() {
      console.info("CPage->onRequestAction");
      this.$emit("input", this.pagination);
    },
    onPageSizeAction() {
      console.info("CPage->onPageSizeAction");
      if (this.pagination.rowsPerPage !== this.pageSize.value) {
        this.pagination.rowsPerPage = this.pageSize.value;
      }
      this.$emit("input", this.pagination);
    }
  }
};
</script>
