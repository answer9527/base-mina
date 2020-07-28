// components/comment/index.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commentList:Array,
    // 登录账号的用户id
    uidl:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 删除的确认显示
    dialog_show:false,
    del_id:null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击
    showReplay(e){


      let  params={
        "placeholder":"回复@"+e.currentTarget.dataset.usernamer+":",
        "pid":e.currentTarget.dataset.pid,
        "uid_r":e.currentTarget.dataset.uidr
      }
      this.triggerEvent("showReplay",params)
    },

    // 展示删除dialog
    show_del(e){
      
      let del_id = e.target.dataset.delid
      console.log(e)
      this.setData({
        dialog_show:true,
        del_id:del_id
      })
    },

    // 确定删除
    confirm_del(){
      let params = {
        del_id:this.data.del_id
      }
      this.triggerEvent("delComment",params)
    }
    

  },
  attached(){
    
  }
})
