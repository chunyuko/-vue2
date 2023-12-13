import { ref } from 'vue'
import { useContextMenu } from '@/utils/hooks/useVue'

export default function onContextmenu(contextmenuFn, emits) {
  // 右键菜单插件实例
  const contextmenu = useContextMenu()

  const onContextmenu = (event, data, node) => {
    // console.log('@@@', event, data, node)
    emits('nodeContext', event, data, node)
    const menuList = contextmenuFn(event, data, node)
    // console.log(menuList, '右键菜单列表')
    if (!menuList) {
      return
    }

    contextmenu({
      items: menuList,
      event,
      customClass: 'custom-class',
      zIndex: 2004,
      minWidth: 150,
    })
  }

  return {
    onContextmenu,
  }
}
