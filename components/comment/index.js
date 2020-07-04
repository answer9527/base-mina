// components/comment/index.js
import {CommentModel} from "../../models/comment"
var appInst =  getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commentList:Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击
    showReplay(e){
      let params={
        "placeholder":"回复@"+e.currentTarget.dataset.usernamer+":",
        "pid":e.currentTarget.dataset.pid,
        "uid_r":e.currentTarget.dataset.uidr
      }
      this.triggerEvent("showReplay",params)
    }

  },
  attached(){
    
  }
})
