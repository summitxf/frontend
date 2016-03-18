import React, { Component, PropTypes } from 'react'
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as TodoActions from '../actions/todo.action.js'

export default class TodoLogModal extends Component {

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
    }

    close() {
        const { actions } = this.props;
        actions.closeLogModal()
    }

    render() {
        const { showLogModal, logList } = this.props;

        let datas = <li className="list-group-item"> 无数据！ </li>
        if (logList && logList.length > 0) {
            datas = logList.map((logItem, idx)=>
                    <li key={logItem.id} className="list-group-item">
                        {logItem.logTime}
                    </li>
            )
        }

        return (
            <Modal show={showLogModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-center">签到记录</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal">
                        <div className="modal-body">
                            <div className="form-group">
                                <div className="col-sm-6 col-sm-offset-3">
                                    <ul className="list-group">
                                        {datas}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-info" type="button" onClick={this.close}>关闭</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    const { showLogModal, logList } = state.todoReducer;
    return {
        showLogModal,
        logList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TodoActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoLogModal)