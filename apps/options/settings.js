import toolsInfo from './tools.js'
// 所有配置项
const optionItems = []

const menuOptions = {}

// 数据库维护两个表， group  tools

const Settings = (() => {
  /**
   * 由background-page触发
   * @param {Function} callback
   */
  function _getOptsFromBgPage (callback) {
    if (callback && typeof callback === 'function') {
      let result = {}
      //   _getAllOpts().forEach(item => {
      //       const opt = localStorage.getItem(item)
      //       if(item === 'MAX_JSON_KEYS_NUMBER'){

      //       }
      //   })
      callback.call(null, result)
    }
  }

  function _getAllOpts () {
    return optionItems.concat(Object.keys(menuOptions))
  }

  /**
   * 获取所有工具的列表
   */
  function _getAllTools () {
    return toolsInfo
  }

  /**
   * 获取已经安装的工具列表，从所有工具列表中过滤出已经安装的
   */
  function _getInstalledTools (callback) {
    const installedGroup = toolsInfo.map(group => {
      const { tools, ...rest} = group;
      const installedTools = tools.filter(tool => tool.installed)
      return {
        ...rest,
        tools: installedTools
      }
    })
    callback && callback(installedGroup)
  }

  return {
    getOptsFromBgPage: _getOptsFromBgPage,
    getAllOpts: _getAllOpts,
    getAllTools: _getAllTools,
    getInstalledTools: _getInstalledTools
  }
})()

export default Settings
