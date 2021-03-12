import { metadataSequence } from "../api";

const metadataSequenceService = {
  create: async function(data) {
    var res = await metadataSequence.create(data);
    return res.data;
  },
  update: async function(id, data) {
    var res = await metadataSequence.update(id, data);
    return res.data;
  },
  list: async function(page, rowsPerPage, search, query) {
    var res = await metadataSequence.list(page, rowsPerPage, search, query);
    return res.data;
  },
  count: async function(search, query) {
    var res = await metadataSequence.count(search, query);
    return res.data;
  },
  get: async function(id) {
    var res = await metadataSequence.get(id);
    return res.data;
  },
  delete: async function(id) {
    var res = await metadataSequence.delete(id);
    return res.data;
  },
  batchDelete: async function(ids) {
    var res = await metadataSequence.batchDelete(ids);
    return res.data;
  }
};

export { metadataSequenceService };
