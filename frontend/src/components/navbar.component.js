import React from 'react';
import {Link} from 'react-router-dom';
import Logo from "../assets/images/logo.png";
import {Navbar } from 'react-bootstrap/'
import {Form} from 'react-bootstrap/'
import {FormControl} from 'react-bootstrap/'
import {Button} from 'react-bootstrap/'
import Nav from 'react-bootstrap/Nav'
import {faUser} from "@fortawesome/free-solid-svg-icons/";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {updateUsername} from "../actions/userProfile";
import {connect} from "react-redux";

function NavbarComponent(props){
    return (
        <Navbar collapseOnSelect expand="lg" variant="light">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#features">Routes</Nav.Link>
                    <Nav.Link href="#features">Map</Nav.Link>
                </Nav>
                <Nav className={"center"} style={{marginRight:"auto",marginLeft:"auto"}}>
                    <Navbar.Brand >
                        <img src={Logo} width="40" height="40" alt="" />
                        <Link to="/" className="navbar-brand mx-auto">
                            <div style={{color:"#ed6622",fontWeight:"bold",margin:"2px 10px",fontSize:"21px"}}> SU;GO</div>
                        </Link>
                    </Navbar.Brand>
                </Nav>
                <Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                    <><FontAwesomeIcon icon={faUser} size="2x" style={{margin: "5px 15px"}}/><div>{props.username}</div></>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );

}


function mapDispatchToProps(dispatch) {
    return {
        updateUsername: (item) => {
            dispatch(updateUsername(item))
        },

    }
}

function mapStateToProps(state) {
    return {
        username: state.userProfile.username,
    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(NavbarComponent);