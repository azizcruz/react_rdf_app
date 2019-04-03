import React, { Component } from "react";
import {
  Card,
  CardTitle,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button
} from "reactstrap";

import axious from "axios";

export class SingleCard extends Component {
  handleDone = (taskID, action) => {
    axious
      .patch(`/api/tasks/${taskID}/`, { is_done: action })
      .then(res => this.props.onDone())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className=" col-md-6 col-lg-4 p-2">
        <Card>
          <dir className="deleteTodo">{this.props.children[0]}</dir>
          <CardTitle>
            <h3 className="text-center font-weight-bold p-2">
              {this.props.title}
            </h3>
            {this.props.children[1]}
          </CardTitle>
          <CardBody>
            <ListGroup>
              {this.props.tasks.length === 0 ? (
                <h3 className="text-center font-weight-bold">No tasks</h3>
              ) : (
                ""
              )}

              {this.props.tasks.map(task => (
                <ListGroupItem key={task.id}>
                  <div className="row align-items-center tasks">
                    <div className="col-8">
                      <span className={task.is_done ? "done" : ""}>
                        {task.task}
                      </span>
                    </div>
                    <div className="col-4">
                      {task.is_done ? (
                        <Button
                          color="secondary"
                          onClick={() => {
                            this.handleDone(task.id, false);
                          }}
                        >
                          Undone
                        </Button>
                      ) : (
                        <Button
                          color="success"
                          onClick={() => {
                            this.handleDone(task.id, true);
                          }}
                        >
                          Done
                        </Button>
                      )}
                    </div>
                  </div>
                </ListGroupItem>
              ))}
            </ListGroup>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SingleCard;
