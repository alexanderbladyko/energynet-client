import * as React from 'react'
import {
    connect,
} from 'react-redux'

import {
    requestResources,
    receiveResources,
} from 'actions/resources'
import * as socket from 'api/socket'
import * as State from 'state'

interface IResourcesProps {
    game: State.IGameState
    userInfo: State.IUserInfoState
    resources: State.IResourcesState
    requestResources: typeof requestResources
    receiveResources: typeof receiveResources
}


class Resources extends React.Component<IResourcesProps, {}> {
    public componentWillMount(): void {
        this.props.requestResources()
        socket.send('resources', {})

        socket.subscribe('resources', (data: State.IResources): void => {
            this.props.receiveResources(data)
        })
    }
    public componentWillUnmount(): void {
        socket.unsubscribe('resources')
    }
    public render(): React.ReactElement<{}> {
        return (
            <div>
            </div>
        )
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            game: state.game,
            userInfo: state.userInfo,
            resources: state.resources,
        }
    },
    {
        requestResources,
        receiveResources,
    }
)(Resources)
