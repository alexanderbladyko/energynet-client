import io from 'socket.io-client'


let socket = null

export function initSocket() {
    socket = io()
}

export function send(url, options) {
    if (!socket) initSocket()

    socket.emit(url, options)
}

export function subscribe(url, handler) {
    if (!socket) initSocket()

    return socket.on(url, handler)
}
