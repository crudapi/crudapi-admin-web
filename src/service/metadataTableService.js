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
  getMetadatas: async function() {
    var res = await metadataTable.getMetadatas(name);
    return res.data;
  },
  reverse: async function(tableName) {
    var res = await metadataTable.reverse(tableName);
    return res.data;
  },
  batchReverse: async function(tableNames) {
    var res = await metadataTable.batchReverse(tableNames);
    return res.data;
  },
  repairMeataData: async function(name, columnNameLsit) {
    var res = await metadataTable.repairMeataData(name, columnNameLsit);
    return res.data;
  },
  delete: async function(id, isDropPhysicalTable) {
    var res = await metadataTable.delete(id, isDropPhysicalTable);
    return res.data;
  },
  batchDelete: async function(ids, isDropPhysicalTable) {
    var res = await metadataTable.batchDelete(ids, isDropPhysicalTable);
    return res.data;
  },
  import: async function (fileObj, progressCallback) {
    return metadataTable.import(fileObj, progressCallback).then((res) => {
      console.log(res);
      return res.data;
    })
  },
  export: async function(ids) {
    var res = await metadataTable.export(ids);
    return res.data;
  },
  listDataSource: async function() {
    var res = await metadataTable.listDataSource();
    return res.data;
  }
};

export { metadataTableService };
