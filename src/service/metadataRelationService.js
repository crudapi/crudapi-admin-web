import { metadataRelation } from "../api";

const metadataRelationService = {
  create: async function(dataSource, data) {
    var res = await metadataRelation.create(dataSource, data);
    return res.data;
  },
  update: async function(dataSource, id, data) {
    var res = await metadataRelation.update(dataSource, id, data);
    return res.data;
  },
  list: async function(dataSource, page, rowsPerPage, search, query) {
    var res = await metadataRelation.list(dataSource, page, rowsPerPage, search, query);
    return res.data;
  },
  count: async function(dataSource, search, query) {
    var res = await metadataRelation.count(dataSource, search, query);
    return res.data;
  },
  get: async function(dataSource, id) {
    var res = await metadataRelation.get(dataSource, id);
    return res.data;
  },
  getByName: async function(dataSource, name) {
    var res = await metadataRelation.getFromTableByName(dataSource, name);
    return res.data;
  },
  delete: async function(dataSource, id) {
    var res = await metadataRelation.delete(dataSource, id);
    return res.data;
  },
  batchDelete: async function(dataSource, ids) {
    var res = await metadataRelation.batchDelete(dataSource, ids);
    return res.data;
  }
};

export { metadataRelationService };
