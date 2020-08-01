// pages/sentence/index.js
import {SentenceModel} from "../../models/sentence"
var mMgr = wx.getBackgroundAudioManager();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sentence_txt:"",
    sentence_image:"",
    sentence_logo:"/images/light.jpg",
    bgmSrc:"http://music.163.com/song/media/outer/url?id=317245.mp3",
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
      let sentence_image = res.data.image||""
      let sentence_txt = res.data.txt
      setTimeout(() => {
        this.setData({
          sentence_image,sentence_txt,
          sentence_logo:"/images/light.jpg"
        })       
      }, 3000);
    })
  },
  rand(){
    mMgr.title="111"
    mMgr.src=this.data.bgmSrc
    let time = new Date()
    if(time){

    }else{

    }
    this.setData({
      sentence_logo:"/images/light.gif"
    });
    this.get_rand()
  },

})