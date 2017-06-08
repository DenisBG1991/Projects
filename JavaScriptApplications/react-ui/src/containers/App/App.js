import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import Form from '../../components/Form/Form';

import './App.css';

class App extends Component {

    constructor(){
        super();
        this.state = {
            mounted: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({mounted: false});
    };

    render() {
        return (
            <div className="app">
                <CSSTransitionGroup
                    transitionName="fade"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnter={false}
                    transitionLeave={true}
                    transitionLeaveTimeout={300}
                >
                    {this.state.mounted && <Form onSubmit={this.handleSubmit}/>}
                </CSSTransitionGroup>
            </div>
        );
    };

}

export default App;
