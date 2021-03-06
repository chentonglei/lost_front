// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          path: '/user/login',
          layout: false,
          name: 'login',
          component: './user/Login',
        },
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          component: '404',
        },
      ],
    },
    {
      name: 'lost',
      path: '/lost',
      routes: [
        {
          path: '/lost',
          component: './lost/index.jsx',
        },
        {
          name: 'comment',
          hideInMenu: true,
          path: '/lost/comment',
          component: './lost/comment.jsx',
        },
      ],
    },
    {
      name: 'recruit',
      path: '/recruit',
      routes: [
        {
          path: '/recruit',
          component: './recruit/index.jsx',
        },
        {
          name: 'comment',
          hideInMenu: true,
          path: '/recruit/comment',
          component: './recruit/comment.jsx',
        },
      ],
    },
    {
      name: 'introduction',
      path: '/introduction',
      access: 'canAdmin',
      component: './introduction',
    },
    {
      name: 'school',
      path: '/school',
      access: 'canAdmin',
      component: './school',
    },
    {
      name: 'register',
      path: '/register',
      component: './register',
    },
    {
      name: 'chartimg',
      path: '/chartimg',
      access: 'canAdmin',
      routes: [
        {
          path: '/chartimg',
          redirect: '/chartimg/index.jsx',
        },
        {
          name: 'lost',
          path: '/chartimg/lost',
          component: './chartimg/index.jsx',
        },
        {
          name: 'user',
          path: '/chartimg/user',
          component: './chartimg/user.jsx',
        },
      ],
    },
    {
      name: 'admin',
      path: '/admin',
      access: 'canAdmin',
      routes: [
        {
          path: '/admin',
          redirect: '/admin/index.jsx',
        },
        {
          name: 'pwd',
          path: '/admin/pwd',
          component: './admin/index.jsx',
        },
        {
          name: 'setting',
          path: '/admin/setting',
          component: './admin/setting.jsx',
        },
        {
          name: 'add',
          path: '/admin/add',
          component: './admin/add.jsx',
        },
      ],
    },
    {
      path: '/',
      redirect: '/user/login',
    },
    {
      component: '404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh ?????????
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // ???????????????????????????
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
