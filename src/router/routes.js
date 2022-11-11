const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("pages/Login.vue")
  },
  {
    path: "/403",
    name: "403",
    component: () => import("pages/Error403")
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'dataSource/:dataSource', component: () => import('pages/Index.vue') },
      {
        name: "about",
        path: "about",
        meta: { isAllowBack: true },
        component: () => import("pages/About.vue")
      },
      {
        name: "setting",
        path: "setting",
        meta: { isAllowBack: true },
        component: () => import("pages/Setting.vue")
      },
      {
        name: "form-builder",
        path: "dataSource/:dataSource/metadata/tables/:id/formBuilder",
        meta: { isAllowBack: true },
        component: () => import("pages/form-builder/index.vue")
      },
      {
        name: "tablePermission",
        path: "dataSource/:dataSource/metadata/tables/:id/tablePermission",
        meta: { isAllowBack: true },
        component: () => import("pages/tablePermission/index.vue")
      },
      {
        name: "sequenceList",
        path: "dataSource/:dataSource/metadata/sequences",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/sequence/list.vue")
      },
      {
        name: "sequenceNew",
        path: "dataSource/:dataSource/metadata/sequences/new",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/sequence/new.vue")
      },
      {
        name: "sequenceEdit",
        path: "dataSource/:dataSource/metadata/sequences/:id",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/sequence/edit.vue")
      },
      {
        name: "sqlNew",
        path: "dataSource/:dataSource/metadata/sqls/new",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/sql/new.vue")
      },
      {
        name: "tables",
        path: "dataSource/:dataSource/metadata/tables",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/table/list.vue")
      },
      {
        name: "tableImport",
        path: "dataSource/:dataSource/metadata/tables/import",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/table/import.vue")
      },
      {
        name: "tableReverse",
        path: "dataSource/:dataSource/metadata/tables/reverse",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/table/reverse.vue")
      },
      {
        name: "tableNew",
        path: "dataSource/:dataSource/metadata/tables/new",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/table/new.vue")
      },
      {
        name: "tableEdit",
        path: "dataSource/:dataSource/metadata/tables/:id",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/table/edit.vue")
      },
      {
        name: "tableIndexs",
        path: "dataSource/:dataSource/metadata/tables/:id/indexs",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/table/indexList.vue")
      },
      {
        name: "relationGraph",
        path: "dataSource/:dataSource/metadata/relations/graph",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/relation/graph.vue")
      },
      {
        name: "relations",
        path: "dataSource/:dataSource/metadata/relations",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/relation/list.vue")
      },{
        name: "relationNew",
        path: "dataSource/:dataSource/metadata/relations/new",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/relation/new.vue")
      },{
        name: "relationEdit",
        path: "dataSource/:dataSource/metadata/relations/:id",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/relation/edit.vue")
      },
      {
        name: "businessMultiImport",
        path: "dataSource/:dataSource/business/import",
        meta: { isAllowBack: true },
        component: () => import("pages/business/table/multiImport.vue")
      },
      {
        name: "business",
        path: "dataSource/:dataSource/business/:tableName",
        meta: { isAllowBack: true },
        component: () => import("pages/business/table/list.vue")
      },
      {
        name: "businessNew",
        path: "dataSource/:dataSource/business/:tableName/new",
        meta: { isAllowBack: true },
        component: () => import("pages/business/table/new.vue")
      },
      {
        name: "businessImport",
        path: "dataSource/:dataSource/business/:tableName/import",
        meta: { isAllowBack: true },
        component: () => import("pages/business/table/import.vue")
      },
      {
        name: "businessEdit",
        path: "dataSource/:dataSource/business/:tableName/:recId",
        meta: { isAllowBack: true },
        component: () => import("pages/business/table/edit.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
