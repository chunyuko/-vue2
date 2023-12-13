<template>
  <div class="showDeviceStatus">
    <div class="app-title">
      <i></i>
      <p>{{ sectionName }}</p>
    </div>
    <div class="DeviceStatusDetail">
      <div class="topLeftEdgeIcon"></div>
      <div class="topRightEdgeIcon"></div>
      <div class="bottomLeftEdgeIcon"></div>
      <div class="bottomRightEdgeIcon"></div>
      <div v-for="(val, index) in data" :key="index">
        <div class="flexDiv">
          <div class="StatusDetailSpan1">
            <span>{{ val.VolLevel }}</span>
          </div>
          <div class="flexDiv2">
            <div
              v-for="(value, indexStation) in val.station"
              :key="indexStation"
              @click="jump(val.id[indexStation])"
              class="StatusDetailSpan2"
              :class="changeColor(val.color[indexStation])"
            >
              <span class="haveTips" :tips="val.OfflineNum[indexStation]">{{ value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['witchChoose', 'sectionName', 'data'],
  data() {
    return {}
  },
  methods: {
    jump(stationId) {
      let selected = ''
      if (this.witchChoose === 'GetRobotStatus') {
        selected = 'robStandingBook'
      } else {
        selected = 'StandingBook'
      }
      this.$router.push({
        name: selected,
        query: {
          stationId: stationId,
        },
      })
    },
  },
  computed: {
    changeColor() {
      return function (color) {
        if (color === 'green') {
          return 'color1'
        } else if (color === 'yellow') {
          return 'color2'
        }
        return 'color3'
      }
    },
  },
}
</script>

<style scoped lang="scss">
.color1 {
  &:before {
    background-color: #a4f54e;
  }
}
.color2 {
  &:before {
    background-color: #fffe1e;
  }
}
.color3 {
  &:before {
    background-color: #ff0000;
  }
}
.app-title {
  width: 100%;
  margin: 1rem 0;
}
.app-title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-left: 2.7rem;
}
.app-title > i {
  width: 0.3rem;
  height: 1.5rem;
  display: inline-block;
  background: #2bccff;
  margin-right: 0.5rem;
}
.app-title > p {
  margin: 0;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  font-size: 2.2rem;
  color: #fff;
  font-weight: 500;
  margin-left: 0.15rem;
}
.showDeviceStatus {
  height: 100%;
  .DeviceStatusDetail {
    caret-color: rgba(0, 0, 0, 0);
    position: relative;
    margin-top: 1.5rem;
    margin-left: 2.7rem;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 18, 63, 0.5);
    .topLeftEdgeIcon {
      position: absolute;
      border-top: 0.5rem solid #2bccff;
      border-left: 0.5rem solid #2bccff;
      height: 2.2rem;
      width: 2.2rem;
    }
    .topRightEdgeIcon {
      position: absolute;
      border-top: 0.5rem solid #2bccff;
      border-right: 0.5rem solid #2bccff;
      height: 2.2rem;
      width: 2.2rem;
      right: 0;
    }
    .bottomLeftEdgeIcon {
      position: absolute;
      border-bottom: 0.5rem solid #2bccff;
      border-left: 0.5rem solid #2bccff;
      height: 2.2rem;
      width: 2.2rem;
      bottom: 0;
    }
    .bottomRightEdgeIcon {
      position: absolute;
      border-bottom: 0.5rem solid #2bccff;
      border-right: 0.5rem solid #2bccff;
      height: 2.2rem;
      width: 2.2rem;
      right: 0;
      bottom: 0;
    }
    .flexDiv {
      display: flex;
      flex-direction: row;
      // flex-wrap: wrap;
      .StatusDetailSpan1 {
        font-size: 2rem;
        height: 3rem;
        line-height: 3rem;
        margin-left: 3rem;
        margin-top: 2rem;
      }
      .flexDiv2 {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      .StatusDetailSpan2 {
        font-size: 1.6rem;
        height: 3rem;
        line-height: 3rem;
        margin-top: 2rem;
        margin-left: 1.5rem;
      }
      .StatusDetailSpan2::before {
        content: '';
        width: 2rem;
        height: 2rem;
        display: inline-block;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 0.7rem;

        //background-color: #a4f54e;
      }
    }

    //悬浮掉线数量
    .haveTips {
      position: relative;
      cursor: pointer;
    }
    .haveTips::after {
      content: attr(tips);
      padding: 0px;
      background-color: #0538c8;
      box-shadow: 0 0 5px #0538c8;
      color: #fffe1e;
      min-width: 5em;
      max-width: 100%;
      text-align: center;
      border-radius: 5px;

      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translate(-50%, -10px);

      opacity: 0;
      transition: all 0.5s;
    }
    .haveTips:hover::after {
      opacity: 1;
    }
    .haveTips::before {
      content: '';

      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-top-color: #0538c8;

      position: absolute;
      top: -10px;
      left: calc(50% - 6px);

      opacity: 0;
      transition: all 0.5s;
    }

    .haveTips:hover::before {
      opacity: 1;
    }
  }
  .DeviceStatusDetail::before {
    content: '';
    display: block;
    background: url('@/assets/images/title/title1.png');
    width: 56rem;
    height: 2.5rem;
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    left: 0rem;
    top: -3rem;
  }
}
</style>
