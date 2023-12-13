<template>
  <el-dialog
    title="异常数据确认"
    :visible.sync="isShowDetailSon"
    :append-to-body="isTrue"
    class="dialogAbnormalDetail"
  >
    <div class="dialogDetailTitle">{{ detailDeviceName }}</div>
    <div class="dialogDetail">
      <div class="dialogDetailLeft">
        <el-divider>原始数据</el-divider>
        <div style="height: 3rem; width: 60.5rem; margin-top: -2rem; margin-bottom: -0.6rem"></div>
        <div style="height: 28rem; width: 60.5rem">
          <el-image :src="imgSrc" class="iconError">
            <div slot="error" class="image-slot iconErrorDiv">
              <i class="el-icon-picture-outline iconErrorI"></i>
            </div>
          </el-image>
        </div>
        <el-divider>点位信息</el-divider>
        <el-form :inline="true" label-position="right" label-width="8rem">
          <el-form-item v-for="(val, index) in detailLeftInputName" :key="index" :label="val">
            <el-input :disabled="true" v-model="detailInputData[index]"></el-input>
          </el-form-item>
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
import { detailInsRes, getImg } from '../../../../views/manageInspectionResults/js/commonFun'
export default {
  props: ['isShowDetail'],
  data() {
    return {
      //巡检结果的ID
      resultID: '',
      //播放实时视频iframe
      iframeSrc: '',
      //后端获取的图片，img标签中的src
      imgSrc: '',
      //详情后端数据
      detailData: [],
      isTrue: true,
      //this.isShowDetailSon确认弹窗是否开启
      isShowDetailSon: false,
      //确认框选中设备名
      detailDeviceName: '',
      ////确认框中input选项标题
      detailLeftInputName: [
        '设备名称：',
        '点位名称：',
        '装置名称：',
        '安装位置：',
        '识别结果：',
        '告警等级：',
        '阈值信息：',
      ],
      //确认框中input数据显示（由detailData提供数据）
      detailInputData: [],
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
    }
  },
  methods: {
    //将关闭的消息告诉父组件
    colseDialog() {
      const _this = this
      _this.$emit('closeDetaildia')
    },
    //按确定键提交信息
    async submitDialog() {
      const _this = this
      _this.$emit('closeDetaildia')
    },
    async showDetailData(resultID) {
      const _this = this
      //先清空数据和图片
      this.detailData.length = 0
      this.detailInputData.length = 0
      this.detailDeviceName = ''
      this.resultID = resultID
      this.imgSrc = ''
      this.detailData = await detailInsRes(resultID)
      this.detailDeviceName = this.detailData[0].FirstDevDesc
      //设备名称
      this.detailInputData[0] = this.detailData[0].FirstDevDesc
      //点位名称
      this.detailInputData[1] = this.detailData[0].Device_Desc
      //装置名称
      this.detailInputData[2] = this.detailData[0].CameraName
      //安装位置
      this.detailInputData[3] = this.detailData[0].PlacePosition
      //识别结果
      this.detailInputData[4] = this.detailData[0].Inspection_Result
      //告警等级
      this.detailInputData[5] = this.detailData[0].Bug_Level
      //阈值信息
      this.detailInputData[6] = this.detailData[0].AlarmInfo
      //红外或者可见光图片路径
      let imgSrc = ''
      if (this.detailData[0].IPC_PIC_Cap) {
        imgSrc = this.detailData[0].IPC_PIC_Cap
      }
      if (this.detailData[0].Infrared_Cap) {
        imgSrc = this.detailData[0].Infrared_Cap
      }
      //传图片路径获取图片数据并展示
      const imgData = await getImg(imgSrc)
      const url = window.URL.createObjectURL(imgData)
      this.imgSrc = url
    },
  },
  mounted() {
    this.isShowDetailSon = JSON.parse(JSON.stringify(this.isShowDetail))
  },
  watch: {
    isShowDetail: {
      handler(newVal, oldVal) {
        this.isShowDetailSon = newVal
      },
      immediate: false,
    },
    isShowDetailSon: {
      handler(newVal, oldVal) {
        if (newVal === false) {
          const _this = this
          _this.$emit('closeDetaildia')
        }
      },
      immediate: false,
    },
  },
}
</script>

<style scoped lang="scss">
.dialogAbnormalDetail {
  :deep(.el-dialog) {
    width: 64rem;
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
      .dialogDetailTitle {
        text-align: center;
        color: #fff;
        font-size: 2.2rem;
        margin-top: -1rem;
      }
      .dialogDetail {
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
        .dialogDetailLeft {
          width: 100%;
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
          #detailButton2 {
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
