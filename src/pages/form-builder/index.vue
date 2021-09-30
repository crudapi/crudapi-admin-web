<template>
  <q-layout class="bg-page" view="hhh lpr lfr">
    <!-- <q-header  class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          表单定制
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
    </q-header> -->

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <div>
        <draggable
          class="dragArea list-group"
          :list="list1"
          :group="{ name: 'people', pull: 'clone', put: false }"
          @change="log"
        >
          <div
            class="list-group-item"
            v-for="element in list1"
            :key="element.name"
          >
            {{ element.name }}
          </div>
        </draggable>
      </div>
    </q-drawer>

    <q-drawer show-if-above v-model="right" side="right" bordered>
      <CRawDisplayer class="col-3" :value="list1" title="List 1" />
      <CRawDisplayer class="col-3" :value="list2" title="List 2" />
    </q-drawer>

    <q-page-container>
      <div>
        <draggable
          class="dragArea list-group"
          :list="list2"
          group="people"
          @change="log"
        >
          <div
            class="list-group-item"
            v-for="element in list2"
            :key="element.name"
          >
            {{ element.name }}
          </div>
        </draggable>
      </div>
    </q-page-container>

  </q-layout>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: "formBulder",
  components: {
    draggable
  },
  data () {
    return {
      left: true,
      right: true,
      list1: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 }
      ],
      list2: [
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 }
      ]
    }
  },
  methods: {
    log: function(evt) {
      window.console.log(evt);
    }
  }
}
</script>