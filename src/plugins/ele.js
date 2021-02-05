import Vue from 'vue'
import Element from 'element-ui'
import '../element-variables.scss'
Vue.prototype.openLoading = function() {
  const loading = this.$loading({           // 声明一个loading对象
    lock: true,                             // 是否锁屏
    text: '正在加载中...',                     // 加载动画的文字
    // spinner: 'el-icon-loading',             // 引入的loading图标
    // background: 'rgba(0, 0, 0, 0.3)',       // 背景颜色
    target: '.main_table',                    // 需要遮罩的区域
    // body: true,
    // customClass: 'mask'                     // 遮罩层新增类名
  })
  setTimeout(function () {                  // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    loading.close();                        // 关闭遮罩层
  },10000)
  return loading;
}
Vue.use(Element)
