import { axiosInstance } from "boot/axios";

const metadataTable = {
  create: function(data) {
    return axiosInstance.post("/api/metadata/tables",
       data
    );
  },
  update: function(id, data) {
    return axiosInstance.patch("/api/metadata/tables/" + id,
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

    return axiosInstance.get("/api/metadata/tables",
      {
        params: {
          offset: (page - 1) * rowsPerPage,
          limit: rowsPerPage,
          search: search,
          ...query
        }
        //permission: ["ROLE_META_TABLE_R"]
      }
    );
  },
  count: function(search, query) {
    return axiosInstance.get("/api/metadata/tables/count",
      {
        params: {
          search: search,
          ...query
        }
      }
    );
  },
  get: function(id) {
    return axiosInstance.get("/api/metadata/tables/" + id,
      {
        params: {
        }
      }
    );
  },
  getByName: function(name) {
    return axiosInstance.get("/api/metadata/tables/name/" + name,
      {
        params: {
        }
      }
    );
  },
  getMetadata: function(name) {
    return axiosInstance.get("/api/metadata/tables/metadata/" + name,
      {
        params: {
        }
      }
    );
  },
  repairMeataData: function(name, columnNameLsit) {
    return axiosInstance.patch("/api/metadata/tables/metadata/" + name,
      columnNameLsit
    );
  },
  delete: function(id) {
    return axiosInstance.delete("/api/metadata/tables/" + id);
  },
  batchDelete: function(ids) {
    return axiosInstance.delete("/api/metadata/tables",
      {data: ids}
    );
  }
};

export { metadataTable };
