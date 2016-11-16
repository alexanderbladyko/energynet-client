export interface ICounterState {
    value: number,
}

export interface IState extends Object {
    counter: ICounterState,
}

export const initialState: IState = {
    counter: {
        value: 0,
    },
}
