 import * as React from 'react'
import {
    connect,
} from 'react-redux'
// hotfix for scrollbar module
declare function require(arg: string): any;
const ReactScrollbarModule: any = require('react-scrollbar')
const ScrollArea: any = ReactScrollbarModule.default

import {
    requestGameAction,
} from 'actions/action'
import {
    addResource,
    clearStation,
    clearAll,
} from 'actions/resourcesBuy'
import * as socket from 'api/socket'
import * as constants from 'constants'
import * as State from 'state'
import Currency from 'components/Currency/Currency'
import Resource from 'components/Resource/Resource'
import Station from 'components/Station/Station'
import { fixContainerWidth, } from 'utils/react'

import './ResourcesBuy.scss'


interface IResourceBuyProps {
    game: State.IGameState
    map: State.IMapState
    resources: State.IResourcesState
    resourcesBuy: State.IResourcesBuyState
    userInfo: State.IUserInfoState
    requestGameAction: typeof requestGameAction
    addResource: typeof addResource
    clearStation: typeof clearStation
    clearAll: typeof clearAll
}


class ResourceBuy extends React.Component<IResourceBuyProps, {}> {
    public componentWillMount(): void {
        this.setState({
            selectedResource: 'coal',
            stations: {},
        })
    }
    public componentDidMount(): void {
        fixContainerWidth('.js-resource')
    }
    public componentWillUpdate(): void {
        fixContainerWidth('.js-resource')
    }
    public componentDidUpdate(): void {
        fixContainerWidth('.js-resource')
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

        const userId: number = this.props.userInfo.data.id
        const user: State.IGamePlayer = this.props.game.data.find(player => player.id === userId)

        return (
            <div className='resources-buy'>
                <ScrollArea
                    horizontal={true}
                    vertical={false}
                    className='resources-buy_container'
                    contentClassName={`js-resource resources-buy_auctions`}
                >
                    {
                        user.stations.map(station => {
                            return this.renderAuctionWithResources(station)
                        })
                    }
                </ScrollArea>
                <div className='resources-buy_action'>
                    <div className='resources-buy_control'>
                        <button
                            className='button'
                            onClick={() => this.handleClearAll()}
                        >{
                            'Clear'
                        }</button>
                    </div>
                    <div className='resources-buy_expander' />
                    <div className='resources-buy_control'>
                        <Currency
                            value={this.getCurrentPrice()}
                            size={Currency.IconSize.SMALL}
                        />
                    </div>
                    <div className='resources-buy_control'>
                        <button
                            className='button'
                            onClick={() => this.handleApplyClick()}
                        >{
                            'Apply'
                        }</button>
                    </div>
                </div>
            </div>
        )
    }
    private renderAuctionWithResources(stationId: number): React.ReactElement<{}> {
        const station: State.IMapStation = this.props.map.data.stations.find(s => s.cost === stationId)
        const stationResources: State.IResources = this.props.resourcesBuy.stations[stationId]
        return (
            <div
                key={stationId}
                className='resources-buy_block'
            >
                <Station expanded={false} stationId={stationId} />
                <div className='resources-buy_resources'>
                {
                    station.resources.map(resource => {
                        const resources: State.IResources = this.getResource()
                        const newResourcePrice: number = this.getNextResourcePrice(resources, resource)
                        return (
                            <div
                                key={resource}
                                className='resources-buy_resource'
                                onClick={() => this.handleResourceClick(station, resource)}
                            >
                                <div className='resources-buy_count'>
                                    {stationResources ? stationResources[resource] : 0}
                                    <Resource resources={[resource, ]} size={Resource.IconSize.SMALL} />
                                </div>
                                <div className='resources-buy_price'>
                                    <Currency value={newResourcePrice} size={Currency.IconSize.SMALL} />
                                </div>
                            </div>
                        )
                    })
                }
                </div>
                <div className='resources-buy_info'>
                    <div className='resources-buy_cost'>
                        <Currency value={0} size={Currency.IconSize.SMALL} />
                    </div>
                    <div className='resources-buy_clear'>
                        <button className='button' onClick={() => this.handleClearStationClick(station)}>{'Clear'}</button>
                    </div>
                </div>
            </div>
        )
    }
    private handleClearAll(): void {
        this.props.clearAll()
    }
    private handleClearStationClick(station: State.IMapStation): void {
        const resources: State.IResources = this.props.resourcesBuy.stations[station.cost]
        if (resources) {
            this.props.clearStation(station)
        }
    }
    private handleResourceClick(station: State.IMapStation, resource: string): void {
        const resources: State.IResources = this.props.resourcesBuy.stations[station.cost]
        if (!resources) {
            this.props.addResource(station, resource)
            return
        }
        let reserved: number = 0
        constants.ResourceTypes.ALL.forEach(r => reserved += resources[r])
        if (reserved < station.capacity * 2) {
            this.props.addResource(station, resource)
        }
    }
    private handleApplyClick(): void {
        const resources: State.IResources = this.getResource()
        socket.send(constants.ActionTypes.RESOURCE_BUY, resources)
        this.props.requestGameAction(constants.ActionTypes.RESOURCE_BUY, resources)
    }
    private getResource(): State.IResources {
        const resources: State.IResources = {
            coal: 0,
            oil: 0,
            waste: 0,
            uranium: 0,
        }
        this.iterateOverStations(station => {
            const reservedResources: State.IResources = this.props.resourcesBuy.stations[station.cost]
            if (reservedResources) {
                constants.ResourceTypes.ALL.forEach(resource => {
                    resources[resource] += reservedResources[resource]
                })
            }
        })
        return resources
    }
    private iterateOverStations(func: (s: State.IMapStation) => void): void {
        const userId: number = this.props.userInfo.data.id
        const user: State.IGamePlayer = this.props.game.data.find(player => player.id === userId)
        user.stations.forEach(stationId => {
            const station: State.IMapStation = this.props.map.data.stations
                .find(s => s.cost === stationId)
            func(station)
        })
    }
    private getCurrentPrice(): number {
        const resources: State.IResources = this.getResource()
        let price: number = 0
        constants.ResourceTypes.ALL.forEach(resource => {
            price += this.getCurrentResourcePrice(resources, resource)
        })
        return price
    }
    private getCurrentResourcePrice(resources: State.IResources, resource: string): number {
        const reserved: number = resources[resource]
        const rest: number = this.props.resources.data[resource]
        const limit: number = this.props.map.data.resourceLimits[resource]
        const groupCount: number = this.props.map.data.resourceGroup[resource]
        let price: number = 0
        for (let i: number = 0; i < reserved; i++) {
            price += Math.ceil((limit - rest + i + 1) / groupCount)
        }
        return price
    }
    private getNextResourcePrice(resources: State.IResources, resource: string): number {
        const reserved: number = resources[resource]
        const rest: number = this.props.resources.data[resource]
        const limit: number = this.props.map.data.resourceLimits[resource]
        const groupCount: number = this.props.map.data.resourceGroup[resource]
        return Math.ceil((limit - rest + reserved) / groupCount)
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            auction: state.auction,
            game: state.game,
            map: state.map,
            resources: state.resources,
            resourcesBuy: state.resourcesBuy,
            userInfo: state.userInfo,
        }
    },
    {
        requestGameAction,
        addResource,
        clearStation,
        clearAll,
    }
)(ResourceBuy)
