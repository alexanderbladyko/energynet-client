import * as Bluebird from 'bluebird'
import * as React from 'react'
import {
    connect,
} from 'react-redux'
import {
    Dispatch,
} from 'redux'

import * as State from 'state'

import {
    loadConfig,
} from 'actions/config'
import {
    loadUserInfo,
} from 'actions/userInfo'


interface ILoginStateProps {
    config: State.IConfigState
    userInfo: State.IUserInfoState
    loginUser: () => Bluebird<void>
    navigate: () => {}
}


class Login extends React.Component<ILoginStateProps, {}> {
    handleSubmit(e) {
        e.preventDefault()
        const { config } = this.props
        const { name, password } = this.refs
        this.props.loginUser({
            username: name.value,
            password: password.value,
        }, config).done()
    }
    render() {
        const handleNavigation = this.props.navigate.bind(this, REGISTER_ROUTE)
        return (
            <form
                action=""
                className="login"
                method="post"
                onSubmit={this.handleSubmit.bind(this)}
                ref="loginForm"
            >
                <h1>
                    {'Login Form'}
                </h1>
                {this.renderErrorMessage()}
                <h3>
                    <input
                        name="name"
                        ref="name"
                        type="text"
                    />
                </h3>
                <h3>
                    <input
                        name="password"
                        ref="password"
                        type="password"
                    />
                </h3>
                <button type="submit">
                    {'Log in'}
                </button>
                <button
                    onClick={handleNavigation}
                    type="button"
                >
                    {'Go to registration'}
                </button>
            </form>
        )
    }
    renderErrorMessage() {
        if (this.props.userInfo.loading) {
            return (<span className="loading">{'Loading'}</span>)
        }
        if (this.props.userInfo.errorMessage) {
            return (<span className="error">{this.props.userInfo.errorMessage}</span>)
        }
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
            loginUser: null,
            navigate: null,
        }
    }
)(Layout)
