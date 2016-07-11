import React from 'react'
import { connect } from 'react-redux'

import {
    ERROR_ROUTE,
    LOADING_ROUTE,
} from 'constants/routes'

import LoadingApp from 'apps/loading/app'
import ErrorApp from 'apps/error/app'


class RoutesApp extends React.Component {
    static propTypes = {
        route: React.PropTypes.string.isRequired,
    };
    render() {

        return (
            <div>
                {
                    this.props.route === LOADING_ROUTE
                    && <LoadingApp />
                }
                {
                    this.props.route === ERROR_ROUTE
                    && <ErrorApp />
                }
            </div>
        )
    }
}

export default connect(state => {
    return {
        route: state.route,
    }
}, {})(RoutesApp)
