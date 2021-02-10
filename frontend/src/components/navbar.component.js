import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/images/logo.png";
import {Navbar } from 'react-bootstrap/'
import {Form} from 'react-bootstrap/'
import {FormControl} from 'react-bootstrap/'
import {Button} from 'react-bootstrap/'
import Nav from 'react-bootstrap/Nav'

export default class NavbarComponent extends Component {
  render() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#features">Routes</Nav.Link>
                    <Nav.Link href="#features">Map</Nav.Link>
                </Nav>
                <Nav className={"center"} style={{marginRight:"auto"}}>
                    <Navbar.Brand >
                        <img src={Logo} width="40" height="40" alt="" />
                        <Link to="/" className="navbar-brand mx-auto">
                            <div style={{color:"#ed6622",fontWeight:"bold",margin:"2px 10px",fontSize:"21px"}}> SU;GO</div>
                        </Link>
                    </Navbar.Brand>
                </Nav>
                <Nav>
                    <Nav.Link href="login">Log In</Nav.Link>
                    <Nav.Link eventKey={2} href="signup">
                        Sign Up
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
  }
}