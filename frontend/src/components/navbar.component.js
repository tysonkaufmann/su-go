import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/images/logo.png";

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light">
        <div className="navbar-collapse collapse ">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item active">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
            </ul>
        </div>
        <div className="mx-auto">
          <img src={Logo} width="40" height="40" alt="" />
          <Link to="/" className="navbar-brand mx-auto">&nbsp;Su;Go</Link>
        </div>
        <div className="navbar-collapse collapse">
            <ul className="navbar-nav ml-auto">
              <li className="navbar-item">
                <Link to="/login" className="nav-link">Log In</Link>
              </li>
              <li className="navbar-item">
                <Link to="/signup" className="nav-link">Sign Up</Link>
              </li>
            </ul>
        </div>
      </nav>
    );
  }
}