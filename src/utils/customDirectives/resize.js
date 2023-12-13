import { debounce } from './utils'

/**
 * 监听元素的尺寸变化
 * binding.value：传入一个方法，为尺寸改变时触发的回调函数
 * binding.arg：传入防抖的时间，选填
 */
export default {
  name: 'resize',
  bind(el, binding, vnode) {
    // binding.handler = debounce(binding.value, binding.arg || 300)
    if (!binding.value) {
      return
    }
    binding.handler = binding.value
    el._resizer = new window.ResizeObserver(binding.handler)
    el._resizer.observe(el)
  },
  unbind(el, binding) {
    if (el._resizer) {
      el._resizer.disconnect()
    }
  },
}
