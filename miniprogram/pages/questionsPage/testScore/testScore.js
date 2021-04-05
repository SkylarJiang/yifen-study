// pages/questionsPage/testScore/testScore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: 0, //进度条百分比
    gradientColor: { //进度条渐变色
      '0%': '#eee',
      '100%': '#9866F2',
    }
  },


  onLoad: function (options) {
    console.log(options)
  },

})