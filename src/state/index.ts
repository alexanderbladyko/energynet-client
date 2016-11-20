export interface IConfigState {
    loading: boolean,
    data?: IConfig,
    error: boolean,
    message?: string
}

export interface IConfig {
    authApi: string,
}

export interface IState extends Object {
    config: IConfigState,
}

export const initialState: IState = {
    config: {
        error: false,
        loading: false,
    },
}
