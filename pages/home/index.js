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
    activeKey:100,
    page:1,
    size:10,
    hasNextPage:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.getClassicListByType()
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
      let page = this.data.page
      this.setData({
        page:page+1
      })
      this.getClassicListByType()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  // 切换选项卡
  changeTabs(e){
    this.setData({
      activeKey:e.detail.activeKey,
      page:1,
      classicList:[]
    })
    
    this.getClassicListByType()
  },
  // 获取列表
  getClassicListByType(){
    let paging = new Paging(this.data.page,this.data.size,this.data.activeKey);
    ClassicModel.getByListType(paging).then(res=>{
      let classicList = this.data.classicList
      classicList = classicList.concat(res.data.list)
      this.setData({
        classicList,
        hasNextPage:res.data.hasNextPage
      })
    })
  }
})