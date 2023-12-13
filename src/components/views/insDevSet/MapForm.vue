<template>
  <div ref="mapForm">
    <el-form label-position="right" label-width="9rem" :model="form" ref="ruleForm">
      <div v-for="(val, index) in form.formData" :key="index">
        <el-form-item
          :label="val.formtitle"
          :rules="val.rules"
          :prop="'formData.' + index + '.selected'"
          @change="$forceUpdate()"
        >
          <el-radio-group
            class="formType1"
            v-if="val.type === 1"
            v-model="val.selected"
            @input="resultClick(val.formtitle)"
          >
            <el-radio
              v-for="(option_content, index_content) in val.formcontent"
              :key="index_content"
              :label="val.value[index_content]"
              >{{ val.formcontent[index_content] }}</el-radio
            >
          </el-radio-group>
          <el-select
            class="formType2"
            v-else-if="val.type === 99"
            v-model="val.selected"
            placeholder="请选择"
            @change="changeMap"
            @blur="handleBlur('formData.' + index + '.selected')"
          >
            <el-option
              v-for="(option_content, index_content) in val.formcontent"
              :key="index_content"
              :label="val.formcontent[index_content]"
              :value="val.value[index_content]"
            ></el-option>
          </el-select>
          <el-input
            class="formType3"
            v-else-if="val.type === 3"
            v-model="val.selected"
            :disabled="val.disabled"
          ></el-input>
          <el-date-picker
            class="formType4"
            v-else-if="val.type === 4"
            type="datetime"
            placeholder="选择日期"
            v-model="val.selected"
            style="width: 100%"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
          <div v-else-if="val.type === 5" class="flexFormType5">
            <el-input
              class="formType5"
              v-for="n in val.numOfInput"
              :key="n"
              v-model="val.selected[n - 1]"
              :disabled="val.disabled[n - 1]"
            ></el-input>
          </div>
        </el-form-item>
      </div>
    </el-form>
    <div class="devChangeBox">
      <div class="topTitle">
        <el-checkbox v-model="checked" @change="changeDev">检修设备</el-checkbox>
      </div>
      <div class="bottomContext">
        <el-tree ref="mapDevTree" :data="treeData" show-checkbox node-key="id" check-on-click-node>
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
import { queryAreaHintApi } from '@/service/api/views/insDevSet/getAreaInfo'
export default {
  props: ['stationID', 'stationName', 'mapImgData'],
  data() {
    return {
      //带验证的表单
      // type: 1单选； type: 2下拉框； type: 3输入框，type: 4时间选择器，type: 5多个输入框
      form: {
        formData: [
          {
            type: 3,
            formtitle: '变电站名称',
            selected: '',
            value: '',
            disabled: true,
            rules: [
              {
                required: true,
                message: '请输入变电站名称',
                trigger: 'blur',
              },
            ],
          },
          {
            type: 3,
            formtitle: '检修内容',
            selected: '',
            value: '',
            disabled: false,
            rules: [
              {
                required: true,
                message: '请输入检修内容',
                trigger: 'blur',
              },
            ],
          },
          {
            type: 4,
            formtitle: '检修时间',
            selected: '',
            rules: [
              {
                required: true,
                message: '请输入检修开始时间',
                trigger: 'blur',
              },
            ],
          },
          {
            type: 4,
            formtitle: '至',
            selected: '',
            rules: [
              {
                required: true,
                message: '请输入检修结束时间',
                trigger: 'blur',
              },
            ],
          },
          {
            type: 99,
            formtitle: '变电站地图',
            selected: '',
            formcontent: [],
            value: [],
            rules: [
              {
                required: true,
                message: '请选择地图',
                trigger: 'change',
              },
            ],
          },
          {
            type: 5,
            formtitle: '区域坐标',
            numOfInput: 4,
            selected: [],
            disabled: [true, true, true, true],
            rules: [
              {
                required: true,
                message: '请输入区域坐标',
                trigger: 'blur',
              },
            ],
          },
        ],
      },
      checked: false,
      treeData: [],
      getCoordinate: [],
      // 检修设备id
      DevStr: '',
    }
  },
  methods: {
    // 清空表单
    clearForm() {
      this.form.formData[1].selected = ''
      this.form.formData[2].selected = ''
      this.form.formData[3].selected = ''
      this.form.formData[4].selected = this.form.formData[4].value[0]
      this.$bus.$emit('changeMap', this.mapImgData[0], this.stationID)
      this.form.formData[5].selected = []
    },
    //下拉框失焦验证
    handleBlur(data) {
      const _this = this
      _this.$refs.ruleForm.validateField(data)
    },
    //检修设备全选或者全不选
    changeDev() {
      if (this.checked) {
        this.$refs.mapDevTree.setCheckedNodes(this.treeData)
        console.log(this.$refs.mapDevTree.getCheckedNodes())
      } else {
        this.$refs.mapDevTree.setCheckedNodes([])
        console.log(this.$refs.mapDevTree.getCheckedNodes())
      }
    },
    // 获取选中检修设备id
    getTreeID() {
      const data = this.$refs.mapDevTree.getCheckedNodes()
      const middleData = []
      for (const val of data) {
        middleData.push(val.id)
      }
      this.DevStr = encodeURIComponent(middleData.toString())
      return this.DevStr
    },
    changeMap(id) {
      this.form.formData[1].selected = ''
      this.form.formData[2].selected = ''
      this.form.formData[3].selected = ''
      this.form.formData[5].selected = []
      for (const val of this.mapImgData) {
        if (id === val.FirstDevMapId) {
          this.$bus.$emit('changeMap', val, this.stationID)
        }
      }
      this.$forceUpdate()
    },
  },
  watch: {
    stationID: {
      handler(newVal, oldVal) {
        this.form.formData[0].selected = this.stationName
        this.form.formData[0].value = this.stationID
      },
      immediate: true,
      deep: false,
    },
    mapImgData: {
      handler(newVal, oldVal) {
        this.form.formData[4].formcontent = []
        this.form.formData[4].value = []
        for (const val of newVal) {
          this.form.formData[4].formcontent.push(val.FirstDevMapName)
          this.form.formData[4].value.push(val.FirstDevMapId)
        }
        this.form.formData[4].selected = this.form.formData[4].value[0]
      },
      immediate: false,
      deep: true,
    },
  },
  mounted() {
    this.$bus.$on('coordinate', async (newRect) => {
      this.getCoordinate =
        newRect.x +
        ',' +
        newRect.y +
        ',' +
        '0' +
        '_' +
        (newRect.x + newRect.width) +
        ',' +
        newRect.y +
        ',' +
        '0' +
        '_' +
        newRect.x +
        ',' +
        (newRect.y + newRect.height) +
        ',' +
        '0' +
        '_' +
        (newRect.x + newRect.width) +
        ',' +
        (newRect.y + newRect.height) +
        ',' +
        '0'
      this.form.formData[5].selected = [
        `左上(x:${newRect.x} y:${newRect.y})`,
        `右上(x:${newRect.x + newRect.width} y:${newRect.y})`,
        `左下(x:${newRect.x} y:${newRect.y + newRect.height})`,
        `右下(x:${newRect.x + newRect.width} y:${newRect.y + newRect.height})`,
      ]
      this.treeData = []
      const params = {
        getType: 'GetMapDevID',
        coordinate_pixel: this.getCoordinate,
        FirstDevMapID: this.form.formData[4].selected,
      }
      const res = await queryAreaHintApi(params)
      if (res.msg) {
        if (res.msg === 'OK') {
          for (const val of res.data) {
            const MiddleData = {}
            MiddleData.id = val.DeviceID
            MiddleData.label = val.DeviceName
            this.treeData.push(MiddleData)
          }
        }
      }
    })
  },
  destroyed() {
    this.$bus.$off('coordinate')
  },
}
</script>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 1.8rem;
  // .formType1 {
  //   .el-input__inner {
  //   }
  // }
  .formType2 {
    :deep(.el-input__inner) {
      width: 26rem;
    }
  }
  .formType3 {
    :deep(.el-input__inner) {
      width: 26rem;
    }
  }
  .formType4 {
    :deep(.el-input__inner) {
      width: 26rem;
    }
  }
  .flexFormType5 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: -1rem;
    .formType5 {
      width: 15rem;
      margin-right: 1rem;
      margin-top: 1rem;
      :deep(.el-input__inner) {
        width: 15rem;
      }
    }
  }
}
.devChangeBox {
  width: 34rem;
  height: 22rem;
  margin: 0 auto;
  border: 1px #004687 solid;
  border-radius: 5px;
  .topTitle {
    height: 4rem;
    line-height: 4rem;
    background: #004687;
    :deep(.el-checkbox) {
      margin-left: 2rem;
      // .el-checkbox__inner {
      //   width: 1.8rem;
      //   height: 1.8rem;
      // }
      .el-checkbox__label {
        color: #fff;
      }
    }
  }
  .bottomContext {
    :deep(.el-tree) {
      background: none;
      height: 18rem;
      overflow: auto;
      .el-checkbox {
        display: none;
      }
      .el-tree-node__label {
        color: #8f9499;
      }
      .is-checked + .el-tree-node__label {
        color: #fff;
      }
      .el-tree-node__content {
        &:hover {
          background: none; //节点hover后的背景样式
        }
      }
      .el-tree-node:focus > .el-tree-node__content {
        background: rgba($color: #001d5a, $alpha: 0); //背景色
      }
    }
  }
}
</style>
