import React, { PropTypes } from 'react'
import DevTools from './DevTools'


const App = props => {
    return (
        <div>
            <h1>{'Some header'}</h1>
            {props.children}
            <DevTools />
        </div>
    )
}

App.propTypes = {
    children: PropTypes.element,
}

export default App
