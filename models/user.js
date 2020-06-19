import {Http} from "../utils/http"
class UserModel{
  // 
  static async reigsterAndLogin(data){
    return await Http.request({
      url:"/user/registerToken",
      data:data,
      method:"POST"
    })
  }
  static async login(data){
    return await Http.request({
      url:"/user/codeLogin?code="+data.code
    })
  }
}
export{
  UserModel
}