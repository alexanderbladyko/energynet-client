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
import * as constants from 'constants'
import * as State from 'state'
import Station from 'components/Station/Station'
import { fixContainerWidth, } from 'utils/react'

import './AuctionChoose.scss'


interface IAuctionChooseProps {
    auction: State.IAuctionState
    game: State.IGameState
    map: State.IMapState
    userInfo: State.IUserInfoState
    requestGameAction: typeof requestGameAction
}

interface IAuctionChooseState {
    selectedStation: number|void
}


class AuctionChoose extends React.Component<IAuctionChooseProps, IAuctionChooseState> {
    public componentWillMount(): void {
        this.setState({
            selectedStation: undefined,
        })
    }
    public componentDidMount(): void {
        fixContainerWidth('.js-auction_choose')
    }
    public componentWillUpdate(): void {
        fixContainerWidth('.js-auction_choose')
    }
    public componentDidUpdate(): void {
        fixContainerWidth('.js-auction_choose')
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
            <div className='auction-choose'>
                <ScrollArea
                    horizontal={true}
                    vertical={false}
                    className='auction-choose_container'
                    contentClassName={`js-auction_choose auction-choose_stations`}
                >
                {
                    this.props.auction.data
                    && this.props.auction.data.map(station => {
                        return (
                            <div key={station.cost} className='auction-choose_station'>
                                <Station
                                    expanded={true}
                                    disabled={!station.available}
                                    highlighted={station.cost === this.state.selectedStation}
                                    stationId={station.cost}
                                    onClick={() => this.handleStationSelect(station.cost)}
                                />
                            </div>
                        )
                    })
                }
                </ScrollArea>
                <div className='auction-choose_action'>
                    <button
                        className='button auction-choose_button'
                        onClick={() => this.handleApplyClick()}
                    >{
                        'Apply'
                    }</button>
                </div>
            </div>
        )
    }
    private handleStationSelect(stationId: number): void {
        this.setState({
            selectedStation: stationId,
        })
    }
    private handleApplyClick(): void {
        if (this.state.selectedStation) {
            this.props.requestGameAction(constants.ActionTypes.AUCTION_SELECT_STATION, this.state.selectedStation)
        }
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            auction: state.auction,
            game: state.game,
            map: state.map,
            userInfo: state.userInfo,
        }
    },
    {
        requestGameAction,
    }
)(AuctionChoose)
