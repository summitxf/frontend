import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { persistState } from 'redux-devtools';
import rootReducer from '../reducers/index.js';
import DevTools from '../containers/DevTools';

const finalCreateStore = compose(
    applyMiddleware(thunk, routerMiddleware(browserHistory)),
    DevTools.instrument(),
    persistState(
        window.location.href.match(
            /[?&]debug_session=([^&]+)\b/
        )
    )
)(createStore);

export default function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);

    if (module.hot) {
        module.hot.accept('../reducers', () =>
                store.replaceReducer(require('../reducers').default)
        );
    }

    return store;
}