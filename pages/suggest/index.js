// pages/suggest/index.js
import {SuggestModel} from "../../models/suggest" 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scope:false,
    suggest_list:[],
    page:1,
    size:10,
    hasNextPage:false,
    keyword:"",
    show_dialog:false,
    ani:null,
    placeholder:"请填写您的宝贵意见",
    suggest_txt:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let scope = wx.getStorageSync('scope') || false
    this.setData({
      scope:scope
    })
    this.getSuggestList()
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
      this.getSuggestList()
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 输入搜索框
  changeSearch(e){
    let keyword = e.detail.value;
    this.setData({
      page:1,
      keyword:keyword,
      suggest_list:[]
    })
    this.getSuggestList()
  },
  // 清除搜索框
  clearSearch(){
    this.setData({
      page:1,
      keyword:"",
      suggest_list:[]
    })
    this.getSuggestList()
  },
  getSuggestList(){
    let paging = {
      page:this.data.page,
      size:this.data.size,
      keyword:this.data.keyword
    }
    SuggestModel.getList(paging).then(res=>{
      let suggest_list = this.data.suggest_list
      suggest_list=suggest_list.concat(res.data.list)
      this.setData({
        suggest_list:suggest_list,
        hasNextPage:res.data.hasNextPage
      })
    })
  },
  // 展示输入框
  showDialog(){
    var animation = wx.createAnimation({
      duration:800,
      timingFunction: 'ease',
    })
    animation.height("560rpx").step()
    this.setData({
      show_dialog:true,
      ani:  animation.export()
    })
  },
  // 隐藏输入框
  hideDialog(){
    var animation = wx.createAnimation({
      duration:200,
      timingFunction: 'ease',
    })
    animation.height("0rpx").step()
    this.setData({
      show_dialog:false,
      ani: animation.export()
    })
  },
  // 修改输入框的内容
  changeSuggestTxt(e){
    this.setData({
      suggest_txt:e.detail.value
    })
  },
  // 提交反馈意见
  sendSuggest(){
    let param = {
      "suggestInfo":this.data.suggest_txt
    }
    SuggestModel.insert(param).then(res=>{
      let {code,message} = res;
      this.setData({
        page:1,
        keyword:""
      })
      wx.showToast({
        title:message,
        icon: 'none',
        duration: 2000
      })
      this.hideDialog()
      this.getSuggestList()
    })
  }
})