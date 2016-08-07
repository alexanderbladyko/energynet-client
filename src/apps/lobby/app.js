import React from 'react'
import { connect } from 'react-redux'


class Games extends React.Component {
    static propTypes = {
    };
    componentWillMount() {
    }
    componentWillUnmout() {
    }
    render() {
        return (
            <div>
                <h1>
                    {'Lobby'}
                </h1>
            </div>
        )
    }
}

export default connect(state => {
    return {
    }
}, {
})(Games)
