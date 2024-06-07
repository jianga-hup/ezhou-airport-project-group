import { type RouteRecordRaw, createRouter } from 'vue-router'
import { history } from './helper'

// 可以定义头部菜单
const Layouts = () => import('@/layouts/index.vue')

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/unmannedAerialVehicle',
    component: () => import('@/views/home/wuhuangExpressway/components/index-v1.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/',
    component: Layouts,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
        meta: {
          title: '首页'
        }
      }
    ]
  }
]

const router = createRouter({
  history,
  routes: constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router
