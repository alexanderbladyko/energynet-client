import 'whatwg-fetch'


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
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
    }
}