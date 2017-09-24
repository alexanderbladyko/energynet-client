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
    loadUserInfo,
    ILoadUserInfoAction,
} from 'actions/userInfo'


interface ILayoutStateProps {
    config: State.IConfigState
    userInfo: State.IUserInfoState
    loadUserInfo: ILoadUserInfoAction
}

import './Layout.scss'


class Layout extends React.Component<ILayoutStateProps, {}> {
    public componentDidMount(): void {
        const token: string = localStorage.getItem(constants.AUTH_TOKEN_KEY)
        this.props.loadUserInfo(this.props.config, token).done()
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
            loadUserInfo: loadUserInfo(dispatch),
        }
    }
)(Layout)
