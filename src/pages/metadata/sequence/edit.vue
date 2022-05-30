<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el :label="dataSource" clickable :to="dataSourceUrl" />
      <q-breadcrumbs-el label="序列号管理" :to="dataSourceUrl + '/metadata/sequences'" />
      <q-breadcrumbs-el :label="sequence.caption" />
      <q-breadcrumbs-el label="编辑" />
    </q-breadcrumbs>

    <q-separator />

    <form @submit.prevent.stop="onSubmit" class="q-pb-md">
      <div class="row items-baseline content-center justify-start q-py-md">
        <div class="col-3 text-right text-subtitle2 q-pr-md">编号:</div>
        <div class="col-7 text-subtitle2">{{ sequence.id }}</div>
      </div>

      <div class="row items-baseline content-center justify-start">
        <div class="col-3 text-right required text-subtitle2 q-pr-md">编码:</div>
        <q-input
            class="col-7"
            placeholder="请输入序号编码，如productCode"
            ref="sequence.name"
            v-model="sequence.name"
            lazy-rules
            :rules="[val => (val && val.length > 0) || '不能为空']"
          />
      </div>

      <div class="row items-baseline content-center justify-start">
        <div class="col-3 text-right required text-subtitle2 q-pr-md">名称:</div>
        <q-input
            class="col-7"
            placeholder="请输入序号名称，如产品code流水号"
            ref="sequence.caption"
            v-model="sequence.caption"
            lazy-rules
            :rules="[val => (val && val.length > 0) || '不能为空']"
          />
      </div>

      <div class="row items-baseline content-center justify-start">
        <div class="col-3 text-right required text-subtitle2 q-pr-md">类型:</div>
        <q-select
            class="col-7"
            outlined
            v-model="sequence.sequenceType"
            :options="sequenceTypeOptions"
            emit-value
            map-options
          />
      </div>

      <div v-if="isNotGuid">
        <div class="row items-center content-center justify-start">
          <div class="col-3 text-right required text-subtitle2 q-pr-md">时间戳:</div>
          <q-toggle class="col-7" v-model="sequence.currentTime"/>
        </div>

        <div v-if="isHasFormat" class="row items-baseline content-center justify-start q-py-md">
          <div class="col-3 text-right text-subtitle2 q-pr-md">格式:</div>
          <q-input
              class="col-7"
              placeholder="请输入格式，如P%d"
              ref="sequence.format"
              v-model="sequence.format"
            />
        </div>

        <div v-if="!sequence.currentTime" class="row items-baseline content-center justify-start q-py-md">
          <div class="col-3 text-right text-subtitle2 q-pr-md">最小值:</div>
          <q-input
              class="col-7"
              type="number"
              placeholder="请输入最小值，如1"
              ref="sequence.minValue"
              v-model="sequence.minValue"
            />
        </div>


        <div v-if="!sequence.currentTime" class="row items-baseline content-center justify-start q-py-md">
          <div class="col-3 text-right text-subtitle2 q-pr-md">最大值:</div>
          <q-input
              class="col-7"
              type="number"
              placeholder="请输入最大值，如999999999"
              ref="sequence.maxValue"
              v-model="sequence.maxValue"
            />
        </div>

        <div v-if="!sequence.currentTime" class="row items-baseline content-center justify-start q-py-md">
          <div class="col-3 text-right text-subtitle2 q-pr-md">下一个值:</div>
          <q-input
              class="col-7"
              type="number"
              placeholder="请输入下一个值，如1"
              ref="sequence.nextValue"
              v-model="sequence.nextValue"
            />
        </div>

        <div v-if="!sequence.currentTime" class="row items-baseline content-center justify-start q-py-md">
          <div class="col-3 text-right text-subtitle2 q-pr-md">步长:</div>
          <q-input
              class="col-7"
              type="number"
              placeholder="请输入步长，如1"
              ref="sequence.incrementBy"
              v-model="sequence.incrementBy"
            />
        </div>

        <div class="row items-baseline content-center justify-start q-py-md">
          <div class="col-3 text-right text-subtitle2 q-pr-md">创建时间:</div>
          <div class="col-7 text-subtitle2">{{ sequence.createdDate | dateTimeFormat }}</div>
        </div>

        <div class="row items-baseline content-center justify-start q-py-md">
          <div class="col-3 text-right text-subtitle2 q-pr-md">修改时间:</div>
          <div class="col-7 text-subtitle2">{{ sequence.lastModifiedDate | dateTimeFormat }}</div>
        </div>
      </div>

      <div class="row justify-center q-py-md">
        <q-btn unelevated type="submit" color="primary" label="保存" />
      </div>
    </form>
  </div>
</template>

<style>
.required:before {
  content: "* ";
  color: red;
}
</style>

<script>
import { metadataSequenceService } from "../../../service";
import { date } from "../../../utils";
import { extend } from 'quasar'

export default {
  data () {
    return {
      sequenceTypeOptions: [
        {
          value: "LONG",
          label: "数字"
        },
        {
          value: "STRING",
          label: "字符串"
        },
        {
          value: "GUID",
          label: "GUID"
        }
      ],
      sequence: {},
      dataSource: "",
      dataSourceUrl: ""
    }
  },

  created() {
    this.init();
    console.info('created');
  },

  mounted: function() {
    console.info('mounted');
  },

  activated: function() {
    console.info('activated');
  },

  deactivated: function() {
    console.info('deactivated');
  },

  updated: function() {
    console.info('updated');
  },

  destroyed: function() {
    console.info('destroyed');
  },

  beforeRouteUpdate (to, from, next) {
    console.info('beforeRouteUpdate');
    this.init(to.params.id);
    next();
  },
  filters: {
    dateTimeFormat: function(value) {
      return date.dateTimeFormat(value);
    }
  },
  computed: {
    isHasFormat() {
      return this.sequence.sequenceType === "STRING" ? true : false;
    },
    isNotGuid () {
      return this.sequence.sequenceType === "GUID" ? false : true;
    }
  },
  methods: {
    async init(id) {
      console.info("init");
      this.$store.commit(
        "config/updateIsAllowBack",
        this.$route.meta.isAllowBack
      );
      this.dataSource = this.$route.params.dataSource;
      this.dataSourceUrl = "/dataSource/" + this.dataSource;
      await this.loadData(id);
    },

    async loadData(id) {
      try {
        const sequence = await metadataSequenceService.get(this.dataSource, id || this.$route.params.id);
        console.info(sequence);

        this.sequence = sequence;
      } catch (error) {
        console.error(error);
      }
    },

    async onSubmit() {
      this.$q.loading.show({
        message: "提交中"
      });
      try {
        let sequence = extend(true, {}, this.sequence);
        if (sequence.currentTime) {
          delete sequence.minValue;
          delete sequence.maxValue;
          delete sequence.nextValue;
          delete sequence.incrementBy;
        }

        await metadataSequenceService.update(this.dataSource, this.$route.params.id, sequence);
        this.$q.loading.hide();
        this.$q.notify("修改成功");
        this.loadData();
      } catch (error) {
        this.$q.loading.hide();
        console.info(error);
      }
    }
  }
}
</script>
