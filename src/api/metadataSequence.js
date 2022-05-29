import { axiosInstance } from "boot/axios";

const metadataSequence = {
  create: function(dataSource, data) {
    return axiosInstance.post("/api/metadata/sequences",
       data,
       {
         dataSource: dataSource
       }
    );
  },
  update: function(dataSource, id, data) {
    return axiosInstance.patch("/api/metadata/sequences/" + id,
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

    return axiosInstance.get("/api/metadata/sequences",
      {
        params: {
          offset: (page - 1) * rowsPerPage,
          limit: rowsPerPage,
          search: search,
          ...query
        },
        dataSource: dataSource
      }
    );
  },
  count: function(dataSource, search, query) {
    return axiosInstance.get("/api/metadata/sequences/count",
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
    return axiosInstance.get("/api/metadata/sequences/" + id,
      {
        params: {
        },
        dataSource: dataSource
      }
    );
  },
  delete: function(dataSource, id) {
    return axiosInstance.delete("/api/metadata/sequences/" + id,
      {
        dataSource: dataSource
      });
  },
  batchDelete: function(dataSource, ids) {
    return axiosInstance.delete("/api/metadata/sequences",
      {
        data: ids,
        dataSource: dataSource
      }
    );
  }
};

export { metadataSequence };
