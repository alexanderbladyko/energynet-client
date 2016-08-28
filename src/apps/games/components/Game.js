import React from 'react'


export default class Game extends React.Component {
    static propTypes = {
        game: React.PropTypes.object.isRequired,
        handleClick: React.PropTypes.func,
    };
    render() {
        return (
            <div
                className="game"
                onClick={this.props.handleClick}
            >
                {this.props.game.data.name}
            </div>
        )
    }
}
