//index.js
//获取应用实例
const app = getApp()
import {UserModel} from "../../models/user"
import { promisic2 } from "../../utils/util"
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: async function () {
    let userInfo =  wx.getStorageSync("userInfo")
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          // app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: async function(e) {
    let userInfo = {
      "userName":e.detail.userInfo.nickName,
      "gender":e.detail.userInfo.gender,
      "avatarUrl":e.detail.userInfo.avatarUrl
    }
    let session = await promisic2(wx.login)()
    let result = await UserModel.reigsterAndLogin({
      code:session.code,
      nickName:userInfo.userName,
      avatarUrl:userInfo.avatarUrl,
      gender:userInfo.gender
    })
    
    wx.lin.showToast({
      title: "登录成功",
      icon: 'success',
    })
    let uid = Number(result.data.uid)
    let token = result.data.token
    wx.setStorageSync("token",token)
    wx.setStorageSync("uid",uid)
    wx.setStorageSync("userInfo",userInfo)
    this.setData({
      userInfo:userInfo,
      hasUserInfo: true
    })
    wx.navigateBack({
        delta: 1
    })



  },
  goFirstPage(){
    wx.switchTab({
      url: '/pages/classic/index',
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  }

})
