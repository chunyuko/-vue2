<script>
import { defineComponent } from 'vue'
import { useRouter } from '@hooks/useVue'
export default defineComponent({
  name: 'kvModuleContainer',
})
</script>

<script setup>
const router = useRouter()
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})

const toStationInfo = () => {
  router.push({ path: '/generalInfomation/substationOverviewInfo' })
}
</script>

<template>
  <div class="moduleContainer">
    <div class="titleContainer">
      <div class="titleText">{{ title }}</div>
      <div class="bgImage"></div>
    </div>
    <div class="contentContainer">
      <div class="topLeftEdgeIcon"></div>
      <div class="topRightEdgeIcon"></div>
      <div class="bottomLeftEdgeIcon"></div>
      <div class="bottomRightEdgeIcon"></div>
      <div class="stationListContainer">
        <div class="stationListContent">
          <div class="stationContainer">
            <img
              src="@/assets/images/views/generalInfomation/substationOverview/houseIconWhite.png"
            />
            <!-- <img
            src="@/assets/images/views/generalInfomation/substationOverview/houseIconYellow.png"
          />
          <img src="@/assets/images/views/generalInfomation/substationOverview/houseIconRed.png" /> -->
            <div class="stationName" @click="toStationInfo">长坂坡变电站</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.moduleContainer {
  display: flex;
  flex-direction: column;

  .titleContainer {
    height: 4rem;
    position: relative;
    .titleText {
      width: 9rem;
      height: 2rem;
      font-family: 'BigruixianBlackGBV1.0';
      font-size: 2rem;
      font-weight: normal;
      font-style: italic;
      font-stretch: normal;
      line-height: 2rem;
      letter-spacing: 0rem;
      color: #ffffff;
    }
    .bgImage {
      position: absolute;
      bottom: 0;
      background: url('@/assets/images/title/title1.png');
      height: 2.5rem;
      width: 100%;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  .contentContainer {
    flex: 1;
    background-color: rgba(0, 5, 38, 0.3);
    margin-top: 1rem;
    position: relative;
    height: 0;

    .topLeftEdgeIcon {
      position: absolute;
      border-top: 0.5rem solid #2bccff;
      border-left: 0.5rem solid #2bccff;
      height: 2rem;
      width: 2rem;
    }
    .topRightEdgeIcon {
      position: absolute;
      border-top: 0.5rem solid #2bccff;
      border-right: 0.5rem solid #2bccff;
      height: 2rem;
      width: 2rem;
      right: 0;
    }
    .bottomLeftEdgeIcon {
      position: absolute;
      border-bottom: 0.5rem solid #2bccff;
      border-left: 0.5rem solid #2bccff;
      height: 2rem;
      width: 2rem;
      bottom: 0;
    }
    .bottomRightEdgeIcon {
      position: absolute;
      border-bottom: 0.5rem solid #2bccff;
      border-right: 0.5rem solid #2bccff;
      height: 2rem;
      width: 2rem;
      right: 0;
      bottom: 0;
    }
    .stationListContainer {
      padding: 2rem;
      height: 100%;
      box-sizing: border-box;
      overflow-y: auto;
      overflow-x: hidden;

      .stationListContent {
        width: calc(100% + 11.5rem);
        height: 100%;
        display: flex;
        flex-wrap: wrap;

        .stationContainer {
          width: 22.8rem;
          height: 5rem;
          background-color: #062884;
          border-radius: 1rem;
          padding-left: 1.5rem;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          box-shadow: 0 0 1rem #005dd5 inset;
          cursor: pointer;
          margin: 0 11.5rem 3.6rem 0;

          img {
            height: 2rem;
            margin-right: 1rem;
          }

          .stationName {
            font-family: MicrosoftYaHei-Bold;
            font-size: 1.8rem;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0rem;
            color: #f0f0f0;
          }
        }
      }
    }
  }
}
</style>
