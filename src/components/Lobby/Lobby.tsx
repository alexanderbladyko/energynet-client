import * as React from 'react'
import {
    connect,
} from 'react-redux'

import * as State from 'state'

import * as socket from 'api/socket'

interface ILobbyProps {
    lobby: State.ILobbyState
    userInfo: State.IUserInfoState
}


class Lobby extends React.Component<ILobbyProps, {}> {
    public componentWillMount(): void {
    }
    public componentWillUnmount(): void {
    }
    public render(): React.ReactElement<{}> {
        return (
            <div>
                {'Lobby'}
            </div>
        )
    }
}
export default connect(

    (state: State.IState): any => {
        return {
            lobby: state.lobby,
            userInfo: state.userInfo,
        }
    },
    {
    }
)(Lobby)
