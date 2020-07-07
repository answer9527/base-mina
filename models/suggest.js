import {Http} from "../utils/http"
class SuggestModel{
    static async getList(data){
        return await Http.request({
            url:"/suggest/all",
            data,
            method:"POST"
        })
    }
    static async insert(data){
        return await Http.request({
            url:"/suggest/insert",
            data:data,
            method:"POST"
        })
    }
}

export{
    SuggestModel
}