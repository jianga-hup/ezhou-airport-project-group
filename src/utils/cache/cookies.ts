/** 统一处理 Cookie */

import CacheKey from '@/constants/cache-key'
import SecureLS from 'secure-ls'

const storage: any = new SecureLS(CacheKey)
const LSNAME = CacheKey.namespace

export const LS = {
  get(name: string) {
    return storage.get(`${LSNAME}${name}`)
  },
  set(name: string, data: any) {
    return storage.set(`${LSNAME}${name}`, data)
  },
  remove(name: string) {
    storage.remove(`${LSNAME}${name}`)
  },
  removeAll() {
    storage.removeAll()
  }
}

export function setItem(key: string, info: any) {
  return LS.set(key, info)
}

export function getItem(key: string) {
  return LS.get(key)
}

export function removeItem(key: string) {
  return LS.remove(key)
}

export function removeAll() {
  LS.removeAll()
  localStorage.clear()
}
