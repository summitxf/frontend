import React, { Component, PropTypes } from 'react'
import { Navbar , Nav, NavItem } from 'react-bootstrap';
import { browserHistory } from 'react-router'

export default class NavTabs extends Component {
    render() {
        const workspaces = [
            {
                id  : 1,
                url : 'todo',
                name: '正在做'
            },
            {
                id  : 2,
                url : 'giveup',
                name: '已经放弃'
            }
        ]
        return (
            <div>
                <div className="row">
                    <div className="text-center">
                        <h1>看看你，放弃了多少？</h1>
                    </div>
                </div>

                <Navbar>
                    <Nav>
                        {
                            workspaces.map((workspace, idx)=>
                                    <NavItem key={idx} href="#"
                                             onClick={() => browserHistory.push(workspace.url)}>{ workspace.name }</NavItem>
                            )
                        }
                    </Nav>
                </Navbar>
            </div>
        )
    }
}