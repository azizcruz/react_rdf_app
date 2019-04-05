import React, { Component } from "react";
import { Badge, Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import validators from "./../validators";

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
      .delete(`api/todos/${id}?simpleToken=${validators.get_token()}`)
      .then(res => {
        console.log(res);
        this.toggle();
        this.props.onSubmit();
      })
      .catch(err => {
        validators.error_message(err.response, "#d63031", null, "delete-error");
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
            <h3 id="delete-error">
              Are you sure you want to delete {this.props.title} ?
            </h3>
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
