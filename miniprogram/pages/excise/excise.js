// pages/excise/excise.js
Page({
  data: {
    actionType:""
  },

  click: function(e){
    this.setData({actionType:e.currentTarget.dataset.name});
    wx.navigateTo({
      url: '../questionsPage/detail/detail?actionType='+ this.data.actionType
    })
  }
})