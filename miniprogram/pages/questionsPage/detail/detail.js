//从数据库中取出


Page({
  data: {
    radio: null,
    show: false,
    collected: false,
    //当前第几道题
    current: 1,
    total: 0,
    subject: {},
    subjectList: [],
    empty: false,
    subjectId: null,
    showAnswer: false,
    showWrongAnswer: false
  },
  // 单选框的点击事件
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
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
    if (this.data.subject.answer === name) {
      wx.showToast({
        title: '答对啦',
        duration: 600
      });

      //要看是不是最后一道题目
      if (self.data.total === self.data.current) {
        wx.showToast({
          title: '后面没有题目啦',
          icon: '',
          duration: 2000
        });
      } else {
        //对的化还要切换到下一题
        let num = self.data.current + 1;
        let subject = self.data.subjectList[num - 1];
        let subjectId = subject._id;
        self.setData({
          current: num,
          subject,
          subjectId,
          //切换到下一题之后还要清空选项
          radio: null,
          collected: false
        });
      }
    } else {
      self.setData({
        show: true
      });
      //不对的话要记录到错题本
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

  //弹出层的事件
  showPopup() {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  //点击切换是否收藏
  toggleCollect() {
    const collected = !this.data.collected;
    this.setData({
      collected
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




  onLoad: function (options) {
    const db = wx.cloud.database().collection('questions');
    let questions;
    //判断是章节选择、类型选择、收藏、错题库等，根据传入的条件从题库中抽取题目
    switch(options.actionType){
      case 'rangePick':
        questions = db.where({
          range: options.range
        });
        break;
      case "typePick":
        questions = db.where({
          type: options.type
        });
        break;
      case "wrongList":
        questions = db.where({
          type: options.type
        });
        this.setData({showWrongAnswer:true})
        break;
      case "collectedList":
        questions = db.where({
          collected: true
        });
        break;
      case "questionBank":
        questions = db.where({});
        break;
      case "memorize":
        questions = db.where({});
        this.setData({showAnswer:true})
        break;
    }

    //加载动画
    wx.showLoading({
      title: '加载中'
    });

    questions.get().then(res => {
      const subjectList = res.data;
      if (subjectList.length === 0) {
        this.setData({
          empty: true
        })
      } else {
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
      }
    }).then(
      wx.hideLoading()
    )
  }
})