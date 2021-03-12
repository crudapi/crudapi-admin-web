import { tableDesign } from "../api";

const tableDesignService = {
  create: async function(data) {
    var res = await tableDesign.create(data);
    return res.data;
  },
  update: async function(id, data) {
    var res = await tableDesign.update(id, data);
    return res.data;
  },
  list: async function(page, rowsPerPage, search, query) {
    var res = await tableDesign.list(page, rowsPerPage, search, query);
    return res.data;
  },
  count: async function(search, query) {
    var res = await tableDesign.count(search, query);
    return res.data;
  },
  get: async function(id) {
    var res = await tableDesign.get(id);
    return res.data;
  },
  getByName: async function(id) {
    var res = await tableDesign.getByName(id);
    return res.data;
  },
  getMetadata: async function(name) {
    var res = await tableDesign.getMetadata(name);
    return res.data;
  },
  repairMeataData: async function(name, columnNameLsit) {
    var res = await tableDesign.repairMeataData(name, columnNameLsit);
    return res.data;
  },
  delete: async function(id) {
    var res = await tableDesign.delete(id);
    return res.data;
  },
  batchDelete: async function(ids) {
    var res = await tableDesign.batchDelete(ids);
    return res.data;
  }
};

export { tableDesignService };
