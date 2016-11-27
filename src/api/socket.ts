import * as io from 'socket.io-client'


let socket: SocketIOClient.Socket = null

export function initSocket(): void {
    socket = io()
}

export function send(url: string, options: any): void {
    if (!socket) {
        initSocket()
    }

    socket.emit(url, options)
}

export function subscribe(url: string, handler: Function): SocketIOClient.Emitter {
    if (!socket) {
         initSocket()
    }

    return socket.on(url, handler)
}
