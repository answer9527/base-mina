// pages/my/index.js
const app  =  getApp();
import {UserModel} from "../../models/user"
import {promisic2} from "../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList:[
      {
        "tabName": "我的喜欢",
        "tabImage": "./images/like@tag.png",
        "tagUrl": "/pages/likeList/index"
      },
      {
        "tabName": "我的消息",
        "tabImage": "./images/msg@tag.png",
        "tagUrl": ""
      },
      {
        "tabName": "时光邮局",
        "tabImage": "./images/mail@tag.png",
        "tagUrl": "/pages/beforeLetter/index"
      },
      {
        "tabName": "树洞",
        "tabImage": "./images/talk@tag.png",
        "tagUrl": "/pages/hole/index"
      }
    ],
    colList:[
      {
        "colName":"申请加入",
        "colImage":"./images/setting@col.png",
        "colUrl":""
      },
      {
        "colName": "意见反馈",
        "colImage": "./images/idea@col.png",
        "colUrl": "/pages/suggest/index"
      },
      {
        "colName": "关于我们",
        "colImage": "./images/about@col.png",
        "colUrl": "/pages/aboutUs/index"
      },
      {
        "colName": "版本说明",
        "colImage": "./images/version@col.png",
        "colUrl": "/pages/version/index"
      },
      {
        "colName": "联系我们",
        "colImage": "./images/contact@col.png",
        "colUrl": ""
      }
    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    default_avatar:"/images/default_avatar.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userInfo){
      this.setData({
        userInfo:app.globalData.userInfo,
        hasUserInfo:true
      })
    }


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  async getUserInfo(e){
    let userInfo = e.detail.userInfo
    let session = await promisic2(wx.login)();
    let result = await UserModel.reigsterAndLogin({
      code:session.code,
      nickName:userInfo.nickName,
      avatarUrl:userInfo.avatarUrl,
      gender:userInfo.gender
    })
    wx.lin.showToast({
      title:"登录成功",
      icon:"success"
    })
    app.globalData.userInfo=e.detail.userInfo
    app.globalData.token = result.data.token
    app.globalData.uid = result.data.uid
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true  
    })
  }
})