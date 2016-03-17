import React, { Component, PropTypes } from 'react'
import { Navbar , Nav, NavItem } from 'react-bootstrap';

export default class NavTabs extends Component {
    render() {
        const workspaces = [
            {
                id  : 1,
                url : '#/todo/list',
                name: '正在做'
            },
            {
                id  : 2,
                url : '#/giveup/list',
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
                                    <NavItem key={workspace.id} href={ workspace.url }>{ workspace.name }</NavItem>
                            )
                        }
                    </Nav>
                </Navbar>
            </div>
        )
    }
}