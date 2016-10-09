"use strict";
const React = require('react');
const ReactDOM = require('react-dom');
const redux_1 = require('redux');
const react_redux_1 = require('react-redux');
function configureStore() {
    const reducer = () => { return {}; };
    const store = redux_1.createStore(reducer);
    return store;
}
const store = configureStore();
class Main extends React.Component {
    render() {
        return (<react_redux_1.Provider store={store}>
                <div>Test</div>
            </react_redux_1.Provider>);
    }
}
ReactDOM.render(<Main />, document.getElementById('app'));
function sum(a, b) {
    return a + b;
}
exports.sum = sum;
