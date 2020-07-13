// pages/suggest/index.js
import {SuggestModel} from "../../models/suggest" 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    suggest_list:[],
    page:1,
    size:10,
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
    let page = this.data.page+1;
    let paging = {
      page:page,
      size:this.data.size,
      keyword:this.data.keyword
    }
    SuggestModel.getList(paging).then(res=>{
      let suggest_list =this.data.suggest_list.concat(res.data); 
      this.setData({
        suggest_list:suggest_list,
        page:page
      })
    })
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
      keyword:keyword
    })
    this.getSuggestList()
  },
  // 清除搜索框
  clearSearch(){
    this.setData({
      page:1,
      keyword:""
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
      this.setData({
        suggest_list:res.data
      })
    })
  },
  // 展示输入框
  showDialog(){
    var animation = wx.createAnimation({
      duration:800,
      timingFunction: 'ease',
    })
    animation.height("360rpx").step()
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
      ani:  animation.export()
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
      console.log(res)
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