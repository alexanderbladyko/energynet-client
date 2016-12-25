const path = require('path')
const http = require('http')
const express = require('express')
const webpack = require('webpack')
const socketIo = require('socket.io')

const config = require('../config/webpack.dev')

const mockApiServer = require('./utils/mockApiServer')
const setupSocketServer = require('./utils/mockSocketServer')

const app = express()
const server = new http.Server(app)
const compiler = webpack(config)
const port = process.env.PORT || 3000

const io = socketIo(server)

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use(mockApiServer)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

server.listen(port, 'localhost', err => {
    if (err) {
        console.log(err)
        return
    }

    console.log(`Listening at http://localhost:${port}`)
})

setupSocketServer(io)
