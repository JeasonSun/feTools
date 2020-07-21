/**
 * FeTools Popup Menu
 */
import MSG_TYPE from '../static/js/msg_type.js'
console.log(MSG_TYPE)
/* eslint-disable */
new Vue({
  el: '#popup-pageContainer',
  data () {
    return {
      manifest: {},
      canMeShow: {},
      installedGroup: [
        {
          group_name: '常用工具',
          list: [
            {
              name: 'JSON美化工具',
              icon: 'json'
            }
          ]
        }
      ]
    }
  },
  created () {
    // 获取当前ctx的version
    this.manifest = chrome.runtime.getManifest()
    // const Settings = Tarp.require('../options/settings')
    // TODO: 根据配置，控制功能菜单的显示与隐藏
    // Settings.getOptions(opts => (this.canMeShow = opts))
    // TODO:ajax debugger开关文案控制
  },
  mounted () {},
  methods: {
    /**
     * toolType:组件的名称
     * newTab: 是否打开新的tab
     */
    runTool: function (toolType, newTab) {
      chrome.runtime.sendMessage({
        type: MSG_TYPE.RUNTOOL,
        payload: {
          toolType: toolType,
          newTab: newTab
        }
      })
    }
  }
})
