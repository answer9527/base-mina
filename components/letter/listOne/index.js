import {LetterModel} from "../../../models/letter"
// components/letter/listOne/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    letter:{
      type:Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    not_del:true,
    dialog_show:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    del_letter(){
      this.setData({
        dialog_show:true
      })
    },
    confirm_del(){
      LetterModel.deleteMyLetter({"id":this.data.letter.id}).then(res=>{
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
        this.setData({
          not_del:false
        })
      })
    }
  }
})
