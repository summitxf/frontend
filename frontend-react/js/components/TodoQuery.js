import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as TodoActions from '../actions/todo.action.js'
import * as TodoConst from '../constants/todo.js'

export default class TodoQuery extends Component {

    constructor(props) {
        super(props);
        this.queryTodos = this.queryTodos.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    queryTodos() {
        const query = this.refs.querystring.value.trim() || '';
        this.props.dispatch(TodoActions.listTodos(query));
    }

    openModal() {
        this.props.dispatch(TodoActions.openModal(TodoConst.MODAL_ADD));
    }

    render() {
        return (
            <div className="well well-sm">
                <form role="form" className="form-horizontal">
                    <div className="form-group">
                        <div className="col-md-4  col-md-offset-3">
                            <input className="form-control" ref="querystring" type="text" placeholder="待办"/>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-default" type="button" onClick={this.queryTodos}>查询</button>
                            <button className="btn btn-info" type="button" onClick={this.openModal}>添加</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect()(TodoQuery)