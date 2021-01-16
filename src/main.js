import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/vcharts.js'
import echarts from 'echarts'
import VueECharts from 'vue-echarts'
import './style/index.css'
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
// import VueHighlightJS from 'vue-highlightjs'
import hljs from 'highlight.js';
// import 'highlight.js/styles/atom-one-dark.css' //样式文件
// import 'highlight.js/styles/atelier-dune-light.css' //样式文件

Vue.directive('highlight',function (el) {
    let blocks = el.querySelectorAll('pre code');
    setTimeout(() =>{
        blocks.forEach((block)=>{
            hljs.highlightBlock(block)
        })
    }, 200)
})
// import vueHljs from "vue-hljs";
// // import "vue-hljs/dist/vue-hljs.min.css";
//  Vue.use(vueHljs);
// Vue.component('v-chart', VueECharts)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
