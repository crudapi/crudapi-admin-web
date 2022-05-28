import { axiosInstance } from "boot/axios";


const HEADERS = {
  "Content-Type": "multipart/form-data"
};


const table = {
  create: function(dataSource, tableName, data) {
    return axiosInstance.post("/api/business/" + tableName,
       data
    );
  },
  update: function(dataSource, tableName, id, data) {
    return axiosInstance.patch("/api/business/" + tableName + "/" + id,
       data
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
        }
      }
    );
  },
  listAllByIds: function(dataSource, tableName, ids) {
    return axiosInstance.post("/api/business/" + tableName + "/all",
      ids,
      {
        params: {}
      }
    );
  },
  count: function(dataSource, tableName, search, query) {
    return axiosInstance.get("/api/business/" + tableName + "/count",
      {
        params: {
          search: search,
          ...query
        }
      }
    );
  },
  get: function(dataSource, tableName, id) {
    return axiosInstance.get("/api/business/" + tableName + "/" + id,
      {
        params: {
        }
      }
    );
  },
  delete: function(dataSource, tableName, id) {
    return axiosInstance.delete("/api/business/" + tableName + "/" + id);
  },
  batchDelete: function(dataSource, tableName, ids) {
    return axiosInstance.delete("/api/business/" + tableName,
      {data: ids}
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
        }
    });
  },
  getImportTemplate: function(dataSource, tableName) {
    return axiosInstance.get("/api/business/" + tableName + "/import/template",
      {
        params: {
        }
      }
    );
  },
  export: function(dataSource, tableName, search, query) {
    return axiosInstance.get("/api/business/" + tableName + "/export",
      {
        params: {
          search: search,
          ...query
        }
      }
    );
  }
};

export { table };
