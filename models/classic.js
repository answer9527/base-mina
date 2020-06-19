import {Http} from "../utils/http"

class ClassicModel{
  // 获取上一篇或下一篇推荐
  static async getClassic(index,nextOrPre){
    let str = nextOrPre=="next"?"/next":"/previous";
    let res = await Http.request({
      url:"/classic/"+index+str
    })

    return res;
  }

  // 获取最新的推荐
  static async getLatest(){
    return await Http.request({
      url:"/classic/latest"
    })
  }
}
export{
  ClassicModel
}