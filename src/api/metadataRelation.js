import { axiosInstance } from "boot/axios";

const metadataRelation = {
  create: function(dataSource, data) {
    return axiosInstance.post("/api/metadata/tablerelations",
       data,
       {
         dataSource: dataSource
       }
    );
  },
  update: function(dataSource, id, data) {
    return axiosInstance.patch("/api/metadata/tablerelations/" + id,
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
      rowsPerPage = 999
    }

    return axiosInstance.get("/api/metadata/tablerelations",
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
    return axiosInstance.get("/api/metadata/tablerelations/count",
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
        },
        dataSource: dataSource
      }
    );
  },
  getFromTableByName: function(dataSource, name) {
    return axiosInstance.get("/api/metadata/tablerelations/fromTable/name/" + name,
      {
        params: {
        },
        dataSource: dataSource
      }
    );
  },
  delete: function(dataSource, id) {
    return axiosInstance.delete("/api/metadata/tablerelations/" + id,
      {
        dataSource: dataSource
      });
  },
  batchDelete: function(dataSource, ids) {
    return axiosInstance.delete("/api/metadata/tablerelations",
      {
        data: ids,
        dataSource: dataSource
      }
    );
  }
};

export { metadataRelation };
