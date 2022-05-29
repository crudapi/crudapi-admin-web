import { table } from "../api";

const tableService = {
  create: async function(dataSource, tableName, data) {
    var res = await table.create(dataSource, tableName, data);
    return res.data;
  },
  update: async function(dataSource, tableName, id, data) {
    var res = await table.update(dataSource, tableName, id, data);
    return res.data;
  },
  count: async function(dataSource, tableName, search, query) {
    var res = await table.count(dataSource, tableName, search, query);
    return res.data;
  },
  list: async function(dataSource, tableName, page, rowsPerPage, search, query, filter) {
    var res = await table.list(dataSource, tableName, page, rowsPerPage, search, query, filter);
    return res.data;
  },
  listByIds: async function(dataSource, tableName, ids) {
    var res = await table.listAllByIds(dataSource, tableName, ids);
    return res.data;
  },
  get: async function(dataSource, tableName, id) {
    var res = await table.get(dataSource, tableName, id);
    return res.data;
  },
  delete: async function(dataSource, tableName, id) {
    var res = await table.delete(dataSource, tableName, id);
    return res.data;
  },
  batchDelete: async function(dataSource, tableName, ids) {
    var res = await table.batchDelete(dataSource, tableName, ids);
    return res.data;
  },
  import: async function (tableName, fileObj, progressCallback) {
    return table.import(dataSource, tableName, fileObj, progressCallback).then((res) => {
      console.log(res);
      return res.data;
    })
  },
  getImportTemplate: async function(dataSource, tableName) {
    var res = await table.getImportTemplate(dataSource, tableName);
    return res.data;
  },
  export: async function(dataSource, tableName, search, query) {
    var res = await table.export(dataSource, tableName, search, query);
    return res.data;
  }
};

export { tableService };
