<template>
  <div class="headerBox">
    <!-- 左侧 国家电网logo-->
    <div class="headerLeft">
      <div id="userLogo" class="logo">
        <!-- 南方电网  -->
      </div>
    </div>

    <div class="headerMiddle">
      <span>超高压红外主站监测系统</span>
    </div>
    <div class="headerRight">
      <LayoutRowMenu></LayoutRowMenu>
    </div>
    <!-- 右侧 -->
    <div class="headerUser">
      <!-- User 用户信息 -->
      <span>用户1 | 退出</span>
    </div>
  </div>
</template>
<script>
import { resetRouter } from '@/utils/global'
import LayoutRowMenu from '../layoutMenu/rowMenu'
// import useTable from '@/views/generalInfomation/hooks/common/useStationTable'

export default {
  name: 'layoutHeader',
  components: { LayoutRowMenu },
  data: () => {
    return {
      // 面包屑数据
      breadcrumbItems: [],
      // 当前时间
      nowTime: new Date(),
      // 定时器
      timer: null,
      // 星期
      weekDay: '',
      //告警总数
      totalAlarm: '',
      //用户名
      userName: '',
    }
  },
  computed: {},
  watch: {
    $route: {
      handler: function (val) {
        this.breadcrumbProcess()
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    // 生成面包屑数据
    breadcrumbProcess() {
      const _this = this
      _this.breadcrumbItems = []
      _this.$route.matched.forEach((item) => {
        _this.breadcrumbItems.push({
          title: item.meta.title,
        })
      })
    },
    // 告警窗页面跳转
    toAlarmWindow() {
      const _this = this
      _this.$router.push({ path: '/generalInfomation/alarmWindow' })
    },
    // 获取星期
    getWeek() {
      const _this = this
      const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      const wk = new Date().getDay()
      _this.weekDay = week[wk]
    },
    // 登出
    logout() {
      const _this = this
      _this
        .$confirm('确定注销并退出系统吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        })
        .then(() => {
          // 清空 session
          _this.$sessionStorage.clear()
          // 重置 vuex
          _this.$store.commit('RESET_STATE')
          // 重置 router
          resetRouter()
          _this.$router.replace({ path: '/login' })
          // window.location.reload()
        })
    },
  },
  async mounted() {
    const _this = this
    // 获取星期
    _this.getWeek()
    // 定时器，获取时间
    this.timer = setInterval(() => {
      _this.nowTime = new Date().toLocaleString()
      _this.getWeek()
    })
    // 获取用户名
    this.userName = sessionStorage.getItem('account')
    this.userName = this.userName.substring(1, this.userName.length - 1)
    //告警总数
    const { getDevWarnTableData, _getInsWarnTableData } = useTable()
    const res1 = await _getInsWarnTableData({
      pageNow: 1,
      pageNum: 1,
      bugLevel: 0,
      needCount: 1,
    })
    const res2 = await getDevWarnTableData({
      pageNow: 1,
      pageNum: 1,
      bugLevel: 0,
      needCount: 1,
    })
    this.totalAlarm = parseInt(res1.count) + parseInt(res2.count)
  },
  beforeDestroy() {
    const _this = this
    if (_this.timer) {
      // 注销定时器
      clearInterval(_this.timer)
    }
  },
}
</script>

<style scoped lang="scss">
.headerBox {
  display: flex;
  // justify-content: space-between;
  // align-items: center;
  height: 100%;
  background: #00367a;
  background-size: cover;
  overflow: hidden;
  box-sizing: border-box;
  // padding: 0 1.5rem;

  .headerLeft {
    // flex: 1;
    height: 100%;
    width: 10%;
    display: flex;

    .logo {
      width: 100%;
      height: 100%;
      /* 后期的logo估计需要修改 */
      /* background: url("../page/img/logo.jpg") no-repeat center center; */
      background: url('@/assets/images/layout/NWLogo.png') no-repeat center center;
      background-size: 90% 50%;
    }
  }
  .headerMiddle {
    color: #ffffff;
    line-height: 66px;
    font-size: 25px;
    font-weight: 700;
    font-family: 'yahei', Arial, sans-serif;
    width: 20%;
    text-align: center;
  }
  .headerRight {
    height: 100%;
    margin-left: 15%;
    width: 45%;
    display: flex;
    align-items: center;
    // overflow: hidden;
    // justify-content: space-between;
  }
  .headerUser {
    // margin-left: 3%;
    flex: 10%;
    height: 100%;
    color: #ffffff;
    height: 100%;
    text-align: center;
    line-height: 66px;
    font-size: 15px;
  }
}
</style>
