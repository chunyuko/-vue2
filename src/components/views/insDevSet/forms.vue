<template>
  <div>
    <el-form class="form" label-width="100px">
      <el-form-item v-for="(val, index) in searchDatas" :key="index" :label="val.formtitle">
        <!--下拉框-->
        <el-select
          v-if="val.type === 1"
          v-model="val.selected"
          placeholder="请选择"
          @change="stationChange(val, index)"
        >
          <el-option
            v-for="(option_content, index_content) in val.formcontent"
            :key="index_content"
            :label="val.formcontent[index_content]"
            :value="val.value[index_content]"
          >
          </el-option>
        </el-select>

        <!-- 禁用的输入框 -->
        <el-input v-if="val.type === 11" v-model="val.selected" :disabled="true" placeholder="-">
        </el-input>
        <!-- 输入框 -->
        <el-input v-if="val.type === 4" v-model="val.inputContent" placeholder=""> </el-input>
        <el-input v-if="val.type === 41" v-model="val.inputContent" placeholder="" type="number">
        </el-input>

        <!--   时间选择器 -->
        <el-col :span="11" v-if="val.type === 2">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="val.date1"
            style="width: 100%"
          >
          </el-date-picker>
        </el-col>
        <el-col class="line" :span="2" style="padding-left: 12px" v-if="val.type === 2">
          至
        </el-col>
        <el-col :span="11" v-if="val.type === 2">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="val.date2"
            style="width: 100%"
          >
          </el-date-picker>
        </el-col>

        <el-date-picker
          v-if="val.type === 3"
          type="datetime"
          placeholder="选择日期时间"
          v-model="val.date"
          style="width: 100%"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
        <!-- 级联选择器 -->
        <el-cascader
          v-if="val.type === 5"
          v-model="val.selected"
          :options="val.options"
          :show-all-levels="false"
          clearable
          filterable
          :props="{ value: 'id' }"
          popper-class="cascaderDevClass"
        ></el-cascader>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'insResultforms',
  props: ['searchDatas'],
  data() {
    return {
      searchDatasSon: [],
      form: {},
      station: {},
      rules: {
        // selected: [{ required: true, message: '111', trigger: 'change' }],
      },
    }
  },
  methods: {
    //筛选选项
    siftForm() {
      const length = this.searchDatasSon.length
      const myArray = []
      for (let i = 0; i < length; i++) {
        myArray.push(this.searchDatasSon[i].selected)
      }
      return myArray
    },
    //重置选项
    resetForm() {
      const length = this.searchDatasSon.length
      for (let i = 0; i < length; i++) {
        this.searchDatasSon[i].selected = ''
      }
    },
    // 选择变更
    stationChange(val, index) {
      // 这里是调用表格的变电站选择
      // console.log('下拉触发事件---', val.selected, index)
      if (index === 4) {
        // console.log('下拉触发事件----', val, index)
      }
      this.$emit('selectStation', val.selected, index)
    },
  },
  mounted() {
    this.searchDatasSon = this.searchDatas
    const _this = this
    _this.$bus.$on('firstStationID', function (msg) {
      _this.$emit('selectStation', msg)
    })
  },
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.el-input.is-disabled .el-input__inner {
  background: red !important;
}
:deep(.el-input__inner) {
  color: #fff;
}
</style>
