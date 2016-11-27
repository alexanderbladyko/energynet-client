import * as Bluebird from 'bluebird'


export class BaseApi<T> {
    public getUrl(...args: any[]): string {
        throw new Error('not implemented')
    }
    public get(...args: any[]): Bluebird<T> {
        const url: string = this.getUrl(...args)
        return new Bluebird<T>(function(resolve: any, reject: any): void {
            fetch(url, {
                method: 'get',
            }).then(function(response: Response): void {
                if (response.ok) {
                    response.json().then((data: any): void => {
                        resolve(data)
                    }).catch((error: any): void => {
                        console.error(`Failed to get json by url: ${url}`)
                        reject(error)
                    })
                }
            })
        })
    }
    public post(data: any, ...args: any[]): Bluebird<T> {
        const url: string = this.getUrl(...args)
        return new Bluebird<T>(function(resolve: any, reject: any): void {
            fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(function(response: Response): void {
                if (response.ok) {
                    response.json().then((responseData: any): void => {
                        resolve(responseData)
                    }).catch((error: any): void => {
                        console.error(`Failed to get json by url: ${url}`)
                        reject(error)
                    })
                }
            })
        })
    }
}
