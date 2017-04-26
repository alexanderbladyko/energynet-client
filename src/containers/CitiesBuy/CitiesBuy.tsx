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
    removeCity,
    clearAll,
} from 'actions/citiesBuy'
import * as State from 'state'
import * as models from 'state/models'
import Currency from 'components/Currency/Currency'
import { SideBar, SideBarButton, SideBarExpander, } from 'components/SideBar/SideBar'
import { fixWrappedFlexbox, } from 'utils/react'
import { getClosestPath, } from 'utils/graph'


import './CitiesBuy.scss'


interface ICitiesBuyProps {
    auction: State.IAuctionState
    citiesBuy: State.ICitiesBuyState
    game: State.IGameState
    map: State.IMapState
    userInfo: State.IUserInfoState
    requestGameAction: typeof requestGameAction
    removeCity: typeof removeCity
    clearAll: typeof clearAll
}


class CitiesBuy extends React.Component<ICitiesBuyProps, {}> {
    public componentDidMount(): void {
        fixWrappedFlexbox('.js-cities_buy')
    }
    public componentWillUpdate(): void {
        fixWrappedFlexbox('.js-cities_buy')
    }
    public componentDidUpdate(): void {
        fixWrappedFlexbox('.js-cities_buy')
    }
    public render(): React.ReactElement<{}> {
        if (this.props.map.loading || !this.props.map.data) {
            return null
        }
        const userId: number = this.props.userInfo.data.id
        const user: State.IGamePlayer = this.props.game.data.find(player => player.id === userId)
        const userCities: string[] = Object.keys(user.cities)
        const junctionsCost: State.IMapJunction = getClosestPath(this.props.map.data.graph, userCities, this.props.citiesBuy.cities)
        return (
            <div className='cities-buy'>
                <ScrollArea
                    horizontal={true}
                    vertical={false}
                    className='cities-buy_container'
                    contentClassName='js-cities_buy cities-buy_cities'
                >
                    {
                        this.props.citiesBuy.cities.map(c => this.renderCity(c, junctionsCost))
                    }
                    {
                        userCities.map(city => this.renderOwnedCity(city))
                    }
                </ScrollArea>
                <SideBar>
                    <SideBarExpander />
                    <SideBarButton />
                </SideBar>
            </div>
        )
    }
    private renderCity(name: string, junctionsCost: State.IMapJunction): React.ReactElement<{}> {
        const city: State.ICity = models.Map.getCity(this.props.map, name)
        const slots: number[] = models.Game.getCitySlots(this.props.game, city)
        return (
            <div key={name} className='cities-buy_city'>
                <div className='cities-buy_remove' onClick={() => this.props.removeCity(name)}></div>
                {name}
                <Currency value={junctionsCost[name] + slots[0]} size={Currency.IconSize.SMALL} />
            </div>
        )
    }
    private renderOwnedCity(name: string): React.ReactElement<{}> {
        return (
            <div key={name} className='cities-buy_city cities-buy_city__owned'>
                {name}
            </div>
        )
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            auction: state.auction,
            citiesBuy: state.citiesBuy,
            game: state.game,
            map: state.map,
            userInfo: state.userInfo,
        }
    },
    {
        requestGameAction,
        removeCity,
        clearAll,
    }
)(CitiesBuy)
