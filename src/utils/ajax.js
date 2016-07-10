import _ from 'lodash'
import Promise from 'promise'


function createRequest(method, url) {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    return xhr
}

function getPayload(parameters) {
    if (_.isObject(parameters)) {
        const body = _(parameters)
            .mapValues((value, key) => `${key}=${encodeURIComponent(value)}`)
            .values()
            .value()
        return body.join('&')
    }
}

function request(method, url, parameters) {
    return new Promise((resolve, reject) => {
        const req = createRequest(method, url)
        const payload = getPayload(parameters)
        if (payload && payload.length) {
            req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        }

        req.send(payload)
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                let data
                try {
                    data = JSON.parse(req.responseText)
                } catch (exc) {
                    data = req.responseText
                }
                if (req.status === 200) {
                    return resolve(data)
                }
                return reject(data)
            }
        }
    })
}

export default {
    request,
    get(url, parameters) {
        return request('GET', url, parameters || {})
    },
    post(url, parameters) {
        return request('POST', url, parameters)
    },
}
