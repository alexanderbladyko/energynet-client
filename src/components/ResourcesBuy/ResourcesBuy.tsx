import * as React from 'react'
import {
    connect,
} from 'react-redux'

import {
    requestGameAction,
} from 'actions/action'
import * as socket from 'api/socket'
import * as constants from 'constants'
import * as State from 'state'
import Currency from 'components/Currency/Currency'
import Resource from 'components/Resource/Resource'

import './ResourcesBuy.scss'


interface IResourceBuyProps {
    game: State.IGameState
    map: State.IMapState
    resources: State.IResourcesState
    userInfo: State.IUserInfoState
    requestGameAction: typeof requestGameAction
}

interface IResourceBuyState {
    selectedResource: string
    resources: State.IResources
}


class ResourceBuy extends React.Component<IResourceBuyProps, IResourceBuyState> {
    public componentWillMount(): void {
        this.setState({
            selectedResource: 'coal',
            resources: {
                coal: 0,
                oil: 0,
                waste: 0,
                uranium: 0,
            },
        })
    }
    public render(): React.ReactElement<{}> {
        if (this.props.resources.loading) {
            return (
                <div>{'Loading...'}</div>
            )
        }
        if (!this.props.resources.data) {
            return null
        }

        if (!this.props.map.data) {
            return null
        }

        return (
            <div className='resources-buy'>
                <div className='resources-buy_resources'>
                    <div className='resources-buy_tabs'>
                        {this.renderResourceTab(constants.ResourceTypes.COAL)}
                        {this.renderResourceTab(constants.ResourceTypes.OIL)}
                        {this.renderResourceTab(constants.ResourceTypes.WASTE)}
                        {this.renderResourceTab(constants.ResourceTypes.URANIUM)}
                    </div>
                    {this.renderResourceBlock()}
                    {this.renderResourceControls(constants.ResourceTypes.COAL)}
                    {this.renderResourceControls(constants.ResourceTypes.OIL)}
                    {this.renderResourceControls(constants.ResourceTypes.WASTE)}
                    {this.renderResourceControls(constants.ResourceTypes.URANIUM)}
                </div>
                <div className='resources-buy_action'>
                    <Currency
                        value={this.getCurrentPrice()}
                        size={Currency.IconSize.BIG}
                    />
                    <button
                        className='button resources-buy_button'
                        onClick={() => this.handleApplyClick()}
                    >{
                        'Apply'
                    }</button>
                </div>
            </div>
        )
    }
    private renderResourceTab(resource: string): React.ReactElement<{}> {
        return (
            <div
                className='resources-buy_tab'
                onClick={() => this.handleSelectResource(resource)}
            >
                <span>{this.state.resources[resource]}</span>
                <Resource
                    resources={[resource, ]}
                    size={Resource.IconSize.SMALL}
                />
            </div>
        )
    }
    private renderResourceControls(resource: string): React.ReactElement<{}> {
        if (resource !== this.state.selectedResource) {
            return null
        }
        return (
            <div className='resources-buy_controls'>
                <div className='resources-buy_control'>
                    <button className='button' onClick={() => this.handleResourceChange(resource, -1)}>{'-'}</button>
                </div>
                <Currency
                    value={this.getCurrentResourcePrice(resource)}
                    size={Currency.IconSize.SMALL}
                />
                <div className='resources-buy_control'>
                    <button className='button' onClick={() => this.handleResourceChange(resource, 1)}>{'+'}</button>
                </div>
            </div>
        )
    }
    private renderResourceBlock(): React.ReactElement<{}> {
        const resource: string = this.state.selectedResource
        const groupCount: number = this.props.map.data.resourceGroup[resource]
        const limit: number = this.props.map.data.resourceLimits[resource]
        const rest: number = this.props.resources.data[resource]
        const reserved: number = this.state.resources[resource]
        const free: number = limit - rest + reserved + 1
        const cost: number = Math.ceil(free / groupCount)
        let after: number = groupCount - (rest - reserved) % groupCount
        if (after === groupCount) {
            after = 0
        }
        const resources: any[] = []
        for (let i: number = 0; i < groupCount; i++) {
            resources.push(
                <Resource
                    key={i}
                    resources={[resource, ]}
                    size={Resource.IconSize.SMALL}
                    disabled={i < after}
                />
            )
        }
        return (
            <div className='resources-buy_block' key={cost}>
                <div className='resources-buy_block-cost'>
                    <Currency value={cost} size={Currency.IconSize.SMALL} />
                </div>
                <div key={resource} className='resources-buy_items'>
                    {resources}
                </div>
            </div>
        )
    }
    private handleSelectResource(resource: string): void {
        this.setState({
            ...this.state,
            selectedResource: resource,
        })
    }
    private handleResourceChange(resource: string, delta: number): void {
        this.setState({
            ...this.state,
            resources: {
                ...this.state.resources,
                [resource]: this.state.resources[resource] + delta,
            },
        })
    }
    private handleApplyClick(): void {
        socket.send(constants.ActionTypes.RESOURCE_BUY, this.state.resources)
        this.props.requestGameAction(constants.ActionTypes.RESOURCE_BUY, this.state.resources)
    }
    private getCurrentPrice(): number {
        return (
            this.getCurrentResourcePrice(constants.ResourceTypes.COAL) +
            this.getCurrentResourcePrice(constants.ResourceTypes.OIL) +
            this.getCurrentResourcePrice(constants.ResourceTypes.URANIUM) +
            this.getCurrentResourcePrice(constants.ResourceTypes.WASTE)
        )
    }
    private getCurrentResourcePrice(resource: string): number {
        const reserved: number = this.state.resources[resource]
        const rest: number = this.props.resources.data[resource]
        const limit: number = this.props.map.data.resourceLimits[resource]
        const groupCount: number = this.props.map.data.resourceGroup[resource]
        let price: number = 0
        for (let i: number = 0; i < reserved; i++) {
            price += Math.ceil((limit - rest + i + 1) / groupCount)
        }
        return price
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            auction: state.auction,
            game: state.game,
            map: state.map,
            resources: state.resources,
            userInfo: state.userInfo,
        }
    },
    {
        requestGameAction,
    }
)(ResourceBuy)
