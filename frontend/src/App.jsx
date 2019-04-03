import React, { Component } from "react";
import "./App.css";
import Cards from "./components/Cards.jsx";

class App extends Component {
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
