import { combineReducers } from 'redux'
import { todoReducer } from '../reducers/todo.js'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    todoReducer,
    routing: routerReducer
});

export default rootReducer