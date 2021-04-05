//数据库全局变量
const db = wx.cloud.database();
const feedback = db.collection('feedback');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    contact:"",
    message:""
  },

  //表单提交事件

  onChange(e){
    const input =e.detail;
    this.setData({[e.target.dataset.name]:input});
  },

  //提交就是要把里面的数据取出来
  //表单提交到数据库
  submit(e){
    const {name, contact, message} = this.data;
    if(message){
      feedback.add({
        data:{
          name,contact,message
        }
      }).then(()=>{
        wx.showToast({
          title: '提交成功',
        });
        this.setData({name:'',contact:'',message:''})
      })
    }else{
      wx.showModal({
        title: '请输入留言',
        confirmColor: '#9866F2',
        cancelColor:'#777'
      })
    }
  }

})