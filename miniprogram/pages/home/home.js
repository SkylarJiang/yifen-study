// pages/home/home.js
Page({
  data: {
    //slider相关参数
    slider:[],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 2000,
    circular: true,
    //消息列表
    message: [],
    isComplete: false,
    //返回的数据开始位置
    start: 0
  },


  onLoad: function (options) {

    this.getMessageData();
    this.getSliderPic();
  },

  //slider图片获取
  //【不知道为什么不成功】
  getSliderPic: function(){
    wx.cloud.database().collection('sliderPic')
    .get()
    .then(res=>{
      this.setData({
        slider: res.data
      })
      console.log("slider获取成功",res)
    })
    .catch(err=>{
      console.log("slider获取失败",err)
    })
  },


  getMessageData: function () {
    //显示正在加载
    wx.showLoading({
      title: '加载中'
    })
    //去请求数据（云函数）
    wx.cloud.database().collection('messageList').orderBy('_createTime', 'desc').skip(this.data.start).limit(5)
      .get()
      .then(res => {
        //如果获取数据成功
        //关闭加载动画
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        //如果还有数据的话就合并数据
        if (res.data.length !== 0) {
          let newData = this.data.message.concat(res.data)
          this.setData({
            message: newData
          });
        } else {
          //没有的话就展示没有更多了
          this.setData({
            isComplete: true
          })
        }
      })
      .catch(err => {
        console.log("获取失败")
      })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    //重置页数为1
    this.data.start = 0;
    //清除原有数据
    this.data.message = [];
    //重新请求第一页
    this.getMessageData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const start = this.data.start + 5
    this.setData({
      start
    })
    this.getMessageData();
  }
})