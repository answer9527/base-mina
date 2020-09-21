// pages/hole/index.js
import {HoleModel} from "../../models/hole"
var mMgr = wx.getBackgroundAudioManager();
// 拖动的起始位置
var startPos;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scope:false,
    holeList: [],
    // 偏移量
    distance:0,
    // 当前index
    currentIndex:0,
    bgmSrc:"https://mina.huzhihua.cn/uploadFile/2020/08/02/b3294b0b-3e99-4afa-b3ef-01d166e24c01.mp3",
    my_hole:[],
    createScope:false
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let scope = wx.getStorageSync('scope') || false
    this.setData({
      scope:scope
    })
    
    this.get_list()
    this.getMyHoleList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 开始拖动
  onTouchStart(e){
    startPos = e.changedTouches[0].pageX
  },
// 结束拖动
  onTouchEnd(e){
    let distance=this.data.distance
    let currentIndex = this.data.currentIndex
    let len = this.data.holeList.length

    let endPos = e.changedTouches[0].pageX
    // 拖动的距离绝对值
    let dis = Math.abs(startPos-endPos)
    // 当拖动超过60才切换
    if(dis<60){
      return false
    }

    if(startPos>endPos){

      if(currentIndex>12){
        return false
      }
      
      if(currentIndex==len-2){
        this.get_list()
      }else{
 
      }
      this.setData({
        distance:distance-550,
        currentIndex:currentIndex+1
      })


    }else if(startPos<endPos){

      if(currentIndex>0){
        this.setData({
          distance:distance+550,
          currentIndex:currentIndex-1
        })
      }

    }
    mMgr.title="bgm"
    mMgr.src=this.data.bgmSrc
  },
  // 获取随机的树洞
  get_list(){
    HoleModel.get_rand_hole({size:5}).then(res=>{
     
      let data =res.data
      let holeList=this.data.holeList
      holeList=holeList.concat(data)
      // return false
      this.setData({
        holeList
      })
    })
  },
  // 获取我的树洞列表
  getMyHoleList(){
    HoleModel.get_my_hole({
      size:5
    }).then(res=>{
      this.setData({
        my_hole:res.data.holes,
        createScope:res.data.createScope
      })
    })
  
  }

})