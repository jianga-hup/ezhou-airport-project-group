<!--
* @description 项目群
* @fileName projectGroup.vue
* @author
* @date 2024/04/07 14:00:18
!-->
<template>
  <div class="projectGroup">
    <MenuBtn :tabs="tabs" v-model="active" :class="['absolute top-236px p-e-a', isleft ? 'left-495px' : 'left-55px']" />
    <Legend
      :class="['absolute bottom-43px p-e-a', isleft ? 'left-495px' : 'left-55px']"
      :leng="leng"
      :active="lengactive"
      @handleCkeck="handleCkeck"
    />
    <legendBtn :isshow="isright" />
    <!-- <div class="prokectTop t-l-c z-2">
      <TopCard />
    </div> -->
    <div v-if="isleft" :class="['projectLeft z-4', { 'slide-in-left': isleft }]">
      <ProjectOverview />
      <ProjectInformation />
    </div>
    <img
      src="@/assets/images/menu/home-left.png"
      @click="isleft = !isleft"
      :class="['drawer absolute top-193px', isleft ? 'left-454px' : 'left-4px']"
    />
    <template v-if="isright">
      <div :class="['projectRight', { 'slide-in-right': isright }]" v-if="active === '0'">
        <ProgressStatistics />
        <ProjectMilestones :height="380" />
      </div>
      <div :class="['projectRight', { 'slide-in-right': isright }]" v-if="active === '1'">
        <SafetyStatistics :currentTenantId="currentTenantId" @dropdown="dropdown" />
        <SatetyHomework :currentTenantId="currentTenantId" />
        <SatetyEquipment :currentTenantId="currentTenantId" />
      </div>
      <div :class="['projectRight', { 'slide-in-right': isright }]" v-if="active === '2'">
        <WeatherMeteorological />
        <WeatherWarning />
      </div>
    </template>
    <img
      src="@/assets/images/menu/home-right.png"
      @click="isright = !isright"
      :class="['drawer absolute top-193px', isright ? 'right-454px' : 'right-4px']"
    />
    <sceneInformation :checkList="checkList" />
  </div>
</template>

<script lang="ts" setup>
// import TopCard from './components/topCard.vue' // 头部信息
import MenuBtn from './components/menuBtn.vue' // 菜单按钮
import Legend from './components/legend.vue' // 图例
import sceneInformation from './projectGroup/components/sceneInformation.vue' // 场景信息
import legendBtn from './projectGroup/legendBtn.vue' // 图例按钮
import ProjectOverview from './projectGroup/projectOverview.vue' // 项目总览
import ProjectInformation from './projectGroup/projectInformation.vue' // 项目信息
import ProgressStatistics from './projectGroup/progressStatistics.vue' // 进度统计
import ProjectMilestones from './easternHubei/overviewLeft/projectMilestones.vue' // 项目大事记
import SafetyStatistics from './projectGroup/safetyStatistics.vue' // 安全统计
import SatetyHomework from './projectGroup/satetyHomework.vue' // 作业人员统计
import SatetyEquipment from './projectGroup/satetyEquipment.vue' // 特种设备统计
import WeatherMeteorological from './projectGroup/weatherMeteorological.vue' // 实时天气
import WeatherWarning from './projectGroup/weatherWarning.vue' // 天气预警
import { monomer } from '@/utils/monomer'
import { whmonomer } from '@/utils/whmonomer'
import { ref, onMounted, nextTick } from 'vue'
const tabs = ref([
  {
    name: '进度',
    id: '0'
  },
  {
    name: '安全',
    id: '1'
  },
  {
    name: '气象',
    id: '2'
  }
])
const leng = ref([
  {
    name: '梁场',
    key: 'lc',
    count: 0
  },
  {
    name: '万能机',
    key: 'wnj',
    count: 0
  },
  {
    name: '压力机',
    key: 'ylj',
    count: 0
  },
  {
    name: '拌合站',
    key: 'bhz',
    count: 0
  },
  {
    name: '桥梁',
    key: 'ql',
    count: 0
  },
  {
    name: '互通',
    key: 'ht',
    count: 0
  },
  {
    name: '服务区',
    key: 'fwq',
    count: 0
  },
  {
    name: '隧道',
    key: 'sd',
    count: 0
  }
])
const isleft = ref(false)
const isright = ref(false)
const lengactive = leng.value.map((e) => e.key)
const active = ref('0')
const currentTenantId = ref('')
const checkList = ref<string[]>(leng.value.map((e) => e.key))

/** 图例点击 */
const handleCkeck = (arr: string[]) => {
  checkList.value = arr
}

const dropdown = (val: string) => {
  currentTenantId.value = val
}

onMounted(() => {
  nextTick(() => {
    leng.value[4].count = 37 + 15
    leng.value[5].count =
      monomer.filter((m) => m.montype === 1).length + whmonomer.filter((m) => m.montype === 1).length
    leng.value[6].count =
      monomer.filter((m) => m.montype === 3).length + whmonomer.filter((m) => m.montype === 3).length
    leng.value[7].count =
      monomer.filter((m) => m.montype === 4).length + whmonomer.filter((m) => m.montype === 4).length
  })
})
</script>

<style scoped lang="scss">
.projectGroup {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  background: url('@/assets/images/menu/bg-top.png');
  background-size: 100% 100%;
  pointer-events: none; /* 设置div不可被探测 */
  .projectLeft {
    position: absolute;
    pointer-events: auto; /* 设置div不可被探测 */
    left: 32px;
    top: 126px;
    width: 410px;
  }
  .projectRight {
    position: absolute;
    pointer-events: auto; /* 设置div不可被探测 */
    right: 32px;
    top: 126px;
    width: 410px;
  }
  .prokectTop {
    position: absolute;
    top: 123px;
  }
  .drawer {
    pointer-events: auto; /* 设置div不可被探测 */
    width: 31px;
    height: 693px;
    cursor: pointer;
  }
}
</style>
