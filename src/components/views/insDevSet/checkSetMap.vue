<template>
  <div>
    <canvas
      ref="bargraphCanvas"
      :width="canvasWidth"
      :height="canvasHeight"
      :style="'width:' + canvasWidth / 2 + 'px;height:' + canvasHeight / 2 + 'px;'"
    ></canvas>
  </div>
</template>

<script>
import { getImgApi } from '@/service/api/views/insDevSet/getAreaInfo'
export default {
  data() {
    return {
      canvasWidth: 2560, // 画布大小
      canvasHeight: 1400,
      extraImgList: [
        {
          url: '',
          x: 0,
          y: 0,
          width: '',
          height: '',
        },
        // {url:require("../images/labor2.png"), x: 700, y: 100, width: 40, height: 40}
      ],
      myCanvas: null,
      ctx: null,
      imgObject: [],
      imgX: 0, // 图片在画布中渲染的起点x坐标
      imgY: 0,
      imgScale: 1, // 图片的缩放大小
      // rectList: [{ x: 450, y: 50, width: 150, height: 200 }], //矩形方框数据
      rectList: [],
      // 初始矩形数量
      rectNum: 0,
      //是否移出了画面
      mouseOutFlag: false,
    }
  },
  mounted() {
    this.myCanvas = this.$refs.bargraphCanvas
    this.ctx = this.myCanvas.getContext('2d')
    this.canvasEventsInit()
    this.$bus.$on('changeMap', (val, stationID) => {
      this.loadImg(val, stationID)
    })
  },
  destroyed() {
    this.$bus.$off('changeMap')
  },
  methods: {
    async loadImg(imgData, StationID) {
      const _this = this
      this.imgScale = 1
      //以后要显示其他区域在此处加
      this.rectList = []
      //待添加，此处获得图片和矩形信息
      this.extraImgList[0].width = imgData.FirstDevMapWidth
      this.extraImgList[0].height = imgData.FirstDevMapHeight
      const imgUrl = 'firstdevmap/' + StationID + '_' + imgData.FirstDevMapId + '.png'
      const params = {
        url: imgUrl,
        ImgType: 'firstdevmap',
      }
      const newImgData = await getImgApi(params)
      console.log(newImgData)
      const url = window.URL.createObjectURL(newImgData)
      this.extraImgList[0].url = url
      console.log(imgData)
      _this.rectNum = _this.rectList.length
      const extraImgList = _this.extraImgList
      const length = extraImgList.length
      const imageList = []
      let count = 0
      //加载背景图片
      // var isBgLoaded = false;
      const img = new Image()
      const bgImg = extraImgList[0]
      img.src = bgImg.url
      img.onload = () => {
        imageList.push({
          img: img,
          x: bgImg.x,
          y: bgImg.y,
          width: bgImg.width,
          height: bgImg.height,
        })
        ++count
        if (length > 1) {
          //加载剩余图片
          for (let key = 1; key < length; key++) {
            const item = extraImgList[key]
            const extarImg = new Image()
            extarImg.src = item.url
            extarImg.onload = () => {
              imageList.push({
                img: extarImg,
                x: item.x,
                y: item.y,
                width: item.width,
                height: item.height,
              })
              if (++count >= length) {
                _this.imgObject = imageList
                _this.drawImage(imageList)
              }
            }
          }
        } else {
          _this.imgObject = imageList
          _this.drawImage(imageList)
        }
      }
    },
    drawImage(imgList) {
      const _this = this
      _this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      for (let i = 0; i < imgList.length; i++) {
        _this.ctx.drawImage(
          imgList[i].img, //规定要使用的图片
          _this.imgX + imgList[i].x * _this.imgScale,
          _this.imgY + imgList[i].y * _this.imgScale, //在画布上放置图像的 x 、y坐标位置。
          imgList[i].width * _this.imgScale,
          imgList[i].height * _this.imgScale //要使用的图像的宽度、高度
        )
        // 矩形边框位置更新
        _this.drawStrokeRect()
      }
      // this.ctx.font="15px Arial";
      // this.ctx.fillStyle = "black"
      // this.ctx.fillText("name",this.imgX + 120 * this.imgScale, this.imgY+ 25 * this.imgScale);
    },
    //画矩形边框
    drawStrokeRect() {
      const _this = this
      _this.ctx.strokeStyle = 'red'
      _this.ctx.lineWidth = 3
      // _this.ctx.strokeRect(0, 0, 2560, 1300)
      for (let i = 0; i < _this.rectList.length; i++) {
        _this.ctx.strokeRect(
          parseInt(_this.rectList[i].x) * _this.imgScale + _this.imgX,
          parseInt(_this.rectList[i].y) * _this.imgScale + _this.imgY,
          parseInt(_this.rectList[i].width * _this.imgScale),
          parseInt(_this.rectList[i].height * _this.imgScale)
        )
      }
    },

    /**
     * 为画布上鼠标的拖动和缩放注册事件（优化可加防抖）
     */
    canvasEventsInit() {
      const _this = this
      const canvas = _this.myCanvas
      canvas.onmousedown = function (event) {
        _this.mouseOutFlag = false
        if (event.button === 0) {
          const imgx = _this.imgX
          const imgy = _this.imgY
          const pos = { x: event.clientX, y: event.clientY } //坐标转换，将窗口坐标转换成canvas的坐标
          console.log(imgx, imgy, pos)
          canvas.onmousemove = function (evt) {
            //移动
            canvas.style.cursor = 'move'
            console.log(121212)
            const x = (evt.clientX - pos.x) * 2 + imgx
            const y = (evt.clientY - pos.y) * 2 + imgy
            _this.imgX = x
            _this.imgY = y
            _this.drawImage(_this.imgObject) //重新绘制图片
          }
          canvas.onmouseup = function () {
            canvas.onmousemove = null
            canvas.onmouseup = null
            canvas.style.cursor = 'default'
          }
        }
        if (event.button === 2) {
          if (_this.rectList.length > _this.rectNum) {
            _this.rectList.pop()
            _this.drawImage(_this.imgObject)
          }
          const pos = { x: event.clientX, y: event.clientY } //坐标转换，将窗口坐标转换成canvas的坐标
          const newRect = {
            x: (event.offsetX * 2 - _this.imgX) / _this.imgScale,
            y: (event.offsetY * 2 - _this.imgY) / _this.imgScale,
            width: 0,
            height: 0,
          } //矩形新坐标，高度
          const imageData = _this.ctx.getImageData(0, 0, _this.canvasWidth, _this.canvasHeight)
          canvas.onmousemove = function (evt) {
            //移动
            // canvas.style.cursor = 'move'
            // if (_this.mouseOutFlag) {
            //   console.log(121212)
            //   return
            // }
            // console.log(_this.imgScale)
            newRect.width = ((evt.clientX - pos.x) * 2) / _this.imgScale
            newRect.height = ((evt.clientY - pos.y) * 2) / _this.imgScale
            _this.ctx.putImageData(imageData, 0, 0)
            _this.ctx.strokeRect(
              event.offsetX * 2,
              event.offsetY * 2,
              (evt.clientX - pos.x) * 2,
              (evt.clientY - pos.y) * 2
            )

            console.log(_this.imgScale)
            newRect.width = ((evt.clientX - pos.x) * 2) / _this.imgScale
            newRect.height = ((evt.clientY - pos.y) * 2) / _this.imgScale
            _this.ctx.putImageData(imageData, 0, 0)
            _this.ctx.strokeRect(
              event.offsetX * 2,
              event.offsetY * 2,
              (evt.clientX - pos.x) * 2,
              (evt.clientY - pos.y) * 2
            )
          }
          canvas.onmouseout = function () {
            _this.mouseOutFlag = true
          }
          canvas.oncontextmenu = function () {
            newRect.x = parseInt(newRect.x)
            newRect.y = parseInt(newRect.y)
            newRect.width = parseInt(newRect.width)
            newRect.height = parseInt(newRect.height)
            _this.$bus.$emit('coordinate', newRect)
            _this.rectList.push(newRect)
            _this.drawStrokeRect() //绘制矩形区域
            canvas.onmousemove = null
            canvas.onmouseup = null
            return false
          }
        }
      }

      canvas.onmousewheel = canvas.onwheel = function (event) {
        //滚轮放大缩小
        const wheelDelta = event.wheelDelta ? event.wheelDelta : event.deltalY * -40 //获取当前鼠标的滚动情况
        if (wheelDelta > 0) {
          _this.imgScale *= 1.1
        } else if (_this.imgScale > 0.5) {
          _this.imgScale *= 0.9
        }
        _this.drawImage(_this.imgObject) //重新绘制图片
        event.preventDefault && event.preventDefault()
        return false
      }
    },
  },
}
</script>
<style scoped lang="scss"></style>
