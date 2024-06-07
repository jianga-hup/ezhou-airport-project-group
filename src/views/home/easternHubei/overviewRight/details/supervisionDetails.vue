<!--
* @description 监理详情
* @fileName supervisionDetails.vue
* @author 
* @date 2024/02/28 19:54:09
!-->
<template>
  <div class="supervisionDetails">
    <PatrolTable :options="options" v-if="active === 0" @details="details" />
    <InstructionsTable :options="options" v-if="active === 1" @details="details" />
    <BystanderTable :options="options" v-if="active === 2" @details="details" />
    <ShowDetails v-if="visible" :visible="visible" :popCu="popCu" @close="visible = false" />
  </div>
</template>

<script lang="ts" setup>
import { getSectionList, selectSgOrganization } from '@/api/home'
import PatrolTable from './supervision/patrolTable.vue'
import InstructionsTable from './supervision/instructionsTable.vue'
import BystanderTable from './supervision/bystanderTable.vue'
import ShowDetails from './showDetails.vue'
import { onMounted, ref, reactive } from 'vue'
interface Props {
  active: number
}
const options = ref<Tree[]>([])
withDefaults(defineProps<Props>(), {})
interface arbitrarily {
  [key: string]: any
}
interface Tree extends arbitrarily {
  name: string
  sectionId: string
  dictName: string
  dictCode: string
}

const popCu = reactive({
  title: '',
  id: '',
  type: ''
})
const visible = ref(false)

/** 获取合同段 */
const init = async () => {
  const { data: tree } = await selectSgOrganization()
  const optionsTree: Tree[] = tree.map((i: any) => {
    i['dictName'] = i.name
    i['dictCode'] = i.sectionId
    return i
  })
  const { data: nodeList } = await getSectionList()
  const filterTree = getFilterTree(listToTree(optionsTree), nodeList)
  // console.log('filterTree', filterTree[0].children)
  if (filterTree && filterTree.length) {
    options.value = filterTree[0].children || []
  } else {
    options.value = []
  }
}
const getFilterTree = (tree: Tree[], nodeList: any[]) => {
  const valueProp = 'groupId'
  const prop = 'sectionId'
  const childrenProp = 'children'
  const valueSet = new Set(nodeList.map((node) => node[valueProp]))
  function getNode(tree: Tree[]) {
    return tree.filter((node) => {
      if (node[childrenProp] && node[childrenProp].length) {
        node[childrenProp] = getNode(node[childrenProp])
        return node[childrenProp].length > 0 || valueSet.has(node[prop])
      } else {
        return valueSet.has(node[prop])
      }
    })
  }
  return getNode(JSON.parse(JSON.stringify(tree)))
}
const listToTree = (data: Tree[]) => {
  const childrenProp = 'children'
  const map: arbitrarily = {}
  const roots: Tree[] = []
  data.forEach((i) => {
    const obj = { ...i }
    obj[childrenProp] = []
    map[i.indexId] = obj
  })
  data.forEach((item) => {
    const node = map[item.indexId]
    if (item.parentId === null || item.parentId === undefined) {
      roots.push(node)
    } else {
      const parent = map[item.parentId]
      if (parent) {
        parent[childrenProp].push(node)
      } else {
        roots.push(node)
      }
    }
  })
  cleanChildren(roots)
  return roots
}
const cleanChildren = (tree: Tree[]) => {
  const childrenProp = 'children'
  for (let i = 0; i < tree.length; i++) {
    if (tree[i][childrenProp] && tree[i][childrenProp].length < 1) {
      tree[i][childrenProp] = undefined
    } else {
      cleanChildren(tree[i][childrenProp])
    }
  }
  return tree
}
onMounted(() => {
  init()
})

/**
 * 单个详情页面
 * [组件名称, 详情标题]
 * id 唯一标识
 */
const details = (inner: string, id: string, type: string = '') => {
  popCu.title = inner
  popCu.id = id
  popCu.type = type
  visible.value = true
}
</script>

<style scoped lang="scss">
.supervisionDetails {
  padding: 45px 38px 0px 36px;
}
</style>
