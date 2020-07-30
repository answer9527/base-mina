import {UserModel} from "../models/user"
// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }

// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }

var formatTime=function(time_str,str,type=1){
  var time = new Date(time_str);
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();

  var result = ""
  switch (type) {
      case 2:
          result = y+str+add0(m)+str+add0(d);
          break;
      case 3:
          result = y+str+add0(m)+str+add0(d) +" "+add0(h)+":"+add0(mm);
          break;
      case 4:
        result = add0(m)+str+add0(d) +" "+add0(h)+":"+add0(mm);
        break;
      default:
          result = y+str+add0(m)+str+add0(d) +" "+add0(h)+":"+add0(mm)+":"+add0(s);
          break;
  }
  return result;

}
var add0=function(m){
  return m<10?'0'+m:m 
}

const promisic = function(func){
  return function(params={}){
    return new Promise((resolve,reject)=>{
      const args = Object.assign(params,{
        success:res=>{
          if(res.data.code){
            
            let error_code = res.data.code

            // 当token失效时候
            if(error_code==40006){
              wx.login({
                success: res => {
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  UserModel.login({
                    code:res.code
                  }).then(res=>{    
                    let token = res.data.token
                    let uid = Number(res.data.uid)
                    wx.setStorageSync("token",token)
                    wx.setStorageSync("uid",uid)
                  })
                }
              })
            }
            if(error_code==40005||error_code==40001){

              wx.navigateTo({
                url: '/pages/login/index',
                success:()=>{
                  wx.showToast({
                    title: res.data.message,
                    icon: 'none',
                    duration: 2000
                  })
                }
              });



            }else{
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
            }
          }else{
            resolve(res)
          }
         
        },
        fail:err=>{
          reject(err)
          console.log(err)
        }
      })
      func(args)
    })
  }
}

const promisic2 = function(func){
  return function(params={}){
    return new Promise((resolve,reject)=>{
      const args = Object.assign(params,{
        success:res=>{
          resolve(res)
        },
        fail:err=>{
          reject(err)
        }
      })
      func(args)
    })
  }
}

// paging传参方式
class Paging{
  constructor(page,size,key,keyword){
    this.page = page;
    this.size = size;
    this.key = key;
    this.keyword = keyword;
  }
}

export{
  promisic,promisic2,Paging,formatTime
}
