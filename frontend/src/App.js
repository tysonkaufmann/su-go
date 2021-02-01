import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import Home from "./components/home.component"
import Login from "./components/login.component"
import SignUp from "./components/signup.component"

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="fill-window">
          <Navbar />
          {/* <br/> */}
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </div>
      </Router>
    );
  }
}
