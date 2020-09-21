// pages/holeDetail/index.js
var app =  getApp();
import {HoleModel} from "../../models/hole"
import {Paging} from "../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scope:false,
    uid:null,
    hid:0,
    holeInfo:{},
    commentList:[],
    placeholder:"文明发言,理性讨论！",
    // 回复的评论的父id
    pid:0,
    // 需要回复的人的id
    uid_r:0,
    // 分页参数
    page:1,
    size:10,
    // 总页数
    pages:1,

    // 是否有下一页
    hasNextPage:false,
    // 显示加载中
    show:true,
    // 删除提示框
    dialog_show:false,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let scope = wx.getStorageSync('scope') || false
    this.setData({
      scope:scope
    })
    let id = options.id
    this.setData({
      hid:id,
      uid:app.globalData.uid
    })
    HoleModel.get_by_id(id).then(res=>{
      this.setData({
        holeInfo:res.data
      })
      this.resetCommentList()
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
    if(this.data.hasNextPage){
      let page = this.data.page
      this.setData({
        page:page+1
      })
      this.getMoreComment()
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 获取更多树洞评论
  getMoreComment(){
    this.setData({
      show:true
    })
    let paging = new Paging(this.data.page,this.data.size,this.data.holeInfo.id);
    this.getHoleCommentList(paging).then(res=>{
      let commentList = this.data.commentList
      commentList=commentList.concat(res.list)
      setTimeout(() => {
        this.setData({
          hasNextPage:res.hasNextPage,
          commentList:commentList,
          show:false
        })
      },1500);
    })
  },
  async getHoleCommentList(paging){
    let res = await HoleModel.get_Comment(paging)
    return res.data
  },
  // 重置列表
  resetCommentList(){
    let paging = new Paging(1,this.data.size,this.data.holeInfo.id);
    this.getHoleCommentList(paging).then(res=>{
      this.setData({
        page:1,
        commentList:res.list,
        hasNextPage:res.hasNextPage,
        show:false
      })
    })

  },
  // 显示根评论输入框
  showCommentInput(){
    if(this.data.holeInfo.canComment==0){
      return false
    }else{
      this.selectComponent("#commentInput").showDialog()
    }
   
  },
  // 提交评论
  send_comment(e){
    let is_root = e.detail.is_root
    let comment_txt = e.detail.comment_txt
    let params ={
      hid:this.data.holeInfo.id,
      content:comment_txt
    }
    if(!is_root){
      let temp ={
        uid_r:this.data.uid_r,
        pid:this.data.pid
      }
      params = Object.assign(params,temp)
    }
   
    HoleModel.insert_comment(params).then(res=>{
      wx.showToast({
        title: "评论成功！",
        icon: 'none',
        duration: 2000
      })
      this.selectComponent("#commentInput").hideDialog()
      this.resetCommentList()
    })
  },
  // 显示子评论输入框
  showReplay(e){
    if(this.data.holeInfo.canComment==0){
      wx.showToast({
        title: "您没有该权限",
        icon: 'none',
        duration: 2000
      })
      return false
    }else{
      this.setData({
        placeholder:e.detail.placeholder,
        pid:e.detail.pid,
        uid_r:e.detail.uid_r
      })
      this.selectComponent("#commentInput").showReplay()
    }
  },
  // 弹出删除
  show_del_dialog(){
    
    this.setData({
      dialog_show:true
    })
  },
  // 确定树洞删除
  confirm_del(){
    let id = this.data.holeInfo.id
    HoleModel.del_hole({id}).then(res=>{
      wx.navigateTo({
        url: '/pages/hole/index',
        success: (result)=>{
          wx.showToast({
            title: "删除成功！",
            icon: 'none',
            duration: 2000
          })
        },
        fail: ()=>{},
        complete: ()=>{}
      });

    })
  },
  // 删除自己的评论
  del_comment(e){
     let del_id = e.detail.del_id
    HoleModel.del_hole_comment({id:del_id}).then(res=>{
      wx.showToast({
        title: res.message,
        icon: 'none',
        duration: 2000
      })
      this.resetCommentList()
    })
  }

})