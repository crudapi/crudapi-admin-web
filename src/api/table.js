import { axiosInstance } from "boot/axios";

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
      console.log(filterStr);

      filterStrEncode = encodeURIComponent(filterStr);
      console.log(filterStrEncode);
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
  }
};

export { table };
