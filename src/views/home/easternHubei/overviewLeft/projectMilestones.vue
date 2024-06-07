<!--
* @description 项目大事记
* @fileName projectMilestones.vue
* @author
* @date 2024/01/29 17:37:34
!-->
<template>
  <div class="project-milestones mt-20px p-e-a">
    <CardTitle :show="true" title="项目大事记" />
    <div class="project-content mt-8px" :style="{ height: height + 'px' }" v-if="state.list.length">
      <vue-auto-scroll :steep="0.45" :list="state.list">
        <CardBoder v-for="(e, i) in state.list" :key="i" class="mt-8px">
          <div class="flex milset-content">
            <el-image
              v-if="e.imgs && e.imgs.length"
              class="wihi-81 mr-6px"
              :src="e.imgs[0]"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :preview-src-list="e.imgs"
              :initial-index="1"
              preview-teleported
              fit="cover"
            />
            <div class="text">
              <div class="t1">{{ e.name }}</div>
              <div class="mt-15px flex">
                <div class="t2">发布时间:</div>
                <div class="t3 ml-4px">{{ e.updateTime }}</div>
              </div>
            </div>
          </div>
        </CardBoder>
      </vue-auto-scroll>
    </div>
    <div class="uno-flex-center w-100% h-180px" v-else>
      <img src="@/assets/images/menu/zwsj.png" class="wihi-100" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import CardBoder from '../content/cardBorder.vue'
// import { getListscreen, queryFileListByBizIds } from '@/api/home'

interface xmdsjlist {
  imgs: string[]
  id: string
  updateTime: string
  name: string
  [key: string]: any
}
interface states {
  list: xmdsjlist[]
}

interface Props {
  tenantId: string
  show: boolean
  height: number
}

withDefaults(defineProps<Props>(), {
  tenantId: '',
  show: false,
  height: 188
})

// const ids: string[] = []
const state = reactive<states>({
  list: [
    // {
    //   name: '双柳长江大桥一期土建工程总体施工组织设计顺利通过专家评审',
    //   id: '1',
    //   updateTime: '2022-08-25',
    //   imgs: ['http://59.173.239.197:1040/20240407/2C4ED659-2C0E-420A-BE44-1A0A24A59ACF.jpg']
    // },
    // {
    //   name: '双柳长江大桥一期土建工程总体施工组织设计顺利通过专家评审',
    //   id: '1',
    //   updateTime: '2022-08-25',
    //   imgs: ['http://59.173.239.197:1040/20240407/2C4ED659-2C0E-420A-BE44-1A0A24A59ACF.jpg']
    // },
    // {
    //   name: '双柳长江大桥一期土建工程总体施工组织设计顺利通过专家评审',
    //   id: '1',
    //   updateTime: '2022-08-25',
    //   imgs: ['http://59.173.239.197:1040/20240407/2C4ED659-2C0E-420A-BE44-1A0A24A59ACF.jpg']
    // },
    // {
    //   name: '双柳长江大桥一期土建工程总体施工组织设计顺利通过专家评审',
    //   id: '1',
    //   updateTime: '2022-08-25',
    //   imgs: ['http://59.173.239.197:1040/20240407/2C4ED659-2C0E-420A-BE44-1A0A24A59ACF.jpg']
    // }
  ]
})
// const loading = ref<boolean>(true)

// const init = async () => {
//   loading.value = true
//   const { code, data } = await getListscreen({
//     query: 'upload',
//     pageSize: 10,
//     pageNum: 1
//   })
//   if (code === 200) {
//     ids = data.list.map((item: { id: string }) => item.id)
//     getimgs(data.list)
//   }
// }

// const getimgs = async (arr: any[]) => {
//   const { code, data } = await queryFileListByBizIds(ids)
//   if (code == 200) {
//     arr.map((item: { imgs: string[]; id: string }) => {
//       item.imgs = []
//       data.map((e: { budataId: string; diskPath: string }) => {
//         if (e.budataId === item.id) {
//           item.imgs.push(e.diskPath)
//         }
//       })
//     })
//     state.list = arr
//     loading.value = false
//   }
// }

// 初始化加载
onMounted(() => {
  // init()
})
</script>

<style scoped lang="scss">
.project-milestones {
  .project-content {
    // height: 188px;
    overflow: hidden;
    .v-s-s {
      height: 100%;
      overflow: hidden;
    }
    .milset-content {
      .text {
        width: calc(100% - 85px);
        font-size: 16px;
        font-weight: 500;
        .t1 {
          font-family:
            PingFang SC,
            PingFang SC;
          color: #ffffff;
          line-height: 19px;
        }
        .t2 {
          font-family: PingFang SC-Regular;
          color: rgba(150, 212, 255, 0.7);
        }
        .t3 {
          font-family: PingFang SC-Regular;
          color: #96d4ff;
        }
      }
    }
  }
}
</style>
