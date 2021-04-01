import { table } from "../api";

const tableService = {
  create: async function(tableName, data) {
    var res = await table.create(tableName, data);
    return res.data;
  },
  update: async function(tableName, id, data) {
    var res = await table.update(tableName, id, data);
    return res.data;
  },
  count: async function(tableName, search, query) {
    var res = await table.count(tableName, search, query);
    return res.data;
  },
  list: async function(tableName, page, rowsPerPage, search, query, filter) {
    var res = await table.list(tableName, page, rowsPerPage, search, query, filter);
    return res.data;
  },
  listByIds: async function(tableName, ids) {
    let filter = {
      "name":"L",
      "columnName":"id",
      "operatorType": "IN",
      "values": ids
    };

    var res = await table.list(tableName, 1, 9999, null, null, filter);
    return res.data;
  },
  get: async function(tableName, id) {
    var res = await table.get(tableName, id);
    return res.data;
  },
  delete: async function(tableName, id) {
    var res = await table.delete(tableName, id);
    return res.data;
  },
  batchDelete: async function(tableName, ids) {
    var res = await table.batchDelete(tableName, ids);
    return res.data;
  }
};

export { tableService };
