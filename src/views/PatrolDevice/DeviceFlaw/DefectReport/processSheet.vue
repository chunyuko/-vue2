<template>
  <add-books-tags
    v-on="$listeners"
    :searchIs="addDatas"
    :className="wrongClss"
    :buttonShowIs="true"
    titleIs="处理单填写"
    ref="addbookRef"
    >基本信息</add-books-tags
  >
</template>
<script>
export default {
  name: 'ProcessSheet',
  inject: {
    searchDatas: { default: null },
  },
  data() {
    return {
      butTopTo: 'margin-top:6rem',
      wrongClss: 'top:-2rem',
      grandfather: true,
      dateIsShow: true,
      addDatas: [
        {
          labelName: '编制时间',
          placeHolder: '请输入',
          opts: [],
          typeis: 'sigCheck',
        },
        {
          labelName: '处理单名称',
          placeHolder: '请输入',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '编制人',
          placeHolder: '请输入',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '消缺单位',
          placeHolder: '请输入',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '消缺人',
          placeHolder: '请输入',
          opts: [],
          typeis: 'text',
        },
        {
          labelName: '备注',
          placeHolder: '请输入',
          opts: [],
          typeis: 'text',
        },
      ],
    }
  },
  methods: {
    moveBtn(e) {
      console.log(e)
    },
  },
  created() {
    const fiterData = this.searchDatas.filter((item) => {
      return (
        item.labelName === '运维单位' ||
        item.labelName === '部门/班组' ||
        item.labelName === '电压等级' ||
        item.labelName === '变电站'
      )
    })
    this.addDatas = fiterData.concat(this.addDatas)
  },
}
</script>
<style scoped lang="scss"></style>
