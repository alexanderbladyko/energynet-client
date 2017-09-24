import { BaseApi, } from 'api/base'
import { IUserInfo, IConfigState, } from 'state'


export default class UserInfoApi extends BaseApi<IUserInfo> {
    public getUrl(config: IConfigState, token: string): string {
        return `${config.apiUrl}/auth/user_info`
    }
    public getHeaders(config: IConfigState, token: string): Headers {
        const headers: Headers = new Headers()
        headers.append('Authorization', token)
        return headers
    }
}
