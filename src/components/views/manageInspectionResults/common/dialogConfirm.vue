<template>
  <el-dialog
    title="异常数据确认"
    :visible.sync="isShowconfirmSon"
    :append-to-body="isTrue"
    class="dialogAbnormalConfirm"
    ref="dialogRef"
  >
    <div class="dialogConfirmTitle">{{ confirmDeviceName }}</div>
    <div class="dialogConfirm">
      <div class="dialogConfirmLeft">
        <el-divider>原始数据</el-divider>
        <div style="height: 3rem; width: 60.5rem; margin-top: -2rem; margin-bottom: -0.6rem">
          <!--  <button id="confirmButton1" @click="changeImage(1)">视频分析图</button>
          <button id="confirmButton2" @click="changeImage(2)">视频原图</button> -->
        </div>
        <div style="height: 28rem; width: 60.5rem">
          <el-image :src="imgSrc" class="iconError">
            <div slot="error" class="image-slot iconErrorDiv">
              <i class="el-icon-picture-outline iconErrorI"></i>
            </div>
          </el-image>
        </div>
        <el-divider>点位信息</el-divider>
        <el-form :inline="true" label-position="right" label-width="8rem">
          <el-form-item v-for="(val, index) in confirmLeftInputName" :key="index" :label="val">
            <el-input :disabled="true" v-model="confirmInputData[index]"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialogConfirmRight">
        <el-divider>实时画面</el-divider>
        <div class="video">
          <iframe
            :src="iframeSrc"
            frameborder="0"
            style="width: 100%; height: 100%"
            ref="cameraIframe"
          ></iframe>
        </div>
        <el-divider>确认结果</el-divider>
        <el-form label-position="right" label-width="8rem" :model="form" ref="ruleForm">
          <div v-for="(val, index) in form.formData" :key="index">
            <el-form-item
              :label="val.formtitle"
              :rules="val.rules"
              :prop="'formData.' + index + '.selected'"
              @change="$forceUpdate()"
            >
              <el-radio-group
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
                v-if="val.type === 2"
                v-model="val.selected"
                placeholder="请选择"
                clearable
                @change="$forceUpdate()"
                @blur="handleBlur('formData.' + index + '.selected')"
              >
                <el-option
                  v-for="(option_content, index_content) in val.formcontent"
                  :key="index_content"
                  :label="val.formcontent[index_content]"
                  :value="val.value[index_content]"
                ></el-option>
              </el-select>
              <el-input v-if="val.type === 3" v-model="val.selected"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="colseDialog">取 消</el-button>
      <el-button type="primary" @click="submitDialog">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  detailInsRes,
  submitConfirm,
  getImg,
} from '../../../../views/manageInspectionResults/js/commonFun'
export default {
  props: ['isShowconfirm', 'fatherViewName'],
  data() {
    return {
      //巡检结果的ID
      resultID: '',
      //播放实时视频iframe
      iframeSrc: '',
      //后端获取的图片，img标签中的src
      imgSrc: '',
      //处理过的CameraID,打开视频用，已经加了_0或_1
      CameraID: '',
      //后端数据
      confirmData: [],
      isTrue: true,
      //this.isShowconfirmSon确认弹窗是否开启
      isShowconfirmSon: false,
      //确认框选中设备名
      confirmDeviceName: '',
      ////确认框中input选项标题
      confirmLeftInputName: [
        '设备名称：',
        '点位名称：',
        '装置名称：',
        '安装位置：',
        '识别结果：',
        '告警等级：',
        '阈值信息：',
      ],
      //确认框中input数据显示（由confirmData提供数据）
      confirmInputData: [],
      // 表单数据
      form: {
        formData: [
          {
            type: 1,
            formtitle: '识别结果:',
            selected: '',
            formcontent: ['识别正常', '识别误报', '识别漏报'],
            value: ['0', '1', '2'],
            rules: [
              {
                required: false,
                message: '请选择识别结果',
                trigger: 'change',
              },
            ],
          },
          {
            type: 2,
            formtitle: '实际情况:',
            selected: '',
            formcontent: ['一般缺陷', '严重缺陷', '危急缺陷'],
            value: ['1', '2', '3'],
            rules: [
              {
                required: false,
                message: '请选择实际情况',
                trigger: 'change',
              },
            ],
          },
          {
            type: 3,
            formtitle: '实际值:',
            selected: '',
            rules: [
              {
                required: false,
                message: '请输入实际值',
                trigger: 'blur',
              },
            ],
          },
          {
            type: 3,
            formtitle: '情况描述:',
            selected: '',
            rules: [
              {
                required: false,
                message: '请输入情况描述',
                trigger: 'blur',
              },
            ],
          },
          {
            type: 1,
            formtitle: '异常申报:',
            formcontent: ['否', '是'],
            value: ['0', '1'],
            selected: '',
            rules: [
              {
                required: false,
                message: '请选择是否申报',
                trigger: 'change',
              },
            ],
          },
        ],
      },
      //识别结果单选框选项,第一个作为选中的，后面是选项（与数据库转换应可以按数组下标）
      identifyResultRadio: ['0', '0', '1', '2'],
      //实际情况下拉框选项
      actualSituationSelect: '',
      //实际值输入
      actualValueinput: '',
      //情况描述输入
      conditionDescription: '',
      //异常申报单选框选选项，第一个作为选中的，后面是选项（与数据库转换应可以按数组下标）
      exceptionDeclaration: ['0', '0', '1'],
      // 是否点击过详情
      renderedFalg: false,
    }
  },
  methods: {
    //将关闭的消息告诉父组件
    colseDialog() {
      const _this = this
      _this.$emit('closeConfirmdia')
    },
    //下拉框失焦验证
    handleBlur(data) {
      const _this = this
      _this.$refs.ruleForm.validateField(data)
    },
    //按确定键提交信息
    async submitDialog() {
      const _this = this
      //判断带星号的选项是否填写
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const params = {
            Result_ID: this.resultID,
            //识别结果
            AlarmType: this.form.formData[0].selected,
            // 实际情况
            DefectLevel: this.form.formData[1].selected,
            // 实际值
            Confirm_Result: this.form.formData[2].selected,
            // 情况描述
            Note: this.form.formData[3].selected,
            // 异常申报
            DeclareResult: this.form.formData[4].selected,
          }
          const res = await submitConfirm(params)
          if (res.msg === 'OK') {
            if (this.fatherViewName === 'inResConfirmAnomaly') {
              _this.$emit('ConfirmdiaOK', this.resultID, this.form.formData[3].selected)
            }
            this.$message.success('确认成功！')
          }
          _this.$emit('closeConfirmdia')
        } else {
          this.$message.error('请确保带星号的选项均已输入信息')
        }
      })
    },
    initiframe(StationID) {
      this.iframeSrc = '../../../../patrol/videomonitorforJM.html' + '?' + 'StationID=' + StationID
    },
    async showConfirmData(resultID) {
      const _this = this
      this.confirmData.length = 0
      this.confirmInputData.length = 0
      this.confirmDeviceName = ''
      this.resultID = resultID
      this.imgSrc = ''
      this.confirmData = await detailInsRes(resultID)
      console.log('this.confirmData', this.confirmData[0])
      //重置确认框可选择部分
      //识别结果
      this.form.formData[0].selected = '0'
      // 实际情况
      this.form.formData[1].selected = ''
      // 实际值
      this.form.formData[2].selected = ''
      // 情况描述
      this.form.formData[3].selected = ''
      // 异常申报
      this.form.formData[4].selected = '0'

      this.confirmDeviceName = this.confirmData[0].FirstDevDesc
      //设备名称
      this.confirmInputData[0] = this.confirmData[0].FirstDevDesc
      //点位名称
      this.confirmInputData[1] = this.confirmData[0].Device_Desc
      //装置名称
      this.confirmInputData[2] = this.confirmData[0].CameraName
      //安装位置
      this.confirmInputData[3] = this.confirmData[0].PlacePosition
      //识别结果
      this.confirmInputData[4] = decodeURIComponent(this.confirmData[0].Inspection_Result)
      //告警等级
      this.confirmInputData[5] = this.confirmData[0].Bug_Level
      //阈值信息
      this.confirmInputData[6] = this.confirmData[0].AlarmInfo
      //识别结果
      this.form.formData[0].selected = this.confirmData[0].AlarmType
      if (this.form.formData[0].selected !== '0') {
        this.form.formData[1].rules[0].required = true
        this.form.formData[2].rules[0].required = true
        this.form.formData[3].rules[0].required = true
      }
      // 实际情况
      if (this.confirmData[0].DefectLevel === '0') {
        this.form.formData[1].selected = ''
      } else {
        this.form.formData[1].selected = this.confirmData[0].DefectLevel
      }

      // 实际值
      this.form.formData[2].selected = this.confirmData[0].Confirm_Result
      // 情况描述
      this.form.formData[3].selected = decodeURIComponent(this.confirmData[0].Note)
      // 申报异常
      this.form.formData[4].selected = this.confirmData[0].DeclareResult
      //处理过的CameraID,打开视频用，已经加了_0或_1
      this.CameraID = this.confirmData[0].CameraID
      //红外或者可见光图片路径(等待一个接口)
      let imgSrc = ''
      if (this.confirmData[0].IPC_PIC_Cap) {
        imgSrc = this.confirmData[0].IPC_PIC_Cap
      }
      if (this.confirmData[0].Infrared_Cap) {
        imgSrc = this.confirmData[0].Infrared_Cap
      }
      //传图片路径获取图片数据
      const imgData = await getImg(imgSrc)
      const url = window.URL.createObjectURL(imgData)
      this.imgSrc = url
      // console.log(this.$refs.dialogRef.rendered, 'dcaoinancs')
      if (!this.renderedFalg) {
        setTimeout(this.splitVideo, 2000)
        this.renderedFalg = true
        console.log('zhe;')
      } else {
        this.splitVideo()
        console.log('li.')
      }
      setTimeout(this.openVideo, 2500)
    },
    splitVideo() {
      const _this = this
      _this.$refs.cameraIframe.contentWindow.vwsplit(1, 1)
    },
    openVideo() {
      const _this = this
      _this.$refs.cameraIframe.contentWindow.OpenVideoByDevID(this.CameraID, '', 1)
    },
    //确认弹出框选择视频原图还是视频分析图(暂时不需要了)
    changeImage(num) {
      const confirmButton1 = document.getElementById('confirmButton1')
      const confirmButton2 = document.getElementById('confirmButton2')
      //目前只改变了样式，待补充其他
      if (num === 1) {
        confirmButton1.style.backgroundColor = '#155fef'
        confirmButton2.style.backgroundColor = '#013aaa'
      }
      if (num === 2) {
        confirmButton1.style.backgroundColor = '#013aaa'
        confirmButton2.style.backgroundColor = '#155fef'
      }
    },
    resultClick(formtitle) {
      if (formtitle === '识别结果:') {
        if (this.form.formData[0].selected !== '0') {
          this.form.formData[1].rules[0].required = true
          this.form.formData[2].rules[0].required = true
          this.form.formData[3].rules[0].required = true
        } else {
          this.form.formData[1].rules[0].required = false
          this.form.formData[2].rules[0].required = false
          this.form.formData[3].rules[0].required = false
          this.$refs.ruleForm.clearValidate()
        }
      }
    },
  },
  mounted() {
    this.isShowconfirmSon = JSON.parse(JSON.stringify(this.isShowconfirm))
    // this.$refs.dialogRef.rendered = true
    // console.log(this.$refs.dialogRef.rendered, 'dcaoinancs')
  },
  watch: {
    isShowconfirm: {
      handler(newVal, oldVal) {
        this.isShowconfirmSon = newVal
      },
      immediate: false,
    },
    isShowconfirmSon: {
      handler(newVal, oldVal) {
        if (newVal === false) {
          const _this = this
          _this.$emit('closeConfirmdia')
        }
      },
      immediate: false,
    },
  },
}
</script>

