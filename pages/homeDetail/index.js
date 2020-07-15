// pages/homeDetail/index.js
import {ClassicModel} from "../../models/classic"
import {CommentModel} from "../../models/comment"
const app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    classic:{},
    commentList:[],
    show_dialog:false,
    // 评论框的内容
    comment_txt:"",
    // 评论框placeholder的文字
    placeholder:"文明发言,理性讨论！",
    ani:null,
    // 回复评论的其他参数
    comment_other:null,
    cid:null,
    page:1,
    size:10

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {

    let id = options.id
    let classicDetail = await this.getClassicDetail(id)
    let paging = {
      "key":id,
      "page":this.data.page,
      "size":this.data.size
    }
    let commentList = await this.getClassicComment(paging)
    this.setData({
      classic:classicDetail,
      commentList:commentList,
      cid:id
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
  onUnload:  function () {
   
   
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {

    // 后期要修改分页的问题，减少请求次数
    let page = this.data.page +1;
    let paging = {
      "key":this.data.cid,
      "page":page,
      "size":this.data.size
    }
    let commentList = await this.getClassicComment(paging)
    commentList = this.data.commentList.concat(commentList)
    this.setData({
      commentList:commentList,
      page:page
    })
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  changeCommentTxt(e){
    this.setData({
      comment_txt:e.detail.value
    })
  },
  // homeDetail页弹出输入框
  showDialog(e){
   
    this.setData({
      placeholder:"文明发言,理性讨论！",
      comment_txt:"",
      comment_other:{}
    })

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
  // 其他子评论点击后的弹出输入框
  showReplay(e){
    this.setData({
      placeholder:e.detail.placeholder,
      comment_txt:"",
      comment_other:{
        pid:e.detail.pid,
        uid_r:e.detail.uid_r
      }
    })
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
  // 获取classic的详情
  async getClassicDetail(id){
    let res = await ClassicModel.getDetailById(id)
    return res.data
  },
  // 获取评论列表
  async getClassicComment(paging){
    let res = await CommentModel.getCommentByCid(paging)
    return res.data
  },
  // 提交评论
  sendComment(){
    let params={
      content:this.data.comment_txt,
      classicId:this.data.classic.id
     }
     let temp =this.data.comment_other
    // 判断comment_other是不是空对象
    if(JSON.stringify(temp)!="{}"){
      params = Object.assign(params,temp)
    }

    CommentModel.insertComment(params).then(res=>{
      wx.showToast({
        title: res.message,
        icon: 'none',
        duration: 2000
      })
     
      this.hideDialog()
      let paging ={
        "key":this.data.cid,
        "page":1,
        "size":this.data.size
      }
      this.getClassicComment(paging).then(res=>{
       this.setData({
         page:1,
         commentList:res
       })
      })
    })
  }


})