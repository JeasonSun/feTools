/**
 * FeTools Popup Menu
 */
import MSG_TYPE from '../static/js/msg_type.js'
import Settings from '../options/settings.js'

/* eslint-disable */
new Vue({
  el: '#popup-pageContainer',
  data () {
    return {
      manifest: {},
      canMeShow: {},
      installedTools: []
    }
  },
  created () {
    // 获取当前ctx的version
    this.manifest = chrome.runtime.getManifest()
    // 获取配置中已经按照的tools
    Settings.getInstalledTools(toolList => {
      this.installedTools = toolList
    })
  },
  mounted () {},
  methods: {
    /**
     * toolType:组件的名称
     * newTab: 是否打开新的tab
     */
    runTool: function (tool) {
      const toolType = tool.name
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
