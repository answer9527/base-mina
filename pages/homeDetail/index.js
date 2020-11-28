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
    size:10,
    hasNextPage:false,
    uid:null,
    scope:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {

    // 关于scope的问题
    let scope = wx.getStorageSync('scope') || false

    let uid = wx.getStorageSync("uid")
    let id = options.id
    let classicDetail = await this.getClassicDetail(id)
    classicDetail.content = classicDetail.content.replace(/\<img/gi, "<img style='width:100%;height:auto;display:block;'")
    let paging = {
      "key":id,
      "page":this.data.page,
      "size":this.data.size
    }
    let commentData = await this.getClassicComment(paging)
    this.setData({
      classic:classicDetail,
      commentList:commentData.list,
      hasNextPage:commentData.hasNextPage,
      cid:id,
      uid:uid,
      scope
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
    if(this.data.hasNextPage){
      let page = this.data.page +1;
      let paging = {
        "key":this.data.cid,
        "page":page,
        "size":this.data.size
      }
      let commentData = await this.getClassicComment(paging)
      let commentList = this.data.commentList.concat(commentData.list)
      this.setData({
        commentList:commentList,
        page:page,
        hasNextPage:commentData.hasNextPage
      })
    }

  
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
    animation.height("560rpx").step()
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
      this.resetClassicComment()
    })
  },
  // 重置评论列表
  resetClassicComment(){
    let paging ={
      "key":this.data.cid,
      "page":1,
      "size":this.data.size
    }
    this.getClassicComment(paging).then(res=>{
     this.setData({
       page:1,
       commentList:res.list,
       hasNextPage:res.hasNextPage
     })
    })
  },
  //设置或取消喜欢
  setLike(e){
    let behavior = e.detail.behavior
    let cid = this.data.classic.id
    ClassicModel.likeIt(behavior,cid)
  },
  // 删除评论
  del_comment(e){
    let del_id = e.detail.del_id
    CommentModel.delComment({id:del_id}).then(res=>{
      wx.showToast({
        title: res.message,
        icon: 'none',
        duration: 2000
      })
      this.resetClassicComment()
    })
  }


})