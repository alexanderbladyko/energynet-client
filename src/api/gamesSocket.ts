import * as io from 'socket.io-client'


let socket: SocketIOClient.Socket = null

export function initSocket(): void {
    if (socket) {
        console.error('Socket is already initialized')
    }
    socket = io('/games')
}

export function send(url: string, options: any): void {
    if (!socket) {
        console.error('Socket is not initialized')
        initSocket()
    }

    socket.emit(url, options)
}

export function subscribe(url: string, handler: Function): SocketIOClient.Emitter {
    if (!socket) {
        console.error('Socket is not initialized')
        initSocket()
    }

    return socket.on(url, handler)
}

export function unsubscribe(url: string): void {
    socket.removeListener(url)
}

export function disconnect(): void {
    socket.removeAllListeners()
    socket = null
}
