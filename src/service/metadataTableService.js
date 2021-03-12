import { metadataTable } from "../api";

const metadataTableService = {
  create: async function(data) {
    var res = await metadataTable.create(data);
    return res.data;
  },
  update: async function(id, data) {
    var res = await metadataTable.update(id, data);
    return res.data;
  },
  list: async function(page, rowsPerPage, search, query) {
    var res = await metadataTable.list(page, rowsPerPage, search, query);
    return res.data;
  },
  count: async function(search, query) {
    var res = await metadataTable.count(search, query);
    return res.data;
  },
  get: async function(id) {
    var res = await metadataTable.get(id);
    return res.data;
  },
  getByName: async function(id) {
    var res = await metadataTable.getByName(id);
    return res.data;
  },
  getMetadata: async function(name) {
    var res = await metadataTable.getMetadata(name);
    return res.data;
  },
  repairMeataData: async function(name, columnNameLsit) {
    var res = await metadataTable.repairMeataData(name, columnNameLsit);
    return res.data;
  },
  delete: async function(id) {
    var res = await metadataTable.delete(id);
    return res.data;
  },
  batchDelete: async function(ids) {
    var res = await metadataTable.batchDelete(ids);
    return res.data;
  }
};

export { metadataTableService };
