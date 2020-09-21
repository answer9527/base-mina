// pages/writeLetter/index.js
var dateTimePicker = require('../../utils/dateTimePicker.js');
import {LetterModel} from "../../models/letter"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scope:false,
    date: '2018-10-01',
    time: '12:00',
    // 年月日的序号
    dateTime: null,
    dateTimeArray: null,
    startYear: 2020,
    endYear: 2050,
    day: '',

    // 表单动态绑定的内容
    post_title:"",
    post_content:"",
    post_email:"",
    plan_time:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let scope = wx.getStorageSync('scope') || false
    this.setData({
      scope:scope
    })

    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var time = dateTimePicker.getHourMinu();
    obj.dateTime[2] = parseInt((obj.defaultDay).substring(0, 2)) - 1; //day 字符串 'xx日' 转 'int'
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      day: obj.defaultDay,
      time: time,
      plan_time:new Date()
    });
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
  // 设置时间的回调
  changeDateTimeColumn(e) {
  
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    let time_str= dateArr[0][arr[0]].substring(0,4)+"-"+dateArr[1][arr[1]].substring(0,2)+"-"+dateArr[2][arr[2]].substring(0, 2)+" 00:00:00"
   
    let plan_time = new Date(time_str)
  
    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr,
      day: dateArr[2][arr[2]].substring(0, 3),
      plan_time:plan_time
    });
  },
  // 监听修改标题
  changeTitle(e){
    this.setData({
      post_title:e.detail.value
    })
  },
  // 监听修改书信内容
  changeContent(e){
    this.setData({
      post_content:e.detail.value
    })
  },
  // 监听修改邮箱
  changeEmail(e){
    this.setData({
      post_email:e.detail.value
    })
  },
  // 提交信件
  send_letter(){

    let data = this.data
    let param = {
      title:data.post_title,
      content:data.post_content,
      email:data.post_email,
      planTime:data.plan_time
    }    
    // 如果有空值
    if(Object.values(param).indexOf("")>=0){
      wx.showToast({
        title: "请填写完整",
        icon: 'none',
        duration: 2000
      })
      return false
    }
  //  如果时间在今天之前
    if(param.planTime<=new Date()){
      wx.showToast({
        title: "请填写正确时间",
        icon: 'none',
        duration: 2000
      })
      return false
    }
   

    LetterModel.insertLetter(param).then(res=>{
      wx.navigateTo({
        url: '/pages/beforeLetter/index',
        success: (result)=>{
          wx.showToast({
            title: "提交成功",
            icon: 'none',
            duration: 2000
          })
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    })
  }
})