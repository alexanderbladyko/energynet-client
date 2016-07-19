import io from 'socket.io-client'


let socket = null

export function initSocket() {
    socket = io()
    console.info('Socket connected')
}

export function send(url, options) {
    socket.emit(url, options)
}

export function subscribe(url, handler) {
    socket.on(url, handler)
}
