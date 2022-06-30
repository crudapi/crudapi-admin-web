import { axiosInstance } from "boot/axios";


const HEADERS = {
  "Content-Type": "multipart/form-data"
};


const table = {
  create: function(dataSource, tableName, data) {
    return axiosInstance.post("/api/business/" + tableName,
       data,
       {
         dataSource: dataSource
       }
    );
  },
  update: function(dataSource, tableName, id, data) {
    return axiosInstance.patch("/api/business/" + tableName + "/" + id,
       data,
       {
         dataSource: dataSource
       }
    );
  },
  list: function(dataSource, tableName, page, rowsPerPage, search, query, filter) {
    if (!page) {
      page = 1
    }

    if (!rowsPerPage) {
      rowsPerPage = 10
    }

    let filterStrEncode;
    if (filter) {
      let filterStr = JSON.stringify(filter);
      filterStrEncode = encodeURIComponent(filterStr);
    }

    return axiosInstance.get("/api/business/" + tableName,
      {
        params: {
          offset: (page - 1) * rowsPerPage,
          limit: rowsPerPage,
          search: search,
          ...query,
          filter: filterStrEncode
        },
        dataSource: dataSource
      }
    );
  },
  listAllByIds: function(dataSource, tableName, ids) {
    let idStr = ids.join(",");
    return axiosInstance.get("/api/business/" + tableName + "/all",
      {
        params: {
          ids: idStr
        },
        dataSource: dataSource
      }
    );
  },
  count: function(dataSource, tableName, search, query, filter) {
    let filterStrEncode;
    if (filter) {
      let filterStr = JSON.stringify(filter);
      filterStrEncode = encodeURIComponent(filterStr);
    }

    return axiosInstance.get("/api/business/" + tableName + "/count",
      {
        params: {
          search: search,
          ...query,
          filter: filterStrEncode
        },
        dataSource: dataSource
      }
    );
  },
  get: function(dataSource, tableName, id) {
    return axiosInstance.get("/api/business/" + tableName + "/" + id,
      {
        params: {
        },
        dataSource: dataSource
      }
    );
  },
  delete: function(dataSource, tableName, id, isSoftDelete) {
    return axiosInstance.delete("/api/business/" + tableName + "/" + id,
    {
      params: {
        isSoftDelete: isSoftDelete
      },
      dataSource: dataSource
    });
  },
  batchDelete: function(dataSource, tableName, ids, isSoftDelete) {
    return axiosInstance.delete("/api/business/" + tableName,
      {
        data: ids,
        params: {
          isSoftDelete: isSoftDelete
        },
        dataSource: dataSource
      }
    );
  },
  import: async function(dataSource, tableName, data, progressCallback) {
    console.log("table->import")
    console.log(data)
    return axiosInstance.post("/api/business/" + tableName + "/import", data,
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
  multiImport: async function(dataSource, data, progressCallback) {
    console.log("table->import")
    console.log(data)
    return axiosInstance.post("/api/business/import", data,
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
  getImportTemplate: function(dataSource, tableName) {
    return axiosInstance.get("/api/business/" + tableName + "/import/template",
      {
        params: {
        },
        dataSource: dataSource
      }
    );
  },
  export: function(dataSource, tableName, search, query, filter) {
    let filterStrEncode;
    if (filter) {
      let filterStr = JSON.stringify(filter);
      filterStrEncode = encodeURIComponent(filterStr);
    }
    return axiosInstance.get("/api/business/" + tableName + "/export",
      {
        params: {
          search: search,
          ...query,
          filter: filterStrEncode
        },
        dataSource: dataSource
      }
    );
  }
};

export { table };
