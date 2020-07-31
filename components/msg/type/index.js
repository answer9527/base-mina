// components/msg/type/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type:{
      type:Number
    },
    count:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    classicIconSrc:"/images/classic_msg.png",
    holeIconSrc:"/images/hole_msg.png",
    sysIconSrc:"/images/sys_msg.png",
    classicUrl:"/pages/msg/msgList/ClassicMsg/index",
    holeUrl:"/pages/msg/msgList/HoleMsg/index",
    sysUrl:"/pages/my/index"

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
