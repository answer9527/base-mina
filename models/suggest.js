import {Http} from "../utils/http"
class SuggestModel{
    static async getList(data){
        return await Http.request({
            url:"/suggest/all",
            data,
            method:"POST"
        })
    }
}

export{
    SuggestModel
}