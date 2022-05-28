import { axiosInstance } from "boot/axios";

const HEADERS = {
  "Content-Type": "multipart/form-data"
};


const metadataTable = {
  create: function(dataSource, data) {
    return axiosInstance.post("/api/metadata/tables",
       data,
       {
         dataSource: dataSource
       }
    );
  },
  update: function(dataSource, id, data) {
    return axiosInstance.patch("/api/metadata/tables/" + id,
       data,
       {
         dataSource: dataSource
       }
    );
  },
  list: function(dataSource, page, rowsPerPage, search, query) {
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
        },
        dataSource: dataSource
        //permission: ["ROLE_META_TABLE_R"]
      }
    );
  },
  count: function(dataSource, search, query) {
    return axiosInstance.get("/api/metadata/tables/count",
      {
        params: {
          search: search,
          ...query
        },
        dataSource: dataSource
      }
    );
  },
  get: function(dataSource, id) {
    return axiosInstance.get("/api/metadata/tables/" + id,
      {
        params: {
        },
        dataSource: dataSource
      }
    );
  },
  getByName: function(dataSource, name) {
    return axiosInstance.get("/api/metadata/tables/name/" + name,
      {
        params: {
        },
        dataSource: dataSource
      }
    );
  },
  getMetadata: function(dataSource, name) {
    return axiosInstance.get("/api/metadata/tables/metadatas/" + name,
      {
        params: {
        },
        dataSource: dataSource
      }
    );
  },
  getMetadatas: function(dataSource) {
    return axiosInstance.get("/api/metadata/tables/metadatas",
      {
        params: {
        },
        dataSource: dataSource
      }
    );
  },
  reverse: function(dataSource, tableName) {
    return axiosInstance.post("/api/metadata/tables/metadatas/reverse/" + tableName,
      {},
      {
        dataSource: dataSource
      });
  },
  batchReverse: function(dataSource, tableNames) {
    return axiosInstance.post("/api/metadata/tables/metadatas/reverse", tableNames,
    {
      dataSource: dataSource
    });
  },
  repairMeataData: function(dataSource, name, columnNameLsit) {
    return axiosInstance.patch("/api/metadata/tables/metadata/" + name,
      columnNameLsit,
      {
        dataSource: dataSource
      }
    );
  },
  delete: function(dataSource, id, isDropPhysicalTable) {
    return axiosInstance.delete("/api/metadata/tables/" + id, {
      params: {
        isDropPhysicalTable: isDropPhysicalTable
      },
      dataSource: dataSource
    });
  },
  batchDelete: function(dataSource, ids, isDropPhysicalTable) {
    return axiosInstance.delete("/api/metadata/tables",
      {
        data:  ids,
        params: {
          isDropPhysicalTable: isDropPhysicalTable
        },
        dataSource: dataSource
      }
    );
  },
  import: async function(dataSource, data, progressCallback) {
    return axiosInstance.post("/api/metadata/tables/import", data,
      {
        headers: HEADERS,
        onUploadProgress:  (progressEvent) => {
          if (progressCallback) {
            progressCallback(progressEvent)
          }
        },
        dataSource: dataSource
    });
  },
  export: function(dataSource, ids) {
    return axiosInstance.post("/api/metadata/tables/export",
      ids,
      {
        dataSource: dataSource
      }
    );
  },
  listDataSource: function() {
    return axiosInstance.get("/api/metadata/dataSources",
      {
        params: {
        }
      }
    );
  }
};

export { metadataTable };
