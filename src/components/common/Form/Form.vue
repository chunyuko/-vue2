<script>
import { defineComponent, defineProps, toRefs, computed, ref } from 'vue'
export default defineComponent({
  name: '',
})
</script>

<script setup>
const SelectChange = []
const emits = defineEmits(['sublime'])
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  isHandle: {
    type: Boolean,
    default: true,
  },
  labelWidth: {
    type: String,
    default: '120px',
  },
  size: {
    type: String,
    default: 'medium',
  },
  searchHandle: {
    type: Array,
    default: () => [],
  },
  form: {
    type: Object,
    default: () => {},
  },
  inline: {
    type: Boolean,
    default: false,
  },
})
const { isHandle, labelWidth, size, searchHandle, inline, form, options } = toRefs(props)
const FormData = ref(null)
const rules = ref({})
//将配置转化为验证格式格式
const optionToForm = () => {
  for (const key in options.value) {
    if (options.value[key].hasOwnProperty('rules')) {
      rules.value[options.value[key].prop] = options.value[key].rules
    }
  }
  console.log(rules.value)
}
const handleCheckAllChange = (val, prop) => {
  emits(prop, val)
}
const handleCheckedCitiesChange = (prop, val) => {
  emits(prop, val)
}
// const handleCheckedCitiesChange = (item, val) => {
//   emits(item, val)
// }
const change = (value, item) => {
  if (SelectChange.indexOf(item) === -1) {
    SelectChange.push(item)
  }
  emits(item, value)
  console.log(SelectChange)
}
optionToForm()
//表单提交的验证
const sublime = () => {
  // 父组件的点击事件
  FormData.value.validate((valid) => {
    if (valid) {
      console.log('校验rule', 111)
      emits('sublime', valid)
    } else {
      return false
    }
  })
}
//表单重置函数
const reset = () => {
  FormData.value.resetFields()
}
defineExpose({
  reset,
  sublime,
})
</script>

<template>
  <div>
    <el-form
      :options="options"
      :size="size"
      :inline="inline"
      :model="form"
      :rules="rules"
      ref="FormData"
      :label-width="labelWidth"
    >
      <el-form-item
        v-for="item in options"
        :label="item.label"
        :key="item.prop"
        :prop="item.prop"
        :style="{ display: item.display }"
      >
        <!-- 输入框 -->
        <el-input
          v-if="item.type === 'Input'"
          v-model="form[item.prop]"
          :placeholder="item.placeholder ? item.placeholder : ''"
          :style="{ width: item.width }"
        ></el-input>

        <!-- 密码框 -->
        <el-input
          v-if="item.type === 'password'"
          v-model="form[item.prop]"
          :placeholder="item.placeholder"
          auto-complete="off"
          show-password
          :style="{ width: item.width }"
        ></el-input>
        <!-- 滑块 -->
        <el-slider v-if="item.type === 'Slider'" v-model="form[item.prop]"></el-slider>

        <!-- 单选 -->
        <el-radio-group v-if="item.type === 'Radio'" v-model="form[item.prop]">
          <el-radio v-for="ra in item.data" :label="ra.value" :key="ra.value">{{
            ra.label
          }}</el-radio>
        </el-radio-group>

        <!-- 组合单选按钮 -->
        <el-radio-group v-if="item.type === 'RadioRadio'" v-model="form[item.prop]">
          <!-- @change="item.change && item.change(form[item.prop])" -->
          <el-radio-button v-for="ra in item.data" :label="ra.value" :key="ra.value">{{
            ra.label
          }}</el-radio-button>
        </el-radio-group>

        <div style="display: flex; justify-content: space-around" v-if="item.type === 'selectAll'">
          <el-checkbox
            v-model="form[item.allprop]"
            @change="handleCheckAllChange(form[item.allprop], item.allprop)"
            >全选</el-checkbox
          >
          <el-checkbox-group
            v-model="form[item.prop]"
            @change="handleCheckedCitiesChange(item.prop, form[item.prop])"
          >
            <el-checkbox v-for="city in item.checkboxs" :label="city.value" :key="city.value"
              >{{ city.label }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <!-- 复选框 -->
        <el-checkbox-group
          v-if="item.type === 'Checkbox'"
          v-model="form[item.prop]"
          @change="item.change ? handleCheckedCitiesChange(item.prop, form[item.prop]) : ''"
        >
          <el-checkbox v-for="ch in item.checkboxs" :label="ch.value" :key="ch.value">{{
            ch.label
          }}</el-checkbox>
        </el-checkbox-group>

        <!-- 日期 -->
        <el-date-picker
          v-if="item.type === 'Date'"
          v-model="form[item.prop]"
          value-format="yyyy-MM-dd"
          :placeholder="item.placeholder"
        ></el-date-picker>
        <!-- @change="item.change(form[item.prop])" -->

        <!-- 时间 -->
        <el-time-select v-if="item.type === 'Time'" v-model="form[item.prop]"></el-time-select>

        <!-- 日期时间 -->
        <el-date-picker
          v-if="item.type === 'DateTime'"
          type="datetime"
          v-model="form[item.prop]"
          :placeholder="item.placeholder"
          value-format="yyyy-MM-dd hh:mm:ss"
          :disabled="item.disable ? item.disable : false"
        ></el-date-picker>
        <!-- @change="item.change(form[item.prop])" -->

        <!-- 起止时间 -->
        <el-date-picker
          v-if="item.type === 'Daterange'"
          v-model="form[item.prop]"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <!-- @change="item.change(form[item.prop])" -->

        <!-- 开关 -->
        <el-switch v-if="item.type === 'Switch'" v-model="form[item.prop]"></el-switch>
        <!-- 下拉框 -->
        <!-- $forceUpdate() 下拉刷新,修复数据改变下拉框不变的bug -->
        <el-select
          v-if="item.type === 'Select'"
          v-model="form[item.prop]"
          @visible-change="$forceUpdate()"
          @change="item.change ? change(form[item.prop], item.prop) : ''"
          :style="{ width: item.width }"
        >
          <!-- @change="item.change(form[item.prop]) ? item.change(form[item.prop]) : ''" -->
          <el-option v-for="op in item.data" :label="op.label" :value="op.value" :key="op.value">{{
            op.label
          }}</el-option>
        </el-select>

        <!-- 上传文件 -->
        <!-- <el-upload
          v-if="item.type === 'Upload'"
          v-model="form[item.prop]"
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
        >
          <img v-if="item.imageUrl" :src="item.imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> -->
      </el-form-item>
      <el-form-item class="search_input_button" v-if="isHandle">
        <el-button
          v-for="item in searchHandle"
          :key="item.label"
          :type="item.type"
          @click="item.handle()"
        >
          <span>{{ item.label }}</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
