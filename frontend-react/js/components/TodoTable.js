import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as TodoActions from '../actions/todo.action.js'

export default class TodoTable extends Component {

    constructor(props) {
        super(props);
        this.showDetailModal = this.showDetailModal.bind(this);
        this.logTodo = this.logTodo.bind(this);
        this.showEditModal = this.showEditModal.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.logListModal = this.logListModal.bind(this);
    }

    componentDidMount() {
        const { actions } = this.props;
        actions.listTodos()
    }

    showDetailModal(item) {
        const { actions } = this.props;
        actions.showDetailModal(item)
    }

    logTodo(item) {
        const { actions } = this.props;
        actions.logTodo(item)
    }

    showEditModal(item) {
        const { actions } = this.props;
        actions.showEditModal(item)
    }

    deleteTodo(item, idx) {
        const { actions } = this.props;
        actions.deleteTodo(item, idx)
    }

    logListModal(item) {
        const { actions } = this.props;
        actions.listLog(item)
    }

    getTrClass(item) {
        let input = item.todoType;
        if (input == '1') {
            return "default";
        } else if (input == '2') {
            return 'info';
        } else if (input == '3') {
            return 'warning';
        } else if (input == '4') {
            return 'danger';
        }
    }

    isToday(item) {
        if (item.logTime) {
            let d = new Date(item.logTime);
            let today = new Date();
            return !(d.getYear() == today.getYear() && d.getMonth() == today.getMonth() && d.getDate() == today.getDate());
        } else {
            return true;
        }
    }

    render() {
        const { todos } = this.props

        if (!todos || todos.length < 1) {
            return <div className="well well-sm text-center"> 无数据！ </div>
        }

        return (
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th className="col-md-6">待办事项</th>
                        <th className="col-md-2">创建时间</th>
                        <th className="col-md-2">上次签到时间</th>
                        <th className="col-md-2"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map((item, idx)=>
                                <tr key={item.id} className={this.getTrClass(item)}>
                                    <td onClick={() => this.showDetailModal(item)}>{item.todoName}</td>
                                    <td>{item.createdTime}</td>
                                    <td>{item.logTime}</td>
                                    <td>
                                        {
                                            this.isToday(item) ?
                                                <a href="#" onClick={() => this.logTodo(item)}>
                                                    <i className="glyphicon glyphicon-repeat"></i>
                                                </a>
                                                : ''
                                        }
                                        <a href="#" onClick={() => this.showEditModal(item)}>
                                            <i className="glyphicon glyphicon-edit"></i>
                                        </a>
                                        <a href="#" onClick={() => this.deleteTodo(item, idx)}>
                                            <i className="glyphicon glyphicon-trash"></i></a>
                                        <a href="#" onClick={() => this.logListModal(item)}>
                                            <i className="glyphicon glyphicon-list"></i>
                                        </a>
                                    </td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { todos } = state.todoReducer;
    return {
        todos
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TodoActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoTable)