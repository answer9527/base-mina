// pages/home/index.js
import {Paging} from "../../utils/util"
import {ClassicModel} from "../../models/classic"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicList:[],
    // 分页传参
    activeKey:200,
    page:1,
    size:10,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let paging = new Paging(this.data.page,this.data.size,this.data.activeKey);

    this.getClassicListByType(paging)
    

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
  changeTabs(e){
    this.setData({
      activeKey:e.detail.activeKey,
      page:1
    })
    let paging = new Paging(this.data.page,this.data.size,this.data.activeKey);
    this.getClassicListByType(paging)
  },
  // 获取列表
  getClassicListByType(Paging){
    ClassicModel.getByListType(Paging).then(res=>{
      this.setData({
        classicList:res.data
      })
    })
  }
})