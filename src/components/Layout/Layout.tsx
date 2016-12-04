import * as Bluebird from 'bluebird'
import * as React from 'react'
import {
    connect,
} from 'react-redux'
import {
    Dispatch,
} from 'redux'

import * as State from 'state'

import Error from 'components/Error/Error'
import Loading from 'components/Loading/Loading'
import {
    loadConfig,
} from 'actions/config'
import {
    loadUserInfo,
} from 'actions/userInfo'


interface ILayoutStateProps {
    config: State.IConfigState
    userInfo: State.IUserInfoState
    loadConfig: () => Bluebird<void|State.IConfig>
    loadUserInfo: (config: State.IConfig) => Bluebird<void|State.IUserInfo>
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
        const isError: boolean = (
            this.props.config.error
            || this.props.userInfo.error
        )
        const isLoading: boolean = (
            this.props.config.loading
            || this.props.userInfo.loading
        )
        return (
            <div>
                <div className='body'>
                    {'Header'}
                </div>
                <div>
                    {'Body'}
                    {
                        isError
                        && <Error />
                    }
                    {
                        !isError && isLoading
                        && <Loading />
                    }
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
