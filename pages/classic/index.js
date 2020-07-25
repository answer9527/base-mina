// pages/classic/index.js
import {ClassicModel} from "../../models/classic"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData:{},
    first:false,
    latest:false,
  },

  /**
   * 生命周期函数--监听页面加载1
   */
  onLoad: async function (options) {
  //获取最新的一条 
    this.getLatest()  
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
  // 获取最新的
  getLatest(){
    ClassicModel.getLatest({}).then(res=>{
      this.setData({
        classicData:res.data,
        latest:true
      })
      wx.setStorageSync('latest',res.data.id)
    })
  },
  // 获取下一个
  getNextClassic(e){
    let id = this.data.classicData.id
    ClassicModel.getClassicRecommend(id,"next").then(res=>{
        this.setData({
          classicData:res.data,
          latest:ClassicModel.isLatest(res.data.id)
        }) 
      })

  },
  // 获取上一个
  getPreviousClassic(e){
    let id = this.data.classicData.id
    ClassicModel.getClassicRecommend(id,"previous").then(res=>{
      this.setData({
        classicData:res.data,
        latest:ClassicModel.isLatest(res.data.id)
      })
    })    
  },

  changeLike(e){
      let behavior = e.detail.behavior
      let cid = this.data.classicData.id
      ClassicModel.likeIt(behavior,cid)
  }
  

})