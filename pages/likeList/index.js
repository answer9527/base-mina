// pages/likeList/index.js
import {ClassicModel} from "../../models/classic"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    likeList:[],
    hasNextPage:false,
    page:1,
    size:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_like_list()
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
      this.get_like_list()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 获取我喜欢的列表
  get_like_list(){
    let paging={
      "size":this.data.size,
      "page":this.data.page
    }
    ClassicModel.getMyLikeList(paging).then(res=>{
      let likeInfo = res.data
      let likeList = this.data.likeList
      likeList = likeList.concat(likeInfo.list)
      this.setData({
        likeList,
        hasNextPage:likeInfo.hasNextPage
      })
    })
  }
  
})