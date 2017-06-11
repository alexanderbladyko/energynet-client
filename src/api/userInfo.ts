import { BaseApi, } from 'api/base'
import { IUserInfo, IConfig, } from 'state'


export default class UserInfoApi extends BaseApi<IUserInfo> {
    public getUrl(config: IConfig, token: string): string {
        return `${config.authApi}/user_info`
    }
    public getHeaders(config: IConfig, token: string): Headers {
        const headers: Headers = new Headers()
        headers.append('Authorization', token)
        return headers
    }
}
