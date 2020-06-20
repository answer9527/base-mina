// pages/classic/index.js
import {ClassicModel} from "../../models/classic"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData:{}
  },

  /**
   * 生命周期函数--监听页面加载1
   */
  onLoad: async function (options) {
      // ClassicModel.getClassic(2,"pre").then(res=>{
      //   console.log(res)
      // })
      
    let result =await this.getLatest();
    this.setData({
      classicData:result.data
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
  // 获取最新的
  async getLatest(){
    return await ClassicModel.getLatest({})
  },
  // 获取下一个
  async getNextClassic(id){
    let classicResult=await ClassicModel.getClassicRecommend(id,"next")
    this.setData({
      classicData:classicResult.data
    }) 
  },
  // 获取上一个
  async getPreviousClassic(id){
    let classicResult =await ClassicModel.getClassicRecommend(id,"previous")
    this.setData({
      classicData:classicResult.data
    })
    
  }


})