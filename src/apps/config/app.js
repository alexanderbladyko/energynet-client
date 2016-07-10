import BaseApp from 'apps/base/app'
import {
    loadConfig,
} from 'actions/config'


export default class ConfigApp extends BaseApp {
    stateLens(state) {
        return {
            config: state.config,
        }
    }
    actionCreators() {
        return {
            loadConfig,
        }
    }
    load() {
        return this.dispatch.loadConfig()
    }
}
