import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore.dev';

import DevTools from './containers/DevTools'

const store = configureStore();

let rootElement = document.getElementById('root');

render(
    <Provider store={store}>
        <div>
            <App />
            <DevTools />
        </div>
    </Provider>,
    rootElement
);