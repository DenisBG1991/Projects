import React, { Component } from 'react';
import Header from '../Header/Header';
import Counter from '../Counter/Counter';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        < Header />
        < Counter />
      </div>
    );
  };
}

export default App;
