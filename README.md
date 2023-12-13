# company-station-project

## Project setup
```
yarn
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

# 项目信息
[vue2官方文档](https://v2.cn.vuejs.org/)，
[vue3官方文档](https://cn.vuejs.org/),
[element-ui官方文档](https://element.eleme.cn/#/zh-CN)
由于vue的2.7版本支持vue2和vue3两种写法，所以暂定为2.7版本开发
本项目支持使用 vue2(配置式) 和 vue3(组合式) 两种写法。具体语法等通过上面的链接学习查看。<br>
需要注意的是，vue3的组合式还存在一种单文件组件`<script setup>`的写法，后续的例子中，vue3的例子皆为`<script setup>`写法，需要自己转换一下。<br><br>
ui库使用的 element-ui ,具体使用查看上面的链接<br>
如果使用的是 composition api(组合式)的写法，对于一些 api 的使用请从 `src/utils/hooks` 内调用。<br><br>

<strong>
  注意：
  <ol>
    <li>
      为了兼容 组合式 setup 写法，关闭了代码规范的对未使用变量的检测，平时写代码记得多看看并删除多定义的无用变量和 import 引用。 
    </li> 
    <li>
      写代码时请多使用组件，原则上当一个文件行数超过 600 行，就得考虑拆分文件了。
    </li> 
  </ol>
</strong>

## 路由的配置
下面是路由的配置。
``` js
const routes = [
  {
    // 路由名称
    name: '',
    // 路由地址
    path: '',
    // 路由重定向（需要重定向时填写）
    redirect: '',
    // 路由指向，本项目有封装路由动态赋值，只需要填写 null
    component: null,
    meta: {
      // 页面路由的唯一标识
      id: number,
      // 菜单名称(中文)
      title: string,
      // 权限
      roles: number[],
      // 是否需要缓存
      keepAlive: boolean,
      // 是否隐藏
      isHide: boolean,
      // 是否是 layout 布局
      isLayout: boolean,
      // 路由排序的序号，序号越小排名越前
      sort: number,
      //菜单图标，本项目有内置 xicons 图标
      icon: ,
    },
    // 子路由的配置
    children: [],
  },
]
```
需要注意的是：如果是需要网页展示的页面，需要两层嵌套，第一层为 layout ，第二层才为配置的页面。

## 主题的设置与切换
对于主题的设置我们需要注意 `assets/style/theme` 内的 elementUI 文件夹和 views 文件夹。<br>
<ol>
<li>elementUI 文件夹：定义 element-ui 的 ui 主题</li>
<li>views 文件夹：定义我们自己写的元素的主题</li>
</ol>
定义后再在 themeMixin.scss 内进行引用。<br>


## 兄弟组件之间的交互
对于兄弟组件之间的交互，请使用 eventBus。<br>
如果是父子组件之间的交互，请使用 props、emit。爷孙组件之间请使用：provide 和 inject 。
<strong>需要注意：绑定 eventBus 事件后一定要记得在生命周期 beforeDestroy 内销毁事件</strong><br>
例如下：<br><br>
配置式：
``` js
// 兄弟 A 组件
export default {
  mounted() {
    const _this = this
    // 绑定事件
    _this.$bus.$on('hello', function (msg) {
      console.log(`这是兄弟组件A，收到消息${msg}`)
    })
  },
  beforeDestroy() {
    const _this = this
    // 销毁事件（重要）
    _this.$bus.$off('hello')
  },
}

// 兄弟 B 组件
<el-button type="primary" @click="sayHello">click me.</el-button>

export default {
  methods: {
    sayHello() {
      const _this = this
      // 调用事件
      _this.$bus.$emit('hello', '：这里是兄弟B')
    },
  },
}
```
组合式：
``` js
// 兄弟 A 组件
import { defineComponent, onMounted, onUnmounted } from 'vue'
import { useEventBus } from '@hooks/useVue'
const bus = useEventBus() // 获取 eventBus 实例
onMounted(() => {
  // 绑定
  bus.$on('hello', function (msg) {
    console.log(`这是兄弟组件A，收到消息${msg}`)
  })
})
onUnmounted(() => {
  // 销毁
  bus.$off('hello')
})

