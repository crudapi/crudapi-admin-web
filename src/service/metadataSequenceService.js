import { metadataSequence } from "../api";

const metadataSequenceService = {
  create: async function(dataSource, data) {
    var res = await metadataSequence.create(dataSource, data);
    return res.data;
  },
  update: async function(dataSource, id, data) {
    var res = await metadataSequence.update(dataSource, id, data);
    return res.data;
  },
  list: async function(dataSource, page, rowsPerPage, search, query) {
    var res = await metadataSequence.list(dataSource, page, rowsPerPage, search, query);
    return res.data;
  },
  count: async function(dataSource, search, query) {
    var res = await metadataSequence.count(dataSource, search, query);
    return res.data;
  },
  get: async function(dataSource, id) {
    var res = await metadataSequence.get(dataSource, id);
    return res.data;
  },
  delete: async function(dataSource, id) {
    var res = await metadataSequence.delete(dataSource, id);
    return res.data;
  },
  batchDelete: async function(dataSource, ids) {
    var res = await metadataSequence.batchDelete(dataSource, ids);
    return res.data;
  }
};

export { metadataSequenceService };
