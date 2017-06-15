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
import { createStore } from 'redux';                        // This is the implementation of the developers facebook
//import createStore from '../CreateStore/CreateStore';     // This is my the implementation of createStore
import reducer from '../Reducer/Reducer';
import * as actions from '../Actions/Actions';
import './Counter.css';

const initialState = { count: 0 };

/**
 * Примеры обработчиков для функции Middleware
 **/
/*
const addLog = store => next => action => {
    console.log('Состояние до действия:', store.getState());
    console.log('Действия:', action.type, action);
    const result = next(action);
    console.log('Состояние после действия:', store.getState());
    console.log(result);
    return result;
};

const addDouble = store => next => action => {
    action.amount *= 2;
    return next(action);
};

const addTriple = store => next => action => {
    action.amount *= 3;
    return next(action);
};
*/

/**
 * Обычная реализация Middleware
 **/
/*
const store = createStore(reducer, initialState);

function applyMiddleware(store, ...middlewares) {
    middlewares.reverse().forEach( middleware => store.dispatch = middleware(store)(store.dispatch));
}

applyMiddleware(store, addLog, addDouble, addTriple);

const store = createStore(reducer, initialState, applyMiddleware(addLog, addDouble, addTriple));
*/

/**
 * Реализация функции Middleware как у разработчиков Redux
 **/
function applyMiddleware(...middlewares) {
    return createStore => (reducer, initialState, enhacer) => {
        const store = createStore(reducer, initialState, enhacer);

        let dispatch = store.dispatch;
        let chain;

        const storeApi = {
            getState: store.getState,
            dispatch: actions => dispatch(actions)
        };

        chain = middlewares.map(middleware => middleware(storeApi));
        dispatch = chain.reduce((a, b) => (...args) => a(b(...args)))(store.dispatch);

        return Object.assign(store, { dispatch });
    };
}

const promise = store => next => actions => {
    if (typeof actions.then === 'function'){
        return actions.then(next);
    }
    return next(actions);
};

const store = createStore(reducer, initialState, applyMiddleware(promise));

class Counter extends Component {
    constructor(props) {
        super(props);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    };

    componentDidMount() {
        store.subscribe(() => this.forceUpdate());
    };

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