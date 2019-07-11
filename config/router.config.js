/**
 * @author zhaowenjie
 * @email [zhaowenjie@surongtec.com]
 * @create date 2019-06-12 11:16:33
 * @modify date 2019-06-12 11:16:33
 * @desc [router 管理]
 * When your routing service is too long, you can split it into small modules
 */
const routerList = [
  // user
  {
    path: '/login',
    component: '../layouts/UserLayout',
    routes: [
      // {
      //   path: '/',
      //   redirect: '/login/index',
      // },
      {
        path: '/login',
        name: '登录',
        component: './login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      {
        name: 'list',
        icon: 'star',
        path: '/demo/list',
        component: './demo/list',
      },
      {
        path: '/',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome.tsx',
      },
    ],
  },
];

export default routerList;
