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

function getResponses(socket, path, namespace) {
    return function() {
        var responses = []
        try {
            responses = fs.readFileSync(mockDirectory + namespace + '/' + path + '.json')
            respond(socket, responses)
            return
        } catch (e) {}
        try {
            responses = fs.readFileSync(defaultMockDirectory + namespace + '/' + path + '.json')
            respond(socket, responses)
            return
        } catch (e) {}
    }
}

function respond(socket, responses) {
    responses.forEach(response => {
        socket.emit(response.name, response.data)
    })
}


module.exports = function(io) {
    var files = lookupFiles()

    io.on('connection', function(socket) {


        files.all.forEach(file => {
            var fileContent = fs.readFileSync(mockDirectory + '/' + file)
            socket.on(file.replace('.json', ''), function() {
                fileContent.forEach(response => {
                    io.emit(response.name, response.data)
                })
            })
        })
    })
}
