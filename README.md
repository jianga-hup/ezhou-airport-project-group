#### 项目描述

- 这里一个基于 Vue3、TypeScript、Vite、ECharts 框架的 " **项目** "，ui为 element-plus，代码用prettier和eslintrc维护检查，并用unocss作为css通用样式 使用 '.vue' 实现界面。

#### 技术选型

- 1 前端使用技术
  - 2.1 vue 3.4.15
  - 2.2 vue-router 4.2.5
  - 2.3 axios 1.6.5
  - 2.4 element-plus 2.5.2
  - 2.5 echarts 5.4.3
  - 2.6 pinia 2.1.7
  - 2.7 secure-ls 1.2.6
  - 2.8 unocss 0.58.3
  - 2.9 vite 5.0.11

#### 项目依赖

- **Vue3**：The latest Vue3 composition API using Vue3 + script setup
- **Element Plus**：Vue3 version of Element UI
- **Pinia**: An alternative to Vuex in Vue3
- **Vite**：Really fast
- **Vue Router**：router
- **TypeScript**：JavaScript With Syntax For Types
- **PNPM**：Faster, disk space saving package management tool
- **Scss**：Consistent with Element Plus
- **CSS variable**：Mainly controls the layout and color of the item
- **ESlint**：Code verification
- **Prettier**： Code formatting
- **Axios**: Promise based HTTP client (encapsulated)
- **UnoCSS**: Real-time atomized CSS engine with high performance and flexibility
- **Mobile Compatible**: The layout is compatible with mobile page resolution

#### 启动方式

```bash
# configure
1. installation of the recommended plugins in the .vscode directory
2. node version 18.x or 20+
3. pnpm version 8.x or latest

# install dependencies
pnpm i

# start the service
pnpm dev
```

#### 代码格式化

```bash
# stage environment
pnpm preview:stage

# prod environment
pnpm preview:prod
```

#### 部署

```bash
# build the stage environment
pnpm build:stage

# build the prod environment
pnpm build:prod
```

#### 项目结构

```shell
sgxx_standardization
├─ .editorconfig # 代码行的格式
├─ .env # 全局的环境变量
├─ .env.development # 全局的测试环境变量
├─ .env.production # 全局的生产环境变量
├─ .eslintignore # Eslint 会忽略的文件
├─ .eslintrc.cjs # Eslint语法检查
├─ .git # git地址、环境等等
├─ .gitignore # git地址、环境等等
├─ .husky # 代码提交规范
├─ .npmrc # 组件类型提示
├─ .prettierignore # Prettier 会忽略的文件
├─ index.html # 根html文件
├─ package.json # 依赖配置文件
├─ pnpm-lock.yaml # 依赖文件的版本号
├─ prettier.config.js # 代码格式
├─ public # 打包所需静态资源
├─ README.md # 说明文件
├─ src # 源代码
│  ├─ api # 所有请求
│  │  └─ login # 登陆请求
│  ├─ App.vue # 入口页面
│  ├─ assets # 静态图片和字体
│  ├─ components # 全局组件
│  │  ├─ EchartCanvas # echarts图表组件封装
│  │  │  ├─ index.ts
│  │  │  ├─ index.vue
│  │  │  └─ style # 样式文件
│  │  │     ├─ theme.js
│  │  │     └─ theme.json
│  │  └─ SvgIcon # svg组件封装
│  ├─ config # 配置文件
│  │  ├─ route.ts # 路由配置文件
│  │  └─ white-list.ts # 路由白名单配置文件
│  ├─ constants # 唯一id配置文件
│  │  └─ cache-key.ts # ls存储
│  ├─ hooks
│  │  ├─ useRouteListener.ts # 路由方法
│  │  └─ useTitle.ts # 文件名字方法
│  ├─ icons # svg组件封装
│  ├─ layouts # 头部菜单
│  ├─ main.ts # 入口文件 加载组件 初始化等
│  ├─ plugins # 加载依赖
│  │  ├─ element-plus # 加载element-plus
│  │  ├─ element-plus-icon # 加载element-plus-icon
│  │  ├─ index.ts
│  │  └─ vxe-table # 加载vxe-table
│  ├─ router # 路由
│  │  ├─ helper.ts # 路由方法
│  │  ├─ index.ts
│  │  └─ permission.ts # 路由守卫
│  ├─ store # 全局 store管理
│  ├─ styles # 公用css文件
│  ├─ utils # 全局公用方法
│  │  └─ cache # 存储数据方法
│  ├─ views
│  │  ├─ home # 首页
│  │  └─ login # 登录
│  └─ vite-env.d.ts
├─ tsconfig.json # ts语法配置
├─ tsconfig.node.json # ts node语法依赖
├─ types # 全局暴露的TS类型
│  ├─ api.d.ts # api类型
│  ├─ env.d.ts # 声明 vite 环境变量的类型
│  ├─ global-components.d.ts # 声明 全局注册的组件
│  ├─ shims-vue.d.ts # scss声明
│  ├─ vue-router.d.ts # 路由声明
│  └─ vue.d.ts # .vue声明
├─ unocss.config.ts # unocss配置
└─ vite.config.ts # vite打包配置

```
