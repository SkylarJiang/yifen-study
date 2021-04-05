// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountFalse: false, // 账号不存在
    passwordFalse: false, // 密码错误
    account: '',
    password: '',
    accountFalseMess: '请输入有效学号',
    passwordFalseMess: '请输入密码'
  },

  onLoad: function (options) {

  },

  //失焦的时候就该做前端判断了
  onFieldFinish: function (e) {
    //输入为空、不为7为数字、【没有注册】的时候为错误
    if (!this.data.account || this.data.account.length !== 8) {
      this.setData({
        accountFalse: true
      });
      return
    } ;

    //密码为空或者不符合的时候显示错误


  },

  //获取输入的内容
  onFieldChange: function (e) {
    const input = e.detail;
    this.setData({
      [e.target.dataset.name]: input
    });
    //哪个框的内容改变之后就清空这个框的提示
    if (e.target.dataset.name === 'account') {
      this.setData({
        accountFalse: false
      })
    };
    if (e.target.dataset.name === 'password') {
      this.setData({
        passwordFalse: false
      })
    }
  },


  //点击登录的时候就会进行校验
  check: function (e) {

    //提交的时候看看密码写了没
    if (!this.data.password) {
      this.setData({
        passwordFalse: true
      });
      return
    }


    //查询是否存在该账号
    wx.cloud.database().collection('studentList').where({
        number: this.data.account
      }).get()
      .then(res => {
        console.log(res.data)
        //没有这个账号
        if (res.data.length === 0) {
          this.setData({
            accountFalse: true,
            accountFalseMess: "账号未注册"
          })
        } else if (res.data[0].password !== this.data.password) {
          this.setData({
            passwordFalse: true,
            passwordFalseMess: "密码错误"
          })
        } else {
          //可以成功登陆了，跳转到首页去
          wx.showToast({
            title: '登录成功',
          })
          wx.switchTab({
            url: '../home/home',
          })
        }
      })
  }

})