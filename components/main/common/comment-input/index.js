// components/main/common/comment-input/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
    comment_txt:"",
    is_root:false,
    show_dialog:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取主体的评论内容
    changeCommentTxt(e){
      this.setData({
        comment_txt:e.detail.value
      })
    },
    // 弹出根评论输入框
    showDialog(e){
      this.setData({
        comment_txt:"",
        is_root:true,
        placeholder:"文明发言,理性讨论！"
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
    showReplay(){
      this.setData({
        comment_txt:"",
        is_root:false
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
    sendComment(){
      let params={
        "comment_txt":this.data.comment_txt,
        "is_root":this.data.is_root
      }
      this.triggerEvent("sendComment",params)
    }
  }
})
