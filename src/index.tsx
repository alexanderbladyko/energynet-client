import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Store, createStore, Reducer } from 'redux';
import { Provider } from 'react-redux';


interface IState {
}

function configureStore(): Store<IState> {
    const reducer: Reducer<IState> = () => { return {} }
    const store: Store<IState> = createStore(reducer)

    // if (module.hot) {
    //     module.hot.accept('./reducers', () => {
    //         const nextRootReducer: any = require('./reducers').counterApp;
    //         store.replaceReducer(nextRootReducer);
    //     });
    // }

    return store
}

const store: Store<IState> = configureStore()

class Main extends React.Component<{}, {}> {

    public render(): React.ReactElement<{}> {
        return (
            <Provider store={store}>
                <div>Test</div>
            </Provider>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('app'))

export function sum(a: number, b: number): number {
    return a + b
}
