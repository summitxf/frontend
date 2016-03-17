import React, { Component, PropTypes } from 'react'
import { Modal, ListGroup, ListGroupItem } from 'react-bootstrap';
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

        let datas = <ListGroupItem> 无数据！ </ListGroupItem>;
        if (logList && logList.length > 0) {
            datas = logList.map((logItem, idx)=>
                    <ListGroupItem key={logItem.id}>
                        {logItem.logTime}
                    </ListGroupItem>
            )
        }

        return (
            <Modal show={showLogModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-center">签到记录</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {datas}
                    </ListGroup>
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