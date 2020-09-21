// components/holeBar/index.js
import {HoleModel} from "../../models/hole"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    myHole:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
    active:"./images/hole@yes.png",
    no:"./images/hole@no.png"
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    go_detail(e){
      let index = e.currentTarget.dataset.index
      let len =this.data.myHole.length||0
      
      if(index<len){
        let id = this.data.myHole[index].id
        wx.navigateTo({
          url: '/pages/holeDetail/index?id='+id,
          success: (result)=>{
            
          },
          fail: ()=>{},
          complete: ()=>{}
        });
      }
    }
  },
  attached(){}

})
