import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import App from './containers/App'
import Todo from './containers/Todo'
import Giveup from './containers/Giveup'
import configureStore from './store/configureStore';

const store = configureStore();

let rootElement = document.getElementById('root');

const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Todo}/>
                <Route path="todo" component={Todo}/>
                <Route path="giveup" component={Giveup}/>
            </Route>
        </Router>
    </Provider>,
    rootElement
);