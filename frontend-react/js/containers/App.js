import React, { Component, PropTypes } from 'react'
import NavTabs from '../containers/NavTabs.js'

export default class App extends Component {
    render() {
        const { children } = this.props;
        return (
            <div>
                <NavTabs/>

                <div className="app-container">
                    {children}
                </div>
            </div>
        )
    }
}