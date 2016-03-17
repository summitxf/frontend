import { combineReducers } from 'redux'
import * as TodoConst from '../constants/todo.js'

export function todoReducer(state = {todos: [], todo: {}}, action = {}) {
    switch (action.type) {
        case TodoConst.RENDER_TODOS:
            return Object.assign({}, state, {
                todos: action.todos
            });
        case TodoConst.CHANGE_TODO_TYPE:
            return Object.assign({}, state, {
                todo: action.todo
            });
        case TodoConst.OPEN_MODAL:
            return Object.assign({}, state, {
                showModal: action.showModal,
                modalType: action.modalType,
                todo     : action.todo
            });
        case TodoConst.CLOSE_MODAL:
            return Object.assign({}, state, {
                showModal: action.showModal,
                todo     : action.todo
            });
        case TodoConst.OPEN_LOGMODAL:
            return Object.assign({}, state, {
                showLogModal: action.showLogModal,
                logList     : action.logList
            });
        case TodoConst.CLOSE_LOGMODAL:
            return Object.assign({}, state, {
                showLogModal: action.showLogModal,
                logList     : action.logList
            });
        default:
            return state
    }
}