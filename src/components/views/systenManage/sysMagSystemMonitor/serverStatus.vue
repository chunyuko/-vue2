<template>
  <div>
    <div class="app-title">
      <i></i>
      <p>服务器状态</p>
    </div>
    <div class="serverStatus">
      <ul>
        <li class="serverStatusLi1">在线/主用</li>
        <li class="serverStatusLi2">离线</li>
        <li class="serverStatusLi3">备用</li>
      </ul>
    </div>
    <div class="serverStatusDetail">
      <div class="serStaDetailDiv" @click="selectedServer(ServerName[0], ServerCode[0], 0)">
        <div class="serStaDetailTitle" id="Title0" style="background-color: #1a51c6">
          {{ ServerName[0] }}
        </div>
        <div class="serStaDetailContent" id="Content0" style="background-color: #132e70">
          <div
            class="serStaDetailContentDiv1"
            :class="{ color1: OnlineType1, color2: PrimaryType1 }"
          >
            <ul>
              <li class="serStaDetailContentLi1">在线/离线</li>
              <li class="serStaDetailContentLi2">主用/备用</li>
            </ul>
          </div>
          <div class="serStaDetailContentDiv2">
            <ul>
              <li class="serStaDetailContentLi3">CPU占用率:{{ CPUType1 }}%</li>
              <li class="serStaDetailContentLi4">内存占用率:{{ MemoryType1 }}%</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="serStaDetailDiv" @click="selectedServer(ServerName[1], ServerCode[1], 1)">
        <div class="serStaDetailTitle" id="Title1">{{ ServerName[1] }}</div>
        <div class="serStaDetailContent" id="Content1">
          <div
            class="serStaDetailContentDiv1"
            :class="{ color1: OnlineType2, color2: PrimaryType2 }"
          >
            <ul>
              <li class="serStaDetailContentLi1">在线/离线</li>
              <li class="serStaDetailContentLi2">主用/备用</li>
            </ul>
          </div>
          <div class="serStaDetailContentDiv2">
            <ul>
              <li class="serStaDetailContentLi3">CPU占用率:{{ CPUType2 }}%</li>
              <li class="serStaDetailContentLi4">内存占用率:{{ MemoryType2 }}%</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="serStaDetailDiv" @click="selectedServer(ServerName[2], ServerCode[2], 2)">
        <div class="serStaDetailTitle" id="Title2">{{ ServerName[2] }}</div>
        <div class="serStaDetailContent" id="Content2">
          <div
            class="serStaDetailContentDiv1"
            :class="{ color1: OnlineType3, color2: PrimaryType3 }"
          >
            <ul>
              <li class="serStaDetailContentLi1">在线/离线</li>
              <li class="serStaDetailContentLi2">主用/备用</li>
            </ul>
          </div>
          <div class="serStaDetailContentDiv2">
            <ul>
              <li class="serStaDetailContentLi3">CPU占用率:{{ CPUType3 }}%</li>
              <li class="serStaDetailContentLi4">内存占用率:{{ MemoryType3 }}%</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- <div class="serStaDetailDiv" @click="selectedServer(serverName[3], 4)">
        <div class="serStaDetailTitle" id="Title3">{{ serverName[3] }}</div>
        <div class="serStaDetailContent" id="Content3">
          <div
            class="serStaDetailContentDiv1"
            :class="{ color1: OnlineType4, color2: PrimaryType4 }"
          >
            <ul>
              <li class="serStaDetailContentLi1">在线/离线</li>
              <li class="serStaDetailContentLi2">主用/备用</li>
            </ul>
          </div>
          <div class="serStaDetailContentDiv2">
            <ul>
              <li class="serStaDetailContentLi3">CPU占用率:{{ CPUType4 }}%</li>
              <li class="serStaDetailContentLi4">内存占用率:{{ MemoryType4 }}%</li>
            </ul>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { serverRunData } from '@/views/systemManage/js/sysMagSystemMonitor'
