import * as React from 'react'
import {
    connect,
} from 'react-redux'

import * as State from 'state'
import * as Routes from 'constants/routes'

import {
    navigate,
} from 'actions/route'
import {
    socketConnecting,
    socketConnected,
} from 'actions/socket'
import {
    requestState,
    receiveState,
} from 'actions/status'

interface IHomeProps {
    config: State.IConfigState,
    status: State.IStatusState,
    route: State.IRouteState
    userInfo: State.IUserInfoState
    socketConnecting: typeof socketConnecting
    socketConnected: typeof socketConnected
    requestState: typeof requestState
    receiveState: typeof receiveState
    navigate: typeof navigate
}


class Home extends React.Component<IHomeProps, {}> {
    public render(): React.ReactElement<{}> {
        return (
            <div>
                {
                    this.props.status.loading
                    && 'Loading'
                }
                {
                    !this.props.status.loading
                    && <div>
                        {'Home'}
                        <button
                            title='To games'
                            onClick={() => { this.props.navigate(Routes.GAMES_ROUTE) }}
                        >
                        {'To games'}
                        </button>
                    </div>
                }
            </div>
        )
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            config: state.config,
            status: state.status,
            route: state.route,
            userInfo: state.userInfo,
        }
    },
    {
        socketConnecting,
        socketConnected,
        requestState,
        receiveState,
        navigate,
    }
)(Home)
