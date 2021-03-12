import React from 'react';
import {Link} from 'react-router-dom';
import Logo from "../assets/images/logo.png";
import {Navbar} from 'react-bootstrap/'
import {Form} from 'react-bootstrap/'
import {FormControl} from 'react-bootstrap/'
import {Button} from 'react-bootstrap/'
import Nav from 'react-bootstrap/Nav'
import {faUser} from "@fortawesome/free-solid-svg-icons/";
import {updateUsername} from "../actions/userProfile";
import {connect} from "react-redux";
import styled from "styled-components";
import {Icon} from "@material-ui/core";
import background3 from "../assets/images/background1.png";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function NavbarComponent(props) {

    const [anchorEl, setAnchorEl] = React.useState(null); // Used for the dropdown
    const open = Boolean(anchorEl);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget); // when menu button clicked.
    };

    const handleClose = () => {
        setAnchorEl(null); //Closing menu
    };

    // Clearing all local storage.
    const handleLogOut = () => {
        handleClose()
        localStorage.clear();
        window.location.reload();
    };

    const Icon = styled.img`
        border-radius: 50%;
        margin: 2px 2px 2px 15px;
`;

    const UsernameText = styled.div`
        margin: 0px;
        
    `
    return (
        <Navbar collapseOnSelect expand="lg" variant="light">
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav>
                        <Navbar.Brand>
                            <img src={Logo} width="40" height="40" alt=""/>
                            <Link to="/" className="navbar-brand mx-auto">
                                <div style={{
                                    color: "#ed6622",
                                    fontWeight: "bold",
                                    margin: "2px 10px",
                                    fontSize: "21px"
                                }}> SU;GO
                                </div>
                            </Link>
                        </Navbar.Brand>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                            <Button variant="outline-info">Search</Button>
                        </Form>
                    </Nav>
                    <Nav className={"center"} style={{marginLeft: "10px", marginTop: "5px"}}>
                        <Nav.Link href={"./routes"}>ROUTES</Nav.Link>
                        <Nav.Link href={"./map"}>MAP</Nav.Link>
                    </Nav>
                </Nav>
                <div style={{display: "flex", flexDirection: "row", padding: "2px", marginLeft: "2px"}}>
                    <Button
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        onClick={handleMenu}
                        style={{background: "white", border: "white", color: "black", padding: "0"}}
                    >
                        <Icon src={background3} width="40px" height="40px"/>&nbsp;
                        <UsernameText>{props.username}</UsernameText>
                    </Button>
                    <Menu
                        style={{marginTop:"20px"}}
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <Link to="/userprofile"><MenuItem onClick={handleClose} style={{color:"black"}}>Profile</MenuItem></Link>
                        <Link to="/login"><MenuItem style={{color:"black"}} onClick={handleLogOut}>Log Out</MenuItem></Link>
                    </Menu>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);