import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from './App';
import Intro from './App';
import News from './App';
import Comments from './App';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header />, div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Intro />, div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<News />, div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Comments />, div);
});
