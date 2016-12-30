const fs = require('fs')
const path = require('path')

const mock = process.env.MOCK || false
const mockSituation = process.env.MOCK_CASE || 0

var mockDirectory = path.resolve(
    path.join(__dirname, '../../mocks/' + mockSituation + '/socket')
).toLowerCase()

var defaultMockDirectory = path.resolve(
    path.join(__dirname, '../../mocks/default/socket')
).toLowerCase()

var filesStructure = {
    files: {},
    directories: {},
}


function lookupFiles() {
    var all = []
    try {
        all = fs.readdirSync(mockDirectory)
    } catch (e) {
        console.log("Failed to find socket directory in mock situation folder")
    }
    return {
        all: all,
        default: fs.readdirSync(defaultMockDirectory),
    }
}

function getSocketHandler(socket, path, namespace) {
    return function(data) {
        console.log(`Came ${JSON.stringify(data)} from ${path} in namespace ${namespace}`)
        var fileContent = null
        try {
            fileContent = fs.readFileSync(mockDirectory + namespace + '/' + path + '.json', 'utf-8')
        } catch (e) {}
        if (fileContent) {
            respond(socket, fileContent)
            return
        }
        try {
            fileContent = fs.readFileSync(defaultMockDirectory + namespace + '/' + path + '.json', 'utf-8')
        } catch (e) {}
        if (fileContent) {
            respond(socket, fileContent)
            return
        }
    }
}

function respond(socket, fileContent) {
    try {
        var responses = JSON.parse(fileContent)
        console.log(`Responded:`)
        responses.forEach(response => {
            console.log(`  ${response.name}: ${JSON.stringify(response.data)}`)
            socket.emit(response.name, response.data)
        })
    } catch (e) {
        console.error(e)
    }
}


function fillFileStructure(files, rootFolder) {
    files.forEach(file => {
        if (file.indexOf('.json') === -1) {
            if (!filesStructure.directories[file]) {
                filesStructure.directories[file] = {}
            }
            try {
                fs.readdirSync(rootFolder + '/' + file).forEach(f => {
                    filesStructure.directories[file][f.replace('.json', '')] = {}
                })
            } catch (e) {}
        } else {
            var newFileName = file.replace('.json', '')
            filesStructure.files[newFileName] = {}
        }
    })
}

module.exports = function(io) {
    var files = lookupFiles()
    fillFileStructure(files.all, mockDirectory)
    fillFileStructure(files.default, defaultMockDirectory)

    io.on('connection', function(socket) {
        Object.keys(filesStructure.files).forEach(file => {
            socket.on(file, getSocketHandler(socket, file, ''))
        })
        socket.emit('handshake', {connected: true})
    })

    Object.keys(filesStructure.directories).forEach(directory => {
        var namespace = '/' + directory
        var nio = io.of(namespace)

        nio.on('connection', function(socket) {
            Object.keys(filesStructure.directories[directory]).forEach(file => {
                socket.on(file, getSocketHandler(socket, file, namespace))
            })
            socket.emit('handshake', {connected: true})
        })
    })
}
