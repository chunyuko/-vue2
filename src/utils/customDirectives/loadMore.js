import { debounce } from './utils'
/**
 * table 无限加载
 * 传入一个对象，需要传入三个参数：
 * value(必填): 无限加载需要执行的方法
 * target(选填): 监听的元素 class 名
 * delay(选填): 防抖的时间
 */
export default {
  name: 'load-more',
  bind(el, binding, vnode) {
    const { value, target = '.el-table__body-wrapper', delay = 300 } = binding.value
    if (!value) {
      console.log('未传入执行的方法')
      return
    }
    const targetEl = el.querySelector(target)
    if (!targetEl) {
      console.log('未找到容器')
      return
    }
    // 绑定无限加载需要执行的事件
    binding.handler = debounce(function () {
      const { scrollTop, scrollHeight, clientHeight } = targetEl
      if (scrollHeight <= scrollTop + clientHeight) {
        value && value()
      }
    }, delay)
    // 绑定监听
    targetEl.addEventListener('scroll', binding.handler)
  },
  unbind(el, binding) {
    el.removeEventListener('scroll', binding.handler)
    el = null
  },
}
