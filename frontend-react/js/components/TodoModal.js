import React, { Component, PropTypes } from 'react'
import { Modal, ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as TodoActions from '../actions/todo.action.js'
import * as TodoConst from '../constants/todo.js'

export default class TodoModal extends Component {

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.typeChange = this.typeChange.bind(this);
    }

    close() {
        const { actions } = this.props;
        actions.closeModal()
    }

    save() {
        const { actions, modalType, todo } = this.props;

        if (modalType == TodoConst.MODAL_ADD) {
            actions.addTodo(Object.assign({}, todo, {
                todoName: this.refs.todoName.value.trim() || ''
            }));
        } else if (modalType == TodoConst.MODAL_EDIT) {
            actions.updateTodo(Object.assign({}, todo, {
                todoName: this.refs.todoName.value.trim() || ''
            }));
        }
    }

    typeChange(option) {
        const { actions, modalType, todo } = this.props;
        if (modalType == TodoConst.MODAL_ADD || modalType == TodoConst.MODAL_EDIT) {
            actions.changeTodoType(Object.assign({}, todo, {
                todoType: option
            }));
        }
    }

    getBtnClass(todo, todoType, btnClass) {
        if (todo.todoType === todoType) {
            return btnClass + ' active';
        } else {
            return btnClass;
        }
    }

    render() {
        const { showModal, modalType, todo } = this.props;

        let modalTitle = '';
        let todoName = '';
        let todoCreateTime = '';
        if (modalType == TodoConst.MODAL_ADD) {
            modalTitle = '添加';
            todoName = <input type="text" className="form-control" ref="todoName" required></input>;
        } else if (modalType == TodoConst.MODAL_EDIT) {
            modalTitle = '修改';
            todoName = todo ?
                <input type="text" className="form-control" ref="todoName" defaultValue={todo.todoName}
                       required></input> :
                <input type="text" className="form-control" ref="todoName" required></input>;
            todoCreateTime = todo ? <pre className="form-control-static">{ todo.createdTime }</pre> :
                <pre className="form-control-static"></pre>;
        } else if (modalType == TodoConst.MODAL_VIEW) {
            modalTitle = '查看';
            todoName = todo ? <pre className="form-control-static">{ todo.todoName }</pre> :
                <pre className="form-control-static"></pre>;
            todoCreateTime = todo ? <pre className="form-control-static">{ todo.createdTime }</pre> :
                <pre className="form-control-static"></pre>;
        }

        return (
            <Modal show={showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-center">{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal">
                        <div className="modal-body">
                            <div className="form-group">
                                <label className="col-sm-4 control-label">待办事项 :</label>
                                <div className="col-sm-8">
                                    {todoName}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-4 control-label">类型 :</label>
                                <div className="col-sm-8">
                                    <ButtonGroup>
                                        <Button className={this.getBtnClass(todo, 1, 'btn btn-default')}
                                                onClick={() => this.typeChange(1)}>默认</Button>
                                        <Button className={this.getBtnClass(todo, 2, 'btn btn-info')}
                                                onClick={() => this.typeChange(2)}>提示</Button>
                                        <Button className={this.getBtnClass(todo, 3, 'btn btn-warning')}
                                                onClick={() => this.typeChange(3)}>紧急</Button>
                                        <Button className={this.getBtnClass(todo, 4, 'btn btn-danger')}
                                                onClick={() => this.typeChange(4)}>重要</Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                            {
                                modalType != TodoConst.MODAL_ADD ?
                                    <div className="form-group">
                                        <label className="col-sm-4 control-label">创建时间 :</label>
                                        <div className="col-sm-8">
                                            {todoCreateTime}
                                        </div>
                                    </div>
                                    : ''
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    {
                        modalType != TodoConst.MODAL_VIEW ?
                            <button className="btn btn-info" type="button" onClick={this.save}>提交</button>
                            : ''
                    }
                    <button className="btn btn-info" type="button" onClick={this.close}>关闭</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    const { showModal, modalType, todo } = state.todoReducer;
    return {
        showModal,
        modalType,
        todo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TodoActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoModal)