import React, { Component } from "react";
import "./App.css";
import Cards from "./components/Cards.jsx";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProcessing: false
    };
  }

  isProcessing(isProcessing) {
    if (isProcessing) {
      document.getElementById("lds-spinner").style.display = "block";
    } else {
      document.getElementById("lds-spinner").style.display = "none";
    }
  }

  componentDidMount() {
    axios.interceptors.request.use(
      config => {
        this.isProcessing(true);
        return config;
      },
      err => {
        this.isProcessing(false);
        return Promise.reject(err);
      }
    );

    axios.interceptors.response.use(
      response => {
        this.isProcessing(false);
        return response;
      },
      err => {
        this.isProcessing(false);
        return Promise.reject(err);
      }
    );
  }

  render() {
    return (
      <div className="main-app">
        <div className="container p-3">
          <Cards />
        </div>
      </div>
    );
  }
}

export default App;