// 兄弟 B 组件
<el-button type="primary" @click="sayHello">click me.</el-button>
const bus = useEventBus()
const sayHello = () => {
  bus.$emit('hello', '：这里是兄弟B')
}
```

## 文件结构树


```
company-station-project
├─ .browserslistrc
├─ .env                         // 环境变量文件
├─ .env.development             // 环境变量文件(开发环境适用)
├─ .env.production              // 环境变量文件(生产环境适用)
├─ .eslintignore                // eslint 忽略检测的文件
├─ .eslintrc.js                 // eslint 配置
├─ .prettierignore              // prettier 忽略检测文件
├─ .prettierrc.js               // prettier 配置
├─ babel.config.js              // babel 配置文件
├─ jsconfig.json                
├─ package.json                 // npm 配置文件
├─ public                       // 整个项目的入口文件(自动生成的，不用管)
│  ├─ favicon.ico
│  └─ index.html
├─ README.md
├─ src                          // vue 的入口文件夹
│  ├─ App.vue                   // vue 页面的入口文件
│  ├─ assets                    // 静态资源文件夹
│  │  ├─ images                 // 图片文件夹(公用的放在 common 文件夹，单页面用放在自己创建的文件夹中)
│  │  │  └─ layout              // layout 相关的图片文件夹
│  │  └─ style                  // css
│  │     ├─ base.scss           // 基础 css
│  │     ├─ index.scss          // css 整个的入口文件
│  │     ├─ theme               // 主题相关文件夹
│  │     │  ├─ elementBase.scss        // element-ui 基础 css
│  │     │  ├─ elementUI               // element-ui 的主题文件夹
│  │     │  │  └─ blueTheme            // 蓝色主题文件夹
│  │     │  │     ├─ index.scss        // 蓝色主题文件夹的入口
│  │     │  │     └─ layout            // 蓝色主题 layout 相关文件夹
│  │     │  │        ├─ index.scss     // layout 的 css 文件
│  │     │  │        └─ variables.scss // 变量文件
│  │     │  └─ views                   // 自己写的页面的主题文件夹
│  │     │     └─ blueTheme.scss       // 蓝色主题文件
│  │     ├─ themeMixin.scss            // 主题的入口文件
│  │     └─ transition.scss            // 过渡动画文件
│  ├─ components                       // 组件文件夹(要创建组件时，以页面的名字命名文件夹并放入，公用的放入 common 文件夹)
│  │  └─ layout                        // layout 相关组件文件夹
│  │     ├─ index.vue
│  │     ├─ layoutContent
│  │     │  └─ index.vue
│  │     ├─ layoutHeader
│  │     │  └─ index.vue
│  │     └─ layoutMenu
│  │        ├─ columnMenu.vue
│  │        ├─ common
│  │        │  └─ sidebar.vue
│  │        └─ rowMenu.vue
│  ├─ constant                         // 缓存的统一名称文件夹
│  │  ├─ index.js
│  │  └─ router.js
│  ├─ element                          // element-ui 的动态引入文件夹
│  │  ├─ fix.js
│  │  └─ index.js
│  ├─ main.js                          // vue 的入口文件
│  ├─ router                           // vue-router 文件夹
│  │  ├─ index.js
│  │  ├─ modules                       // 页面的路由文件夹
│  │  │  ├─ base.js
│  │  │  ├─ generalInfomation.js
│  │  │  ├─ inspectEquipMng.js
│  │  │  └─ realTimSurveillance.js
│  │  ├─ originalRouteApi.js
│  │  ├─ processRoute.js
│  │  └─ routerGuards.js
│  ├─ service                          // axios 文件夹
│  │  ├─ api
│  │  ├─ axios.js
│  │  └─ index.js
│  ├─ store                            // vuex 文件夹
│  │  ├─ index.js
│  │  └─ modules                      
│  │     ├─ layoutTabsSetting.js
│  │     └─ routerSetting.js
│  ├─ utils                            // 工具文件夹
│  │  ├─ cookie
│  │  │  └─ index.js
│  │  ├─ global.js                     // 全局的工具文件
│  │  ├─ hooks                         // hooks 文件夹，主要是 vue3 写法调用
│  │  │  ├─ useCommon.js
│  │  │  └─ useVue.js
│  │  └─ storage
│  │     └─ index.js
│  └─ views                            // 页面文件夹
│     ├─ error
│     │  └─ 404.vue
│     ├─ generalInfomation
│     │  ├─ controlStationOverview.vue
│     │  └─ substationOverview.vue
│     ├─ login.vue
│     └─ realTimSurveillance
├─ vue.config.js                        // vue-cli 配置文件夹
└─ yarn.lock                            // (自动生成的不用管)

```

## 关于一些页面存在 iframe 的数据交互
### 摄像机实时监控
本项目需要的参数对象：
``` js
// window.CameraInfo:{
//   CameraID: 摄像头 id
//   CameraType: 摄像头类型，0红外1可见光
//   CarID: 机器人 id
// }
```