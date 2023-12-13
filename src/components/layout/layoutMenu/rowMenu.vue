<template>
  <div class="menuBox">
    <!-- <el-scrollbar style="width: 100%"> -->
    <el-menu
      mode="horizontal"
      :default-active="route.path"
      router
      style="display: flex; flex-direction: row"
    >
      <Sidebar
        v-for="(item, index) in menuOptions"
        :key="index"
        :index="index.toString()"
        :item="item"
      ></Sidebar>
    </el-menu>
    <!-- </el-scrollbar> -->
    <!-- <el-select
      class="selectStyle"
      v-show="showSelect"
      v-model="stationID"
      placeholder="请选择"
      :loading="stationLoading"
    >
      <el-option
        v-for="item in stationList"
        :key="item.Station_ID"
        :value="item.Station_ID"
        :label="item.Station_Name"
      ></el-option>
    </el-select> -->
  </div>
</template>

<script>
import Sidebar from './common/sidebar.vue'
import { getAllStationApi } from '@/service/api/common/tree'

export default {
  name: 'RowMenu',
  components: { Sidebar },
  data: () => {
    return {
      // 包含变电站下拉框的路由
      hasSelectList: [
        '/generalInfomation/substationOverviewInfo',
        '/realTimeSurveillance/cameraSurveillance',
        '/realTimeSurveillance/robotSurveillance',
        '/realTimeSurveillance/inspectSurveillance',
        '/manageInspectionResults/insResVideoPlayback',
        '/insDevSet/insPosSet',
        '/dataTools/IPCPicAnalysisTool',
        '/dataTools/IFRPicAnalysisTool',
        '/dataTools/meterAnalysisTool',
        '/dataTools/audioAnalysisTool',
      ],
      // 是否显示下拉框
      showSelect: false,
      // 下拉框 loading
      stationLoading: false,
      // 下拉框数据
      stationList: [],
    }
  },
  computed: {
    // 菜单列表
    menuOptions() {
      return this.$store.state.routerSetting.sideMenuList
    },
    route() {
      return this.$route
    },
    stationID: {
      get() {
        return this.$store.state.stationID
      },
      set(val) {
        this.$store.state.stationID = val
      },
    },
  },
  watch: {
    $route: {
      handler: function (val) {
        // 监听路由，是否展示变电站下拉框
        if (this.hasSelectList.indexOf(val.fullPath) !== -1) {
          this.showSelect = true
        } else {
          this.showSelect = false
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    // 获取变电站信息
    async getStationInfo() {
      const _this = this
      _this.stationLoading = true
      const params = {
        task: 'GetStation',
      }
      const res = await getAllStationApi(params)
      // console.log(res, '获取变电站信息,有时会报错')
      if (Array.isArray(res) && res.length > 0) {
        _this.stationList = res
        _this.stationID = res[0].Station_ID //默认加载第一个变电站树
      } else {
        _this.stationList = []
      }
      _this.stationLoading = false
    },
  },
  async mounted() {
    const _this = this
    await _this.getStationInfo()
  },
}
</script>

<style scoped lang="scss">
.menuBox {
  position: relative;

  .selectStyle {
    position: absolute;
    right: 2rem;
    top: calc(50% - 1.7rem);

    :deep(.el-input__inner) {
      height: 3.4rem;
      width: 19.3rem;
    }
  }
}
</style>
