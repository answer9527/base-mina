// pages/addHole/index.js
import {HoleModel} from "../../models/hole"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scope:false,
    title:"",
    content:"",
    typeInfo:{
      name:"公开",
      value:1
    },
    commentInfo:{
      name:"可见",
      value:1
    },
    canCommentInfo:{
      name:"能",
      value:1
    },
    loading:false,
    disabled:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let scope = wx.getStorageSync('scope') || false
    this.setData({
      scope:scope
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
  // 选择树洞性质
  sheetType(){
    wx.lin.showActionSheet({
      title:"请选择树洞的性质",
      itemList:[{
        name: '公开',
        value:1,
        sheet:1
      },
      {
        name: '匿名',
        value:2,
        sheet:1
      },
      {
        name: "私密",
        value:3,
        sheet:1
      }
    ]
    })
  },
  // 选择评论是否可见
  sheetComment(){
    wx.lin.showActionSheet({
      title:"树洞评论是否他人可见？",
      itemList:[
        {
          name: '可见',
          value:1,
          sheet:2
        },
        {
          name: '不可见',
          value:0,
          sheet:2
        }
      ]
    })
  },
  // 选择能否被评论
  sheetCanComment(){
    wx.lin.showActionSheet({
      title:"树洞能否被评论？",
      itemList:[
        {
          name: '能',
          value:1,
          sheet:3
        },
        {
          name: '不能',
          value:0,
          sheet:3
        }
      ]
    })
  },
  // 确定选择标签
  comfirm_sheet(e){
    let info = e.detail.item
    switch (info.sheet) {
      case 1:
        this.setData({
          typeInfo:info
        })
        break;
      case 2:
        this.setData({
          commentInfo:info
        })
      break;
      default:
        this.setData({
          canCommentInfo:info
        })
      break;
    }
  },
  // 改变title框
  changeTitle(e){
   
    let title = e.detail.value
    this.setData({
      title
    })
  },
  // 改变内容框
  changeContent(e){
    if(e.detail.cursor>30){
      this.setData({
        disabled:false
      })
    }else{
      this.setData({
        disabled:true
      })
    }
    let content = e.detail.value
    this.setData({
      content
    })
  },
  // 创建树洞
  createHole(){
    this.setData({
      loading:true,
      disabled:true
    })
    let hole ={
      "title":this.data.title,
      "content":this.data.content,
      "type":this.data.typeInfo.value,
      "commentVisible":this.data.commentInfo.value,
      "canComment":this.data.canCommentInfo.value
    }
    HoleModel.insert_hole(hole).then(res=>{
      wx.showToast({
        title: res.message,
        icon: 'none',
        duration: 2000
      })
      this.setData({
        loading:false
      })
    })
  }
})