export default {
  data() {
    return {
      //服务器名，后期应该要改
      ServerName: ['一期巡检服务器', '二期巡检服务器', '后台工作站'],
      ServerCode: ['', '', ''],
      //服务器在线状态()
      OnlineType1: true,
      OnlineType2: true,
      OnlineType3: true,
      // OnlineType4: true,
      //主用还是备用
      PrimaryType1: false,
      PrimaryType2: false,
      PrimaryType3: false,
      // PrimaryType4: false,
      //cpu占用率
      CPUType1: '',
      CPUType2: '',
      CPUType3: '',
      // CPUType4: '',
      //内存占用率
      MemoryType1: '',
      MemoryType2: '',
      MemoryType3: '',
      // MemoryType4: '',
    }
  },
  methods: {
    //改变右下角标题，以及选中后的状态
    selectedServer(name, ServerCode, num) {
      const _this = this
      // 调用事件
      _this.$bus.$emit('changeServerName', name, ServerCode)
      for (let i = 0; i < this.ServerName.length; i++) {
        let Title = 'Title' + i
        let Content = 'Content' + i
        Title = document.getElementById(Title)
        Content = document.getElementById(Content)
        if (i === num) {
          Title.style.backgroundColor = '#1a51c6'
          Content.style.backgroundColor = '#132e70'
        } else {
          Title.style.backgroundColor = '#2c53a5'
          Content.style.backgroundColor = '#05112e'
        }
      }
    },
    endData(value) {
      const returnData = {}
      if (value.OnlinState === '1') {
        returnData.OnlinState = false
      } else {
        returnData.OnlinState = true
      }
      if (value.PrimaryState === '1') {
        returnData.PrimaryState = false
      } else {
        returnData.PrimaryState = true
      }
      return returnData
    },
  },
  async mounted() {
    //初始化数据
    const res = await serverRunData()
    let resData = {}
    for (const value of res) {
      switch (value.ServerName) {
        case '一期巡检服务器':
          resData = this.endData(value)
          console.log(resData, 'resData')
          this.OnlineType1 = resData.OnlinState
          this.PrimaryType1 = resData.PrimaryState
          this.CPUType1 = value.CPU
          this.MemoryType1 = value.Memory
          this.ServerCode[0] = value.ServerCode
          break
        case '二期巡检服务器':
          resData = this.endData(value)
          this.OnlineType2 = resData.OnlinState
          this.PrimaryType2 = resData.PrimaryState
          this.CPUType2 = value.CPU
          this.MemoryType2 = value.Memory
          this.ServerCode[1] = value.ServerCode
          break
        case '后台工作站':
          resData = this.endData(value)
          this.OnlineType3 = resData.OnlinState
          this.PrimaryType3 = resData.PrimaryState
          this.CPUType3 = value.CPU
          this.MemoryType3 = value.Memory
          this.ServerCode[2] = value.ServerCode
          break
        // case '4':
        //   resData = this.endData(value)
        //   this.OnlineType4 = resData.OnlinState
        //   this.PrimaryType4 = resData.PrimaryState
        //   this.CPUType4 = value.CPU
        //   this.MemoryType4 = value.Memory
        //   break
        default:
      }
    }
    this.selectedServer('一期巡检服务器', this.ServerCode[0], 0)
  },
}
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
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
}
.app-title > i {
  width: 0.3rem;
  height: 1rem;
  display: inline-block;
  background: #fff;
  margin-right: 0.5rem;
}
.app-title > p {
  margin: 0;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  font-size: 1.4rem;
  color: #fff;
  font-weight: 500;
  margin-left: 0.15rem;
}
.serverStatus {
  margin-left: 2rem;
  height: 2.2rem;
  ul {
    width: 31rem;
    padding: 0rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    li {
      font-size: 1.4rem;
      margin-left: 2.5rem;
    }
    li:before {
      content: '';
      width: 2.2rem;
      height: 2.2rem;
      display: inline-block;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 0.7rem;
    }
  }
}
.serverStatusLi1:before {
  background-color: #a4f54e;
}
.serverStatusLi2:before {
  background-color: #f54e4e;
}
.serverStatusLi3:before {
  background-color: #f5d74e;
}

.serverStatusDetail {
  margin-top: 1.5rem;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  .serStaDetailDiv {
    float: left;
    margin-left: 4.8rem;
    border: solid 0.1rem #0973d2;

    box-sizing: border-box;
    width: 24.5rem;
    height: 27rem;
    .serStaDetailTitle {
      width: 24.3rem;
      height: 5rem;
      background-color: #2c53a5;
      font-size: 2rem;
      text-align: center;
      line-height: 5rem;
    }
    .serStaDetailContent {
      border: solid 0.1rem #0973d2;
      background-color: #05112e;
      box-sizing: border-box;
      margin: 0 -0.1rem -0.1rem -0.1rem;
      width: 24.5rem;
      height: 22rem;
      .serStaDetailContentDiv1 {
        height: 9.5rem;
        ul {
          width: 18rem;
          height: 10rem;
          margin: 0 auto;
          padding: 0rem;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          li {
            font-size: 1.4rem;
            position: relative;
            padding-top: 7.5rem;
          }
          li:before {
            content: '';
            width: 2.2rem;
            height: 2.2rem;
            display: inline-block;
            border-radius: 50%;
            /*   vertical-align: middle;
            margin-right: 0.7rem; */
            position: absolute;
            top: 3.5rem;
            left: 2.6rem;
          }
        }
      }
      .serStaDetailContentDiv2 {
        margin-top: 2.5rem;
        ul {
          padding-left: 0rem;
          li {
            font-size: 1.8rem;
            color: #48a9ff;
            text-align: center;
            margin-top: 2rem;
          }
        }
      }
    }
  }
}
.serStaDetailContentLi1:before {
  background-color: #a4f54e;
}
.serStaDetailContentLi2:before {
  background-color: #a4f54e;
}

.color1 {
  .serStaDetailContentLi1:before {
    background-color: #f54e4e;
  }
}
.color2 {
  .serStaDetailContentLi2:before {
    background-color: #f5d74e;
  }
}
</style>
