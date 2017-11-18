import * as React from 'react'

import * as State from 'state'
import * as constants from 'constants'

import {
    socketConnecting,
    socketConnected,
} from 'actions/socket'
import {
    requestState,
    receiveState,
} from 'actions/status'
import * as socket from 'api/socket'

interface IAuthorizedProps {
    config: State.IConfigState,
    userInfo: State.IUserInfoState
    socketConnecting: typeof socketConnecting
    socketConnected: typeof socketConnected
    requestState: typeof requestState
    receiveState: typeof receiveState
}


export default class Authorized extends React.Component<IAuthorizedProps, {}> {
    public componentWillMount(): void {
        this._initSocket(true)

        socket.subscribe(constants.Messages.STATE, (data: State.IStatusState): void => {
            this.props.receiveState(data)
        })

        socket.subscribe(constants.Messages.CONNECT_TIMEOUT, () => {
            console.log('Socket timeout')
        })

    }
    public componentWillUnmount(): void {
        socket.unsubscribe(constants.Messages.HANDSHAKE)
        socket.unsubscribe(constants.Messages.STATE)
        socket.unsubscribe(constants.Messages.CONNECT_TIMEOUT)
    }
    public componentWillUpdate(nextProps: IAuthorizedProps): void {
        if (
            nextProps.userInfo.data.isAuthenticated
            && !this.props.userInfo.data.isAuthenticated
        ) {
            this._initSocket()
        }
    }
    public render(): React.ReactElement<{}> {
        return <div>{this.props.children}</div>
    }
    private _initSocket(requestState: boolean = false): void {
        if (this.props.userInfo.data.isAuthenticated) {
            this.props.socketConnecting()
            socket.initSocket(this.props.config, this.props.userInfo.data.userToken)

            socket.subscribe(constants.Messages.HANDSHAKE, (data: any): void => {
                console.log('Socket connected')
                this.props.socketConnected()

                if (requestState) {
                  this.props.requestState()
                  socket.send('state', {})
                }
            })
        }
    }
}
