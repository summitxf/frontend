import fetch from 'isomorphic-fetch'
import * as TodoConst from '../constants/todo.js'

function renderTodos(json) {
    return {
        type : TodoConst.RENDER_TODOS,
        todos: json.data
    }
}

export function changeTodoType(todo) {
    return {
        type: TodoConst.CHANGE_TODO_TYPE,
        todo: todo
    }
}

export function openModal(modalType = TodoConst.MODAL_VIEW, todo = {todoType: 1}) {
    return {
        type     : TodoConst.OPEN_MODAL,
        showModal: true,
        modalType: modalType,
        todo     : todo
    }
}

export function closeModal() {
    return {
        type     : TodoConst.CLOSE_MODAL,
        showModal: false,
        todo     : {}
    }
}

export function openLogModal(json) {
    return {
        type        : TodoConst.OPEN_LOGMODAL,
        showLogModal: true,
        logList     : json.data
    }
}

export function closeLogModal() {
    return {
        type        : TodoConst.CLOSE_LOGMODAL,
        showLogModal: false
    }
}

export function listTodos(query = '') {
    return dispatch => {
        return fetch('/backend-service/cxf/todo?query=' + query)
            .then(response => response.json())
            .then(json => dispatch(renderTodos(json)))
    }
}

export function showDetailModal(item) {
    return dispatch => {
        return fetch('/backend-service/cxf/todo/' + item.id)
            .then(response => response.json())
            .then(json => dispatch(openModal(TodoConst.MODAL_VIEW, json.data)))
    }
}

export function logTodo(item) {
    return dispatch => {
        return fetch('/backend-service/cxf/todo/log', {
            method : 'POST',
            headers: TodoConst.FETCH_HEADERS,
            body   : JSON.stringify({
                todoId: item.id
            })
        })
            .then(response => response.json())
            .then(json => dispatch(listTodos()))
    }
}

export function showEditModal(item) {
    return dispatch => {
        return fetch('/backend-service/cxf/todo/' + item.id)
            .then(response => response.json())
            .then(json => dispatch(openModal(TodoConst.MODAL_EDIT, json.data)))
    }
}

export function deleteTodo(item, idx) {
    return dispatch => {
        return fetch('/backend-service/cxf/todo/' + item.id, {
            method : 'DELETE',
            headers: TodoConst.FETCH_HEADERS
        })
            .then(response => response.json())
            .then(json => dispatch(listTodos()))
    }
}

export function listLog(item) {
    return dispatch => {
        return fetch('/backend-service/cxf/todo/log/' + item.id)
            .then(response => response.json())
            .then(json => dispatch(openLogModal(json)))
    }
}

export function addTodo(item) {
    return dispatch => {
        return fetch('/backend-service/cxf/todo', {
            method : 'POST',
            headers: TodoConst.FETCH_HEADERS,
            body   : JSON.stringify(item)
        })
            .then(response => response.json())
            .then(json => {
                dispatch(closeModal());
                dispatch(listTodos())
            })
    }
}

export function updateTodo(item) {
    return dispatch => {

        return fetch('/backend-service/cxf/todo', {
            method : 'PUT',
            headers: TodoConst.FETCH_HEADERS,
            body   : JSON.stringify(item)
        })
            .then(response => response.json())
            .then(json => {
                dispatch(closeModal());
                dispatch(listTodos())
            })
    }
}