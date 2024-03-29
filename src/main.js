/*
 * @Description: 
 * @Date: 2021-05-07 19:32:33
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';

import './assets/css/global.css'
import './styles/button.less'
import './assets/fonts/iconfont.css'
import './styles/JCButtons.css'
import moment from 'moment'
import 'nprogress/nprogress.css'
import axios from 'axios'
import './icons'
import './router/permission'



//自动滚动插件
import scroll from 'vue-seamless-scroll'
// 导入依赖插件
import TreeTable from 'vue-table-with-tree-grid'

import dataV from '@jiaminghi/data-view'

// 弹出框
import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css';
import clipboard from 'clipboard';

//富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

//Mrkdown编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

//侧边记录组件
import FloatBall from './components/FloatBall.vue'

//
import AFTableColumn from 'af-table-column'
// use
Vue.use(mavonEditor)

Vue.use(VueQuillEditor, /* { default global options } */ )

Vue.prototype.clipboard = clipboard;

Vue.prototype.$layer = layer(Vue);


Vue.use(scroll)
Vue.use(dataV)
Vue.use(ElementUI);

Vue.prototype.$moment = moment
Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return dataStr != undefined && moment(dataStr).isValid() ? moment(dataStr).format(pattern) : ""
});
Vue.prototype.dateFormat = function (row, column, cellValue, index) {
  return moment(cellValue).isValid() && cellValue != "0001-01-01T00:00:00" ? moment(cellValue).format('YYYY-MM-DD HH:mm:ss') : ""
};


Vue.config.productionTip = false

// 注册全局组件
Vue.component('tree-table', TreeTable)
Vue.component('FloatBall', FloatBall)
Vue.use(AFTableColumn)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')