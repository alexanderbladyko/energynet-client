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
    registerUser,
    IRegisterUserAction,
} from 'actions/userInfo'
import {
    navigate,
} from 'actions/route'


interface IRegisterStateProps {
    config: State.IConfigState
    register: State.IRegisterState
    registerUser: IRegisterUserAction
    navigate: typeof navigate
}

interface IRegisterComponentState {
    password: {
        dirty: boolean
        valid: boolean
    }
    password2: {
        valid: boolean
        passwordsMatch: boolean
    }
}


class Register extends React.Component<IRegisterStateProps, IRegisterComponentState> {
    public refs: {
        [key: string]: (Element)
        name: (HTMLInputElement)
        password: (HTMLInputElement)
        password2: (HTMLInputElement)
    }

    public componentWillMount(): void {
        this.setState({
            password: {
                dirty: false,
                valid: true,
            },
            password2: {
                valid: true,
                passwordsMatch: true,
            },
        })
    }

    public render(): React.ReactElement<{}> {
        return (
            <form
                className='register'
                ref='registerForm'
            >
                <h1>
                    {'Register Form'}
                </h1>
                <h3>
                    {'Name'}
                    <input
                        name='name'
                        ref='name'
                        type='text'
                    />
                </h3>
                <h3>
                    {'Password'}
                    <input
                        name='password'
                        onChange={() => {this.handleChange()}}
                        ref='password'
                        type='password'
                    />
                </h3>
                <h3>
                    {'Password repeat'}
                    <input
                        name='password2'
                        onChange={() => {this.handleChange()}}
                        ref='password2'
                        type='password'
                    />
                    {
                        this.state.password.dirty
                        && !this.state.password2.passwordsMatch
                        && 'Passwords have to be the same'
                    }
                </h3>
                <button
                    disabled={!this.state.password.dirty && !this.state.password.valid}
                    name='register'
                    onClick={() => {this.handleClick()}}
                    type='button'
                >
                    {'Register'}
                </button>
                <button
                    onClick={() => {this.props.navigate(Routes.REGISTER_ROUTE)}}
                    type='button'
                >
                    {'Log in'}
                </button>
            </form>
        )
    }

    private handleChange(): void {
        const passwordIsValid: boolean = true
        const passwordsMatch: boolean = (this.refs.password.value === this.refs.password2.value)
        this.setState({
            password: {
                dirty: true,
                valid: (passwordIsValid && passwordsMatch),
            },
            password2: {
                valid: true,
                passwordsMatch,
            },
        })
    }

    private handleClick(): void {
        if (!this.state.password.valid) {
            return
        }
        this.props.registerUser(this.props.config.data, {
            username: this.refs.name.value,
            password: this.refs.password.value,
        })
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            config: state.config,
            register: state.register,
            userInfo: state.userInfo,
        }
    },
    (dispatch: Dispatch<State.IState>): any => {
        return {
            registerUser: registerUser(dispatch),
            navigate: bindActionCreators(navigate, dispatch),
        }
    }
)(Register)
