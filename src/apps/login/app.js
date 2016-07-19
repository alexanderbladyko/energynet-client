import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { navigate } from 'actions/route'
import {
    loginUser,
} from 'actions/userInfo'


class Login extends React.Component {
    static propTypes = {
        config: React.PropTypes.object.isRequired,
        loginUser: React.PropTypes.func.isRequired,
        navigate: React.PropTypes.func.isRequired,
        userInfo: React.PropTypes.object.isRequired,
    };
    handleSubmit(e) {
        e.preventDefault()
        this.props.loginUser({
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
