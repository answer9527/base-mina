import {Http} from "../utils/http"
class TemplateMsgModel{
    static async getList(){
        return await Http.request({
            url:"/wx/msg/template/list"
        })
    }
}
export{
    TemplateMsgModel
}