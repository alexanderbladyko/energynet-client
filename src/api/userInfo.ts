import { BaseApi, } from 'api/base'
import { IUserInfo, IConfigState, } from 'state'


export default class UserInfoApi extends BaseApi<IUserInfo> {
    getUrl(config: IConfigState) {
        return `${config.data.authApi}/user_info`
    }
}
