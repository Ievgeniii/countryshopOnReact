import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import reducer from './store/reducer';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(<BrowserRouter> <Provider store={store}> <App/> </Provider> </BrowserRouter>, document.getElementById('root'));
