import { BaseApi, } from 'api/base'
import { IConfig, } from 'state'


export default class ConfigApi extends BaseApi<IConfig> {
    public getUrl(): string {
        return '/config'
    }
}
