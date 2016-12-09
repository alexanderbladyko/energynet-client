import * as React from 'react'
import {
    connect,
} from 'react-redux'
import {
    Dispatch,
} from 'redux'

import * as State from 'state'

import Body from 'components/Body/Body'
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
                    this.props.loadUserInfo(config).done()
                }
                return null
            }).done()
        }
    }
    public render(): React.ReactElement<{}> {
        return (
            <div>
                <div className='body'>
                    {'Header'}
                </div>
                <div>
                    <Body />
                </div>
                <div>
                    {'Footer'}
                </div>
            </div>
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
