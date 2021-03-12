import { sequenceDesign } from "../api";

const sequenceDesignService = {
  create: async function(data) {
    var res = await sequenceDesign.create(data);
    return res.data;
  },
  update: async function(id, data) {
    var res = await sequenceDesign.update(id, data);
    return res.data;
  },
  list: async function(page, rowsPerPage, search, query) {
    var res = await sequenceDesign.list(page, rowsPerPage, search, query);
    return res.data;
  },
  count: async function(search, query) {
    var res = await sequenceDesign.count(search, query);
    return res.data;
  },
  get: async function(id) {
    var res = await sequenceDesign.get(id);
    return res.data;
  },
  delete: async function(id) {
    var res = await sequenceDesign.delete(id);
    return res.data;
  },
  batchDelete: async function(ids) {
    var res = await sequenceDesign.batchDelete(ids);
    return res.data;
  }
};

export { sequenceDesignService };
