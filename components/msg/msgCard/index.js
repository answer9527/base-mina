// components/msg/msgCard/index.js
import {MsgModel} from "../../../models/msg"
import {HoleModel} from "../../../models/hole"
import {CommentModel} from "../../../models/comment"
import {config} from "../../../config/config"
var mMgr = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ids:{
      type:Number
    },
    commentId:{
      type:Number
    },
    commentPid:{
      type:Number
    },
    commentUid:{
      type:Number
    },
    title:{
      type:String
    },
    holeOrClassicId:{
      type:Number
    },
    userName:{
      type:String
    },
    content:{
      type:String
    },
    isRoot:{
      type:Boolean
    },
    isRead:{
      type:Boolean
    },
    avatarUrl:{
      type:String
    },
    type:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    reply_txt:"",
    dialog_show:false,
    // 某条消息是否显示，做删除是的假更新  隐藏掉
    show_card:true,
    bgmSrc:config.domain_url+"/uploadFile/assets/104ef08a-7cb5-428f-bd0b-16b32f473814.mp3"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 弹出删除
    delete_it(){
      this.setData({
        dialog_show:true
      })
    },
    // 确认删除
    confirm_del(){
      MsgModel.deleteMyMsgById({
        id:this.data.ids
      }).then(res=>{
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
        this.setData({
          show_card:false
        })
      })
    },
    // 回到主体内容
    go_host(){

      let type = this.data.type
      let url;
      if(type==1){
        url='/pages/homeDetail/index?id='+this.data.holeOrClassicId
      }else if(type==2){
        url='/pages/holeDetail/index?id='+this.data.holeOrClassicId
      }
      wx.navigateTo({
        url: url,
        success:()=>{
          this.setRead()
        }
      })
    },
    // 设置已读
    setRead(){
      if(!this.data.isRead){
        MsgModel.setMyMsgRead({
          id:this.data.ids
        }).then(res=>{
          this.setData({
            isRead:true
          })
        })
      }
    },
    // 改变回复框内容
    changeReplyTxt(e){
      let reply_txt = e.detail.value
      this.setData({
        reply_txt
      })
    },
    // 快速回复
    reply_it(){
      if(this.data.reply_txt==""){
        wx.showToast({
          title: "请填写完整",
          icon: 'none',
          duration: 2000
        })
        return false
      }
      // 当commentPid等于0时候使用commentId
      let params ={
        content:this.data.reply_txt,
        pid:this.data.commentPid||this.data.commentId,
        uid_r:this.data.commentUid
      }
      let type = this.data.type
      if(type==1){
        params.classicId=this.data.holeOrClassicId
        CommentModel.insertComment(params).then(res=>{
          this.sendSuccess()
        })
      }else if(type==2){
        params.hid = this.data.holeOrClassicId
        HoleModel.insert_comment(params).then(res=>{
          this.sendSuccess()

        })
      }
      
    },
    // 回复成功后的操作
    sendSuccess(){
      mMgr.title="bgm"
      mMgr.src=this.data.bgmSrc
      wx.showToast({
        title: "回复成功！",
        icon: 'none',
        duration: 2000
      })
      this.setRead()
      this.setData({
        reply_txt:""
      })
    }
  }
})
