import {promisic} from "./util"
import {config} from "../config/config"
class Token{
    static async getToken(){
        let wx_login_res  = await promisic(wx.login)({})
        let token_res = await promisic(wx.request)({
            header:{
                "context-type": "application/json",
            },
            url:`${config.base_url}`+"/user/codeLogin",
            data:{
                "code":wx_login_res.code
            },
            method:"GET"
        })
        let error_code = token_res.data.code
        let result = token_res.data
        if(error_code==0){
            
            let {token,uid,userInfo} =result.data
            let {userName,avatarUrl,gender} = userInfo
            wx.setStorageSync("token",token)
            wx.setStorageSync("uid",Number(uid))
            wx.setStorageSync("userInfo",{userName,avatarUrl,gender})
            return token
        }else{
            if(error_code==40005||error_code==40001){
                wx.navigateTo({
                    url: '/pages/login/index',
                    success:()=>{
                      wx.showToast({
                        title: result.message,
                        icon: 'none',
                        duration: 2000
                      })
                    }
                  });
            }else{
                wx.showToast({
                    title:result.message,
                    icon: 'none',
                    duration: 2000
                  })
            }
        } 

    }
}

export{
    Token
}