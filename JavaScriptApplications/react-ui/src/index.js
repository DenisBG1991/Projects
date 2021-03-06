import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App/App';

import registerServiceWorker from './registerServiceWorker';

import 'material-components-web/dist/material-components-web.css';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
