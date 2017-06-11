import * as React from 'react'
import {
    connect,
} from 'react-redux'
import {
    Dispatch,
} from 'redux'

import * as constants from 'constants'
import * as State from 'state'

import Router from 'containers/Router/Router'
import {
    loadConfig,
    ILoadConfigAction,
} from 'actions/config'
import {
    loadUserInfo,
    ILoadUserInfoAction,
} from 'actions/userInfo'


interface ILayoutStateProps {
    config: State.IConfigState
    userInfo: State.IUserInfoState
    loadConfig: ILoadConfigAction
    loadUserInfo: ILoadUserInfoAction
}

import './Layout.scss'


class Layout extends React.Component<ILayoutStateProps, {}> {
    public componentDidMount(): void {
        if (!this.props.config.data) {
            this.props.loadConfig().then(config => {
                if (config) {
                    const token: string = localStorage.getItem(constants.AUTH_TOKEN_KEY)
                    this.props.loadUserInfo(config, token).done()
                }
                return null
            }).done()
        }
    }
    public render(): React.ReactElement<{}> {
        return (
            <Router />
        )
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            config: state.config,
            userInfo: state.userInfo,
        }
    },
    (dispatch: Dispatch<State.IState>): any => {
        return {
            loadConfig: loadConfig(dispatch),
            loadUserInfo: loadUserInfo(dispatch),
        }
    }
)(Layout)
