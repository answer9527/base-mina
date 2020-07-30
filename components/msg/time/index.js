// components/msg/time/index.js
import {formatTime} from "../../../utils/util"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    time:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tiem_view:""
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  attached(){
    let time_num1 = new Date(this.properties.time).getTime()  
    let now_num = new Date().getTime()
    let temp_time;
    // 时间差
    let during_time = now_num-time_num1
    if(during_time>24*60*60*1000){
      temp_time=formatTime(this.properties.time,"-",4)
    }else{
      temp_time = Math.ceil((during_time/1000/60/60))+"小时前"
    }
    this.setData({
      tiem_view:temp_time
    })
  }
})
