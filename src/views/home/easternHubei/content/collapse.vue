<!--
* @description 折叠面板
* @fileName collapse.vue
* @author
* @date 2024/03/01 15:55:05
!-->
<template>
  <el-collapse v-model="activeNames" @change="handleChange" class="mt-20px collapse">
    <el-collapse-item name="1">
      <template #title>
        <div class="uno-flex-y-center">
          <img src="@/assets/images/common/title-inco.png" width="36" height="32" />
          <div class="t1 ml-10px">{{ title }}</div>
        </div>
      </template>
      <template v-if="basicinfo">
        <div v-for="(e, i) in basics" class="flex-inline mb-10px" :key="i" :class="[e.type === 1 ? 'w-50%' : 'w-100%']">
          <span>
            <span class="t2 mr-10px">{{ e.title }}:</span>
            <span class="t3" v-if="e.value">{{ info[e.value] }}</span>
          </span>
        </div>
      </template>
      <template v-if="imgs.length">
        <div v-for="(v, i) in imgs" :key="i">
          <div class="flex mb-10px">
            <div class="w-50%">
              <span class="t2 mr-10px">桩号及部位:</span>
              <span class="t3">{{ v.pileNumber }}</span>
            </div>
            <div class="w-50%">
              <span class="t2 mr-10px">拍照时间:</span>
              <span class="t3">{{ v.shootingDate }}</span>
            </div>
          </div>
          <div class="flex flex-wrap">
            <span class="t2 w-80px mr-10px">
              <span>图片:</span>
            </span>
            <div v-for="(item, index) in v.images" :key="index">
              <div class="flex flex-col">
                <span class="t2 w-100% mr-30px">
                  <span
                    >图片描述：<span class="t2 t3">{{ item.remark }}</span></span
                  >
                </span>
                <el-image class="mr-10px wihi-100" :src="item.url" fit="contain" :preview-src-list="srcList" />
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class="file" v-if="file">
        <ul class="header flex">
          <div class="header-item w-10%">序号</div>
          <div class="header-item w-50% text-center">文件名称</div>
          <div class="header-item w-35% text-center">备注</div>
          <div class="header-item w-5% text-center">操作</div>
        </ul>
        <template v-if="fileList.length">
          <ul class="flex" v-for="(v, i) in fileList" :key="i">
            <div class="header-item w-10%">{{ i + 1 }}</div>
            <div class="header-item w-50% text-center">{{ v.fileName }}</div>
            <div class="header-item w-35% text-center">{{ v.remark }}</div>
            <div class="header-item w-5% text-center clo1" @click="handlePreviewFile(v)">查看</div>
          </ul>
        </template>
        <div v-else class="text-center header-item">暂无数据</div>
      </div>
      <slot />
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts" setup>
import { CollapseModelValue } from 'element-plus/es/components/collapse/src/collapse'
import { queryFileByFileId } from '@/api/home'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
interface basicss {
  title: string
  value: string
  type: number
}
interface infos {
  [key: string]: any
}
interface imgss {
  pileNumber: string
  shootingDate: string
  [key: string]: any
}
interface flie {
  url: string | null
  fileId: string | null
  remark: string | null
  fileName: string | null
}
interface Props {
  title: string
  basicinfo: boolean
  basics: basicss[]
  info: infos
  imgs: imgss[]
  srcList: string[]
  fileList: flie[]
  file: boolean
}
withDefaults(defineProps<Props>(), {
  basicinfo: false,
  basics: () => [],
  info: () => ({}),
  imgs: () => [],
  srcList: () => [],
  fileList: () => [],
  file: false
})

const activeNames = ref(['1'])
//可预览的文件类型
const pdfType = ['.pdf', '.xls', '.xlsx', '.doc', '.docx', '.ppt', '.pptx', '.jpg', '.png', '.txt']
const imgType = ['.jpg', '.png', '.txt']
const handleChange = (val: CollapseModelValue) => {
  console.log(val)
}

const handlePreviewFile = (v: flie) => {
  queryFileByFileId({ fileId: v.fileId as string }).then((res) => {
    if (!pdfType.includes(res.data.postfix.toLowerCase())) {
      ElMessage({
        message: '不能预览改类型文件',
        type: 'warning'
      })
      return false
    }
    if (imgType.includes(res.data.postfix.toLowerCase())) {
      // 为图片，直接在浏览器打开
      const a = document.createElement('a')
      a.href = res.data.diskPath
      a.download = res.data.fileName
      a.target = '_blank'
      a.click()
    } else if (pdfType.includes(res.data.postfix.toLowerCase())) {
      const url =
        'http://59.173.239.197:1020/' +
        'filemanage/upload/sysFileinfo/previewPDF?resource=' +
        res.data.diskPath +
        '&itemName=' +
        res.data.fileName +
        '&filename=' +
        res.data.fileName
      const url2 = encodeURI(url).replace(/\+/g, '%2B')
      window.open('http://59.173.239.197:1050/cloud/pdf/web/viewer.html?file=' + encodeURIComponent(url2))
    }
  })
}
</script>

<style scoped lang="scss">
.t1 {
  font-family:
    PingFang SC,
    PingFang SC;
  font-weight: 500;
  font-size: 20px;
  color: #e0f2fe;
  line-height: 30px;
}
.collapse {
  --el-collapse-header-bg-color: #123259;
  --el-collapse-border-color: transparent;
  --el-collapse-content-bg-color: transparent;
  :deep(.el-icon) {
    font-size: 20px;
    color: #fff;
  }
  :deep(.el-collapse-item__content) {
    padding: 20px;
    border: 1px solid #123259;
    border-top: none;
  }
}

.t2,
.t3 {
  font-family:
    PingFangSC,
    PingFang SC;
  font-weight: 400;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
}
.t3 {
  color: #ffffff;
}
.file {
  .header {
    width: 100%;
    height: 40px;
    background: rgba(76, 175, 255, 0.22);
    border: 2px solid;
    border-image: linear-gradient(
        90deg,
        rgba(1, 142, 255, 1),
        rgba(1, 142, 255, 0),
        rgba(1, 142, 255, 0),
        rgba(1, 142, 255, 1)
      )
      2 2;
  }
  .header-item {
    font-family:
      PingFangSC,
      PingFang SC;
    font-weight: 500;
    font-size: 14px;
    color: #ffffff;
    line-height: 35px;
  }
  .clo1 {
    color: #018eff;
    cursor: pointer;
  }
}
</style>
