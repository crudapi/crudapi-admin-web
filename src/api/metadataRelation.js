import { axiosInstance } from "boot/axios";

const metadataRelation = {
  create: function(dataSource, data) {
    return axiosInstance.post("/api/metadata/tablerelations",
       data
    );
  },
  update: function(dataSource, id, data) {
    return axiosInstance.patch("/api/metadata/tablerelations/" + id,
       data
    );
  },
  list: function(dataSource, page, rowsPerPage, search, query) {
    if (!page) {
      page = 1
    }

    if (!rowsPerPage) {
      rowsPerPage = 999
    }

    return axiosInstance.get("/api/metadata/tablerelations",
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
    return axiosInstance.get("/api/metadata/tablerelations/count",
      {
        params: {
          search: search,
          ...query
        }
      }
    );
  },
  get: function(dataSource, id) {
    return axiosInstance.get("/api/metadata/tablerelations/" + id,
      {
        params: {
        }
      }
    );
  },
  getFromTableById: function(dataSource, id) {
    return axiosInstance.get("/api/metadata/tablerelations/fromTable/" + id,
      {
        params: {
        }
      }
    );
  },
  getFromTableByName: function(dataSource, name) {
    return axiosInstance.get("/api/metadata/tablerelations/fromTable/name/" + name,
      {
        params: {
        }
      }
    );
  },
  delete: function(dataSource, id) {
    return axiosInstance.delete("/api/metadata/tablerelations/" + id);
  },
  batchDelete: function(dataSource, ids) {
    return axiosInstance.delete("/api/metadata/tablerelations",
      {data: ids}
    );
  }
};

export { metadataRelation };
