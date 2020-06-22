// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    time:{
      type:String,
      observer:function (newVal, oldVal){
        let date = new Date(newVal)
        let year = date.getFullYear()
        let month = date.getMonth()
        let day = date.getDate()
        const mon = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
        this.setData({
          year,month:mon[month],day
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    year:0,
    month:0,
    day:0,
    
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  attached(){
   
  }
})
