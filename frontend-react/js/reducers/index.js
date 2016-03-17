import { combineReducers } from 'redux'
import { todoReducer } from '../reducers/todo.js'

const rootReducer = combineReducers({
    todoReducer
});

export default rootReducer