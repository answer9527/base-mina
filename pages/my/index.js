// pages/my/index.js
const app  =  getApp();
import {UserModel} from "../../models/user"
import {promisic2} from "../../utils/util"
import {MsgModel} from "../../models/msg"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scope:false,
    tabList:[
      {
        "tabName": "网抑一下",
        "tabImage": "./images/sentence@tag.png",
        "tagUrl": "/pages/sentence/index",
        "count":0,
      },
      {
        "tabName": "我的消息",
        "tabImage": "./images/msg@tag.png",
        "tagUrl": "/pages/msg/msgSelect/index",
        "count":0,
      },
      
      {
        "tabName": "时光邮局",
        "tabImage": "./images/mail@tag.png",
        "tagUrl": "/pages/beforeLetter/index",
        "count":0,
      },
      {
        "tabName": "树洞",
        "tabImage": "./images/talk@tag.png",
        "tagUrl": "/pages/hole/index",
        "count":0,
      }
    ],
    colList:[
      {
        "colName":"我的喜欢",
        "colImage":"./images/like@col.png",
        "colUrl":"/pages/likeList/index",
      },
      {
        "colName": "意见反馈",
        "colImage": "./images/idea@col.png",
        "colUrl": "/pages/suggest/index",
      },
      {
        "colName": "关于我们",
        "colImage": "./images/about@col.png",
        "colUrl": "/pages/aboutUs/index",
      },
      {
        "colName": "版本说明",
        "colImage": "./images/version@col.png",
        "colUrl": "/pages/version/index",
      },
      {
        "colName": "联系我们",
        "colImage": "./images/contact@col.png",
        "colUrl": "/pages/contact/index",
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
    let scope = wx.getStorageSync('scope') || false
    let userInfo =  wx.getStorageSync("userInfo")
    this.setData({
      scope:scope
    })
    this.getMsgTotal()
    if(userInfo){
      this.setData({
        
        userInfo:userInfo,
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
    this.onLoad()
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
    let userInfo = {
      "userName":e.detail.userInfo.nickName,
      "gender":e.detail.userInfo.gender,
      "avatarUrl":e.detail.userInfo.avatarUrl
    }
    let session = await promisic2(wx.login)();
    let result = await UserModel.reigsterAndLogin({
      code:session.code,
      nickName:userInfo.userName,
      avatarUrl:userInfo.avatarUrl,
      gender:userInfo.gender
    })
    wx.lin.showToast({
      title:"登录成功",
      icon:"success"
    })
    let uid = Number(result.data.uid)
    let token = result.data.token


    wx.setStorageSync("token",token)
    wx.setStorageSync("uid",uid)
    wx.setStorageSync("userInfo",userInfo)
    this.setData({
      userInfo: userInfo,
      hasUserInfo: true  
    })
  },
  getMsgTotal(){
    var changeOne = "tabList["+1+"].count"
    MsgModel.getMyMsgCountTotal().then(res=>{
      let count = res.data.unread
      this.setData({
        [changeOne ]:count
      })
    })
  }
})