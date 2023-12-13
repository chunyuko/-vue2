<template>
  <div
    class="confirmBox"
    :class="{ size1: bool1, size2: bool2, size3: bool3 }"
    @click="isSelectedConfirmBox"
  >
    <div class="headDiv">
      <div class="headDivName">
        <div class="selectedName">
          <div :class="isSelectedDevice"></div>
        </div>
        <div>{{ confirmBoxData.DeviceDesc }}</div>
      </div>
      <div>
        <button @click.stop="confirmButton" :class="headDivconfirmButton">{{ buttonDate }}</button>
      </div>
    </div>
    <div class="confirmBoxImage">
      <el-image :src="confirmBoxData.imgSrc" style="width: 100%; height: 100%">
        <div slot="error" class="image-slot" style="width: 100%; height: 100%; background: #ddd">
          <i class="el-icon-picture-outline" style="text-align: center; width: 100%"></i>
        </div>
      </el-image>
    </div>
    <div class="footDiv">
      <div>
        <div>{{ confirmBoxData.InspectionResult }}</div>
      </div>
      <div>
        <div>{{ confirmBoxData.DateTime }}</div>
      </div>
      <div>
        <button @click.stop="showDetail">详情</button>
      </div>
    </div>
  </div>
</template>

<script>
import { readByResultID } from '@/views/manageInspectionResults/js/commonFun'
export default {
  name: 'showResultConfirm',
  props: ['confirmBoxData', 'selectedSizeFrames'],
  data() {
    return {
      //bool判断是几画面选择样式
      bool1: true,
      bool2: false,
      bool3: false,
      //是否确认
      buttonDate: '确认',
      isSelected: false,
    }
  },
  methods: {
    //点击是否确认按钮
    async confirmButton() {
      if (this.confirmBoxData.IsDeal !== 1) {
        let userName = sessionStorage.getItem('account')
        userName = userName.substring(1, userName.length - 1)
        console.log(this.confirmBoxData, userName)
        const res = await readByResultID(this.confirmBoxData.ResultID, this.userName)
        if (res === 'OK') {
          this.buttonDate = '已确认'
        }
      }
    },
    //显示详情（动态组件实现失败,dialog冲突不知道为啥）
    showDetail() {
      this.$emit('colseFullView')
      this.$emit('clickDetail', this.confirmBoxData.ResultID)
    },
    //是否选中确认框（每次点击切换状态）
    isSelectedConfirmBox() {
      this.isSelected = !this.isSelected
    },
  },
  computed: {
    //确认键按钮颜色变化
    headDivconfirmButton() {
      if (this.buttonDate === '确认') {
        return 'headDivButton1'
      }
      return 'headDivButton2'
    },
    isSelectedDevice() {
      if (this.isSelected) {
        return 'isSelectedDeviceClass'
      }
      return 'noIsSelectedDeviceClass'
    },
  },
  watch: {
    selectedSizeFrames: {
      handler(newVal, oldVal) {
        if (newVal === 1) {
          this.bool1 = true
          this.bool2 = false
          this.bool3 = false
        }
        if (newVal === 4) {
          this.bool1 = false
          this.bool2 = true
          this.bool3 = false
        }
        if (newVal === 9) {
          this.bool1 = false
          this.bool2 = false
          this.bool3 = true
        }
      },
      deep: true, //深度侦听，（对象里面层的值改变了）
      immediate: true, //立即侦听（网页打开handler执行一次）
    },
    confirmBoxData: {
      handler(newVal, oldVal) {
        if (newVal.IsDeal === '1') {
          this.buttonDate = '已确认'
        } else {
          this.buttonDate = '确认'
        }
      },
      deep: true, //深度侦听，（对象里面层的值改变了）
      immediate: true, //立即侦听（网页打开handler执行一次）
    },
  },
}
</script>

<style scoped lang="scss">
//确认按钮公共样式
.headDivButton {
  width: 44px;
  height: 21px;
  border-radius: 2px;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 21px;
  letter-spacing: 0px;
  color: #ffffff;
  border: none;
}
//确认框是否显示公共样式
.isSelectedDeviceCommon {
  width: 5px;
  height: 5px;
  border: 2px #0e60af Solid;
  border-radius: 50%;
}

//没有图片时样式

.size1 {
  width: 90rem;
  height: 63.5rem;
  .confirmBoxImage {
    background-color: rgb(43, 255, 0, 0.3);
    margin: 0 auto;
    width: 86rem;
    height: 55.6rem;
    i {
      margin-top: 28%;
      font-size: 5.5rem;
    }
  }
}
.size2 {
  width: 44rem;
  height: 31rem;
  .confirmBoxImage {
    background-color: rgb(43, 255, 0, 0.3);
    margin: 0 auto;
    width: 42rem;
    height: 23.3rem;
    i {
      margin-top: 23%;
      font-size: 3.5rem;
    }
  }
}
.size3 {
  width: 28.8rem;
  height: 20.6rem;
  .confirmBoxImage {
    background-color: rgb(43, 255, 0, 0.3);
    margin: 0 auto;
    width: 26rem;
    height: 14.5rem;
    i {
      margin-top: 21%;
      font-size: 2.8rem;
    }
  }
}
.confirmBox {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  background-color: #0b3079;
  border: 0.1rem #0e5fae solid;
  color: #fff;
  margin: 0 1.5rem 1.5rem 0;
  /*  .headDiv::before,
  .headDiv::after {
    content: '';
    display: block;
  }
  .headDiv::after {
    clear: both;
  } */
  .headDiv {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 2%;
    > div {
      height: 21px;
      line-height: 21px;
    }
    .headDivName {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      .selectedName {
        width: 9px;
        height: 9px;
        border: 2px #fff Solid;
        border-radius: 50%;
        margin-top: 4px;
        margin-right: 2px;
        .isSelectedDeviceClass {
          @extend .isSelectedDeviceCommon;
          background: #0e60af;
        }
        .noIsSelectedDeviceClass {
          @extend .isSelectedDeviceCommon;
          background: #fff;
        }
      }
    }
    .headDivButton1 {
      @extend .headDivButton;
      background-color: #0c8ba6;
    }
    .headDivButton2 {
      @extend .headDivButton;
      padding: 0 1px;
      background-color: #065c6f;
    }
  }

  .footDiv {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 2%;
    button {
      float: right;
      float: right;
      width: 44px;
      height: 21px;
      background-color: #256df7;
      border-radius: 2px;
      font-family: MicrosoftYaHei;
      font-size: 12px;
      line-height: 21px;
      letter-spacing: 0px;
      color: #ffffff;
      border: none;
    }
  }
}
</style>
