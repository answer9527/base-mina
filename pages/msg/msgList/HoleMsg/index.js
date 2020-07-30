// pages/msg/msgList/HoleMsg/index.js
import {MsgModel} from "../../../../models/msg"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg_list:[],
    hasNextPage:false,
    page:1,
    size:10
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
    if(this.data.hasNextPage){
      let page = this.data.page;
      this.setData({
        page:page+1
      })
      this.getMsgList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 获取树洞相关消息
  getMsgList(){
    let params = {
      page:this.data.page,
      size:this.data.size
    }
    MsgModel.getHoleCommentMsg(params).then(res=>{
      let {data} =res
      let msg_list = this.data.msg_list
      msg_list=msg_list.concat(data.list)
      this.setData({
        msg_list:msg_list,
        hasNextPage:data.hasNextPage
      })
    })
  }

})