import {Http} from "../utils/http"
class SentenceModel{
   static async getRand(){
        return await Http.request({
            url:"/sentence/rand"
        })
    }
}
export{
    SentenceModel
}