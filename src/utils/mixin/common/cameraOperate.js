import { callPointApi } from '@/service/api/common/tree'
export const cameraOperate = {
  //巡视点位配置用到的右键内容
  provide() {
    return {}
  },
  methods: {
    //装置树节点右键菜单
    onContextmenu(event, data, node) {
      console.log(event, data, node, '装置emitsdata')
      const level = parseInt(data.level)
      let content = []
      if (level === 0) {
        content = [
          {
            label: '打开所有视频',
            onClick: () => {
              const cameraArr = this.$refs.devTreeRef.getTreeDataByLevel(5)
              const devIdArr = []
              // 树高亮使用的节点 key 数组
              const treeArr = []
              cameraArr.forEach((item) => {
                const type = parseInt(item.cameraType)
                if (type === 0 || type === 1) {
                  // devIdArr.push(`${item.id}_${type}`)
                  devIdArr.push(`${item.id}`) //需要打开的cameraid_cameratype
                } else if (type === 2) {
                  devIdArr.push(`${item.id}_0`)
                  devIdArr.push(`${item.id}_1`)
                }
                treeArr.push(item.id)
              })
              // 批量打开摄像头
              this.openBulkVideo(devIdArr)
              // 高亮树节点
              this.$refs.devTreeRef.highLightNode(treeArr)
            },
          },
          {
            label: '关闭所有视频',
            onClick: () => {
              this.closeAllVideo()
            },
          },
        ]
      }
      // else if (level === 3) {
      //   //根据区域批量打开视频
      //   content = [
      //     {
      //       label: '批量打开视频',
      //       onClick: () => {
      //         const cameraArr = data.children
      //         const devIdArr = []
      //         // 树高亮使用的节点 key 数组
      //         const treeArr = []
      //         cameraArr.forEach((item) => {
      //           const type = parseInt(item.cameraType)
      //           if (type === 0 || type === 1) {
      //             // devIdArr.push(`${item.id}_${type}`)
      //             devIdArr.push(`${item.id}`)
      //           } else if (type === 2) {
      //             devIdArr.push(`${item.id}_0`)
      //             devIdArr.push(`${item.id}_1`)
      //           }
      //           treeArr.push(item.id)
      //         })
      //         // 批量打开摄像头
      //         this.openBulkVideo(devIdArr)
      //         // 高亮树节点
      //         this.$refs.devTreeRef.highLightNode(treeArr)
      //       },
      //     },
      //     {
      //       label: '关闭所有视频',
      //       onClick: () => {
      //         this.closeAllVideo()
      //       },
      //     },
      //   ]
      // }
      else if (level === 4) {
        const cameraType = parseInt(data.cameraType)
        const IFRContent = [
          {
            label: '打开红外视频',
            onClick: () => {
              this.openVideo(data.id, data.cameraType, data.cameraId)
            },
          },
          {
            label: '关闭红外视频',
            onClick: () => {
              this.closeVideo(data.id, data.cameraType, data.cameraId)
            },
          },
        ]
        const IPCContent = [
          {
            label: '打开可见光视频',
            onClick: () => {
              this.openVideo(data.id, data.cameraType, data.cameraId)
            },
          },
          {
            label: '关闭可见光视频',
            onClick: () => {
              this.closeVideo(data.id, data.cameraType, data.cameraId)
            },
          },
        ]
        if (cameraType === 0) {
          content = IFRContent
        } else if (cameraType === 1) {
          content = IPCContent
        } else if (cameraType === 2) {
          content = IPCContent.concat(IFRContent)
        }
      }
      return content
    },
    //点位树右键菜单--呼叫点位
    pointContextmenu(event, data, node) {
      console.log(data, '点位右键呼叫点位数据')
      const level = parseInt(data.level)
      let content = []
      if (level === 6) {
        content = [
          {
            label: '呼叫点位',
            onClick: async () => {
              const params = {
                Device_Id: data.id,
              }
              const res = await callPointApi(params)
              console.log('巡视点位配置-呼叫点位参数', params, '结果-->', res)
              //同时打开视频-DevID=CameraID+"_0"，”_0”代表打开红外视频，”_1”代表打开可见光视频

              if (data.gridDevType === '4') {
                const cameraId = data.cameraId + '_0'
                this.openVideo(cameraId, 0, data.cameraId)
              } else {
                const cameraId = data.cameraId + '_1'
                this.openVideo(cameraId, 1, data.cameraId)
              }
            },
          },
        ]
      }
      return content
    },
    //视频画面分割
    spliTimer(fun, num) {
      console.log('视频画面分割')
      const _this = this
      if (_this.$refs.cameraIframeRef.contentWindow.vwsplit) {
        _this.$refs.cameraIframeRef.contentWindow.vwsplit(num, 1)
      } else {
        fun()
      }
    },
    openVideo(camerId, cameraType, cameraIDi) {
      console.log('打开可见光视频', camerId, cameraType)
      this.cameraIDIs = cameraIDi
      this.cameraType = cameraType
      const _this = this
      setTimeout(() => {
        if (_this.$refs.cameraIframeRef.contentWindow.AllVWObj.length > 0) {
          _this.$refs.cameraIframeRef.contentWindow.OpenVideoByDevID(camerId, '', 1)
        }
      }, 2700)
    },
    closeVideo(camerId, cameraType, cameraIDi) {
      console.log('关闭可见光视频', camerId, cameraType)
      this.cameraIDIs = camerId
      this.cameraType = cameraType
      const _this = this
      setTimeout(() => {
        if (_this.$refs.cameraIframeRef.contentWindow.AllVWObj.length > 0) {
          _this.$refs.cameraIframeRef.contentWindow.CloseVideoByDevID(camerId, '', 1)
        }
      }, 2700)
    },
    // 打开全部视频
    openBulkVideo(arr) {
      console.log('批量打开可见光视频--_数组', arr)
      const _this = this
      setTimeout(() => {
        if (_this.$refs.cameraIframeRef.contentWindow.AllVWObj.length > 0) {
          _this.$refs.cameraIframeRef.contentWindow.OpenVideoByDevIDArr(arr)
        }
      }, 2700)
    },
    // 关闭所有视频
    closeAllVideo() {
      console.log('批量关闭所有视频')
      const _this = this
      setTimeout(() => {
        if (_this.$refs.cameraIframeRef.contentWindow.AllVWObj.length > 0) {
          _this.$refs.cameraIframeRef.contentWindow.StopAllMonitor()
        }
      }, 2700)
    },
    //切换树
    changeTree(num) {
      let pointTreeData = []
      let deviceTreeData = []
      // if (num === showWitchTree) {
      //   return
      // }
      this.showWitchTree = num ? num : 1
      this.showPointTree = num === 1 ? true : false
      const val = this.showWitchTree
      // const stationIDVal = stationID
      // if (stationIDVal) {
      if (val === 1 && pointTreeData.length === 0) {
        this.getStationTree()
      } else if (val === 2 && deviceTreeData.length === 0) {
        this.getDeviceTree()
      }
      // }
      // console.log(this.showWitchTree, 'showWitchTree')
    },
    //切换视频
    changeVideo(num) {
      //1可见光 2 红外
    },
  },
}
