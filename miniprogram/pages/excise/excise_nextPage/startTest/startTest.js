// pages/excise/excise_nextPage/startTest/startTest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  enterTest(){
    wx.navigateTo({
      url: '../../../questionsPage/testDetail/testDetail',
    });
    console.log("dianji")
  }


})