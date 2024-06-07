<!--
* @description 工序报验
* @fileName processInspection.vue
* @author
* @date 2024/03/22 15:21:56
!-->
<template>
  <CardTitle title="工序报验" style="width: 415px" />
  <div class="processInspection pl10px pr10px">
    <el-row :gutter="10" class="form-inline mt20px">
      <el-col :span="12">
        <el-select
          v-model="form.auditStatus"
          class="seach"
          clearable
          @change="onchage"
          popper-class="popperForm"
          placeholder="全部"
        >
          <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
      <el-col :span="12">
        <el-select
          v-model="form.sgSectionId"
          class="seach"
          clearable
          @change="onchage"
          popper-class="popperForm"
          placeholder="全部"
        >
          <el-option v-for="item in bdList" :key="item.groupId" :label="item.groupName" :value="item.groupId" />
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mt20px form-inline">
      <el-col :span="12">
        <el-date-picker
          v-model="form.startTime"
          type="date"
          value-format="YYYY-MM-DD"
          style="width: 190px"
          popper-class="popperForm"
          placeholder="请选择申报时间"
          @change="onchage"
        />
      </el-col>
      <el-col :span="12">
        <el-date-picker
          v-model="form.endTime"
          type="date"
          value-format="YYYY-MM-DD"
          style="width: 190px"
          popper-class="popperForm"
          placeholder="请选择申报时间"
          @change="onchage"
        />
      </el-col>
    </el-row>
    <div class="processinner mt20px">
      <vue-auto-scroll class="h-100%" :steep="0.45" :list="list">
        <div v-for="(item, index) in list" :key="index">
          <el-row class="row">
            <el-col :span="24" class="flex">
              <div class="dzg">
                <img :src="item.url" class="dzg" />
                <div v-if="item.wfStatus >= 1" :class="`staust${item.wfStatus} ppt`">
                  {{ item.wfStatus === 2 ? '已完成' : '处理中' }}
                </div>
              </div>
              <div class="dzgw ml10px">
                <div class="sssbtextt mt5px text-truncate">{{ item.projectType }}</div>
                <div class="sssbtext mt3px text-truncate">上报时间：{{ item.creationTime }}</div>
                <div class="sssbtext mt3px text-truncate">报检部位：{{ item.positionName }}</div>
                <div class="sssbtext mt3px text-truncate">描述内容：{{ item.wfTaskName }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </vue-auto-scroll>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import { getSectionList } from '@/api/home'
interface Item {
  groupName: string
  groupId: string
  [key: string]: any
}
interface WfTask {
  projectType: string
  url: string
  creationTime: string
  positionName: string
  wfTaskName: string
  wfStatus: number
  [key: string]: any
}
const form = reactive({
  auditStatus: '',
  sgSectionId: '',
  startTime: '',
  endTime: ''
})
const statusList: { value: string; label: string }[] = [
  { value: '', label: '全部' },
  { value: '1', label: '处理中' },
  { value: '2', label: '已处理' }
]
const bdList = ref<Item[]>([])
const list = ref<WfTask[]>([])

/** 获取标段 */
const getslist = async () => {
  const { code, data } = await getSectionList()
  if (code === 200) {
    bdList.value = data
  }
}

/** 状态点击 */
const onchage = () => {}

onMounted(() => {
  getslist()
})
</script>

<style scoped lang="scss">
.processinner {
  height: 700px;
  .row {
    margin: 0 10px 20px 10px;
    background: rgba(45, 63, 75, 0.22);
    border-radius: 0px 0px 0px 0px;
    border: 1px solid rgba(81, 188, 182, 0.65);
    cursor: pointer;
  }
  .sssbtextt {
    font-size: 14px;
    font-family:
      Microsoft YaHei UI-Regular,
      Microsoft YaHei UI;
    font-weight: 400;
    color: #92cef9;
    line-height: 22px;
    letter-spacing: 1px;
  }
  .sssbtext {
    font-size: 14px;
    font-family:
      Microsoft YaHei UI-Regular,
      Microsoft YaHei UI;
    font-weight: 400;
    color: white;
    line-height: 22px;
    letter-spacing: 1px;
  }
  .dzg {
    width: 115px;
    height: 100px;
    position: relative;
  }
  .dzgw {
    width: calc(100% - 115px - 10px);
  }
  .staust1,
  .staust2,
  .staust3 {
    font-size: 14px;
    padding: 5px;
    font-family:
      PingFangSC-Medium,
      PingFang SC;
    font-weight: 500;
    color: #ffffff;
    border-bottom-right-radius: 10px;
    background: #f5a541;
    letter-spacing: 2px;
    border-radius: 0px 0px 24px 0px;
  }
  .staust3 {
    background: #43e7b6;
  }
  .ppt {
    position: absolute;
    left: 0px;
    top: 0px;
  }
}
</style>
