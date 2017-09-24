import * as io from 'socket.io-client'

import * as constants from 'constants'
import * as State from 'state'


let socket: SocketIOClient.Socket = null

export function initSocket(config: State.IConfigState, accessToken: string): void {
    if (socket) {
        console.error('Socket is already initialized')
    }

    localStorage.setItem(constants.AUTH_TOKEN_KEY, accessToken)

    socket = io.connect(config.apiUrl, {
        extraHeaders: {
            Authorization: accessToken,
        },
        query: `token=${accessToken}`,
        reconnection: true,
        reconnectionAttempts: 10,
    })
}

export function send(url: string, options: any): void {
    // if (!socket) {
    //     console.error('Socket is not initialized')
    //     initSocket()
    // }

    socket.emit(url, options)
}

export function subscribe(url: string, handler: Function): SocketIOClient.Emitter {
    // if (!socket) {
    //     console.error('Socket is not initialized')
    //     initSocket()
    // }

    return socket.on(url, handler)
}

export function unsubscribe(url: string): void {
    socket.removeListener(url)
}

export function disconnect(): void {
    socket = null
}
