// 所有配置项
const optionItems = []

const menuOptions = {}

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

  return {
    getOptsFromBgPage: _getOptsFromBgPage,
    getAllOpts: _getAllOpts
  }
})()

export default Settings
