import { axiosInstance } from "boot/axios";

const HEADERS = {
  "Content-Type": "multipart/form-data"
};


const metadataTable = {
  create: function(data) {
    return axiosInstance.post("/api/metadata/tables",
       data
    );
  },
  update: function(id, data) {
    return axiosInstance.patch("/api/metadata/tables/" + id,
       data
    );
  },
  list: function(page, rowsPerPage, search, query) {
    if (!page) {
      page = 1
    }

    if (!rowsPerPage) {
      rowsPerPage = 10
    }

    return axiosInstance.get("/api/metadata/tables",
      {
        params: {
          offset: (page - 1) * rowsPerPage,
          limit: rowsPerPage,
          search: search,
          ...query
        }
        //permission: ["ROLE_META_TABLE_R"]
      }
    );
  },
  count: function(search, query) {
    return axiosInstance.get("/api/metadata/tables/count",
      {
        params: {
          search: search,
          ...query
        }
      }
    );
  },
  get: function(id) {
    return axiosInstance.get("/api/metadata/tables/" + id,
      {
        params: {
        }
      }
    );
  },
  getByName: function(name) {
    return axiosInstance.get("/api/metadata/tables/name/" + name,
      {
        params: {
        }
      }
    );
  },
  getMetadata: function(name) {
    return axiosInstance.get("/api/metadata/tables/metadatas/" + name,
      {
        params: {
        }
      }
    );
  },
  getMetadatas: function() {
    return axiosInstance.get("/api/metadata/tables/metadatas",
      {
        params: {
        }
      }
    );
  },
  reverse: function(tableName) {
    return axiosInstance.post("/api/metadata/tables/metadatas/reverse/" + tableName);
  },
  batchReverse: function(tableNames) {
    return axiosInstance.post("/api/metadata/tables/metadatas/reverse", tableNames);
  },
  repairMeataData: function(name, columnNameLsit) {
    return axiosInstance.patch("/api/metadata/tables/metadata/" + name,
      columnNameLsit
    );
  },
  delete: function(id, isDropPhysicalTable) {
    return axiosInstance.delete("/api/metadata/tables/" + id, {
      params: {
        isDropPhysicalTable: isDropPhysicalTable
      }
    });
  },
  batchDelete: function(ids, isDropPhysicalTable) {
    return axiosInstance.delete("/api/metadata/tables",
      {
        data:  ids,
        params: {
          isDropPhysicalTable: isDropPhysicalTable
        }
      }
    );
  },
  import: async function(data, progressCallback) {
    return axiosInstance.post("/api/metadata/tables/import", data,
      {
        headers: HEADERS,
        onUploadProgress:  (progressEvent) => {
          if (progressCallback) {
            progressCallback(progressEvent)
          }
        }
    });
  },
  export: function(ids) {
    return axiosInstance.post("/api/metadata/tables/export",
      ids
    );
  }
};

export { metadataTable };
