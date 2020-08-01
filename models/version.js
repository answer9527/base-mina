import {Http} from "../utils/http"
class VersionModel{
    static async getVersionList(){
        return await Http.request({
            url:"/version/list"
        })
    }
}
export {
    VersionModel
}