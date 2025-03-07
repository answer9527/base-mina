//app.js
import {UserModel} from "./models/user"
import {ScopeModel} from "./models/scope"
import {Token} from "./utils/token"
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    ScopeModel.getScope().then(res=>{
      let scope = res.data.scope
      wx.setStorageSync("scope",scope)
    })
    
    // 进入验证token
    Token.getToken()

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
     
              // 可以将 res 发送给后台解码出 unionId
              let userInfo = {
                "userName":res.userInfo.nickName,
                "gender":res.userInfo.gender,
                "avatarUrl":res.userInfo.avatarUrl
              }
              wx.setStorageSync("userInfo",userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    }) 

  },
  globalData: {
    userInfo:null,
    token:null,
    uid:null
  }
})