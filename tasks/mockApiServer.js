const fs = require('fs')
const path = require('path')

const mock = process.env.MOCK || false
const mockSituation = process.env.MOCK_CASE || 0

module.exports = function mockApiServer(req, res, next) {
    if (mock) {
        const mockFile = path.resolve(path.join(__dirname, '../mocks', mockSituation, req.url + '.json'))
        const defaultMockFile = path.resolve(path.join(__dirname, '../mocks/default', req.url + '.json'))

        if (fs.existsSync(mockFile)) {
            res.sendFile(mockFile)
        } else if (fs.existsSync(defaultMockFile)) {
            res.sendFile(defaultMockFile)
        } else {
            console.log('Failed to find file', mockFile)
            next()
        }

    } else {
        next()
    }
}
