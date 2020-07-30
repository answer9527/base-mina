
import {Http} from "../utils/http"
class MsgModel{
    static async getClassicCommentMsg(data){
        return Http.request({
            url:"/comment/msg/classic/mylist",
            data,
            method:"POST"
        })
    }
    static async getHoleCommentMsg(data){
        return Http.request({
            url:"/comment/msg/hole/mylist",
            data,
            method:"POST"
        })
    }
}
export{
    MsgModel
}
