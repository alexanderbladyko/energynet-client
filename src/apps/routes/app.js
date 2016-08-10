import React from 'react'
import { connect } from 'react-redux'

import {
    ERROR_ROUTE,
    LOADING_ROUTE,
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    GAMES_ROUTE,
    BASE_ROUTE,
    LOBBY_ROUTE,
} from 'constants/routes'

import LoadingApp from 'apps/loading/app'
import ErrorApp from 'apps/error/app'
import LoginApp from 'apps/login/app'
import RegisterApp from 'apps/register/app'
import GamesApp from 'apps/games/app'
import LobbyApp from 'apps/lobby/app'


class RoutesApp extends React.Component {
    static propTypes = {
        route: React.PropTypes.string.isRequired,
    };
    render() {

        return (
            <div>
                {
                    this.props.route === LOADING_ROUTE
                    && <LoadingApp />
                }
                {
                    this.props.route === ERROR_ROUTE
                    && <ErrorApp />
                }
                {
                    this.props.route === LOGIN_ROUTE
                    && <LoginApp />
                }
                {
                    this.props.route === REGISTER_ROUTE
                    && <RegisterApp />
                }
                {
                    this.props.route === GAMES_ROUTE
                    && <GamesApp />
                }
                {
                    this.props.route === LOBBY_ROUTE
                    && <LobbyApp />
                }
            </div>
        )
    }
}

export default connect(state => {
    return {
        route: state.route,
    }
}, {})(RoutesApp)
