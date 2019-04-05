import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import serializer from "form-serialize";
import validators from "./../validators";
export class AddTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = serializer(form, { hash: true });

    let result = validators.not_empty(
      data,
      "task",
      "#d63031",
      "* Task name can't be empty.",
      "task-name",
      "task-input-error"
    );

    if (result === false) {
      return false;
    }

    axios
      .post(`/api/tasks/?simpleToken=${validators.get_token()}`, data)
      .then(() => {
        this.props.onSubmit();
        this.toggle();
      })
      .catch(err => {
        validators.error_message(
          err.response,
          "#d63031",
          "task-name",
          "task-input-error"
        );
      });
  }

  render() {
    return (
      <div className="">
        <Button color="primary" onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          centered={true}
        >
          <form onSubmit={this.handleSubmit}>
            <ModalHeader toggle={this.toggle}>Add new task +</ModalHeader>
            <ModalBody>
              <label htmlFor="task-name" className="mr-2">
                Task name
              </label>
              <input
                type="text"
                id="task-name"
                name="task"
                onChange={this.handleChange}
              />
              <div id="task-input-error" className="task-input-error" />
              <input type="hidden" name="todo" value={this.props.todo} />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary">
                Add task +
              </Button>{" "}
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

export default AddTaskModal;
