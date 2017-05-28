/*
import React, { Component } from 'react';
import Store from '../Store/Store';                 // This is my the implementation of Store
import reducer from '../Reducer/Reducer';
import * as actions from '../Actions/Actions';
import './Counter.css';

const initialState = { count: 0 };
const store = new Store(reducer, initialState);

class Counter extends Component {
    constructor(props) {
        super(props);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    };

    componentDidMount() {
        store.subscribe(() => this.forceUpdate());
    }

    increment() {
        store.dispatch(actions.incrementAction);
    };

    decrement() {
        store.dispatch(actions.decrementAction);
    };

    reset() {
        store.dispatch(actions.resetAction);
    };

    render() {
        return (
            <div className="counter">
                <span className="count">{store.state.count}</span>
                <div className="buttons">
                    <button className="decrement" onClick={this.decrement}>-</button>
                    <button className="reset" onClick={this.reset}>R</button>
                    <button className="increment" onClick={this.increment}>+</button>
                </div>
            </div>
        );
    };
}

export default Counter;
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import { createStore } from 'redux';                  // This is the implementation of the developers facebook
import createStore from '../CreateStore/CreateStore';   // This is my the implementation of createStore
import reducer from '../Reducer/Reducer';
import * as actions from '../Actions/Actions';
import './Counter.css';

const initialState = { count: 0 };
const store = createStore(reducer, initialState);

class Counter extends Component {
    constructor(props) {
        super(props);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    };

    componentDidMount() {
        store.subscribe(() => this.forceUpdate());
    }

    increment() {
        let amount = parseInt(ReactDOM.findDOMNode(this.refs.amount).value || 1, 10);
        store.dispatch(actions.incrementAction(amount));
    };

    decrement() {
        let amount = parseInt(ReactDOM.findDOMNode(this.refs.amount).value || 1, 10);
        store.dispatch(actions.decrementAction(amount));
    };

    reset() {
        store.dispatch(actions.resetAction());
    };

    render() {
        const count = store.getState().count;
        return (
            <div className="counter">
                <span className="count">{count}</span>
                <div className="buttons">
                    <button className="decrement" onClick={this.decrement}>-</button>
                    <button className="reset" onClick={this.reset}>R</button>
                    <button className="increment" onClick={this.increment}>+</button>
                </div>
                <input type="text" ref="amount" defaultValue="1"/>
            </div>
        );
    };
}

export default Counter;