import {Http} from "../utils/http"
class VersionModel{
    static async getVersionList(){
        return Http.request({
            url:"/version/list"
        })
    }
}
export {
    VersionModel
}