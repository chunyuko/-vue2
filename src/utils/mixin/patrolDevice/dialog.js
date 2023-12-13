export const dialgDrag = {
  directives: {
    drag: {
      // 指令的定义
      bind: function (el) {
        // 获取当前元素
        const ocDiv = el
        const ocDivp = el.querySelector('.el-dialog__header')
        // console.log(ocDivp, 'jd')
        ocDivp.onmousedown = (e) => {
          // 算出鼠标相对元素的位置
          // console.log(e)
          const disX = e.clientX - ocDiv.offsetLeft
          const disY = e.clientY - ocDiv.offsetTop
          console.log('disX', disX, 'disY', disY)
          ocDivp.onmousemove = (e) => {
            // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            const left = e.clientX - disX
            const top = e.clientY - disY
            // console.log('left', left, 'top', top, 'oDiv', ocDiv)
            ocDiv.style.left = left - 6 + 'px'
            ocDiv.style.top = top - 16 + 'px'
            ocDivp.onmouseup = () => {
              ocDivp.onmousemove = null
              // ocDivp.onmouseup = null
            }
          }
          ocDivp.onmouseup = () => {
            ocDivp.onmousemove = null
          }
        }
        ocDivp.onmouseup = () => {
          ocDivp.onmousemove = null
          // ocDivp.onmouseup = null
        }
      },
    },
  },
}
