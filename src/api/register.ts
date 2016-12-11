import { BaseApi, } from 'api/base'
import { IRegister, IConfig, } from 'state'


export default class RegisterApi extends BaseApi<IRegister> {
    public getUrl(config: IConfig): string {
        return `${config.authApi}/register`
    }
}
