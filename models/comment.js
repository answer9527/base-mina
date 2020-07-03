import {Http} from "../utils/http"

class CommentModel{
    static async getCommentByCid(id){
        return await Http.request({
            url:"/comment/selectByCid/"+id,
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
}
export {
    CommentModel
}