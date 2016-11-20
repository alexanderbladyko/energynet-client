import { BaseApi } from 'api/base'

import { IConfigState } from 'state'


export default class UserInfoApi extends BaseApi {
    getUrl(config: IConfigState) {
        return `${config.data.authApi}/user_info`
    }
}


