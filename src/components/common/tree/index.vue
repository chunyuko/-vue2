<script>
import { defineComponent, ref, toRefs, shallowRef, onMounted } from 'vue'
import useEvent from './useEvent'
import useExpose from './useExpose'
import useSearch from './useSearch'
import useContextMenu from './useContextMenu'
import useHandleTreeData from './useHandleTreeData'
import useCheck from './useCheck'

export default defineComponent({
  name: 'tree',
})
</script>

<script setup>
const props = defineProps({
  // 是否开启搜索
  isSearch: {
    type: Boolean,
    default: false,
  },
  // 搜索框类型
  searchType: {
    type: Number,
    default: 1,
  },
  // 是否开启复选框
  isCheckbox: {
    type: Boolean,
    default: false,
  },
  //checkStrictly
  checkStrictly: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  // 树的数据
  // 格式(扁平化数据)：
  // [
  //   [     // 每一个数组代表一个层级，比如该层是第一层
  //     {
  //       id: ,    // id
  //       label: , // 名称
  //       fId: ,   // 父id，根节点父id为 -1
  //       level:, // 第几层级
  //     }
  //   ],
  //   [],  // 第二层
  //   [],  // 第三层
  // ]
  data: {
    type: Array,
    default() {
      return []
    }, //点位数data
  },
  cameraOpenListKeys: {
    type: Array,
    default() {
      return []
    }, //播放列表key
  },
  expandedKeyList: {
    type: Array,
    default() {
      return []
    }, //默认展开数组
  },
  /**
   * 右键菜单
   * 格式：
   * {
   *  [key]: [{  // key 为树的层级
   *    label: '', // 名称
   *    onClick: function // 点击事件
   *   }]
   * }
   */
  contextmenu: {
    type: Function,
    default() {
      return null
    },
  },
  // 是否处于加载
  loading: {
    type: Boolean,
    default: false,
  },
  // 是否选中高亮
  highlightCurrent: {
    type: Boolean,
    default: false,
  },
  // 树显示几层
  endLevel: {
    type: Number,
    default: 0,
  },
  // 无复选框的情况下，点击节点，高亮当前节点即其子节点
  highlightCurrentAndChild: {
    type: Boolean,
    default: false,
  },
  // 有复选框的情况下，是否点击节点就可选中复选框
  checkOnClickNode: {
    type: Boolean,
    default: false,
  },
  // 是否隐藏复选框，需要 isCheckbox 为 true，可以配合 checkOnClickNode 一起使用
  isHideCheckBox: {
    type: Boolean,
    default: false,
  },
  // 是否点击节点就展开或收缩节点，false 则只能点击箭头图标展开收缩
  expandOnClickNode: {
    type: Boolean,
    default: true,
  },
  cameraStyle: {
    type: Object,
    default() {
      return {}
    },
  },
})

const {
  isSearch,
  isCheckbox,
  checkStrictly,
  isDisabled,
  data,
  loading,
  endLevel,
  highlightCurrentAndChild,
  checkOnClickNode,
  isHideCheckBox,
} = toRefs(props)

/**
 * check : 复选框点击事件的回调。存在三个参数：data, node, dataArr(复选框选中的节点集合)
 * node-click : 节点被点击时的回调。存在三个参数：data，node，el, highLightDataArr(高亮的节点数组 data 集合)
 */
const emits = defineEmits(['check', 'node-click', 'iptClick', 'nodeContext'])
// console.log('9998765432   --isDisabled', isDisabled)

// 高亮的节点数组，数组内存的是节点的 key
const highLightArr = ref([])
// 高亮的节点数组的 data 集合
const highLightDataArr = shallowRef([])
// tree 的 element 对象
const treeRef = ref(null)

//处理树的数据
// const { defaultProps, treeData } = useHandleTreeData(data, endLevel)
const { defaultProps, treeData } = useHandleTreeData(data, endLevel, isDisabled)
// console.log(treeData.value[0].children, 'treeData处理后的树')

// 搜索功能
const { filterText, filterNode } = useSearch(treeRef)
const setFilterText = (dataIs) => {
  console.log(dataIs, '接收要显示的点位')
  filterText.value = dataIs[0].deviceDesc
}
const disableOrNo = ref(false)
//告警阈值修改回显 禁用树筛选
const alarmDisabled = () => {
  console.log('告警阈值修改回显 禁用树筛选')
  disableOrNo.value = true
}
// 右键菜单
const { onContextmenu } = useContextMenu(props.contextmenu, emits)
// 复选框
const { onCheck } = useCheck(emits, highLightArr, checkOnClickNode, isHideCheckBox, treeRef)
// 一些事件
const { onNodeClick } = useEvent(emits, highlightCurrentAndChild, highLightArr, highLightDataArr)
const iptClick = () => {
  emits('iptClick', true)
}

// 暴露的方法
const {
  getCurrentKey,
  getCurrentNode,
  highLightNode,
  getTreeDataByLevel,
  getCheckedNodes,
  setCheckedKeys,
  getHalfCheckedKeys,
  getCheckedKeys,
} = useExpose(treeRef, highLightArr, treeData, highlightCurrentAndChild)

