import * as React from 'react'
import { connect } from 'react-redux'

import { IState, ICounterState } from 'state'
import { increaseCounter, decreaseCounter } from '../actions/counter'

interface ICounterStateProps {
    counter: ICounterState
    increaseCounter: () => void
    decreaseCounter: () => void
}

class Counter extends React.Component<ICounterStateProps, {}> {
    public render(): React.ReactElement<{}> {
        return (
            <div>
                {`Counter: ${this.props.counter.value}`}
                <button onClick={() => this.props.increaseCounter()}>
                    {'Increase'}
                </button>
                <button onClick={() => this.props.decreaseCounter()}>
                    {'Decrease'}
                </button>
            </div>
        )
    }
}

export default connect(
    (state: IState): any => {
        return {
            counter: state.counter,
        }
    },
    {
        increaseCounter,
        decreaseCounter,
    }
)(Counter)
