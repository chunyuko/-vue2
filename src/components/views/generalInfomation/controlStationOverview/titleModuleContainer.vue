<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'csoTitleModuleContainer',
})
</script>

<script setup>
const props = defineProps({
  // 标题名称
  label: {
    type: String,
    default: '',
  },
  // 按钮配置
  // 数组内是对象，对象存在两个属性：label(按钮名称)，onClick(按钮事件)
  btnOptions: {
    type: Array,
    default() {
      return []
    },
  },
  // 按钮不需要高亮
  notHighLight: {
    type: Boolean,
    default: false,
  },
  // 是否有背景
  isBg: {
    type: Boolean,
    default: false,
  },
  // 是否是告警窗页面
  isAlarmWindow: {
    type: Boolean,
    default: false,
  },
})
// 按钮组的 elemen 对象
const btnsRef = ref(null)
// 高亮的标签索引
const highlightIndex = ref(0)
// 按钮标签组的点击事件
const btnsClick = (index, fn) => {
  highlightIndex.value = index
  fn()
}
// 内容的 element 对象
const contentRef = ref(null)
// 标题样式
const titleStyle = ref({})
// 内容样式
const contentStyle = ref({})

// 根据内容的尺寸调整按钮组的位置
const onResize = () => {
  let rightRem = 0.2
  if (contentRef.value) {
    rightRem = (contentRef.value.clientWidth * 0.0009).toFixed(2)
  }
  titleStyle.value = {
    padding: `0 ${rightRem}rem`,
  }
  contentStyle.value = {
    padding: `0 ${rightRem}rem`,
  }
}
</script>

<template>
  <div class="csoTitleContainer">
    <div class="titleContainer" :style="titleStyle">
      <div class="labelContainer">
        <div :class="{ icon: !isAlarmWindow, 'alarm-icon': isAlarmWindow }"></div>
        <div class="label">{{ label }}</div>
      </div>
      <div class="btnsContainer" v-if="btnOptions.length > 0" ref="btnsRef">
        <div
          :class="{
            active: index === highlightIndex && !notHighLight,
            btnContainer: index !== btnOptions.length - 1,
            btnContainer1: index === btnOptions.length - 1,
          }"
          v-for="(option, index) in btnOptions"
          :key="index"
          @click="btnsClick(index, option.onClick)"
        >
          <div class="label">{{ option.label }}</div>
          <div class="outlabel" v-if="index === btnOptions.length - 1">{{ option.label }}</div>
        </div>
      </div>
      <slot name="titleRight"></slot>
    </div>
    <div
      class="contentContainer"
      ref="contentRef"
      :class="{ tableBg: isBg && !isAlarmWindow, alarmWindowBg: isBg && isAlarmWindow }"
      :style="contentStyle"
      v-resize:200="isBg ? onResize : null"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.csoTitleContainer {
  display: flex;
  height: 100%;
  flex-direction: column;

  .titleContainer {
    flex: 0 0 3rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 0.2rem 0 0.7rem;
    box-sizing: border-box;

    .labelContainer {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      margin-bottom: 0.5rem;

      .icon {
        background: url(@/assets/images/views/generalInfomation/controlStationOverview/labelIcon.png)
          no-repeat;
        background-size: 100% 100%;
        height: 2.4rem;
        width: 2.5rem;
        margin-right: 0.5rem;
      }
      .alarm-icon {
        background: url(@/assets/images/views/generalInfomation/alarmWindow/moduleTitleIcon.png)
          no-repeat;
        background-size: 100% 100%;
        width: 4.2rem;
        height: 1.1rem;
      }
      .label {
        font-family: 'MFYiHei_Noncommercial-Regular';
        font-size: 2.5rem;
        color: #f0f0f0;
        letter-spacing: 0rem;
        font-style: italic;
      }
    }
    .btnsContainer {
      display: flex;
      padding: 0 0.5rem;

      .btnContainer {
        border: 0.1rem solid #0a397f;
        color: #51c3ff;
        background-color: transparent;
        transform: skewX(-25deg);
        padding: 0 1.5rem;
        cursor: pointer;

        .label {
          transform: skewX(25deg);
        }

        &.active {
          background-color: #35dbf1;
          color: #05164c;
        }
      }

      .btnContainer1 {
        color: #51c3ff;
        background-color: transparent;
        cursor: pointer;
        padding: 0 1.5rem;
        position: relative;

        .outlabel {
          position: absolute;
          top: 0;
          z-index: 2;
          display: none;
        }

        &::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          border: 0.1rem solid #0a397f;
          border-right: 0.1rem solid transparent;
          transform: skewX(-25deg);
          z-index: 1;
        }

        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: -0.4rem;
          bottom: 0;
          left: 80%;
          border: 0.1rem solid #0a397f;
          transform: skewX(0);
          border-top: 0.1rem solid transparent;
          border-left: 0.1rem solid transparent;
        }

        &.active {
          .outlabel {
            color: #05164c;
            display: block;
          }
          &::before {
            background-color: #35dbf1;
          }
          &::after {
            background-color: #35dbf1;
          }
        }
      }
    }
  }

  .contentContainer {
    flex: 1;

    &.tableBg {
      background: url(@/assets/images/views/generalInfomation/controlStationOverview/smallTableBg.png)
        no-repeat;
      background-size: 100% 100%;
    }

    &.alarmWindowBg {
      background: url(@/assets/images/views/generalInfomation/alarmWindow/tableBg.png) no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
