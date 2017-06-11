import * as Bluebird from 'bluebird'


export class ApiError<T> extends Error {
    public data: T

    constructor(response: T, message?: string) {
        super(message)
        this.data = response
    }
}

export class BaseApi<T> {
    public getUrl(...args: any[]): string {
        throw new Error('not implemented')
    }
    public getHeaders(...args: any[]): Headers {
        return
    }
    public get(...args: any[]): Bluebird<T> {
        const url: string = this.getUrl(...args)
        const headers: Headers = this.getHeaders(...args)
        return new Bluebird<T>(function(resolve: any, reject: any): void {
            fetch(url, {
                method: 'get',
                headers: headers,
            }).then(
                function(response: Response): void {
                    response.json().then((data: any): void => {
                        if (response.ok) {
                            resolve(data)
                        } else {
                            reject(new ApiError(data))
                        }
                    }).catch((error: any): void => {
                        console.error(`Failed to get json by url: ${url}`)
                        reject(error)
                    })
                },
                function(reason: Error): void {
                    reject(reason.message)
                }
            )
        })
    }
    public post<TData>(data: TData, ...args: any[]): Bluebird<T> {
        const url: string = this.getUrl(...args)
        return new Bluebird<T>(function(resolve: any, reject: any): void {
            fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(
                function(response: Response): void {
                    response.json().then((responseData: any): void => {
                        if (response.ok) {
                            resolve(responseData)
                        } else {
                            reject(new ApiError(responseData))
                        }
                    }).catch((error: any): void => {
                        console.error(`Failed to get json by url: ${url}`)
                        reject(new ApiError({
                            reason: 'Unknown error',
                        }))
                    })
                }
            )
        })
    }
}
