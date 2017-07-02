import * as React from 'react'
import {
    connect,
} from 'react-redux'
import {
    Dispatch,
    bindActionCreators,
} from 'redux'

import {
    receiveGameAction,
} from 'actions/action'
import {
    requestAuction,
    receiveAuction,
} from 'actions/auction'
import {
    requestGameInfo,
    receiveGameInfo,
} from 'actions/game'
import {
    loadMapInfo,
    ILoadMapInfoAction,
} from 'actions/map'
import {
    loadMapGeo,
    ILoadMapGeoAction,
} from 'actions/geo'
import {
    requestResources,
    receiveResources,
} from 'actions/resources'
import * as socket from 'api/socket'
import * as constants from 'constants'
import ColorPick from 'containers/ColorPick/ColorPick'
import MainPanel from 'containers/MainPanel/MainPanel'
import Map from 'containers/Map/Map'
import UserTabs from 'containers/UserTabs/UserTabs'
import * as State from 'state'

interface IGameProps {
    config: State.IConfigState
    game: State.IGameState
    map: State.IMapState
    geo: State.IMapGeoState
    receiveGameAction: typeof receiveGameAction
    requestGameInfo: typeof requestGameInfo
    receiveGameInfo: typeof receiveGameInfo
    requestAuction: typeof requestAuction
    receiveAuction: typeof receiveAuction
    requestResources: typeof requestResources
    receiveResources: typeof receiveResources
    loadMapInfo: ILoadMapInfoAction
    loadMapGeo: ILoadMapGeoAction
}


class Game extends React.Component<IGameProps, {}> {
    public componentWillMount(): void {
        socket.subscribe(constants.Messages.GAME, (data: State.IGame): void => {
            this.props.receiveGameInfo(data)

            if (!this.props.map.data && !this.props.map.loading) {
                this.props.loadMapInfo(this.props.config, this.props.game)
            }
            if (!this.props.geo.data && !this.props.geo.loading) {
                this.props.loadMapGeo(this.props.config, this.props.game)
            }
        })
        this.props.requestGameInfo()
        socket.send(constants.Messages.GAME, {})

        this.props.requestAuction()
        socket.send(constants.Messages.AUCTION, {})

        socket.subscribe(constants.Messages.AUCTION, (data: State.IGameActionResponse): void => {
            this.props.receiveAuction(data)
        })

        this.props.requestResources()
        socket.send(constants.Messages.RESOURCES, {})

        socket.subscribe(constants.Messages.RESOURCES, (data: State.IResources): void => {
            this.props.receiveResources(data)
        })
    }
    public componentWillUnmount(): void {
        socket.unsubscribe(constants.Messages.GAME)
        socket.unsubscribe(constants.Messages.AUCTION)
        socket.unsubscribe(constants.Messages.RESOURCES)
    }
    public render(): React.ReactElement<{}> {
        if (!this.props.game.data) {
            return null
        }
        if (this.props.game.loading) {
            return <div>{'Loading'}</div>
        }
        if (this.props.game.meta.step === constants.StepTypes.COLORS) {
            return <ColorPick />
        }
        return (
            <div>
                <UserTabs />
                <Map />
                <MainPanel />
            </div>
        )
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            config: state.config,
            game: state.game,
            userInfo: state.userInfo,
            map: state.map,
            geo: state.geo,
        }
    },
    (dispatch: Dispatch<State.IState>): any => {
        return {
            receiveGameAction: bindActionCreators(receiveGameAction, dispatch),
            requestGameInfo: bindActionCreators(requestGameInfo, dispatch),
            receiveGameInfo: bindActionCreators(receiveGameInfo, dispatch),
            requestAuction: bindActionCreators(requestAuction, dispatch),
            receiveAuction: bindActionCreators(receiveAuction, dispatch),
            requestResources: bindActionCreators(requestResources, dispatch),
            receiveResources: bindActionCreators(receiveResources, dispatch),
            loadMapInfo: loadMapInfo(dispatch),
            loadMapGeo: loadMapGeo(dispatch),
        }
    }
)(Game)
