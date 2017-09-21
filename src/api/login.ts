import { BaseApi, } from 'api/base'
import { IUserInfo, IConfigState, } from 'state'


export default class LoginApi extends BaseApi<IUserInfo> {
    public getUrl(config: IConfigState): string {
        return `${config.apiUrl}/login`
    }
}
