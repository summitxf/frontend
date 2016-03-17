import React, { Component, PropTypes } from 'react'
import TodoQuery from '../components/TodoQuery.js'
import TodoTable from '../components/TodoTable.js'
import TodoModal from '../components/TodoModal.js'
import TodoLogModal from '../components/TodoLogModal.js'

export default class Todo extends Component {

    render() {
        return (
            <div>
                <TodoQuery/>
                <TodoTable/>
                <TodoModal/>
                <TodoLogModal/>
            </div>
        )
    }
}
