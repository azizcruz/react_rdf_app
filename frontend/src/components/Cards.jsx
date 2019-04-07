import React, { Component } from "react";
import axios from "axios";
import SingleCard from "./SingleCard";
import AddTodoModal from "./AddTodoModal.jsx";
import AddTaskModal from "./AddTaskModal";
import DeleteTodoModal from "./DeleteTodoModal";
import LoadSpinner from "./LoadingSpinner";
import globalVars from "./../globalVars";

export class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      success: false
    };
  }

  // Fetch todos from backend
  fetchTodos = () => {
    axios
      .get(`${globalVars.BASE_API_URL}/api/todos/`)
      .then(res => {
        this.setState({ todos: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.fetchTodos();
  }

  refreshData = () => {
    this.setState({ success: true });
    this.fetchTodos();
  };

  render() {
    return (
      <React.Fragment>
        <AddTodoModal
          onSubmit={data => {
            this.refreshData();
          }}
          buttonLabel="Add Todo +"
        />
        <span>
          <LoadSpinner />
        </span>
        {this.state.todos.length > 0 ? (
          <div className="row">
            {this.state.todos.map(todo => (
              <SingleCard
                key={todo.id}
                title={todo.title}
                tasks={todo.tasks}
                onDone={() => {
                  this.fetchTodos();
                }}
              >
                <DeleteTodoModal
                  buttonLabel="Delete X"
                  todo={todo.id}
                  title={todo.title}
                  onSubmit={() => {
                    this.refreshData();
                  }}
                />
                <AddTaskModal
                  buttonLabel="Add Task +"
                  todo={todo.id}
                  onSubmit={data => {
                    this.refreshData();
                  }}
                />
              </SingleCard>
            ))}
          </div>
        ) : (
          <h1 className="text-center">You have no todos</h1>
        )}
      </React.Fragment>
    );
  }
}

export default Cards;
