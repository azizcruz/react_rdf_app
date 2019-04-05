import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import validators from "./../validators";

export class AddTodoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      formData: {
        title: ""
      }
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleChange(e) {
    this.setState({
      formData: {
        title: e.target.value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = this.state.formData;

    let result = validators.not_empty(
      data,
      "title",
      "#d63031",
      "* Todo name can't be empty.",
      "todo-title",
      "task-input-error"
    );

    if (result === false) {
      return false;
    }

    axios
      .post(`/api/todos/?simpleToken=${validators.get_token()}`, data)
      .then(res => {
        this.props.onSubmit(this.state.formData);
        this.setState({ formData: { title: "" } });
        this.toggle();
      })
      .catch(err => {
        console.log(err.response.data.message);
        validators.error_message(
          err.response,
          "#d63031",
          "todo-title",
          "task-input-error"
        );
      });
  }

  render() {
    return (
      <div>
        <Button color="success" onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} centered={true}>
          <ModalHeader toggle={this.toggle}>Add new todo list +</ModalHeader>
          <form type="post" onSubmit={this.handleSubmit}>
            <ModalBody>
              <label htmlFor="todo-title" className="mr-2">
                Title
              </label>
              <input
                type="text"
                id="todo-title"
                onChange={this.handleChange}
                name="title"
              />
              <div id="task-input-error" className="task-input-error" />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Add +
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

export default AddTodoModal;
