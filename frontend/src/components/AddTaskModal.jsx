import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import serializer from "form-serialize";
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
    axios
      .post("/api/tasks/", data)
      .then(res => this.props.onSubmit())
      .catch(err => console.log(err));
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
              <input type="hidden" name="todo" value={this.props.todo} />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary" onClick={this.toggle}>
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
