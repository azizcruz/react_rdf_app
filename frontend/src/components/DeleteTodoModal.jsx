import React, { Component } from "react";
import { Badge, Button, Modal, ModalBody, ModalFooter } from "reactstrap";

import axious from "axios";

export class DeleteTodoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  performDelete(id) {
    axious
      .delete(`api/todos/${id}`)
      .then(res => {
        console.log(res);
        this.toggle();
        this.props.onSubmit();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Badge color="danger" onClick={this.toggle}>
          {this.props.buttonLabel}
        </Badge>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalBody>
            <h3>Are you sure you want to delete {this.props.title} ?</h3>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={() => this.performDelete(this.props.todo)}
            >
              Yes, Delete
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DeleteTodoModal;
