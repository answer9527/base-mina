// pages/sentence/index.js
import {SentenceModel} from "../../models/sentence"
import {config} from "../../config/config"
var mMgr = wx.getBackgroundAudioManager();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sentence_txt:"",
    sentence_image:"",
    sentence_logo:"/images/light.png",
    bgmSrc:config.domain_url+"/uploadFile/assets/08c0f84d-dd7f-4d96-b5e6-b5ad1ebc3733.mp3",
    disabled:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_rand()
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
  get_rand(){
    SentenceModel.getRand().then(res=>{
    
      let sentence_txt = res.data.txt
      setTimeout(() => {
        this.setData({
          sentence_txt,
          sentence_logo:"/images/light.png",
          disabled:false
        })       
      }, 2500);
    })
  },
  rand(){
    mMgr.title="bgm"
    mMgr.src=this.data.bgmSrc
    this.setData({
      sentence_logo:"/images/light.gif",
      disabled:true
    });
    this.get_rand()
  },

})