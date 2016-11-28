import { BaseApi, } from 'api/base'
import { IUserInfo, IConfigState, } from 'state'


export default class UserInfoApi extends BaseApi<IUserInfo> {
    public getUrl(config: IConfigState): string {
        return `${config.data.authApi}/user_info`
    }
}
