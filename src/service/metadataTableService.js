import { metadataTable } from "../api";

const metadataTableService = {
  create: async function(dataSource, data) {
    var res = await metadataTable.create(dataSource, data);
    return res.data;
  },
  update: async function(dataSource, id, data) {
    var res = await metadataTable.update(dataSource, id, data);
    return res.data;
  },
  list: async function(dataSource, page, rowsPerPage, search, query) {
    var res = await metadataTable.list(dataSource, page, rowsPerPage, search, query);
    return res.data;
  },
  count: async function(dataSource, search, query) {
    var res = await metadataTable.count(dataSource, search, query);
    return res.data;
  },
  get: async function(dataSource, id) {
    var res = await metadataTable.get(dataSource, id);
    return res.data;
  },
  getByName: async function(dataSource, id) {
    var res = await metadataTable.getByName(dataSource, id);
    return res.data;
  },
  getMetadata: async function(dataSource, name) {
    var res = await metadataTable.getMetadata(dataSource, name);
    return res.data;
  },
  getMetadatas: async function(dataSource) {
    var res = await metadataTable.getMetadatas(dataSource);
    return res.data;
  },
  reverse: async function(dataSource, tableName) {
    var res = await metadataTable.reverse(dataSource, tableName);
    return res.data;
  },
  batchReverse: async function(dataSource, tableNames) {
    var res = await metadataTable.batchReverse(dataSource,tableNames);
    return res.data;
  },
  repairMeataData: async function(dataSource, name, columnNameLsit) {
    var res = await metadataTable.repairMeataData(dataSource,name, columnNameLsit);
    return res.data;
  },
  delete: async function(dataSource, id, isDropPhysicalTable) {
    var res = await metadataTable.delete(dataSource,id, isDropPhysicalTable);
    return res.data;
  },
  batchDelete: async function(dataSource, ids, isDropPhysicalTable) {
    var res = await metadataTable.batchDelete(dataSource,ids, isDropPhysicalTable);
    return res.data;
  },
  importFile: async function (dataSource, fileObj, progressCallback) {
    return metadataTable.import(dataSource, fileObj, progressCallback).then((res) => {
      console.log(res);
      return res.data;
    })
  },
  import: async function (dataSource, data) {
    var res = await metadataTable.import(dataSource, data);
    return res.data;
  },
  export: async function(dataSource, ids) {
    var res = await metadataTable.export(dataSource, ids);
    return res.data;
  },
  listDataSource: async function() {
    var res = await metadataTable.listDataSource();
    return res.data;
  }
};

export { metadataTableService };
