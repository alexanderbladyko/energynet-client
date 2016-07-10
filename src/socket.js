import io from 'socket.io-client'


let socket = null

export function initSocket(token) {
    socket = io('localhost:5000', {
        query: `token=${token}`,
    })
}

export function send(url, options) {
    socket.emit(url, options)
}

export function subscribe(url, handler) {
    socket.on(url, handler)
}
