import { axiosInstance } from "boot/axios";


const HEADERS = {
  "Content-Type": "multipart/form-data"
};


const table = {
  create: function(tableName, data) {
    return axiosInstance.post("/api/business/" + tableName,
       data
    );
  },
  update: function(tableName, id, data) {
    return axiosInstance.patch("/api/business/" + tableName + "/" + id,
       data
    );
  },
  list: function(tableName, page, rowsPerPage, search, query, filter) {
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
  listAllByIds: function(tableName, ids) {
    return axiosInstance.post("/api/business/" + tableName + "/all",
      ids,
      {
        params: {}
      }
    );
  },
  count: function(tableName, search, query) {
    return axiosInstance.get("/api/business/" + tableName + "/count",
      {
        params: {
          search: search,
          ...query
        }
      }
    );
  },
  get: function(tableName, id) {
    return axiosInstance.get("/api/business/" + tableName + "/" + id,
      {
        params: {
        }
      }
    );
  },
  delete: function(tableName, id) {
    return axiosInstance.delete("/api/business/" + tableName + "/" + id);
  },
  batchDelete: function(tableName, ids) {
    return axiosInstance.delete("/api/business/" + tableName,
      {data: ids}
    );
  },
  import: async function(tableName, data, progressCallback) {
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
  getImportTemplate: function(tableName) {
    return axiosInstance.get("/api/business/" + tableName + "/import/template",
      {
        params: {
        }
      }
    );
  },
};

export { table };
