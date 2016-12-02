import * as React from 'react'
import {
    connect,
} from 'react-redux'

import {
    IState,
    IConfigState,
} from 'state'


interface ICounterStateProps {
    config: IConfigState
}

class Counter extends React.Component<ICounterStateProps, {}> {
    public render(): React.ReactElement<{}> {
        return (
            <div>
                {`Config: ${JSON.stringify(this.props.config.data)}`}
            </div>
        )
    }
}

export default connect(
    (state: IState): any => {
        return {
            config: state.config,
        }
    },
    {
        // increaseCounter,
        // decreaseCounter,
    }
)(Counter)
