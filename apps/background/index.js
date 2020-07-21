import MSG_TYPE from '/static/js/msg_type.js'
import Settings from '/options/settings.js'

class BgPage {
  //   constructor () {}

  init () {
    this._checkUpdate()
    this._addExtensionListener()
    this._createOrRemoveContextMenu()
    this._localDataSyncByGoogle()
  }

  /**
   * 检测插件更新
   * @private
   */
  _checkUpdate () {
    setTimeout(() => {
      chrome.runtime.requestUpdateCheck(status => {
        if (status === 'update_available') {
          chrome.runtime.reload()
        }
      })
    }, 1000 * 10)
  }

  /**
   * 接收来自content-scripts发来的消息
   */
  _addExtensionListener () {
    chrome.runtime.onMessage.addListener((request, sender, callback) => {
      switch (request.type) {
        case MSG_TYPE.GET_OPTIONS:
          Settings.getOptsFromBgPage(callback)
          break
        case MSG_TYPE.RUNTOOL:
          this._runTool(request.payload, callback)
          break
        default:
          break
      }
    })
  }

  _runTool (config, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const tab = tabs[0]
      if (config.newTab === 1) {
        this._openFileAndRun(tab, config.toolType)
      }
    })
  }

  _createOrRemoveContextMenu () {}

  _localDataSyncByGoogle () {}

  /**
   * 打开对应的文件，运行该功能插件
   */
  _openFileAndRun (tab, file, txt = '') {
    chrome.tabs.query({ windowId: chrome.windows.WINDOW_ID_CURRENT }, tabs => {
      Settings.getOptsFromBgPage(opts => {
        // 查找打开的tab中是否有feTools的tab
        let isOpened = false
        let tabId

        let reg = new RegExp('^chrome.*/' + file + '/index.html$', 'i')
        for (let i = 0, len = tabs.length; i < len; i++) {
          if (reg.test(tabs[i].url)) {
            isOpened = true
            tabId = tabs[i].id
            break
          }
        }

        // 如果已经打开过，直接替换原来的窗口即可
        // if (!isOpened) {
          chrome.tabs.create(
            {
              url: '' + file + '/index.html',
              active: true
            },
            this._tabUpdatedCallback(file, txt)
          )
        // } else {
        //   // TODO: update后，highlighted窗口有问题。
        //   this._selectedTab(tabId, file, txt)
        // }
      })
    })
  }
  /**
   * tab创建或更新后的回调函数
   */
  _tabUpdatedCallback (evt, content) {}

  _selectedTab (tabId, file, txt) {
    chrome.tabs.query({ windowId: chrome.windows.WINDOW_ID_CURRENT }, tabs => {
      tabs.forEach(tab => {
        if (tab.id === tabId) {
          chrome.tabs.update(
            tabId,
            { highlighted: true },
            this._tabUpdatedCallback(file, txt)
          )
        } else {
          chrome.tabs.update(tab.id, { highlighted: false })
        }
      })
    })
  }
}

const bgPageInstance = new BgPage()
bgPageInstance.init()
