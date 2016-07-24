import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { navigate } from 'actions/route'
import {
    loginUser,
} from 'actions/userInfo'

import { REGISTER_ROUTE } from 'constants/routes'


class Login extends React.Component {
    static propTypes = {
        config: React.PropTypes.object.isRequired,
        loginUser: React.PropTypes.func.isRequired,
        navigate: React.PropTypes.func.isRequired,
        userInfo: React.PropTypes.object.isRequired,
    };
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

export default connect(state => {
    return {
        config: state.config,
        userInfo: state.userInfo,
    }
}, dispatch => {
    return {
        navigate: bindActionCreators(navigate, dispatch),
        loginUser: loginUser(dispatch),
    }
})(Login)
