<template>
  <div>
    <!-- 巡视结果全览弹出框 -->
    <el-dialog
      title="全部浏览浏览数据"
      :visible.sync="isShowFullViewSon"
      class="dialogFullView"
      :append-to-body="isTrue"
      @close="closeDialog"
    >
      <div class="dialogView">
        <div class="dialogViewLeft">
          <div>
            <div>
              <Tree
                :loading="treeLoading"
                :data="treeData"
                :isSearch="true"
                :isCheckbox="true"
                :isHideCheckBox="true"
                :checkOnClickNode="true"
                :expandOnClickNode="false"
                @check="onCheck"
                ref="pointTree"
              ></Tree>
            </div>
          </div>
        </div>
        <div class="dialogViewRight">
          <div style="position: relative; height: 7rem">
            <el-form
              :inline="true"
              label-position="right"
              label-width="6.7rem"
              style="height: 7rem"
            >
              <el-form-item
                v-for="(val, index) in fullViewInputName"
                :key="index"
                :label="val.formtitle"
              >
                <!-- 级联选择器 -->
                <el-cascader
                  v-if="val.type === 2"
                  v-model="val.selected"
                  :options="val.options"
                  :show-all-levels="false"
                  clearable
                  filterable
                  :props="{ value: 'id' }"
                  popper-class="cascaderDevClass"
                ></el-cascader>
                <!--下拉框-->
                <el-select
                  v-if="val.type === 1"
                  v-model="val.selected"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(option_content, index_content) in val.formcontent"
                    :key="index_content"
                    :label="val.formcontent[index_content]"
                    :value="val.value[index_content]"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="" style="margin-top: -1rem">
                <el-radio-group v-model="statusSelection[0]" class="statusRadio">
                  <el-radio :label="statusSelection[1]">全部</el-radio>
                  <el-radio :label="statusSelection[2]">正常</el-radio>
                  <el-radio :label="statusSelection[3]">异常</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <button class="searchButton" @click="searchClick">筛选</button>
          </div>
          <!-- 这里的n看是不是将后端传来的直接用，直接用转化下标，截取数组不用变 -->
          <div class="confirmBoxDiv">
            <confirmBox
              v-for="(val, index) in confirmBoxData"
              :key="index"
              :confirmBoxData="val"
              :selectedSizeFrames="selectedSizeFrames"
              v-bind="$attrs"
              v-on="$listeners"
              @colseFullView="colseFullView"
            ></confirmBox>
          </div>
          <div class="bodyBottom">
            <div class="left framesButton">
              <el-radio-group v-model="numberFrames[0]" @change="dataForConfirmbox">
                <el-radio-button :label="numberFrames[1]">一画面</el-radio-button>
                <el-radio-button :label="numberFrames[2]">四画面</el-radio-button>
                <el-radio-button :label="numberFrames[3]">九画面</el-radio-button>
              </el-radio-group>
            </div>
            <div class="left pageNum">
              <span
                >共{{ selectedPointcount }}项 第{{ pointPageNum }}/{{ totalpointPageNum }}页</span
              >
            </div>
            <div class="right ConfirmButton">
              <button class="rightConfirmButton" @click="ComfirmAll">一键确认</button>
              <button class="rightConfirmButton" @click="ComfirmPagenow">本页确认</button>
            </div>
          </div>
          <div class="changePage">
            <el-button :disabled="bool[0]" @click="clickPrev">上一页</el-button>
            <el-button :disabled="bool[1]" @click="clickNext">下一页</el-button>
            <!-- <button id="prevPage" @click="clickPrev">上一页</button
            ><button id="nextPage" @click="clickNext">下一页</button> -->
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Tree from '@/components/common/tree'
import confirmBox from '@/components/views/manageInspectionResults/insResShowResults/confirmBox.vue'
import { getPointsTreeApi } from '@/service/api/views/manageInspectionResults/insResShowResults'
import { getResultValue } from '@/views/manageInspectionResults/js/insResShowResults'
import { getImg } from '@/views/manageInspectionResults/js/commonFun'
import { readByResultID, dealAllByUUID } from '@/views/manageInspectionResults/js/commonFun'
export default {
  props: ['isShowFullView'],
  components: {
    Tree,
    confirmBox,
  },
  data() {
    return {
      //用户民
      userName: '',
      //一键确认标志
      ComfirmAllFlag: false,
      isTrue: true,
      //树的数据
      treeData: [],
      //树加载动画
      treeLoading: false,
      //巡检任务ID
      UUID: '',
      //是否打开弹窗
      isShowFullViewSon: '',
      //巡视结果全览弹出框input前面标题名
      // type: 1是正常下拉框， type: 2是级联选择器
      fullViewInputName: [
        {
          type: 2,
          formtitle: '设备名称',
          selected: '',
        },
        {
          type: 1,
          formtitle: '设备类型',
          formcontent: [
            '油浸式变压器(电抗器)',
            '断路器',
            '组合电器',
            '隔离开关',
            '开关柜',
            '电流互感器',
            '电压互感器',
            '避雷器',
            '并联电容器组',
            '干式电抗器',
            '串联补偿装置',
            '母线及绝缘子',
            '穿墙套管',
            '消弧线圈',
            '高频阻波器',
            '耦合电容器',
            '高压熔断器',
            '中性点隔直(限直)装置',
            '接地装置',
            '端子箱及检修电源箱',
            '站用变压器',
            '站用交流电源系统',
            '站用直流电源系统',
            '设备构架',
            '辅助设施',
            '土建设施',
            '独立避雷针',
            '避雷器动作次数表',
            '二次屏柜',
            '消防系统',
          ],
          value: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
            '29',
            '30',
          ],
          selected: '',
        },
        {
          type: 1,
          formtitle: '识别类型',
          formcontent: ['否', '是'],
          value: ['0', '1'],
          selected: '',
        },
        {
          type: 1,
          formtitle: '确认状态',
          formcontent: ['未确认', '已确认'],
          value: ['0', '1'],
          selected: '',
        },
      ],
      //巡视结果全览弹出框input交互数据
      fullViewInputData: ['', '', ''],
      //巡视结果全览弹出框radio,状态选择
      statusSelection: ['0', '0', '1', '2'],
      //传给组件的值，按这个改变大小，v-for按数字循环
      numOfFrame: [0],
      /* 此处未写方法，以后要实现将数据库获取的数据按页数和画面数将数据给confirmBoxData变量（或者不单独列数组，计算下标也可）
       DeviceId预计组件交互数据确定数据位置用
      InspectionResult具体缺陷或正常
      IsDeal表示是否确认
      后面还会有参数
      */
      confirmBoxData: [],
      //下拉框筛选回来的总数据
      totalConfirmBoxData: [],
      //根据点击事件，将展现几画面的信息传给子组件，改变大小
      selectedSizeFrames: 1,
      //巡视结果全览弹出框radio,画面选择
      numberFrames: [1, 1, 4, 9],
      //一共多少点位数展示
      selectedPointcount: 0,
      //预览弹窗当前页数
      pointPageNum: 0,
      //预览弹窗总页数：
      totalpointPageNum: 0,
      //预览弹窗上下页按钮是否禁用
      //UUID筛选出来的点位数据
      pointData: [],
      //未点击树前获得1、4、9点位key
      noClickTreeDate: [],
      bool: [true, true],
      //预览弹窗的树是否被点击过，初始1、4、9画面切换需要
      clickTreeFlag: true,
      //是否点击了筛选
      cilckFormInput: false,
      //预览弹窗当前页面第一个是第多少条
      countCom: {
        firstNum: 0,
        pageNum: 1,
      },
      //点位树选中点位的数据
      selectedData: {
        DevStr: [],
        DeviceDesc: [],
        key: [],
      },
      //切换画面需要往后端发的数据
      chooseFrameParams: {
        DevStr: [],
        DeviceDesc: [],
        key: [],
      },
      //清除标志，true清除定时器以及应用的一些外部变量
      isClearTime: false,
      // dataForConfirmbox()的防抖函数
      clickReturnData: '',
      clickReturnDataFast: '',
      // returnBoxData()的防抖函数
      debounceBoxData: '',
      //由于数据被异步请求覆盖，设置flag组织异步接下来的操作
      haveDataFlag: 0,
      //记录画面数为九时的数据，避免切换画面过多请求
      nineData: [],
    }
  },
  methods: {
    //重置设备名称下拉框region, spaced, device（区域，间隔，一次设备）
    async initTreeAndInput(UUID) {
      this.UUID = UUID
      this.treeData = []
      this.treeLoading = true
      const res = await getPointsTreeApi(UUID)
      if (res.msg === 'OK') {
        this.treeData = res.data
      }
      this.treeLoading = false
      this.initClass()
      const data = this.setTreeData(this.treeData[1], this.treeData[2])
      for (let i = 0; i < this.fullViewInputName.length; i++) {
        if (this.fullViewInputName[i].formtitle === '设备名称') {
          console.log(this.setTreeData(this.treeData[0], this.treeData[1]))
          this.fullViewInputName[i].options = this.setTreeData(this.treeData[0], this.treeData[1])
          break
        }
      }
    },
    //两层父子关系处理(生成级联下拉框用)
    setTreeData(father, son) {
      const data = father.filter((self) => {
        // 循环所有项，并添加children属性
        const branchArr = son.filter((child) => self.id === child.fId)
        branchArr.length > 0 ? (self.children = branchArr) : '' //给父级添加一个children属性，并赋值
        return self
      })
      return data
    },
    //初始化树选中、按钮样式、画面样式、初始数据展示
    initClass() {
      const _this = this
      this.numberFrames[0] = 1
      this.pointPageNum = 1
      this.totalpointPageNum = 1
      this.pointData.length = 0
      this.pointData = []
      this.ComfirmAllFlag = false
      //表示树还没点击
      this.clickTreeFlag = true
      this.$nextTick(() => {
        _this.$refs.pointTree.setCheckedKeys([])
        this.pointData = _this.$refs.pointTree.getTreeDataByLevel(4)
        if (this.pointData.length > 0) {
          this.dataForConfirmbox()
          // 总条数显示一条
          this.selectedPointcount = 1
          // 当前页面第一个数据是全部数据第一条
          this.countCom.firstNum = 1
          //子组件尺寸按数量1计算
          this.selectedSizeFrames = 1
          //目前只展示一条数据
          // this.$set(this.numOfFrame, 0, 1)
        }
      })
    },
    //获取点击选中的树节点
    onCheck(data, node, dataArr) {
      this.clickTreeFlag = false
      if (this.cilckFormInput) {
        this.pointPageNum = 1
        this.cilckFormInput = false
      }
      for (let i = 0; i < this.fullViewInputName.length; i++) {
        this.fullViewInputName[i].selected = ''
      }
      //将点击数组存下来
      this.statusSelection[0] = this.statusSelection[1]
      this.selectedData.key.length = 0
      this.selectedData.DevStr.length = 0
      this.selectedData.DeviceDesc.length = 0
      for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i].level === '4') {
          this.selectedData.key.push(dataArr[i].key)
          this.selectedData.DevStr.push(dataArr[i].id)
          this.selectedData.DeviceDesc.push(dataArr[i].label)
        }
      }
      //选中的总点数等于selectedData.key的长度
      this.selectedPointcount = this.selectedData.key.length
      this.changediologView(this.numberFrames[0])
      this.$nextTick(() => {
        // this.clickReturnData为this.dataForConfirmbox()防抖函数
        this.clickReturnData()
      })
    },
    //点击树按选中点位树改变页数和项数
    changediologView(val) {
      const clickDataLength = this.selectedData.key.length
      if (val === 1) {
        //树已经点击过了，按点击的显示页数和项数
        this.selectedPointcount = clickDataLength
        this.totalpointPageNum = clickDataLength
      } else if (val === 4) {
        //树已经点击过了，按点击的显示页数和项数
        this.selectedPointcount = clickDataLength
        if (clickDataLength % 4 === 0) {
          this.totalpointPageNum = Math.trunc(clickDataLength / 4)
        } else {
          this.totalpointPageNum = Math.trunc(clickDataLength / 4) + 1
        }
      } else if (val === 9) {
        //树已经点击过了，按点击的显示页数和项数
        this.selectedPointcount = clickDataLength
        if (clickDataLength % 9 === 0) {
          this.totalpointPageNum = Math.trunc(clickDataLength / 9)
        } else {
          this.totalpointPageNum = Math.trunc(clickDataLength / 9) + 1
        }
      }
    },
    //预览下拉框筛选
    async searchClick() {
      //表示下拉框已经点击
      this.cilckFormInput = true
      //清空树选中
      this.$refs.pointTree.setCheckedKeys([])
      const selected = {}
      selected.FirstDevID = this.fullViewInputName[0].selected
      selected.FirstDevType = this.fullViewInputName[1].selected
      selected.GridDevType = this.fullViewInputName[2].selected
      selected.IsDeal = this.fullViewInputName[3].selected
      selected.querytype = this.statusSelection[0]
      this.totalConfirmBoxData = await getResultValue(this.UUID, selected)
      console.log(this.totalConfirmBoxData)
      //总条数
      this.selectedPointcount = this.totalConfirmBoxData.length
      if (this.totalConfirmBoxData.length > 0) {
        // 当前页面第一个数据是全部数据第一条
        this.selectedSizeFrames = 1
        //页数重置成第一页
        this.pointPageNum = 1
        this.countCom.firstNum = 1
      } else {
        //页数重置成第0页
        this.pointPageNum = 0
        this.countCom.firstNum = 0
      }
      this.dataForConfirmbox()
    },
    //this.clickTreeFlag === true没有点击过树，按树第四层的点位数据来push向后端请求的参数（涉及操作切换一四九画面）
    //this.clickTreeFlag === false点击过树了,按点击后收集的数据this.selectedData来push向后端请求的数据（涉及操作切换一四九画面，点击树）
    // this.cilckFormInput是否通过下拉框数据展示数据
    dataForConfirmbox() {
      // 通过chooseFrame计算要展示几个子组件（numFrame），展示子组件的尺寸（selectedStyle）
      let chooseFrame = 0
      const numFrame = [1, 4, 9]
      const selectedStyle = [1, 4, 9]
      //依据没切换画面前的第一个点位在所有选中点位顺序，重新改写当前页数
      this.countPageNow(this.numberFrames[0])
      // 计算好当前页数后重新计算当前页第一条数据时总数据第几个

      this.getCountCom(this.pointPageNum)
      // 下拉框数据展示数据
      if (this.cilckFormInput) {
        if (this.countCom.firstNum === 0) {
          chooseFrame = 0
        } else {
          chooseFrame = this.totalConfirmBoxData.length - this.countCom.firstNum + 1
        }
        // 总页数
        if (this.totalConfirmBoxData.length % this.numberFrames[0] === 0) {
          this.totalpointPageNum = Math.trunc(
            this.totalConfirmBoxData.length / this.numberFrames[0]
          )
        } else {
          this.totalpointPageNum =
            Math.trunc(this.totalConfirmBoxData.length / this.numberFrames[0]) + 1
        }
      } else {
        //按树点位展示数据
        this.countCom.pageNum = this.numberFrames[0]
        const pointDataLength = this.pointData.length
        let clickDataLength = 0
        if (this.countCom.firstNum === 0) {
          clickDataLength = 0
        } else {
          clickDataLength = this.selectedData.key.length - this.countCom.firstNum + 1
        }

        if (this.clickTreeFlag === true) {
          chooseFrame = pointDataLength
        } else {
          chooseFrame = clickDataLength
        }
      }
      if (chooseFrame === 0) {
        numFrame[0] = 0
        numFrame[1] = 0
        numFrame[2] = 0
      }
      if (chooseFrame === 1) {
        numFrame[1] = 1
        numFrame[2] = 1
        selectedStyle[1] = 1
        selectedStyle[2] = 1
      }
      if (chooseFrame > 1 && chooseFrame < 5) {
        numFrame[1] = chooseFrame
        numFrame[2] = chooseFrame
        selectedStyle[1] = 4
        selectedStyle[2] = 4
      }
      if (chooseFrame > 4 && chooseFrame < 10) {
        numFrame[1] = 4
        numFrame[2] = chooseFrame
        selectedStyle[1] = 4
        selectedStyle[2] = 9
      }
      if (chooseFrame > 9) {
        numFrame[1] = 4
        numFrame[2] = 9
        selectedStyle[1] = 4
        selectedStyle[2] = 9
      }
      if (this.cilckFormInput) {
        if (this.numberFrames[0] === 1) {
          //画面尺寸
          this.selectedSizeFrames = 1
          //根据展示子组件的数量来展示数据
          this.shouInputData(numFrame[0])
          //切换至四画面
        } else if (this.numberFrames[0] === 4) {
          this.selectedSizeFrames = selectedStyle[1]
          //根据展示子组件的数量来展示数据
          this.shouInputData(numFrame[1])
          //切换至九画面
        } else if (this.numberFrames[0] === 9) {
          this.selectedSizeFrames = selectedStyle[2]
          //根据展示子组件的数量来展示数据
          this.shouInputData(numFrame[2])
        }
      } else {
        //切换至一画面
        if (this.numberFrames[0] === 1) {
          this.selectedSizeFrames = 1
          //显示共多少项（未点击树时）
          this.selectedPointcount = numFrame[0]
          // 处理总页数和收集将要请求的参数
          this.pushAjaxparams(numFrame[0], 1)
          //切换至四画面
        } else if (this.numberFrames[0] === 4) {
          this.selectedSizeFrames = selectedStyle[1]
          this.selectedPointcount = numFrame[1]
          this.pushAjaxparams(numFrame[1], 4)
          //切换至九画面
        } else if (this.numberFrames[0] === 9) {
          this.selectedSizeFrames = selectedStyle[2]
          this.selectedPointcount = numFrame[2]
          this.pushAjaxparams(numFrame[2], 9)
        }
        //发送请求获得数据
        this.returnBoxData()
      }
    },
    // 计算当前页数（树）
    countPageNow(num) {
      if (this.countCom.firstNum % num === 0) {
        this.pointPageNum = Math.trunc(this.countCom.firstNum / num)
      } else {
        this.pointPageNum = Math.trunc(this.countCom.firstNum / num) + 1
      }
    },
    // 计算总页数（树）
    countTatolPage(num) {
      //树已经点击过了，按点击的显示总页数
      if (this.selectedData.key.length % num === 0) {
        this.totalpointPageNum = Math.trunc(this.selectedData.key.length / num)
      } else {
        this.totalpointPageNum = Math.trunc(this.selectedData.key.length / num) + 1
      }
    },
    // 处理总页数和收集将要请求的参数，count当前页展示多少数据，num计算总页数用
    pushAjaxparams(count, num) {
      if (this.clickTreeFlag === false) {
        //树已经点击过了，按点击的显示页数和项数
        this.selectedPointcount = this.selectedData.key.length
        this.countTatolPage(num)
        //将要传给后端的参数收集起来
        this.chooseFrameParams.DevStr.length = 0
        this.chooseFrameParams.DeviceDesc.length = 0
        this.chooseFrameParams.key.length = 0
        for (let i = 0; i < count; i++) {
          this.chooseFrameParams.DevStr.push(
            this.selectedData.DevStr[i + this.countCom.firstNum - 1]
          )
          this.chooseFrameParams.DeviceDesc.push(
            this.selectedData.DeviceDesc[i + this.countCom.firstNum - 1]
          )
          this.chooseFrameParams.key.push(this.selectedData.key[i + this.countCom.firstNum - 1])
        }
      } else {
        //将要传给后端的参数收集起来（没点击树，只点击一四九按钮）
        this.chooseFrameParams.DevStr.length = 0
        this.chooseFrameParams.DeviceDesc.length = 0
        this.chooseFrameParams.key.length = 0
        for (let i = 0; i < count; i++) {
          this.chooseFrameParams.DevStr.push(this.pointData[i].id)
          this.chooseFrameParams.DeviceDesc.push(this.pointData[i].label)
          this.chooseFrameParams.key.push(this.pointData[i].key)
        }
        // 通过 keys 设置勾选的节点
        this.$refs.pointTree.setCheckedKeys(this.chooseFrameParams.key)
      }
    },
    //减少获取图片次数（操作后相同下标的参数数组id与原数据的id相同就不进行图片获取，全相同原数据不改变）
    // 不采用将两个数组不同的对比出来，请求后原数据对应位置替换，考虑到此函数需要改变的数据比较少时是部分改动
    // 大多情况下全变或者不变
    async returnBoxData() {
      const selected = { DevStr: [], DeviceDesc: [] }
      //切换画面计算相同数据数量，全部相同直接赋值后return
      let sameNum = 0
      //请求数据有时不用执行下面的异步操作，造成一个问题先执行一个需要下面的异步，再执行不需要异步的操作
      // 会使结果变成异步操作的数据，用this.haveDataFlag判断执行到哪一步了，执行完取消后面代码执行
      let count = 0
      if (this.haveDataFlag < 1000) {
        this.haveDataFlag = this.haveDataFlag + 1
        count = this.haveDataFlag
      } else {
        this.haveDataFlag = 1
        count = this.haveDataFlag
      }
      if (this.confirmBoxData.length > this.chooseFrameParams.key.length) {
        this.confirmBoxData = this.confirmBoxData.slice(0, this.chooseFrameParams.key.length)
      }
      const reversedData = [...this.nineData].reverse()
      let hasData = reversedData.findIndex(
        (item) => item.DeviceId === this.chooseFrameParams.DevStr[0]
      )
      if (hasData !== -1) {
        hasData = this.nineData.length - 1 - hasData
      }
      console.log('hasData', hasData)
      const newConfirmBoxData = this.confirmBoxData.slice(0, this.chooseFrameParams.key.length)

      console.log(newConfirmBoxData, this.confirmBoxData, '顺序')

      // 记录不同数据下标，请求完插入数据到对应地方
      const difIndex = []
      //遍历将相同的下标不同ID筛选出来
      if (this.chooseFrameParams.key.length > 0) {
        for (let i = 0; i < this.chooseFrameParams.key.length; i++) {
          if (!newConfirmBoxData[i]) {
            selected.DevStr.push(this.chooseFrameParams.DevStr[i])
            selected.DeviceDesc.push(this.chooseFrameParams.DeviceDesc[i])
            difIndex.push(i)
          } else if (this.chooseFrameParams.DevStr[i] !== newConfirmBoxData[i].DeviceId) {
            console.log(this.chooseFrameParams.DevStr[i], newConfirmBoxData[i].DeviceId, 1212121212)
            selected.DevStr.push(this.chooseFrameParams.DevStr[i])
            selected.DeviceDesc.push(this.chooseFrameParams.DeviceDesc[i])
            difIndex.push(i)
          }
          if (
            hasData === -1 ||
            this.nineData.length - this.chooseFrameParams.DevStr.length - hasData < 0
          ) {
            continue
          }
          if (this.chooseFrameParams.DevStr[i] === this.nineData[i + hasData].DeviceId) {
            sameNum = sameNum + 1
            if (sameNum === this.chooseFrameParams.key.length) {
              console.log('这里')
              this.confirmBoxData = this.nineData.slice(
                hasData,
                hasData + this.chooseFrameParams.key.length
              )
              return
            }
          }
        }
      }
      if (selected.DevStr.length > 0) {
        const res = await getResultValue(this.UUID, selected)
        if (count === this.haveDataFlag) {
          for (let i = 0; i < res.length; i++) {
            const imgData = await getImg(res[i].imgSrc)
            res[i].imgSrc = window.URL.createObjectURL(imgData)
            newConfirmBoxData.splice(difIndex[i], 1, res[i])
          }
        }
      }
      if (count === this.haveDataFlag) {
        this.confirmBoxData = newConfirmBoxData
        //减少数据申请（存储一定点位，上下来回翻页时对比数据减少查询次数）
        if (this.nineData.length < 27) {
          Array.prototype.push.apply(this.nineData, this.confirmBoxData)
        } else {
          Array.prototype.push.apply(this.nineData, this.confirmBoxData)
          this.nineData = this.nineData.slice(9)
        }
      }
    },
    //展示下拉框对应页数的数据
    async shouInputData(count) {
      if (this.confirmBoxData.length > count) {
        this.confirmBoxData = this.confirmBoxData.slice(0, count)
      }
      let hasData = -1
      const reversedData = [...this.nineData].reverse()
      if (this.totalConfirmBoxData[this.countCom.firstNum - 1]) {
        hasData = reversedData.findIndex(
          (item) => item.DeviceId === this.totalConfirmBoxData[this.countCom.firstNum - 1].DeviceId
        )
      }

      if (hasData !== -1) {
        hasData = this.nineData.length - 1 - hasData
      }
      console.log(hasData)
      let sameNum = 0
      if (hasData !== -1 && !(this.nineData.length - count - hasData < 0)) {
        for (let i = 0; i < count; i++) {
          if (
            this.totalConfirmBoxData[i + this.countCom.firstNum - 1].DeviceId ===
            this.nineData[i + hasData].DeviceId
          ) {
            sameNum = sameNum + 1
            if (sameNum === count) {
              console.log('这里')
              this.confirmBoxData = this.nineData.slice(hasData, hasData + count)
              return
            }
          }
        }
      }

      const middleData = []
      console.log(count, 'count')
      for (let i = 0; i < count; i++) {
        middleData.push(this.totalConfirmBoxData[i + this.countCom.firstNum - 1])
        const imgData = await getImg(middleData[i].imgSrc)
        middleData[i].imgSrc = window.URL.createObjectURL(imgData)
        if (this.ComfirmAllFlag) {
          middleData[i].IsDeal = '1'
        }
      }

      this.confirmBoxData = middleData
      console.log(this.confirmBoxData, middleData)
      if (this.nineData.length < 27) {
        console.log(this.nineData)
        Array.prototype.push.apply(this.nineData, this.confirmBoxData)
      } else {
        Array.prototype.push.apply(this.nineData, this.confirmBoxData)
        this.nineData = this.nineData.slice(9)
      }
    },
    //预览上翻页
    clickPrev() {
      if (this.pointPageNum > 1) {
        this.pointPageNum = this.pointPageNum - 1
        this.$nextTick(() => {
          this.clickReturnDataFast()
        })
      }
    },
    //预览下翻页
    clickNext() {
      if (this.pointPageNum < this.totalpointPageNum) {
        this.pointPageNum = this.pointPageNum + 1
        this.$nextTick(() => {
          this.clickReturnDataFast()
        })
      }
    },
    //预览弹窗当前页面第一个是第多少条
    getCountCom(pageNum) {
      if (pageNum === 0) {
        this.countCom.firstNum = 0
      } else {
        this.countCom.firstNum = (pageNum - 1) * this.numberFrames[0] + 1
      }
    },
    //动态组件切换时关闭弹窗
    colseFullView() {
      this.isShowFullViewSon = false
    },
    closeDialog() {
      const _this = this
      _this.$emit('closeDiaFullView')
    },
    // 一键确认
    async ComfirmAll() {
      // const iDList = []
      // const selected = {}
      // selected.FirstDevID = ''
      // selected.FirstDevType = ''
      // selected.GridDevType = ''
      // selected.IsDeal = ''
      // selected.querytype = ''
      // const totalData = await getResultValue(this.UUID, selected)

      // for (let i = 0; i < totalData.length; i++) {
      //   iDList.push(totalData[i].ResultID)
      // }
      // const resultID = iDList.toString()

      const res = await dealAllByUUID(this.UUID, this.userName)
      console.log(this.UUID, this.userName, res)
      if (res === 'OK') {
        this.$message.success('确认成功!')
        this.ComfirmAllFlag = true
        for (let i = 0; i < this.confirmBoxData.length; i++) {
          this.confirmBoxData[i].IsDeal = '1'
        }
      } else {
        this.$message.error('确认失败！')
      }
    },
    //本页确认
    async ComfirmPagenow() {
      const iDList = []
      for (let i = 0; i < this.confirmBoxData.length; i++) {
        iDList.push(this.confirmBoxData[i].ResultID)
      }
      const resultID = iDList.toString()
      const res = await readByResultID(resultID, this.userName)
      if (res === 'OK') {
        this.$message.success('确认成功!')
        for (let i = 0; i < this.confirmBoxData.length; i++) {
          this.confirmBoxData[i].IsDeal = '1'
        }
      } else {
        this.$message.error('确认失败！')
      }
    },
    // 第一个参数是需要进行防抖处理的函数，第二个参数是延迟时间，默认为1秒钟
    // 这里多传一个参数，immediate用来决定是否要第一次立即执行, 默认为false
    // 里面的变量采用闭包保存在
    debounce(fn, delay = 1000, immediate = false, resultCb) {
      // 实现防抖函数的核心是使用setTimeout
      // time变量用于保存setTimeout返回的Id
      let time = null
      // isImmediateInvoke变量用来记录是否立即执行, 默认为false
      let isImmediateInvoke = false

      // 将回调接收的参数保存到args数组中
      function _debounce(...args) {
        if (this.isClearTime === true) {
          //避免内存泄漏(清除定时器)
          clearTimeout(time)
          delay = null
          immediate = null
          isImmediateInvoke = null
          fn = null
          resultCb = null
        } else {
          // 如果time不为0，也就是说有定时器存在，将该定时器清除
          if (time !== null) {
            clearTimeout(time)
          }
          // 当是第一次触发，并且需要触发第一次事件
          if (!isImmediateInvoke && immediate) {
            // 将函数的返回值保存到result中
            const result = fn.apply(this, args)
            if (typeof resultCb === 'function') {
              // 当用户传递了resultCb函数时，执行该函数，并将结果以参数传递出去。
              resultCb(result)
            }
            // 将isImmediateInvoke设置为true，这样不会影响到后面频繁触发的函数调用
            isImmediateInvoke = true
          }
          time = setTimeout(() => {
            // 使用apply改变fn的this，同时将参数传递给fn
            // 将函数的返回值保存到result中
            const result = fn.apply(this, args)
            if (typeof resultCb === 'function') {
              // 当用户传递了resultCb函数时，执行该函数，并将结果以参数传递出去。
              resultCb(result)
            }
            // 当定时器里的函数执行时，也就是说是频繁触发事件的最后一次事件
            // 将isImmediateInvoke设置为false，这样下一次的第一次触发事件才能被立即执行
            isImmediateInvoke = false
          }, delay)
        }
      }

      // 防抖函数会返回另一个函数，该函数才是真正被调用的函数
      return _debounce
    },
  },
  mounted() {
    this.isShowFullViewSon = JSON.parse(JSON.stringify(this.isShowFullView))
    // this.dataForConfirmbox函数防抖
    this.clickReturnData = this.debounce(this.dataForConfirmbox, 700, false)
    this.clickReturnDataFast = this.debounce(this.dataForConfirmbox, 300, false)
    const account = sessionStorage.getItem('account')
    this.userName = account.substring(1, account.length - 1)
  },
  destroyed() {
    this.isClearTime = true
    this.clickReturnData()
    this.clickReturnDataFast()
  },
  watch: {
    isShowFullView: {
      handler(newVal, oldVal) {
        this.isShowFullViewSon = newVal
      },
      immediate: false,
    },
    isShowFullViewSon: {
      handler(newVal, oldVal) {
        if (newVal === false) {
          this.nineData = []
          this.confirmBoxData = []
        }
      },
      immediate: false,
    },
    totalpointPageNum: {
      handler(newVal, oldVal) {
        const _this = this
        if (this.pointPageNum > newVal) {
          this.pointPageNum = newVal
        }
        if (oldVal === 0) {
          this.pointPageNum = 1
          this.countCom.firstNum = 1
        }
        if (this.pointPageNum === newVal) {
          this.bool[1] = true
        } else {
          this.bool[1] = false
        }
      },
      deep: false, //深度侦听，（对象里面层的值改变了）
      immediate: false, //立即侦听（网页打开handler执行一次）
    },
    pointPageNum: {
      handler(newVal, oldVal) {
        this.getCountCom(this.pointPageNum)
        if (newVal === 0 || newVal === 1) {
          this.bool[0] = true
        } else {
          this.bool[0] = false
        }
        if (newVal === this.totalpointPageNum) {
          this.bool[1] = true
        } else {
          this.bool[1] = false
        }
      },
      deep: false, //深度侦听，（对象里面层的值改变了）
      immediate: false, //立即侦听（网页打开handler执行一次）
    },
  },
}
</script>
<style lang="scss">
// .cascaderDevClass {
//   background: #14357b;
//   border: none;
// }
</style>
<style scoped lang="scss">
.left {
  float: left;
}
.right {
  float: right;
}
.dialogFullView {
  :deep(.el-dialog) {
    width: 128rem;
    height: 65rem;
    margin-top: 4rem !important;
    .el-dialog__header::before {
      content: url(@/assets/images/common/titleicon.png);
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
    //清除浮动
    .el-dialog__body::before,
    .el-dialog__body::after {
      content: '';
      display: block;
    }
    .el-dialog__body::after {
      clear: both;
    }
    .el-dialog__body {
      background-color: #06245f;
      padding: 1.5rem 2rem 1rem 2rem;
      .dialogView {
        .dialogViewLeft {
          float: left;
          width: 30rem;

          .treeComponent {
            height: 73rem;
            .el-tree {
              background: none;
              color: #fff;
              .el-tree-node.is-current > .el-tree-node__content {
                background-color: #0f47a9;
              }
              .el-tree-node__content,
              .el-upload-list__item {
                background-color: #06245f;
              }
              .el-tree-node__content:hover,
              .el-upload-list__item:hover {
                background-color: #2c4a7e;
              }
            }
          }
        }
        .dialogViewRight {
          float: left;
          width: 94rem;
          > div {
            padding: 0rem 1.5rem;
          }
          .searchButton {
            position: absolute;
            top: 41px;
            right: 21px;
            width: 7rem;
            height: 2.7rem;
            background-color: #256df7;
            border-radius: 0.2rem;
            border: solid 0.1rem #54ccff;
            font-size: 1.4rem;
            line-height: 2.7rem;
            letter-spacing: 0rem;
            color: #fff;
            margin-right: 1rem;
          }
          .confirmBoxDiv {
            height: 66rem;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            // margin-top: -4.4rem;
          }
          .el-input .el-input__inner {
            color: #fff;
            background: none;
            border: solid 0.1rem #4278c0;
            height: 3rem;
            width: 15rem;
          }
          .statusRadio {
            margin-top: -3rem;
            .el-radio__label {
              color: #fff;
            }
          }
        }
      }
      .bodyBottom {
        height: 4.7rem;
        margin-top: -1.5rem;
        .framesButton {
          margin-top: 1rem;
          el-radio-button {
            margin-right: 0.5rem;
          }
          .el-radio-button {
            margin-right: 0.7rem;
            .el-radio-button__inner {
              padding: 0;
              width: 6.7rem;
              height: 2.7rem;
              background-color: #0c347b;
              border-radius: 0.2rem;
              border: solid 0.1rem #0b3d7b;
              font-family: MicrosoftYaHei;
              font-size: 1.4rem;
              line-height: 2.7rem;
              letter-spacing: 0rem;
              color: #c7c7c7;
            }
            .el-radio-button__inner:hover {
              background-color: #256df7;
              color: #fff;
              border: solid 0.1rem #54ccff;
            }
            .el-radio-button__orig-radio:checked + .el-radio-button__inner {
              background-color: #256df7;
              color: #fff;
              border: solid 0.1rem #54ccff;
              box-shadow: 0 0 0 0 #409eff;
            }
          }
        }
        .pageNum {
          line-height: 4.7rem;
          span {
            color: #fff;
            line-height: 4.7rem;
            margin-left: 19rem;
          }
        }
        .ConfirmButton {
          margin-top: 1rem;
          .rightConfirmButton {
            width: 8rem;
            height: 2.7rem;
            background-color: #256df7;
            border-radius: 0.2rem;
            border: solid 0.1rem #54ccff;
            font-size: 1.4rem;
            line-height: 2.7rem;
            letter-spacing: 0rem;
            color: #fff;
            margin-right: 1rem;
          }
        }
      }
      .changePage {
        text-align: center;
        button {
          height: 3.3rem;
          background-color: #0c347b;
          border-radius: 0.2rem;
          border: solid 0.1rem #0b3d7b;
          font-family: MicrosoftYaHei;
          font-size: 1.4rem;
          letter-spacing: 0rem;
          color: #c7c7c7;
          margin-right: 1rem;
        }
        button:hover {
          background-color: #256df7;
          color: #fff;
          border: solid 0.1rem #54ccff;
        }
      }
    }
  }
}
:deep(.el-checkbox__inner) {
  background-color: rgba(0, 0, 0, 0);
}
</style>
