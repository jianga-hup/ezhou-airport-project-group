<!--
* @description Menu 菜单
* @fileName menu.vue 用的是elemnt组件做的 点击左右两侧会有跳动，暂无影响
* @author
* @date 2024/01/29 10:41:01
!-->
<template>
  <div class="menu-backgoud pl97px pr98px">
    <div class="absolute menu-click uno-flex-y-center p-e-a">
      <img src="@/assets/images/menu/menulogo.png" class="wihi-20 mr7px" />
      <el-dropdown trigger="click" @command="handleCommand" popper-class="dropdown-menu">
        <span class="el-dropdown-link dropdown-title uno-flex-y-center">
          {{ projectName }}
          <img src="@/assets/images/menu/xlk.png" class="w-10px h-7px ml8px" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :command="e.id" v-for="(e, i) in menu" :key="i">{{ e.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="menu-title cursor-pointer z1 p-e-a" @click="handleSelect('0', ['0'])">{{ title }}</div>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      class="menu-dome pt40px"
      :ellipsis="false"
      @select="handleSelect"
    >
      <!-- <el-menu-item index="1"> 安全管理 </el-menu-item>
      <div class="flex-grow" />
      <el-sub-menu index="2" popper-class="menu-popper">
        <template #title>智慧工地</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
      </el-sub-menu> -->
    </el-menu>
    <UserInfo />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { queryAllTenantIdByLike, queryAllSonByMain, findTokenByTenant } from '@/api/home'
import UserInfo from './userInfo.vue'
import { interactiveStore } from '@/store/modules/interactive'
import mapuser from '@/config/user-map'
import { inject, ref, onMounted } from 'vue'
import { hideCAD, isLoadCAD } from '@/hooks/useProject' // 一些交互操作
import { getItem, setItem } from '@/utils/cache/cookies'

/** 下拉列表 */
interface Menu {
  name: string
  id: string
  parentId: null | string
  tenantId: string
  treeId: string
}
/** 获取全局对象 */
const global: any = inject('global')
const router = useRouter()
const title: string = import.meta.env.VITE_APP_TITLE
const interactive = interactiveStore()
const activeIndex = ref('0')
const projectName = ref('湖北交投鄂州项目群')
const menu = ref<Menu[]>([])
/** 点击菜单 */
const handleSelect = (key: string, _keyPath: string[]) => {
  // console.log(key)
  if (key === '0') {
    router.push('/')
  }
  activeIndex.value = key
}
/** 点击下拉框 */
const handleCommand = async (command: string | number | object) => {
  const list = menu.value.filter((e) => e.id === (command as string))
  const info = getItem('info')
  const { code: c1, data: d1 } = await queryAllSonByMain({
    userId: info.userId,
    userName: info.userName
  })
  // console.log(d1, 'xxx')
  if (c1 === 200 && d1.length > 0) {
    const tenantIds = d1.filter((d: { tenantId: string }) => d.tenantId === list[0].tenantId)
    if (tenantIds.length) {
      const { code, data } = await findTokenByTenant(
        {
          tenantId: tenantIds[0].tenantId,
          userId: tenantIds[0].userId
        },
        true
      )
      if (code === 200) {
        if (list[0].tenantId !== 'edgs') {
          setItem(list[0].tenantId + 'token', data)
        }
      }
    }
  }
  projectName.value = list[0].name
  interactive.state.active = list[0].tenantId
  isWHLoad(list[0].tenantId)
  if (list[0].tenantId === 'edgs') {
    isLoad() // 打开CAD
    global.$BlackHole3D.Camera.setCamLocateTo(mapuser.xmqfw, 0, 1.5)
  } else {
    isCAD()
    if (list[0].tenantId === 'ezjceq') {
      global.$BlackHole3D.Camera.setCamLocateTo(mapuser.ezjcfw, 0, 1.5)
    } else if (list[0].tenantId === 'whgkj') {
      global.$BlackHole3D.Camera.setCamLocateTo(mapuser.whfw, 0, 1.5)
    }
  }
}

/** 判断CAD打开哪些 */
const isLoad = () => {
  const bools = interactive.state.cads
  if (!bools[0] && !bools[1]) {
    isLoadCAD(global) // 打开所有CAD
  } else if (!bools[0]) {
    isLoadCAD(global, ['edgs']) // 打开鄂东CAD
  } else if (!bools[1]) {
    isLoadCAD(global, ['whgs']) // 打开武黄CAD
  }
}

/** 判断CAD隐不隐藏 */
const isCAD = () => {
  const bools = interactive.state.cads
  if (bools[0] && bools[1]) {
    hideCAD(global) // 关闭所有CAD
  } else if (bools[0]) {
    hideCAD(global, 1) // 关闭鄂东CAD
  } else if (bools[1]) {
    hideCAD(global, 2) // 关闭武黄CAD
  }
  interactive.state.cads = interactive.state.cads.fill(false)
}

/**判断航飞隐不隐藏 */
const isWHLoad = (name: string) => {
  const hfs = interactive.state.hfs
  if (name === 'edgs') {
    // 打开全部的航飞
    if (hfs[0] !== true) {
      global.$BlackHole3D.Grid.setDataSetAlpha(mapuser.hfyx, 255)
    }
  } else if (name === 'ezjceq') {
    // 保留鄂东的航飞，关闭其他的航飞
    const bimid = global.$BlackHole3D.BIM.getElemHideState(mapuser.bimid, 6208)
    if (bimid) {
      global.$BlackHole3D.BIM.setElemAlpha(mapuser.bimid, [], 255)
    }
    if (hfs[0] !== true) {
      global.$BlackHole3D.Grid.setDataSetAlpha(mapuser.hfyx, 255)
      global.$BlackHole3D.BIM.setElemAlpha(mapuser.qxid, [], 255)
      interactive.state.hfs[0] = true
    }
  } else if (name === 'whgkj') {
    // 保留武黄的航飞，关闭其他的航飞
    if (hfs[0] === true) {
      console.log('111111111', interactive.state.hfs[0])
      global.$BlackHole3D.Grid.setDataSetAlpha(mapuser.hfyx, 0)
      global.$BlackHole3D.BIM.setElemAlpha(mapuser.qxid, [], 0)
      interactive.state.hfs[0] = false
    }
  }
}

/**初始化 */
const init = async () => {
  const res = await queryAllTenantIdByLike({ tenantId: 'edgs' })
  // console.log(res, 'res')
  if (res.code === 200) {
    menu.value = res.data
    projectName.value = res.data[0].name ?? '湖北交投鄂州项目群'
  }
}

onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">
.menu-backgoud {
  width: 100%;
  height: 120px;
  background: url('@/assets/images/menu/menu_background.png');
  background-size: 100% 100%;
  position: fixed;
  z-index: 10;
  pointer-events: none;
  .menu-title {
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
    font-weight: 400;
    font-size: 38px;
    background: linear-gradient(0deg, #60a9ff 0%, #ffffff 78%);
    text-transform: none;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -100%);
  }
  .menu-dome {
    background-color: transparent;
    border-bottom: none;
    .el-menu-item {
      font-size: 24px;
      font-family: PangMenZhengDao, PangMenZhengDao;
      font-weight: normal;
      color: #ffffff;
      transition: color var(--el-transition-duration);
      background-color: transparent;
      &:hover {
        color: #2cb5ff;
        background-color: transparent;
      }
    }
    .el-menu-item.is-active {
      border-bottom: none;
      color: #2cb5ff;
    }
    .el-sub-menu {
      :deep(.el-sub-menu__title) {
        font-size: 24px;
        font-family: PangMenZhengDao, PangMenZhengDao;
        font-weight: normal;
        color: #ffffff;
        transition: color var(--el-transition-duration);
        background-color: transparent;
        border-bottom: none;
        .el-icon {
          display: none;
        }
      }
    }
    .el-sub-menu.is-active {
      :deep(.el-sub-menu__title) {
        border-bottom: none;
        color: #2cb5ff;
      }
    }
  }
  .menu-click {
    top: 25px;
    left: 48px;
    z-index: 2;
    .dropdown-title {
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 600;
      font-size: 18px;
      color: #ecf7fe;
      line-height: 21px;
    }
  }
}
</style>
