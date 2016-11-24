import * as Bluebird from 'bluebird'


export class BaseApi<T> {
    public getUrl(...args: any[]): string {
        throw new Error('not implemented')
    }
    public get(...args: any[]): Bluebird<T> {
        const url = this.getUrl(...args)
        return new Bluebird<T>(function(resolve, reject) {
            fetch(url, {
                method: 'get',
            }).then(function(response: Response) {
                if (response.ok) {
                    return response.json()
                }
            })
        })
    }
    public post(data: any, ...args: any[]): Bluebird<T> {
        const url = this.getUrl(...args)
        return new Bluebird<T>(function(resolve, reject) {
            fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }).then(function(response: Response) {
                if (response.ok) {
                    return response.json()
                }
            })
        })
    }
}
