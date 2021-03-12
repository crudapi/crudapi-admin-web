import { axiosInstance } from "boot/axios";

const metadataSequence = {
  create: function(data) {
    return axiosInstance.post("/api/metadata/sequences",
       data
    );
  },
  update: function(id, data) {
    return axiosInstance.patch("/api/metadata/sequences/" + id,
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
  count: function(search, query) {
    return axiosInstance.get("/api/metadata/sequences/count",
      {
        params: {
          search: search,
          ...query
        }
      }
    );
  },
  get: function(id) {
    return axiosInstance.get("/api/metadata/sequences/" + id,
      {
        params: {
        }
      }
    );
  },
  delete: function(id) {
    return axiosInstance.delete("/api/metadata/sequences/" + id);
  },
  batchDelete: function(ids) {
    return axiosInstance.delete("/api/metadata/sequences",
      {data: ids}
    );
  }
};

export { metadataSequence };
