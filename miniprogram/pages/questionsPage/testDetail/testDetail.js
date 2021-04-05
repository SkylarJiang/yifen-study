//从数据库中取出


Page({
  data: {
    time: 10 * 1000, //计时器
    located: false, //是否定位标记
    collected: false, //是否收藏
    radio: null, //是否选中
    current: 1,
    total: "0",
    subject: {},
    subjectList: [],
    subjectId: null,

    //判断成绩的部分
    rights: "0", //答对了的数量
  },
  // 单选框的点击事件
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },

  onChangeTimer(e) {
    this.setData({
      timeData: e.detail,
    });

    //时间到了就自动提交
    if(e.detail.minutes == 0 && e.detail.seconds ===0){
      wx.showModal({
        title: '时间已经到，将为您自动提交',
        confirmColor: '#9866F2',
        cancelColor: '#777'
      }).then(
        this.submitScore()
      )
    }
  },

  //停止计时器的方法
  pause(){
    const countDown = this.selectComponent('.control-count-down');
    countDown.pause();
  },

  //提交成绩的方法
  submitScore(e){
    this.pause()
    wx.navigateTo({
      url: "../testScore/testScore",
    }).catch(err=>{
      console.log("err",err)
    })
  },

  onClick(event) {
    self = this;
    const {
      name
    } = event.currentTarget.dataset;
    this.setData({
      radio: name,
    });

    //判断选的答案对不对
    //只要选了就条到下一题，错了的话就记录错误选项
    //到最后一道题的时候就出现提交按钮

    if (self.data.total === self.data.current) {
      //直接问，提前完成了，是否需要提交
      wx.showModal({
        title: '立即提交答案？',
        confirmColor: '#9866F2',
        cancelColor: '#777'
      }).then(res=>{
        if(res.confirm){
          this.submitScore()
        }
      }
        
      )
    } else {
      //如果后面还有题选择了之后自动切到下一题
      const next = function () {
        let num = self.data.current + 1;
        let subject = self.data.subjectList[num - 1];
        let subjectId = subject._id;
        self.setData({
          current: num,
          subject,
          subjectId,
          //切换到下一题之后还要清空选项
          radio: null
        });
      }
      setTimeout(next, 400)
    }


    //如果答错了需要记录本次错误答案
    if (this.data.subject.answer !== name) {
      wx.cloud.callFunction({
        name: "collected_wrong",
        data: {
          id: this.data.subjectId,
          wrongAnswer: name,
          action: 'wrong'
        }
      }).then(res => {
        console.log('修改状态成功')
      })
    }
  },

  //点击切换是否收藏
  toggleCollect() {
    this.setData({
      collected: !this.data.collected
    });
    wx.cloud.callFunction({
      name: "collected_wrong",
      data: {
        id: this.data.subjectId,
        collected,
        action: collected
      }
    }).then(res => {
      console.log('修改状态成功')
    })
  },

  //是否点击定位
  //点击切换是否收藏
  toggleLocation() {
    this.setData({
      located: !this.data.located
    })
  },

  onLoad: function (options) {
    const db = wx.cloud.database().collection('questions');
    const questions = db.where({
      type: '单选题'
    });

    //加载动画
    wx.showLoading({
      title: '加载中'
    });

    //加载第一道题
    questions.get().then(res => {
      console.log(res)
      const subjectList = res.data;
      this.setData({
        subjectList,
        //第一道题
        subject: subjectList[0],
        //总题数
        total: subjectList.length,
        //获取id
        subjectId: subjectList[0]._id,
        collected: subjectList[0].collected
      })
    }).then(
      wx.hideLoading(),
      console.log("加载好了")
    )
  },


})