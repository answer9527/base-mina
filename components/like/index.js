// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count:{
      type:Number
    },
    like:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc:"./images/like.png",
    noSrc:"./images/like-dis.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(){
      let like = this.properties.like;
      let count = this.properties.count;
      this.setData({
        count:like?count-1:count+1,
        like:!like
      })
      let behavior = this.properties.like?"setLike":"cancelLike"
      this.triggerEvent("like",{behavior})
    }
  }
})
