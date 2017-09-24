import { BaseApi, } from 'api/base'
import { IRegister, IConfigState, } from 'state'


export default class RegisterApi extends BaseApi<IRegister> {
    public getUrl(config: IConfigState): string {
        return `${config.apiUrl}/auth/register`
    }
}
