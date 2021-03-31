import { metadataRelation } from "../api";

const metadataRelationService = {
  create: async function(data) {
    var res = await metadataRelation.create(data);
    return res.data;
  },
  update: async function(id, data) {
    var res = await metadataRelation.update(id, data);
    return res.data;
  },
  list: async function(page, rowsPerPage, search, query) {
    var res = await metadataRelation.list(page, rowsPerPage, search, query);
    return res.data;
  },
  count: async function(search, query) {
    var res = await metadataRelation.count(search, query);
    return res.data;
  },
  get: async function(id) {
    var res = await metadataRelation.get(id);
    return res.data;
  },
  getByName: async function(name) {
    var res = await metadataRelation.getFromTableByName(name);
    return res.data;
  },
  delete: async function(id) {
    var res = await metadataRelation.delete(id);
    return res.data;
  },
  batchDelete: async function(ids) {
    var res = await metadataRelation.batchDelete(ids);
    return res.data;
  }
};

export { metadataRelationService };
