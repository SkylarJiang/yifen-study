// pages/data/data.js
Page({
  data: {
    activeNames: [],
    fileList_1:[],
    fileList_2:[],
    fileList_3:[],
    fileList_4:[],
    fileList_5:[]
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },

  click(e){
    console.log('看传过来了什么',e.currentTarget.dataset.name)
    const downloadTask = wx.cloud.downloadFile({
      fileID: e.currentTarget.dataset.name,
    }).then(res=>{
      const filePath = res.tempFilePath;
      wx.openDocument({
        filePath: filePath
      }).then(res=>{
        console.log('打开文档成功')
      })
    });



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const fileList = wx.cloud.database().collection('file');

    fileList.where({
      chapter: "introduction"
    }).get().then(res => {
      this.setData({
        fileList_1: res.data
      });
      console.log(res.data)
    })

    fileList.where({
      chapter: "spectrum"
    }).get().then(res => {
      this.setData({
        fileList_2: res.data
      });
    })

    fileList.where({
      chapter: "electricity"
    }).get().then(res => {
      this.setData({
        fileList_3: res.data
      });
    })

    fileList.where({
      chapter: "separate"
    }).get().then(res => {
      this.setData({
        fileList_4: res.data
      });
    })

    fileList.where({
      chapter: "other"
    }).get().then(res => {
      this.setData({
        fileList_5: res.data
      });
    })

  }
})