const fs = require('fs')
const path = require('path')
const url = require('url')

const mock = process.env.MOCK || false
const mockSituation = process.env.MOCK_CASE || 0
const verbose = process.env.VERBOSE || false


// TODO: make directory search later
const config = [
    {
        pattern: '{mockSituation}/{url}.json',
        status: 200,
    },
    {
        pattern: 'default/{url}.json',
        status: 200,
    },
    {
        pattern: '{mockSituation}/{url}_{method}.json',
        status: 200,
    },
    {
        pattern: '{mockSituation}/{url}_{method}_403.json',
        status: 403,
    },
    {
        pattern: '{mockSituation}/{url}_{method}_409.json',
        status: 409,
    },
    {
        pattern: 'default/{url}_{method}.json',
        status: 200,
    },
]

module.exports = function mockApiServer(req, res, next) {
    var resolvePaths = []
    if (req.url.indexOf('socket.io') !== -1) {
        next()
        return
    }
    if (mock) {
        var resolvedFile
        var correctConfig
        var requestUrl = url.parse(req.url)
        for (var i = 0; i < config.length; i++) {
            var part = config[i].pattern
                .replace('{mockSituation}', mockSituation)
                .replace('{url}', requestUrl.pathname)
                .replace('{method}', req.method)
                .toLowerCase()
            var mockFile = path.resolve(
                path.join(__dirname, '../../mocks', part)
            )
            resolvePaths.push(mockFile)
            if (fs.existsSync(mockFile)) {
                resolvedFile = mockFile
                correctConfig = config[i]
                break
            }
        }
        if (resolvedFile) {
            res.statusCode = correctConfig.status
            res.sendFile(resolvedFile)
        } else {
            console.log('Failed to find file', requestUrl.pathname)
            if (verbose) {
                console.log('Resolve paths: ', resolvePaths)
            }
            next()
        }
    } else {
        next()
    }
}
