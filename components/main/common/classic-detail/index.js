// components/main/music/detail/index.js
import {classic_detail_beh} from "../../classic_detail_beh"
var mMgr = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  behaviors:[classic_detail_beh],
  properties: {
    src:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    playOrPause(){
      let isPlay = this.data.playing

      if(isPlay){
        wx.pauseBackgroundAudio()

      }else{
        mMgr.title = this.properties.title
        mMgr.src = this.properties.src
      }
      this.setData({
        playing:!isPlay
      })
    },
    recoverStatus(){
      if(mMgr.paused){
        this.setData({
          playing:false
        })
        return false
      }
      if(this.properties.src==mMgr.src){
        this.setData({
          playing:true
        })
      }
    },
    // 监听自带的背景音乐空间
    lookSwitch(){
      mMgr.onPause(()=>{
        this.recoverStatus()
      })
      mMgr.onEnded(()=>{
        this.recoverStatus()
      })
      mMgr.onPlay(()=>{
        this.recoverStatus()
      })
      mMgr.onStop(()=>{
        this.recoverStatus()
      })
    }

  },
  attached(){
    this.recoverStatus();
    this.lookSwitch()
    
  }
})
