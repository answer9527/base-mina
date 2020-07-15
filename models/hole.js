import {Http} from "../utils/http"
class HoleModel{
    static async get_rand_hole(data){
        return Http.request({
            url:"/hole/rand",
            data,
            method:"POST"
        })
    }
    static async get_my_hole(data){
        return Http.request({
            url:"/hole/myhole",
            data,
            method:"POST"
        })
    }
    static async insert_hole(data){
        return Http.request({
            url:"/hole/insert",
            data,
            method:"POST"
        })
    }
    static async get_by_id(id){
        return Http.request({
            url:"/hole/getById/"+id
        })
    }
    // 获取树洞的评论
    static async get_Comment(data){
        return Http.request({
            url:"/hole/comment/selectByHid",
            data,
            method:"POST"
        })
    }
    // 评论树洞
    static async insert_comment(data){
        return Http.request({
            url:"/hole/comment/insert",
            data,
            method:"POST"
        })
    }

}
export {
    HoleModel 
}