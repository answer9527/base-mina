import {Http} from "../utils/http"
class LetterModel{
   static async getMyLetter(){
        return await Http.request({
            url:"/letter/myletter"
        })
    }
    static async insertLetter(data){
        return await Http.request({
            url:"/letter/insert",
            data,
            method:"POST"
        })
    }
    static async getMyLetterList(data){
        return await Http.request({
            url:"/letter/myletter/list",
            data,
            method:"POST"
        })
    }
    // 获取我的某封信详情
    static async getMyLetterDetail(data){
        return await Http.request({
            url:"/letter/myletter/detail/"+data.id
        })
    }

    // 删除我的某封信件
    static async deleteMyLetter(data){
        return await Http.request({
            url:"/letter/myletter/del/"+data.id
        })
    }
}
export {
    LetterModel
}