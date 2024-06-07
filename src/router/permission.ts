import router from '@/router'
import isWhiteList from '@/config/white-list'
import { setItem, LS } from '@/utils/cache/cookies'
import { getAtToken } from '@/utils/index'
import { useTitle } from '@/hooks/useTitle'
// import { setRouteChange } from "@/hooks/useRouteListener"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const { setTitle } = useTitle()

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  const token = LS.get('token')
  // 判断该用户是否已经登录
  const at = getAtToken('at')
  if (at) {
    await setItem('token', at)
    window.location.replace(`${window.location.origin}${window.location.pathname}${window.location.hash.split('?')[0]}`)
    setTimeout(() => {
      window.location.reload()
    }, 100)
  } else {
    if (!token) {
      if (import.meta.env.VITE_PUBLIC_PATH !== '/edxmq/') {
        if (isWhiteList(to)) {
          next()
        } else {
          // 其他没有访问权限的页面将被重定向到登录页面
          NProgress.done()
          next({ path: '/login' })
        }
      } else {
        window.location.replace('http://kjxx.cnovit.com/zhzx#/')
      }
      return
    }
    if (to.path === '/login') {
      NProgress.done()
      return next({ path: '/' })
    }
    return next()
  }
})

router.afterEach((to) => {
  /** 用于面包屑组件 */
  // setRouteChange(to)
  setTitle(to.meta.title)
  NProgress.done()
})
