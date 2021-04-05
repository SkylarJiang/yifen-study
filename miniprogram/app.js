//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      //初试化云开发
      wx.cloud.init({
        env: 'cloud1-9g84b6702ba2c5b6',
        traceUser: true,
      })
    }

    this.globalData = {}
  }
})
