<template>
  <div>
    <el-tree
      :data="treeDataSon"
      :show-checkbox="showCheckbox"
      node-key="id"
      :default-expanded-keys="defaultExpandKeys"
      :props="defaultProps"
      ref="tree"
    >
    </el-tree>
  </div>
</template>

<script>
export default {
  inject: ['menuTreeData'],
  data() {
    return {
      //不改变爷组件保存原始数据，应对不同用户类型的改变
      treeData: [],
      //是否有多选框
      showCheckbox: false,
      //默认展开节点
      defaultExpandKeys: [],
      // 展示的树的数据
      treeDataSon: [],
      //依据用户分类对选项进行禁用
      UserType: '',
      defaultProps: {
        children: 'children',
        label: 'label',
        disabled: 'disabled',
      },
    }
  },
  methods: {
    //处理后端传来的扁平树形状数据
    setTreeData(source) {
      const cloneData = JSON.parse(JSON.stringify(source)) // 对源数据深度克隆
      return cloneData.filter((self) => {
        // 循环所有项，并添加children属性
        //此处是浅拷贝，所以在判断branchArr.length > 0后，不仅self本身会添加children属性
        //如果self本身要是已经是某对象的children，那么这个某对象会在children属性中增加children属性
        const branchArr = cloneData.filter((child) => self.id === child.fId) // 返回每一项的子级数组
        branchArr.length > 0 ? (self.children = branchArr) : '' //给父级添加一个children属性，并赋值
        return self.fId === '-1' //返回第一层(第一层fid==='-1')
      })
    },
    //根据表格内容展示不同数据
    showMenuTree(row) {
      this.showCheckbox = true
      this.defaultExpandKeys = ['0']
      this.treeData = JSON.parse(JSON.stringify(this.menuTreeData.treeData))
      //根据条件选择禁用
      for (let i = 0; i < this.treeData.length - 1; i++) {
        if (!this.treeData[i].UserType.includes(row.Type)) {
          this.treeData[i].disabled = true
        }
      }
      //this.menuTreeData.treeData(为了孙组将能获得后端传来的数据，不传基本数据类型，传对象变成可响应的)
      if (this.menuTreeData.treeData.length > 0) {
        this.treeDataSon = this.setTreeData(this.treeData)
      }
    },
    //展示角色下的用户
    showPeopleTree(data, id) {
      this.showCheckbox = false
      this.defaultExpandKeys = [id]
      this.treeDataSon = this.setTreeData(data)
    },
    //选中id===0的节点
    setChecked() {
      this.$refs.tree.setChecked('0', true, true)
    },
    //获得节点
    getCheckedKeys() {
      const checkedKeys = []
      const data = this.$refs.tree.getCheckedNodes()
      for (let i = 0; i < data.length; i++) {
        if (!data[i].disabled) {
          checkedKeys.push(data[i].id)
        }
      }
      return checkedKeys
    },
    //设置节点
    setCheckedKeys(MenuList) {
      this.$refs.tree.setCheckedKeys(MenuList)
    },
  },
}
</script>

<style scoped lang="scss">
:deep(.is-disabled) + span {
  color: #9e9e9e;
}
</style>
