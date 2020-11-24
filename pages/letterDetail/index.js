// pages/letterDetail/index.js
var app =  getApp();
import {LetterModel} from "../../models/letter"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scope:false,
    userInfo:null,
    letter:null,
    letter_id:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let scope = wx.getStorageSync('scope') || false
    this.setData({
      scope:scope
    })
    if(this.data.scope){
      let letter_id = options.id
      this.setData({
        letter_id:letter_id,
        userInfo:app.globalData.userInfo
      })
      this.getMyLetter()
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
    // 获取我的书信详情
    async getMyLetter(){
      let result = await LetterModel.getMyLetterDetail({id:this.data.letter_id});
      this.setData({
        letter:result.data
      })
    }
})