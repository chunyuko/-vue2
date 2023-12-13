// ie兼容所需
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'es6-promise/auto'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AddBooksTags from './views/PatrolDevice/commenDevice/addBooksTags'
// import './element/fix'
import element from './utils/element/index'
Vue.use(element)
import 'element-ui/lib/theme-chalk/index.css'

import './utils/global' //全局方法

//右键菜单组件
import Contextmenu from 'vue-contextmenujs'
//解决循环组件注册问题
Vue.component('add-books-tags', AddBooksTags)
Vue.use(Contextmenu)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    // 设置全局事件总线
    Vue.prototype.$bus = this
  },
}).$mount('#app')
