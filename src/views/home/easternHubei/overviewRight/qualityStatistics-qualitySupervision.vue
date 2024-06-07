<!--
* @description 质量监理
* @fileName qualityStatistics-qualitySupervision.vue
* @author
* @date 2024/01/30 16:25:59
!-->
<template>
  <div class="quality-supervision mt-18px">
    <div class="flex flex-justify-between items-center">
      <div class="unit-title">监理指令处理率统计</div>
      <div class="xq text-center" @click="detailsall">详情</div>
    </div>
    <div class="flex justify-between h-122px mt-12px w-100%">
      <template v-if="state.list.length">
        <div class="pie-item" v-for="(e, i) in state.list" :key="i">
          <PieEchart :rate="e.rate" :text="e.text" />
          <div class="flex justify-between pl-5px pr-5px">
            <span class="lable">总数:</span>
            <span class="num">{{ e.total }}</span>
          </div>
          <div class="flex justify-between mt-4px pl-5px pr-5px">
            <span class="lable">已处理:</span>
            <span class="num n1">{{ e.ycl }}</span>
          </div>
        </div>
      </template>
      <div class="uno-flex-center w-100%" v-else>
        <img src="@/assets/images/menu/zwsj.png" class="wihi-100" />
      </div>
    </div>
    <div class="unit-title mt-12px">监理监理信息</div>
    <template v-if="state.scroll.length">
      <div class="flex flex-justify-between mt-5px">
        <QualityCard :selected="selected" :item="e" v-for="(e, i) in state.card" :key="i" @cliclCard="cliclCard" />
      </div>
      <div class="mt-8px scroll-view">
        <vue-auto-scroll class="v-s-s sccolw" :steep="0.45" :list="state.scroll">
          <CardBoder v-for="(e, i) in state.scroll" :key="i" class="mt-8px">
            <div class="flex milset-content">
              <el-image
                v-if="e.image && getImg(e)"
                class="w-103px h-89px mr-8px"
                :zoom-rate="1.2"
                :max-scale="7"
                :src="getImg(e)"
                :min-scale="0.2"
                :preview-src-list="[getImg(e)]"
                :initial-index="1"
                preview-teleported
                fit="cover"
              />
              <div :class="[e.image && getImg(e) ? 'milset-item' : 'w-100%']">
                <div class="flex flex-justify-between">
                  <div class="item-title text-truncate">{{ e.title }}</div>
                  <div :class="[e.status === '已完成' ? 'ywc' : 'clz']">{{ e.status }}</div>
                </div>
                <div class="flex" :class="[e.type === '监理巡视' ? 'mt-12px' : 'mt-6px']">
                  <div class="t2">标段:</div>
                  <div class="t3 ml-4px">{{ e.contractSection }}</div>
                </div>
                <div class="mt-6px flex" v-if="e.type === '监理指令'">
                  <div class="t2">监理机构:</div>
                  <div class="t3 well ml-4px text-truncate">{{ e.supervisoryOrganization }}</div>
                </div>
                <div class="mt-6px flex" v-if="e.type === '监理旁站'">
                  <div class="t2">旁站项目:</div>
                  <div class="t3 well ml-4px text-truncate">{{ e.besideProject }}</div>
                </div>
                <div class="flex flex-justify-between" :class="[e.type === '监理巡视' ? 'mt-12px' : 'mt-6px']">
                  <div class="flex">
                    <div class="t2" v-if="e.type === '监理巡视'">巡视时间:</div>
                    <div class="t2" v-else>发起时间:</div>
                    <div class="t3 ml-4px">{{ e.date }}</div>
                  </div>
                  <div class="xqright flex items-center" @click="hadlePrew(e)">
                    详情<el-icon><DArrowRight /></el-icon>
                  </div>
                </div>
              </div>
            </div>
          </CardBoder>
        </vue-auto-scroll>
      </div>
    </template>
    <div class="uno-flex-center w-100% h-200px" v-else>
      <img src="@/assets/images/menu/zwsj.png" class="wihi-100" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import PieEchart from '../content/qualitStatisticsEchart.vue'
import QualityCard from '../content/qualityCard.vue'
import CardBoder from '../content/cardBorder.vue'
import { reactive, ref, watch } from 'vue'
import { useCardInfoStore } from '@/store/modules/cardInfo'
const infoStore = useCardInfoStore()
interface StateList {
  rate: number // 进度
  text: string // 名称
  total: number // 总数
  ycl: number // 已处理
  type: number // 类型
}
interface StateCard {
  name: string // 名称
  count: number // 统计值
  id: string // 唯一索引值
}
interface StateScroll {
  title: string // 名称
  type: string // 类型
  image?: string // 图片
  status: string // 状态
  id?: string // 唯一标识
  contractSection: string // 标段
  supervisoryOrganization?: string // 监理机构
  [attribute: string]: any
}
let saveData: StateScroll[] = [] // 保存的数据
const selected = ref<string[]>([])
const state = reactive<{ list: StateList[]; card: StateCard[]; scroll: StateScroll[] }>({
  list: [],
  card: [],
  scroll: []
})

