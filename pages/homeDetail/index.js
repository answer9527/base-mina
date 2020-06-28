// pages/homeDetail/index.js
import {ClassicModel} from "../../models/classic"
const app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic:{},
    show_dialog:false,
    ani:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let id = options.id
    ClassicModel.getDetailById(id).then(res=>{
      this.setData({
        classic:res.data
      })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 弹出输入框
  showDialog(){
    var animation = wx.createAnimation({
      duration:800,
      timingFunction: 'ease',
    })
    animation.height("360rpx").step()
    this.setData({
      show_dialog:true,
      ani:  animation.export()
    })
  },
  // 隐藏输入框
  hideDialog(){
    var animation = wx.createAnimation({
      duration:200,
      timingFunction: 'ease',
    })
    animation.height("0rpx").step()
    this.setData({
      show_dialog:false,
      ani:  animation.export()
    })
  }

})