defineExpose({
  // 获取当前选中的节点的 key
  getCurrentKey,
  // 获取当前选中的节点的 node
  getCurrentNode,
  // 获取当前选中的所有节点的 node
  getCheckedNodes,
  // 高亮当前选择的节点及其父节点
  highLightNode,
  // 根据 level 获取对应层级的树节点数据
  getTreeDataByLevel,
  // 通过 keys 设置勾选的节点
  setCheckedKeys,
  setFilterText,
  alarmDisabled,
  getHalfCheckedKeys,
  getCheckedKeys,
})
</script>

<template>
  <div class="treeComponent" :style="cameraStyle">
    <div class="firstSearchContainer">
      <el-input
        v-if="isSearch && searchType === 1"
        v-model="filterText"
        placeholder="搜索"
        type="text"
        clearable
        :disabled="disableOrNo"
      >
        <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
      </el-input>
    </div>
    <!-- style="width: 25rem" -->
    <div class="secondSearchContainer">
      <el-input
        v-if="isSearch && searchType === 2"
        placeholder="搜索"
        v-model="filterText"
        type="text"
        suffix-icon="el-icon-search"
        clearable
      >
      </el-input>
      <!--  style="width: 20rem" -->
    </div>
    <el-tree
      id="testTree"
      class="filter-tree"
      :class="{ hideCheckbox: isHideCheckBox && isCheckbox }"
      ref="treeRef"
      :indent="0"
      :data="treeData"
      :props="defaultProps"
      :filter-node-method="filterNode"
      @node-contextmenu="onContextmenu"
      :show-checkbox="isCheckbox"
      @check="onCheck"
      v-loading="loading"
      element-loading-background="#ffff"
      node-key="id"
      :highlight-current="highlightCurrent || highlightCurrentAndChild"
      @node-click="onNodeClick"
      :default-expanded-keys="expandedKeyList"
      :check-on-click-node="checkOnClickNode"
      :expand-on-click-node="expandOnClickNode"
      :check-strictly="checkStrictly"
    >
      <!-- default-expand-all -->
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <el-tag
          style="margin-right: 0.2rem"
          size="small"
          v-if="cameraOpenListKeys.includes(node.data.key)"
        >
          播放中
        </el-tag>
        <el-tag style="color: rgb(95, 112, 247)" size="small" v-if="node.data.state == '1'">
          在线
        </el-tag>
        <el-tag style="color: rgb(50, 51, 50)" size="small" v-if="node.data.state == '0'">
          离线
        </el-tag>
        <span
          solt-scope="{node}"
          :title="node.label"
          :class="{ highLightColor: highLightArr.includes(data.key) }"
          >{{ node.label }}</span
        >
      </span>
    </el-tree>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/theme/elementUI/blueTheme/common/inputStyle/index.scss';

:deep(.el-tree) {
  .el-tree-node.is-expanded > .el-tree-node__children {
    display: inline;
  }
  /*  .el-checkbox .el-checkbox__inner {
    // display: none;
    // background: pink;
  }
  div[role='group'] {
    //凡是有子节点的节点均有复选框（要改）（包括其子节点）
    .el-checkbox .el-checkbox__inner {
      // display: inline-block;
      // background: rgb(197, 68, 89);
    }
  } */
  .el-tree-node__content {
    font-size: 1.3rem;
  }
  .el-tree-node {
    margin-left: 8px;
    // .is-leaf + .el-checkbox .el-checkbox__inner {//方法一：这里非叶子节点不显示复选框，有一个问题：非点位的叶子节点有复选框，虽然后面使用有判断是否为点位，但是显示复选框终究是不好的
    //   //只有子节点显示复选框
    //   display: inline-block;
    // }
    // .el-checkbox .el-checkbox__inner {
    //   display: none;
    // }
  }
  .el-tree-node__content > .el-tree-node__expand-icon {
    padding: 0 !important;
  }
  .el-tree-node__children {
    overflow: visible;
  }
  .el-checkbox__input.is-disabled {
    //方法二：这里禁用节点不显示复选框
    display: none;
  }
}

.treeComponent {
  height: 740px;
  overflow: hidden;
  position: relative;
  // width: 300px;
  .filter-tree {
    margin-top: 0.5rem;
    height: calc(100% - 3.5rem);
    overflow: auto;
    font-size: 1.4rem;
    text-overflow: ellipsis;
    .highLightColor {
      color: #43cfe1;
    }

    &.hideCheckbox {
      :deep(.el-checkbox) {
        display: none;
      }
    }
  }
}

.firstSearchContainer {
  @include inputStyle1();
}

.secondSearchContainer {
  :deep(.el-input__inner) {
    background-color: transparent;
    border: 0.2rem solid #0a3f82;
    height: 3.5rem;
    line-height: 3.5rem;
    width: 20rem;
  }

  :deep(.el-input__icon) {
    line-height: 3.5rem;
  }
}
</style>
