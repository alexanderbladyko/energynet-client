/* eslint react/no-set-state: 0 */
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { registerUser } from 'actions/userInfo'
import { navigate } from 'actions/route'

import { LOGIN_ROUTE } from 'constants/routes'


class Register extends React.Component {
    static propTypes = {
        config: React.PropTypes.object.isRequired,
        navigate: React.PropTypes.func.isRequired,
        registerUser: React.PropTypes.func.isRequired,
    };
    componentWillMount() {
        this.setState({
            password: null,
        })
    }
    handleChange() {
        const passwordIsValid = true
        const passwordsMatch = (this.refs.password.value === this.refs.password2.value)
        this.setState({
            password: {
                valid: (passwordIsValid && passwordsMatch),
                passwordsMatch,
            },
        })
    }
    handleClick() {
        this.props.registerUser({
            username: this.refs.name.value,
            password: this.refs.password.value,
        }, this.props.config)
    }
    render() {
        const passwordState = (this.state.password) || {}
        const handleClick = this.handleClick.bind(this)
        const handleChange = this.handleChange.bind(this)
        const handleLogIn = this.props.navigate.bind(this, LOGIN_ROUTE)
        return (
            <form
                className="register"
                ref="registerForm"
            >
                <h1>
                    {'Register Form'}
                </h1>
                <h3>
                    {'Name'}
                    <input
                        name="name"
                        ref="name"
                        type="text"
                    />
                </h3>
                <h3>
                    {'Password'}
                    <input
                        name="password"
                        onChange={handleChange}
                        ref="password"
                        type="password"
                    />
                    {!passwordState.valid}
                </h3>
                <h3>
                    {'Password repeat'}
                    <input
                        name="password2"
                        onChange={handleChange}
                        ref="password2"
                        type="password"
                    />
                    {!passwordState.passwordsMatch && 'Passwords have to be the same'}
                </h3>
                <button
                    disabled={!passwordState.valid}
                    name="register"
                    onClick={handleClick}
                    type="button"
                >
                    {'Register'}
                    {}
                </button>
                <button
                    onClick={handleLogIn}
                    type="button"
                >
                    {'Log in'}
                </button>
            </form>
        )
    }
}

export default connect(state => {
    return {
        config: state.config,
        userInfo: state.userInfo,
    }
}, dispatch => {
    return {
        navigate: bindActionCreators(navigate, dispatch),
        registerUser: registerUser(dispatch),
    }
})(Register)
