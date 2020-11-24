// pages/beforeMessage/index.js
import {LetterModel} from "../../models/letter"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scope:false,
    showContent:false,
    letter:null,
    page:1,
    size:10,
    list:[],
    hasNextPage:false,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let scope = wx.getStorageSync('scope') || false
    this.setData({
      scope:scope
    })
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
    if(this.data.hasNextPage){
      let page = this.data.page
      this.setData({
        page:page+1
      })
      this.getMyLetter()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 去展示书信
  goMessage(){
    var animation = wx.createAnimation({
      duration:2000,
      timingFunction: 'ease',
    })
    animation.opacity(0).step().height("0rpx").step()
    this.getMyLetter()
    this.setData({
      showContent:true,
      ani: animation.export()
    })
  },
  // 获取我的书信详情
  async getMyLetter(){
    let params = {
      "page":this.data.page,
      "size":this.data.size
    }
    let result = await LetterModel.getMyLetterList(params);
    let temp = this.data.list
    temp = temp.concat(result.data.list)
    this.setData({
      list:temp,
      hasNextPage:result.data.hasNextPage
    })
  },
  go_add(){
    wx.navigateTo({
      url: '/pages/writeLetter/index',
    });
  }


})