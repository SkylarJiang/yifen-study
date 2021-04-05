// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1545870276,37099344&fm=26&gp=0.jpg"
  },
  logout: function(){
    wx.navigateTo({
      url: '../login/login',
    })
  }

  //获取个人信息并且渲染到页面上
  
})

