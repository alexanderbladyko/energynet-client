const fs = require('fs')
const path = require('path')

const mock = process.env.MOCK || false
const mockSituation = process.env.MOCK_CASE || 0


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
    console.log(req.url)
    if (mock) {
        var resolvedFile
        var correctConfig
        for (var i = 0; i < config.length; i++) {
            var part = config[i].pattern
                .replace('{mockSituation}', mockSituation)
                .replace('{url}', req.url)
                .replace('{method}', req.method)
            var mockFile = path.resolve(
                path.join(__dirname, '../../mocks', part)
            )
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
            console.log('Failed to find file', req.url)
            next()
        }
    } else {
        next()
    }
}
