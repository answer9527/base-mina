// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String
    },
    first:Boolean,
    latest:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    right:"./images/left-white.png",
    disLeft: "./images/right-black.png",
    left: "./images/right-white.png",
    disRight: "./images/left-black.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft(){
      this.triggerEvent("left")
    },
    onRight() {
      this.triggerEvent("right")
    }
  }
})