<style scoped lang="scss">
.dialogAbnormalConfirm {
  :deep(.el-dialog) {
    width: 128rem;
    height: 60rem;
    margin-top: 7rem !important;
    .el-dialog__header::before {
      content: url(../../../../assets/images/common/titleicon.png);
      width: 2.4rem;
      height: 2.4rem;
      display: inline-block;
      margin-right: 1.5rem;
    }
    .el-dialog__headerbtn {
      font-size: 2.8rem;
      .el-dialog__close,
      .el-icon,
      .el-icon-close {
        color: #fff;
      }
    }
    .el-dialog__header {
      background-color: #0d60ae;
      line-height: 2.4rem;
      .el-dialog__title {
        color: #fff;
        vertical-align: top;
      }
    }
    .el-dialog__body::before,
    .el-dialog__body::after {
      content: '';
      display: block;
    }
    .el-dialog__body::after {
      clear: both;
    }
    .el-dialog__body {
      background-color: #06255d;
      .dialogConfirmTitle {
        text-align: center;
        color: #fff;
        font-size: 2.2rem;
        margin-top: -1rem;
      }
      .dialogConfirm {
        .el-divider {
          background-color: #105eae;
        }
        .el-divider__text.is-center {
          background: #105eae;
          color: #fff;
          height: 3rem;
          line-height: 3rem;
          border-radius: 1.5rem;
        }
        .dialogConfirmLeft {
          width: 49%;
          float: left;
          margin-right: 2%;
          button {
            float: right;
            background: #013aaa;
            border: 0rem;
            padding: 0;
            margin: 0;
            width: 8rem;
            height: 2.4rem;
            color: #fff;
          }
          #confirmButton2 {
            margin-right: 0.2rem;
            background: #155fef;
          }
          .iconError {
            width: 100%;
            height: 100%;
            .iconErrorDiv {
              width: 100%;
              height: 100%;
              background: #ddd;
              .iconErrorI {
                font-size: 4rem;
                text-align: center;
                width: 100%;
                margin-top: 12rem;
              }
            }
          }
          .el-input .el-input__inner {
            color: #fff;
            background: none;
            border: solid 0.1rem #4278c0;
            height: 3rem;
            width: 21rem;
          }
          .el-form-item {
            margin-bottom: 1.5rem;
          }
        }
        .dialogConfirmRight {
          .video {
            height: 28rem;
            width: 60.5rem;
            margin-top: 2.8rem;
          }
          width: 49%;
          float: left;
          .el-input .el-input__inner {
            color: #fff;
            background: none;
            border: solid 0.1rem #4278c0;
            height: 3rem;
            width: 21rem;
          }
          .el-form-item {
            margin-bottom: 1.8rem;
          }
          .el-radio__label {
            color: #fff;
          }
        }
      }
    }
    .el-dialog__footer {
      background-color: #06255d;
      height: 6rem;
      margin-top: -2rem;
    }
  }
}
</style>
