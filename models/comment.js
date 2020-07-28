import {Http} from "../utils/http"

class CommentModel{
    static async getCommentByCid(data){
        return await Http.request({
            url:"/comment/selectByCid",
            data,
            method:"POST"
        })
    }   
    static async insertComment(data){
        return await Http.request({
            url:"/comment/insert",
            data,
            method:"POST"
        })
    }
    static async delComment(data){
        return await Http.request({
            url:"/comment/del/"+data.id
        })
    }
}
export {
    CommentModel
}