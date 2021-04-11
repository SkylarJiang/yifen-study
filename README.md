# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

--------

# 项目简介 

## 一、功能介绍

基于微信小程序的仪器分析学习平台，包括以下几个模块的功能。

### 1. 登录及注册

#### 1.1 登录

- 校验是否已经输入账号密码，账号是否为8位数字，是否已经注册，密码是否正确

<img src="https://github.com/SkylarJiang/yifen-study/blob/master/miniprogram/images/readme/%E7%99%BB%E5%BD%95%E9%A1%B5.gif?raw=true" width="300" />

#### 1.2 注册页面

<img src="http://pictures-by-skylar.oss-cn-shenzhen.aliyuncs.com/img/登录.jpg" alt="登录" style="zoom: 33%;" width="300" />

#### 1.3 个人信息展示、退出登录

​	

<img src="https://github.com/SkylarJiang/yifen-study/blob/master/miniprogram/images/readme/%E9%80%80%E5%87%BA%E7%99%BB%E5%BD%95.gif?raw=true" alt="登录" style="zoom: 33%;" width="300" />



### 2. 消息的发布及展示

- 在首页展示发布的消息
  - 当天发布的消息会有“new”标志
  - 实现上拉加载更多和下拉刷新

<img src="https://github.com/SkylarJiang/yifen-study/blob/master/miniprogram/images/readme/%E9%A6%96%E9%A1%B5.gif?raw=true" width="300" />

### 3. 课件上传和下载

- 列表展示课件

- 点击下载并自动打开

  <img src="https://github.com/SkylarJiang/yifen-study/blob/master/miniprogram/images/readme/%E8%AF%BE%E4%BB%B6%E4%B8%8B%E8%BD%BD.gif?raw=true" alt="背题模式答案" width="300" />

### 4. 题库上传和做题

- 包括自主练习和限时测试两个部分

<img src="http://pictures-by-skylar.oss-cn-shenzhen.aliyuncs.com/img/test.jpg" alt="test" width="300" text-aalign="center"/>



#### 4.1 自主练习部分

##### 4.1.0 题目详情

- 普通模式：包括章节练习、分类练习、题库刷题、收藏夹
  1. 顶部：题目章节和类型、收藏和取消收藏按钮、做题进度和总题数
  2. 题目部分：题号、强调题型、题目及选项
  3. 答案部分：显示答案和解析，选择了错误选项或者点击“点击查看答案”后弹出
  4. 正确逻辑：显示“做对啦”并跳转到下一题；最后一题时不跳转并提示
  5. 错误逻辑：不跳转；弹出答案部分；记录错误题目和选项

<img src="https://github.com/SkylarJiang/yifen-study/blob/master/miniprogram/images/readme/%E9%A2%98%E7%9B%AE%E8%AF%A6%E6%83%85.gif?raw=true" alt="背题模式答案" width="300" />

- 特殊模式：错题本和背题模式，1、2、4、5均和普通模式一致，3答案部分略有不同

  1. 错题本：弹出时在普通模式的基础上增加了“上次的错误选项”部分

     <img src="C:%5CUsers%5Chz%5CDesktop%5C%E5%8E%9F%E5%9E%8B%E5%9B%BE%5Cwrong.jpg" alt="wrong" width="300"/>

  2. 背题模式：不设置“点击查看答案”，答案直接展示在题目下方

     <img src="http://pictures-by-skylar.oss-cn-shenzhen.aliyuncs.com/img/背题模式答案.jpg" alt="背题模式答案" width="300" />



##### 4.1.1 章节练习

- 章节选择
  1. 点击进入相应章节的练习
  2. 章节较多，以手风琴模式展开

<img src="https://github.com/SkylarJiang/yifen-study/blob/master/miniprogram/images/readme/章节选择.gif?raw=true" alt="image-20210411093857988" width="300"/>



##### 4.1.2 分题型练习

- 点击进入相应题型

<img src="http://pictures-by-skylar.oss-cn-shenzhen.aliyuncs.com/img/zhangjei .jpg" alt="zhangjei " width="300" />

##### 4.1.3 背题模式

直接在题目中展示答案及解析，需要自己手动做题之后才能切换到下一题



##### 4.1.4 题库练习

获取题库中所有题目



##### 4.1.5 错题本

会返回做错过的题目，并在答案中显示上一次的错误答案



##### 4.1.6 收藏夹

会返回点击收藏的题目



#### 4.2 限时测试部分

1. 开始考试页面：点击即进入考试，倒计时开始
2. 题目详情页面：
   - 顶部：倒计时、查看答题概览、收藏、做题进度
   - 题目：序号、题型强调、题目及选项
   - 跳转：用户选择后进入下一道题；最后一道题后提示是否提交；倒计时结束后强制提交

<img src="https://github.com/SkylarJiang/yifen-study/blob/master/miniprogram/images/readme/%E6%B5%8B%E8%AF%95.gif?raw=true" alt="image-20210411093857988" style="zoom: 33%;" />

### 5. 问题反馈及收集

- 提交时显示提交成功或“请输入留言”

<img src="http://pictures-by-skylar.oss-cn-shenzhen.aliyuncs.com/img/feedback.jpg" alt="feedback" width="300"/>

## 二、其他

- 共有首页、课件、练习、我的四个tab
- 使用云开发的cms系统进行内容管理，可以方便、可视化地实现题库操作、用户管理、消息发布、课件上传等功能