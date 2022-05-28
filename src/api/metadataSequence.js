import { axiosInstance } from "boot/axios";

const metadataSequence = {
  create: function(dataSource, data) {
    return axiosInstance.post("/api/metadata/sequences",
       data
    );
  },
  update: function(dataSource, id, data) {
    return axiosInstance.patch("/api/metadata/sequences/" + id,
       data
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
        }
      }
    );
  },
  count: function(dataSource, search, query) {
    return axiosInstance.get("/api/metadata/sequences/count",
      {
        params: {
          search: search,
          ...query
        }
      }
    );
  },
  get: function(dataSource, id) {
    return axiosInstance.get("/api/metadata/sequences/" + id,
      {
        params: {
        }
      }
    );
  },
  delete: function(dataSource, id) {
    return axiosInstance.delete("/api/metadata/sequences/" + id);
  },
  batchDelete: function(dataSource, ids) {
    return axiosInstance.delete("/api/metadata/sequences",
      {data: ids}
    );
  }
};

export { metadataSequence };
