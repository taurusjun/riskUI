export default [
  {
    path: '/Rule',
    name: 'Rule',
    icon: 'smile',
    routes: [
      {
        name: 'RuleEdit',
        path: '/Rule/RuleEdit/:uuid',
        component: './Rule/RuleEdit',
      },
      {
        name: 'RuleList',
        path: '/Rule/RuleList',
        component: './Rule/RuleList',
      },
      // {
      //   name: 'RuleNew',
      //   path: '/Rule/RuleNew',
      //   component: './Rule/RuleNew',
      // },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/Strategy',
    name: 'Strategy',
    icon: 'smile',
    routes: [
      {
        name: 'Graph',
        path: '/Strategy/Graph',
        component: './Strategy/Graph',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  // {
  //   path: '/welcome',
  //   name: 'welcome',
  //   icon: 'smile',
  //   component: './Welcome',
  // },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/Rule/RuleList',
  },
  {
    component: './404',
  },
];
