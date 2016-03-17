import React, { Component, PropTypes } from 'react'
import Todo from '../components/Todo.js'
import NavTabs from '../components/NavTabs.js'

export default class App extends Component {
    render() {
        return (
            <div>
                <NavTabs/>
                <Todo/>
            </div>
        )
    }
}