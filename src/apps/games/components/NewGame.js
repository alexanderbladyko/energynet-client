import React from 'react'


export default class NewGame extends React.Component {
    static propTypes = {
        createNewGame: React.PropTypes.func.isRequired,
    };
    state = {
        playersLimit: 4,
    }
    componentWillMount() {
    }
    handleClick() {
        const name = this.refs.name.value
        const playersLimit = this.state.playersLimit
        this.props.createNewGame({
            name,
            playersLimit,
        })
    }
    handlePlayersRangeChange() {
        this.changePlayers(this.refs.playersRange.value)
    }
    handlePlayersNumberChange() {
        this.changePlayers(this.refs.playersNumber.value)
    }
    changePlayers(newValue) {
        let number = parseInt(newValue, 10)
        number = (number < 2 ? 2 : newValue)
        number = (number > 6 ? 6 : newValue)
        number = (number ? number : 4)
        this.setState({
            playersLimit: number,
        })
    }
    render() {
        const handleClick = this.handleClick.bind(this)
        const handlePlayersRangeChange = this.handlePlayersRangeChange.bind(this)
        const handlePlayersNumberChange = this.handlePlayersNumberChange.bind(this)
        return (
            <form
                className="login"
                ref="loginForm"
            >
                <h1>
                    {'New game'}
                </h1>
                <h3>
                    <input
                        name="name"
                        ref="name"
                        type="text"
                    />
                </h3>
                <h3>
                    <input
                        max="6"
                        min="2"
                        name="playersRange"
                        onChange={handlePlayersRangeChange}
                        ref="playersRange"
                        type="range"
                        value={this.state.playersLimit}
                    />
                    <input
                        max="6"
                        min="2"
                        name="playersNumber"
                        onChange={handlePlayersNumberChange}
                        ref="playersNumber"
                        type="number"
                        value={this.state.playersLimit}
                    />
                </h3>
                <button
                    onClick={handleClick}
                    type="button"
                >
                    {'Create'}
                </button>
            </form>
        )
    }
}
