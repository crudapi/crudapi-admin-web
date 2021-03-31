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
        name: "sequenceList",
        path: "metadata/sequences",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/sequence/list.vue")
      },
      {
        name: "sequenceNew",
        path: "metadata/sequences/new",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/sequence/new.vue")
      },
      {
        name: "sequenceEdit",
        path: "metadata/sequences/:id",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/sequence/edit.vue")
      },
      {
        name: "tables",
        path: "metadata/tables",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/table/list.vue")
      },
      {
        name: "tableNew",
        path: "metadata/tables/new",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/table/new.vue")
      },
      {
        name: "tableEdit",
        path: "metadata/tables/:id",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/table/edit.vue")
      },
      {
        name: "tableIndexs",
        path: "metadata/tables/:id/indexs",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/table/indexList.vue")
      },
      {
        name: "relationGraph",
        path: "metadata/relations/graph",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/relation/graph.vue")
      },
      {
        name: "relations",
        path: "metadata/relations",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/relation/list.vue")
      },{
        name: "relationNew",
        path: "metadata/relations/new",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/relation/new.vue")
      },{
        name: "relationEdit",
        path: "metadata/relations/:id",
        meta: { isAllowBack: true },
        component: () => import("pages/metadata/relation/edit.vue")
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
