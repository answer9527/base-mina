
import {Http} from "../utils/http"
class MsgModel{
    static async getClassicCommentMsg(data){
        return await Http.request({
            url:"/comment/msg/classic/mylist",
            data,
            method:"POST"
        })
    }
    static async getHoleCommentMsg(data){
        return await Http.request({
            url:"/comment/msg/hole/mylist",
            data,
            method:"POST"
        })
    }
    static async getMyMsgCountTotal(){
        return await Http.request({
            url:"/comment/msg/unread/total"
        })
    }
    static async getMyMsgCount(){
        return Http.request({
            url:"/comment/msg/unread/count"
        })
    }
    static async setMyMsgRead(data){
        return await Http.request({
            url:"/comment/msg/setRead?id="+data.id
        })
    }
    static async deleteMyMsgById(data){
        return await Http.request({
            url:"/comment/msg/del?id="+data.id
        })
    }
}
export{
    MsgModel
}
