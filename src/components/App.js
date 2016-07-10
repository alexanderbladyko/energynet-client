import React, { PropTypes } from 'react'


const App = props => {
    return (
        <div>
            <h1>{'Some header'}</h1>
            {props.children}
        </div>
    )
}

App.propTypes = {
    children: PropTypes.element,
}

export default App
