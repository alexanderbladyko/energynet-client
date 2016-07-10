import BaseApp from 'apps/base/app'
import {
    initSocket,
    subscribe,
} from 'socket'


export default class Connection extends BaseApp {
    stateLens(state) {
        return {
            userInfo: state.userInfo,
        }
    }
    actionCreators() {
        return {
        }
    }
    setup() {
        this.setupConnection()
    }
    setupConnection() {
        initSocket('some_token')
        subscribe('error', error => {
            if (error.type === 'UnauthorizedError'
                || error.code === 'invalid_token') {
                this.actions.socketExpired()
            }
        })
    }
}
