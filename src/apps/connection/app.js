import BaseApp from 'apps/base/app'
import {
    initSocket,
    subscribe,
} from 'socket'
import { socketConnect } from 'actions/socket'
import { storeSubscribe } from 'utils/redux'


export default class Connection extends BaseApp {
    actions() {
        return {
            socketConnect,
        }
    }
    setup(store) {
        storeSubscribe(store, state => ({
            userInfo: state.userInfo,
            socket: state.socket,
        }), (oldState, newState) => {
            // connect on authentication
            if (newState.userInfo.data.isAuthenticated && !newState.socket.connected) {
                this.setupConnection()
                this.onConnect()
            }
        })
    }
    setupConnection() {
        this.dispatch.socketConnect()
        initSocket()
        subscribe('shlyapa', data => {
            console.log(`Server responded ${data}`)
        })
        subscribe('error', error => {
            if (error.type === 'UnauthorizedError'
                || error.code === 'invalid_token') {
                this.dispatch.socketExpired()
            }
        })
    }
    onConnect() {}
}
