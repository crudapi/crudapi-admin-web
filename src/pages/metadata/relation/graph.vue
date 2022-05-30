<template>
  <div class="q-pa-md">
    <div id="container"></div>
  </div>

</template>

<style>
.g6-tooltip {
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  font-size: 12px;
  color: #545454;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 8px;
  box-shadow: rgb(174, 174, 174) 0px 0px 10px;
}
</style>

<script>
import { metadataRelationService } from "../../../service";
import { date } from "../../../utils";
import G6 from '@antv/g6';

export default {
  data () {
    return {
      dataSource: "",
      dataSourceUrl: "",
      relations: []
    }
  },

  created() {
    console.info('created');
  },

  mounted: function() {
    this.init();
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
    next();
  },
  filters: {
    dateTimeFormat: function(value) {
      return date.dateTimeFormat(value);
    }
  },
  methods: {
    addNode(nodes, item) {
      const node = nodes.find(t => t.id === item.id);
      if (!node) {
        nodes.push(item);
      }
    },

    async init(id) {
      console.info("init");
      this.$store.commit(
        "config/updateIsAllowBack",
        this.$route.meta.isAllowBack
      );

      this.dataSource = this.$route.params.dataSource;
      this.dataSourceUrl = "/dataSource/" + this.dataSource;
      try {
        const relations = await metadataRelationService.list(this.dataSource);
        this.relations = relations;

        let nodes = [];
        let edges = [];
        for (let i = 0; i < this.relations.length; i++) {
          let relation = this.relations[i];

          const source = {
            id: relation.fromTable.id + "",
            label: relation.fromTable.caption,
            description: relation.fromTable.name
          };
          this.addNode(nodes, source);

          const target = {
            id: relation.toTable.id + "",
            label: relation.toTable.caption,
            description: relation.toTable.name
          };
          this.addNode(nodes, target);

          edges.push({
            source: source.id,
            target: target.id,
            sourceLabel: source.label + ", "
                          + relation.fromColumn.caption
                          + "(" + relation.fromColumn.name + ")",
            targetLabel: target.label + ", "
                          + relation.toColumn.caption
                          + "(" + relation.toColumn.name + ")",
            type: 'line',
            label: relation.relationType,
          });
        }

        const data = {
          nodes: nodes,
          edges: edges
        };

        const grid = new G6.Grid();

        const minimap = new G6.Minimap({
          size: [100, 100],
          className: 'minimap',
          type: 'delegate',
        });

        const graph = new G6.Graph({
          layout: {                // Object，可选，布局的方法及其配置项，默认为 random 布局。
            type: 'dagre',
            preventOverlap: true,
            nodeSize: 200
          },
          fitView: true,
          fitViewPadding: [20, 40, 50, 20],
          plugins: [grid],
          modes: {
            default: [
              {
                type: 'tooltip',
                formatText(model) {
                  const text = '表ID: ' + model.id
                  return text;
                },
              },
              {
                type: 'edge-tooltip',
                formatText(model) {
                  const text =
                    '源: ' +
                    model.sourceLabel +
                    '<br/> 目标: ' +
                    model.targetLabel +
                    '<br/> 类型: ' +
                    model.label;
                  return text;
                }
              }
            ],
          },
          container: 'container',
          width: 1024,
          height: 900,
          defaultNode: {
            type: 'modelRect',
            size: [250, 100 ],
            style: {
              lineWidth: 2
            },
            labelCfg: {
              style: {
                fontSize: 20
              }
            }
          },
          defaultEdge: {
            style: {
              stroke: 'black',
              lineWidth: 3
            },
            labelCfg: {

            }
          }
        });

        graph.data(data);
        graph.render();
      } catch (error) {
        console.error(error);
        this.$q.notify(error);
      }
    }
  }
}
</script>
