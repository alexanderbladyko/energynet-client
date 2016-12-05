import { BaseApi, } from 'api/base'
import { IUserInfo, IConfig, } from 'state'


export default class LoginApi extends BaseApi<IUserInfo> {
    public getUrl(config: IConfig): string {
        return `${config.authApi}/login`
    }
}
