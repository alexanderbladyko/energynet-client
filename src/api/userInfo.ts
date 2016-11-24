import { BaseApi, } from './base'
import { IUserInfo, IConfigState, } from '../state'


export default class UserInfoApi extends BaseApi<IUserInfo> {
    getUrl(config: IConfigState): string {
        return `${config.data.authApi}/user_info`
    }
}
