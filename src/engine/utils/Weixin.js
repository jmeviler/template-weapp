export default class Weixin {
  static _systemInfo

  static getSystemInfo = () => {
    if (!Weixin._systemInfo) {
      Weixin._systemInfo = wx.getSystemInfoSync()
    }

    return Weixin._systemInfo
  }

  static checkSession = () => {
    return new Promise((resolve) => {
      wx.checkSession({
        success: function () {
          resolve(true)
        },
        fail: function () {
          resolve(false)
        },
      })
    })
  }

  static isAndroid = () => {
    return Weixin.getSystemInfo().system.indexOf('iOS') === -1
  }

  static login = () => {
    return new Promise((resolve, reject) => {
      wx.login({
        success: function (res) {
          resolve(res)
        },
        fail: function (err) {
          reject(err)
        },
      })
    })
  }

  static getUserInfo = (lang) => {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        lang,
        withCredentials: true,
        success: function (res) {
          resolve(res)
        },
        fail: function (err) {
          reject(err)
        },
      })
    })
  }

  static authorize = (scope) => {
    return new Promise((resolve, reject) => {
      wx.authorize({
        scope,
        success: function (res) {
          resolve(res)
        },
        fail: function (err) {
          reject(err)
        },
      })
    })
  }

  static showLoading = (option, immediately) => {
    Weixin._loadingCount++
    clearTimeout(Weixin._loadingTimer)
    if (immediately) {
      Weixin._handleLoading(option)
    } else {
      Weixin._loadingTimer = setTimeout(() => Weixin._handleLoading(option), 1000)
    }
  }

  static hideLoading = (immediately) => {
    Weixin._loadingCount--
    clearTimeout(Weixin._loadingTimer)
    if (immediately) {
      Weixin._handleLoading()
    } else {
      Weixin._loadingTimer = setTimeout(() => Weixin._handleLoading(), 1000)
    }
  }

  static _handleLoading = (option) => {
    if (Weixin._loadingCount) {
      if (!Weixin._isLoadingShow) {
        Weixin._isLoadingShow = true
        wx.showLoading(option)
      }
    } else if (Weixin._isLoadingShow) {
      Weixin._isLoadingShow = false
      wx.hideLoading(option)
    }
  }
}
