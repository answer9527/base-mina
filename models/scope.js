import {Http} from "../utils/http"
class ScopeModel{
    static async getScope(){
        return await Http.request({
            url:"/test/scope"
        })
    }
}
export{
    ScopeModel
}