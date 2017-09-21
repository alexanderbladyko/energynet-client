import * as React from 'react'
import {
    connect,
} from 'react-redux'
import {
    Dispatch,
    bindActionCreators,
} from 'redux'

import * as State from 'state'
import * as Routes from 'constants/routes'

import {
    loginUser,
    ILoginUserAction,
} from 'actions/userInfo'
import {
    navigate,
} from 'actions/route'


interface ILoginStateProps {
    config: State.IConfigState
    login: State.IUserInfoState
    loginUser: ILoginUserAction
    navigate: typeof navigate
}


class Login extends React.Component<ILoginStateProps, {}> {
    public refs: {
        [key: string]: (Element)
        name: (HTMLInputElement)
        password: (HTMLInputElement)
    }

    public render(): React.ReactElement<{}> {
        return (
            <form
                action=''
                className='login'
                method='post'
                onSubmit={this.handleSubmit.bind(this)}
                ref='loginForm'
            >
                <h1>
                    {'Login Form'}
                </h1>
                {this.renderErrorMessage()}
                <h3>
                    <input
                        name='name'
                        ref='name'
                        type='text'
                    />
                </h3>
                <h3>
                    <input
                        name='password'
                        ref='password'
                        type='password'
                    />
                </h3>
                <button type='submit'>
                    {'Log in'}
                </button>
                <button
                    onClick={() => { this.props.navigate(Routes.REGISTER_ROUTE) }}
                    type='button'
                >
                    {'Go to registration'}
                </button>
            </form>
        )
    }

    public renderErrorMessage(): React.ReactElement<{}> {
        if (this.props.login.loading) {
            return (<span className='loading'>{'Loading'}</span>)
        }
        if (this.props.login.error) {
            return (<span className='error'>{this.props.login.message}</span>)
        }
    }

    private handleSubmit(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault()
        this.props.loginUser(this.props.config, {
            username: this.refs.name.value,
            password: this.refs.password.value,
        }).done()
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            config: state.config,
            login: state.login,
        }
    },
    (dispatch: Dispatch<State.IState>): any => {
        return {
            loginUser: loginUser(dispatch),
            navigate: bindActionCreators(navigate, dispatch),
        }
    }
)(Login)
