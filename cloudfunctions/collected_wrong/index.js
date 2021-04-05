// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  if(event.action == 'collected'){
    return await cloud.database().collection('questions').doc(event.id)
    .update({
      data:{
        collected: event.collected
      }
    }).then(res=>{
      console.log('改变状态成功',res)
    }).catch(res=>{
      console.log('改变失败',res)
    })
  }else if(event.action==='wrong'){
    return await cloud.database().collection('questions').doc(event.id)
    .update({
      data:{
        wrong: true,
        wrongAnswer: event.wrongAnswer
      }
    }).then(res=>{
      console.log('改变状态成功',res)
    }).catch(res=>{
      console.log('改变失败',res)
    })
  }
}