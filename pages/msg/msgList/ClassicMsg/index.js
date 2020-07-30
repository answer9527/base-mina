// pages/msg/msgList/ClassicMsg/index.js
import {MsgModel} from "../../../../models/msg"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg_list:[],
    hasNextPage:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMsgList()
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
  // 获取Classic评论的消息提醒
  getMsgList(){
    MsgModel.getClassicCommentMsg({}).then(res=>{
      let {data} =res
      this.setData({
        msg_list:data.list,
        hasNextPage:data.hasNextPage
      })
    })
  }
})