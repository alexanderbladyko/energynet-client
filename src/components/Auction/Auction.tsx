import * as React from 'react'
import {
    connect,
} from 'react-redux'
// hotfix for scrollbar module
declare function require(arg: string): any;
const ReactScrollbarModule: any = require('react-scrollbar')
const ScrollArea: any = ReactScrollbarModule.default

import {
    selectStation,
} from 'actions/auction'
import * as State from 'state'
import Station from 'components/Station/Station'
import { fixContainerWidth, } from 'utils/react'

import './Auction.scss'


interface IAuctionProps {
    auction: State.IAuctionState
    game: State.IGameState
    userInfo: State.IUserInfoState
    selectStation: typeof selectStation
}

interface IAuctionState {
    bet: number
}


class Auction extends React.Component<IAuctionProps, IAuctionState> {
    public componentDidMount(): void {
        fixContainerWidth('.js-auction')
    }
    public render(): React.ReactElement<{}> {
        if (this.props.auction.loading) {
            return (
                <div>{'Loading...'}</div>
            )
        }
        if (!this.props.auction.data) {
            return null
        }

        return (
            <ScrollArea
                horizontal={true}
                vertical={false}
                contentClassName={`js-auction auction auction__${this.props.auction.data.length}`}
            >
            {
                this.props.auction.data
                && this.props.auction.data.map(station => {
                    return (
                        <div key={station.cost} className='js-auction_station auction_station'>
                            <Station

                                expanded={true}
                                stationId={station.cost}
                            />
                        </div>
                    )
                })
            }
            </ScrollArea>
        )
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            auction: state.auction,
            game: state.game,
            userInfo: state.userInfo,
        }
    },
    {
        selectStation,
    }
)(Auction)
