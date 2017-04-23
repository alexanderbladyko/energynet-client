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
import * as socket from 'api/socket'
import * as constants from 'constants'
import * as State from 'state'
import Station from 'components/Station/Station'
import { fixWrappedFlexbox, } from 'utils/react'

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
        const userId: number = this.props.userInfo.data.id
        const user: State.IGamePlayer = this.props.game.data.find(player => player.id === userId)
        return (
            <div className='cities-buy'>
                <ScrollArea
                    horizontal={true}
                    vertical={false}
                    contentClassName='js-cities_buy cities-buy_cities'
                >
                    {
                        this.props.citiesBuy.cities.map(c => this.renderCity(c))
                    }
                    {
                        user.cities.map((c: string, i: number) => {
                            if (i % 2 === 0) {
                                return this.renderOwnedCity(c)
                            }
                            return null
                        })
                    }
                </ScrollArea>

            </div>
        )
    }
    private renderCity(name: string): React.ReactElement<{}> {
        return (
            <div key={name} className='cities-buy_city'>
                <div className='cities-buy_remove' onClick={() => this.props.removeCity(name)}></div>
                {name}
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
