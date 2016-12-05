import * as Bluebird from 'bluebird'
import * as React from 'react'
import {
    connect,
} from 'react-redux'
import {
    Dispatch,
} from 'redux'

import * as State from 'state'
import * as Routes from 'constants/routes'

import {
    loginUser,
    ILoginUserAction,
} from 'actions/userInfo'


interface ILoginStateProps {
    config: State.IConfigState
    userInfo: State.IUserInfoState
    loginUser: ILoginUserAction
    navigate: (path: string) => void
}


class Login extends React.Component<ILoginStateProps, {}> {
    refs: {
        [key: string]: (Element)
        name: (HTMLInputElement)
        password: (HTMLInputElement)
    }


    handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        const { config } = this.props
        const { name, password } = this.refs
        this.props.loginUser(this.props.config.data, {
            username: this.refs.name.value,
            password: this.refs.password.value,
        }).done()
    }
    render() {
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
                    onClick={() => { this.props.navigate(Routes.REGISTER_ROUTE) }}
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
        if (this.props.userInfo.message) {
            return (<span className="error">{this.props.userInfo.message}</span>)
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
            loginUser: loginUser(dispatch),
            navigate: () => {},
        }
    }
)(Login)
