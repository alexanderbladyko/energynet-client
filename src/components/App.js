import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import DevTools from './DevTools'


const App = (props) => {
  return (
    <div>
      <IndexLink to="/">Home</IndexLink>
      {' | '}
      <Link to="/fuel-savings">Demo App</Link>
      {' | '}
      <Link to="/about">About</Link>
      <br/>
      {props.children}
      <DevTools />
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
