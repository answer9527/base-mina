import {config} from "../config/config"
import {promisic} from "./util"


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
    return res.data
  }
}
export{
  Http
}