// components/holeBar/index.js
import {HoleModel} from "../../models/hole"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    my_hole:[],
    active:"./images/hole@yes.png",
    no:"./images/hole@no.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    go_detail(e){
      let index = e.currentTarget.dataset.index
      let len =this.data.my_hole.length||0
      
      if(index<len){
        let id = this.data.my_hole[index].id
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
  attached(){
    HoleModel.get_my_hole({
      size:5
    }).then(res=>{
      this.setData({
        my_hole:res.data
      })
    })
  }
})
