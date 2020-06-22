import {config} from "../config/config"
import {promisic} from "./util"


class Http{
  static async request({url,data,method="GET"}){
    const token = wx.getStorageSync("token")||"";
    let res = await promisic(wx.request)({
      header:{
        "context-type": "application/json",
        "Authorization": "Bearer "+token
      },
      url:`${config.base_url}`+url,data,method
    })
    return res.data
  }
}
export{
  Http
}