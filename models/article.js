import {Http} from "../utils/http"
class ArticleModel{
    static async getDetail(id){
        return await Http.request({
            url:"/article/detail/"+id
        })
    }
}
export {
    ArticleModel
}