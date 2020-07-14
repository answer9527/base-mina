// pages/holeDetail/index.js
var app =  getApp();
import {HoleModel} from "../../models/hole"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:null,
    hid:0,
    holeInfo:{},
    commentList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let id = options.id
    this.setData({
      hid:id,
      uid:app.globalData.uid
    })
    HoleModel.get_by_id(id).then(res=>{
     
      this.setData({
        holeInfo:res.data
      })

    })
   
    
    this.getComment()
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
  // 获取树洞评论
  getComment(){
    HoleModel.get_Comment({key:this.data.hid}).then(res=>{
      this.setData({
        commentList:res.data
      })
      console.log(res.data)
    })
  }

})