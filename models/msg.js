
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
    static async getMyMsgCountTotal(){
        return Http.request({
            url:"/comment/msg/unread/total"
        })
    }
    static async getMyMsgCount(){
        return Http.request({
            url:"/comment/msg/unread/count"
        })
    }
    static async setMyMsgRead(data){
        return Http.request({
            url:"/comment/msg/setRead?id="+data.id
        })
    }
}
export{
    MsgModel
}
