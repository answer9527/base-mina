import {config} from "../config/config"
import {promisic} from "./util"
import {Token} from "./token"

class Http{
  static async request({url,data,method="GET"}){
    let bearer_token;
    const token = wx.getStorageSync("token");
    if(token){
      bearer_token="Bearer "+token
    }else{
      bearer_token=""
    }
    let res = await promisic(wx.request)({
      header:{
        "context-type": "application/json",
        "Authorization": bearer_token
      },
      url:`${config.base_url}`+url,data,method
    })
   let statusCode = res.statusCode.toString()
   let error_code = res.data.code
   if(statusCode==200){
      return res.data
   }else if(statusCode==403){
      // 捕捉系统感知的异常
      if(error_code==40006){

        let again_token = await Token.getToken()
        let again_res =await Http._againRequest(again_token,url,data,method)
        return again_res   

      }else if(error_code==40005||error_code==40001){
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

      }
   }else{
    wx.showToast({
      title: res.data.message,
      icon: 'none',
      duration: 2000
    })
    return false
   }
    
  }

  // 当token过期  重新生成token再二次请求
  static async _againRequest(token,url,data,method){
    let bearer_token;
    if(token){
      bearer_token="Bearer "+token
    }else{
      bearer_token=""
    }
    let res = await promisic(wx.request)({
      header:{
        "context-type": "application/json",
        "Authorization": bearer_token
      },
      url:`${config.base_url}`+url,
      data,
      method
    }) 
    return res.data
  }

}



export{
  Http
}