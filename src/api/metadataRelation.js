import { axiosInstance } from "boot/axios";

const metadataRelation = {
  create: function(data) {
    return axiosInstance.post("/api/metadata/tablerelations",
       data
    );
  },
  update: function(id, data) {
    return axiosInstance.patch("/api/metadata/tablerelations/" + id,
       data
    );
  },
  list: function(page, rowsPerPage, search, query) {
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
  count: function(search, query) {
    return axiosInstance.get("/api/metadata/tablerelations/count",
      {
        params: {
          search: search,
          ...query
        }
      }
    );
  },
  get: function(id) {
    return axiosInstance.get("/api/metadata/tablerelations/" + id,
      {
        params: {
        }
      }
    );
  },
  getFromTableById: function(id) {
    return axiosInstance.get("/api/metadata/tablerelations/fromTable/" + id,
      {
        params: {
        }
      }
    );
  },
  getFromTableByName: function(name) {
    return axiosInstance.get("/api/metadata/tablerelations/fromTable/name/" + name,
      {
        params: {
        }
      }
    );
  },
  delete: function(id) {
    return axiosInstance.delete("/api/metadata/tablerelations/" + id);
  },
  batchDelete: function(ids) {
    return axiosInstance.delete("/api/metadata/tablerelations",
      {data: ids}
    );
  }
};

export { metadataRelation };
