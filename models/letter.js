import {Http} from "../utils/http"
class LetterModel{
   static async getMyLetter(){
        return await Http.request({
            url:"/letter/myletter"
        })
    }
}
export {
    LetterModel
}