/**  获取图表的进度数据 */
const getPielist = async (data: any) => {
  const keys: any = {
    patrolMap: '监理巡视',
    instructionMap: '监理指令',
    besideMap: '监理旁站'
  }
  const list: StateList[] = []
  const card: StateCard[] = []
  Object.keys(keys).forEach((k: string, i: number) => {
    list.push({
      text: keys[k],
      rate: parseFloat(data[k].rate),
      total: data[k].totalNum,
      ycl: data[k].finishedNum,
      type: i
    })
    card.push({
      name: `累计${keys[k]}数`,
      count: data[k].totalNum,
      id: String(i)
    })
  })
  state.list = list
  state.card = card
  selected.value = card.map((item) => item.id)
}

/** 获取监理数据列表 */
const getStatisticsList = async (data: any) => {
  // const { code, data } = await currentDaySupervisionInfo({ pageNum: 1, pageSize: 5 })
  const keys: string[] = ['patrolList', 'instructionList', 'besideList']
  // if (code === 200) {

  // }
  let list: StateScroll[] = []
  keys.map((e) => {
    list = [...list, ...data[e]]
  })
  state.scroll = list
  saveData = list
}

const names: string[] = ['监理巡视', '监理指令', '监理旁站']
/**  点击卡片返回的数据做列表展示 */
const cliclCard = (id: string) => {
  const inx: number = selected.value.indexOf(id)
  const n: string[] = []
  if (inx !== -1) {
    selected.value.splice(inx, 1)
  } else {
    selected.value.push(id)
  }
  selected.value.map((e) => {
    n.push(names[Number(e)])
  })
  state.scroll = saveData.filter((e) => n.includes(e.type))
}

/** 图片展示 */
const getImg = (item: StateScroll) => {
  const url =
    item.image &&
    JSON.parse(item.image) &&
    JSON.parse(item.image)[0] &&
    JSON.parse(item.image)[0].images &&
    JSON.parse(JSON.parse(item.image)[0].images) &&
    JSON.parse(JSON.parse(item.image)[0].images)[0] &&
    JSON.parse(JSON.parse(item.image)[0].images)[0].url
  return url
}

/** 点击详情 */
const hadlePrew = (e: StateScroll) => {
  // console.log(e, 'xxxxxx')
  const strategies = new Map([
    ['监理巡视', '监理巡视详情'],
    ['监理指令', '监理指令详情'],
    ['监理旁站', '监理旁站详情']
  ])
  const inner = strategies.get(e.type) as string
  emit('details', inner, e.id)
}

// // 初始化
// onMounted(() => {
//   getPielist()
//   getStatisticsList()
// })

watch(
  infoStore.jlinfo.info,
  () => {
    if (infoStore.jlinfo.list.length) {
      getPielist(infoStore.jlinfo.data1)
      getStatisticsList(infoStore.jlinfo.data2)
    }
  },
  { immediate: true, deep: true }
)

const emit = defineEmits(['detailsall', 'details'])
const detailsall = () => {
  emit('detailsall', 0)
}
</script>

<style scoped lang="scss">
.quality-supervision {
  .xq {
    width: 54px;
    height: 26px;
    background: linear-gradient(90deg, rgba(0, 113, 198, 0), rgba(0, 113, 198, 0.7));
    border: 1px solid rgba(0, 113, 198, 0.8);
    font-size: 14px;
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 16px;
    cursor: pointer;
    line-height: 24px;
  }
  .pie-item {
    width: 33%;
    .lable {
      font-size: 16px;
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 400;
      color: #bfe9ff;
      line-height: 19px;
    }
    .num {
      font-size: 16px;
      font-family: DIN, DIN;
      font-weight: 500;
      color: #ffffff;
      line-height: 19px;
    }
    .n1 {
      color: #43e7b6;
    }
  }
  .scroll-view {
    height: 128px;
    overflow: hidden;
    .v-s-s {
      height: 100%;
      .milset-content {
        // padding: 6px 2px 6px 6px;
        .milset-item {
          width: calc(100% - 103px - 8px);
        }
        .item-title {
          width: calc(100% - 60px);
          font-size: 16px;
          font-weight: 500;
          font-family:
            PingFang SC,
            PingFang SC;
          color: #ffffff;
          line-height: 21px;
        }
        .ywc,
        .clz {
          font-size: 16px;
          font-family:
            PingFang SC,
            PingFang SC;
          font-weight: 500;
          line-height: 19px;
        }
        .ywc {
          color: #3bd041;
        }
        .clz {
          color: #d05f3b;
        }
        .t2 {
          font-size: 16px;
          font-weight: 500;
          font-family: PingFang SC-Regular;
          color: rgba(150, 212, 255, 0.7);
        }
        .t3 {
          font-size: 16px;
          font-weight: 500;
          font-family: PingFang SC-Regular;
          color: #96d4ff;
        }
        .well {
          width: calc(100% - 80px);
        }
        .xqright {
          font-size: 16px;
          font-family:
            PingFang SC,
            PingFang SC;
          font-weight: 400;
          color: #f59a23;
          line-height: 19px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
