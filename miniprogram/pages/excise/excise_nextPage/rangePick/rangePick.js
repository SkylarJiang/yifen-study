// pages/excise/excise_nextPage/rangePick/rangePick.js
//直接把章节写死算了

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeName: '',
    false: false,
    range: '',
    rangeMess: [{
        groupTitle: "绪论",
        groupsName: ["绪论"]
      },{
        groupTitle: "光谱分析篇",
        groupsName: ["光谱分析法引论", "紫外-可见分光光度法", "红外和拉曼光谱", "分子发光分析", "原子光谱法", "X射线光谱法", "表面分析法", "核磁共振波谱法"]
      },{
        groupTitle: "电分析化学篇",
        groupsName: ["电分析化学引论", "电位分析法", "电解和库仑分析法", "伏安法", "其他电分析方法"]
      },{
        groupTitle: "分离分析篇",
        groupsName: ["色谱法引论", "气相色谱法", "高效液相色谱法", "毛细电泳法"]
      },{
        groupTitle: "其他分析方法篇",
        groupsName: ["质谱法", "流动注射分析", "电路和测量技术基础", "微型计算机在仪器分析中的应用介绍"]
      }
    ]
  },

  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },

  click: function (e) {
    this.setData({
      range: e.currentTarget.dataset.name
    })
    wx.navigateTo({
      url: '../../../questionsPage/detail/detail?actionType=rangePick&range=' + this.data.range,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})