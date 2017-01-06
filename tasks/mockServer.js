const path = require('path')
const http = require('http')
const express = require('express')
const socketIo = require('socket.io')

const mockApiServer = require('./utils/mockApiServer')
const setupSocketServer = require('./utils/mockSocketServer')

const mock = process.env.MOCK || false

const app = express()
const server = new http.Server(app)
const port = 5000

const io = socketIo(server)

app.use(mockApiServer)

server.listen(port, 'localhost', err => {
    if (err) {
        console.log(err)
        return
    }

    console.log(`Listening at http://localhost:${port}`)
})

setupSocketServer(io)
