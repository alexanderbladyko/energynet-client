import * as React from 'react'
import {
    connect,
} from 'react-redux'

import {
    requestResources,
    receiveResources,
} from 'actions/resources'
import * as socket from 'api/socket'
import * as constants from 'constants'
import Currency from 'components/Currency/Currency'
import Resource from 'components/Resource/Resource'
import * as State from 'state'

import './Resources.scss'


interface IResourcesProps {
    game: State.IGameState
    userInfo: State.IUserInfoState
    resources: State.IResourcesState
    map: State.IMapState
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
        if (!this.props.resources.data || !this.props.map.data) {
            return null
        }
        return (
            <div className='resources'>
                <div className='resources_lines'>
                    {this.renderResourceLine(constants.ResourceTypes.OIL)}
                    {this.renderResourceLine(constants.ResourceTypes.COAL)}
                    {this.renderResourceLine(constants.ResourceTypes.WASTE)}
                    {this.renderResourceLine(constants.ResourceTypes.URANIUM)}
                </div>
                <div className='resources_action'>
                </div>
            </div>
        )
    }
    private renderResourceLine(resource: string): React.ReactElement<{}> {
        const userId: number = this.props.userInfo.data.id
        const yourTurn: boolean = (this.props.game.meta.turn === userId)
        const resourceGroupCount: number = this.props.map.data.resourceGroup[resource]
        const resourceLimit: number = this.props.map.data.resourceLimits[resource]
        const resourceCount: number = this.props.resources.data[resource]
        const cost: number = Math.ceil((resourceLimit - resourceCount) / resourceGroupCount)
        let rest: number = (resourceLimit - resourceCount) % resourceGroupCount
        if (rest === 0) {
            rest++
        }
        const resources: any[] = []
        for (let i: number = 0; i < resourceGroupCount; i++) {
            resources.push(
                <div key={i} className='resources_item'>
                    <Resource
                        resources={[resource]}
                        size={Resource.IconSize.SMALL}
                        disabled={i < resourceGroupCount - rest}
                    />
                </div>
            )
        }
        return (
            <div className='resources_line'>
                <div className='resources_item'>
                    <Currency value={cost} size={Currency.IconSize.SMALL} />
                </div>
                {resources}
            </div>
        )
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            game: state.game,
            map: state.map,
            userInfo: state.userInfo,
            resources: state.resources,
        }
    },
    {
        requestResources,
        receiveResources,
    }
)(Resources)
