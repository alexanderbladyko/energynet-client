import 'whatwg-fetch'
import * as Promise from 'bluebird'


export class BaseApi {
    getUrl(...args: any[]): string {
        throw new Error('not implemented')
    }
    get(...args: any[]) {
        const url = this.getUrl(...args)
        fetch(url, {
            method: 'get',
        })
    }
    post(data: any, ...args: any[]) {
        const url = this.getUrl(...args)
        return new Promise(function(resolve, reject) {
            fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }).then(function()
            )
        })
        
    }
}