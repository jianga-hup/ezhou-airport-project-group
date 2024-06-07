<!--
* @description 基本信息
* @fileName basicInformation.vue
* @author
* @date 2024/03/21 16:13:18
!-->
<template>
  <div class="basicInformation">
    <CardTitle title="基本信息" style="width: 415px" />
    <div class="mt10px pl10px h-150px">
      <div class="t1"><span class="t2">分项名称：</span>{{ props.info.name }}</div>
      <div class="t1 mt10px"><span class="t2">路径：</span>{{ props.info.fullPath }}</div>
    </div>
    <CardTitle title="设计信息" style="width: 415px" />
    <div class="sjxx-content mt20px">
      <div v-for="(q, inx) in list" :key="inx">
        <div class="item-gild text-truncate" :title="q.name">{{ q.name }}</div>
        <div class="sjxx-list" v-for="(e, i) in q.child" :key="i" :class="{ borTop: i > 0 }">
          <div class="sjxx-list-item flex" v-for="(item, index) in e" :key="index">
            <div class="item-name text-truncate text-center" :title="item.propertyname">{{ item.propertyname }}</div>
            <div class="item-count text-truncate" :title="String(item.value)">{{ item.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getAttribute } from '@/api/home'
import { ref, watch } from 'vue'
interface Item {
  propertyname: string
  value: string | number
  [key: string]: any
}
interface Info {
  name: string // 名称
  id: string // 唯一id
  fullPath?: string // 路径
}
interface Ite {
  name: string
  child: any[]
}
const props = withDefaults(defineProps<{ info: Info }>(), {})
const list = ref<{ name: string; child: Item[] }[]>([])

const dealData = (data: any[]) => {
  if (data.length) {
    const groupedArray = data.reduce((acc: any, item: any, index: number) => {
      if (index % 2 === 0) {
        acc.push([item])
      } else {
        acc[acc.length - 1].push(item)
      }
      return acc
    }, [])
    return groupedArray
  } else {
    return []
  }
}

const init = async () => {
  list.value = []
  const a: any[] = []
  const gilds: string[] = []
  const x: Ite[] = []
  const { code, data } = await getAttribute({ id: props.info.id })
  if (code == 200 && data.length) {
    data.map((item: any, i: number) => {
      if (Object.prototype.hasOwnProperty.call(data[i], 'glid') && item.glid !== '') {
        if (item.propertysetname == '尺寸标注') {
          a.push(item)
          gilds.push(item.glid)
        }
      }
    })
    const uniqueArr = Array.from(new Set(gilds))
    uniqueArr.map((e: string, i: number) => {
      a.map((item: any) => {
        if (item.glid === e) {
          if (x[i]) {
            x[i].child.push(item)
          } else {
            x.push({ name: e, child: [item] })
          }
        }
      })
    })
    x.map((e: Ite) => {
      e.child = dealData(e.child)
    })
    list.value = x
  }
}

watch(
  () => props.info,
  () => {
    init()
  },
  { immediate: true, deep: true }
)
</script>

<style scoped lang="scss">
.basicInformation {
  .t1 {
    font-size: 18px;
    font-family:
      PingFangSC-Regular,
      PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 24px;
    word-break: break-all; /* 允许在任何字符之后断行 */
    width: 405px;
    .t2 {
      color: #96d4ff;
    }
  }
  .item-gild {
    width: 100%;
    height: 47px;
    font-size: 14px;
    font-family:
      PingFangSC-Medium,
      PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 45px;
    padding: 0 3px;
  }
  .sjxx-content {
    padding-left: 10px;
    height: 420px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .borTop {
      border-top: none;
    }
    .sjxx-list {
      width: 100%;
      .sjxx-list-item {
        height: 47px;
        width: 100%;
        padding: 1px;
        border: 1px solid rgba(219, 239, 255, 0.2);
        .item-name {
          width: 157px;
          height: 45px;
          background: rgba(0, 54, 104, 0.5);
          font-size: 14px;
          font-family:
            PingFangSC-Medium,
            PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 45px;
          padding: 0 3px;
        }
        .item-count {
          padding: 0px 10px;
          width: calc(100% - 157px);
          font-size: 14px;
          font-family:
            PingFangSC-Regular,
            PingFang SC;
          font-weight: 400;
          color: #c7e9fd;
          line-height: 45px;
        }
      }
    }
  }
}
</style>
