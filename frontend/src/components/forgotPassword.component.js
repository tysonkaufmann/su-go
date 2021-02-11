import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {updateUsername} from "../actions/userProfile";
import {connect} from "react-redux";
import styled from "styled-components";

const UsernameInput = styled.input`
    // we can define static props
    type: "text",
    // or we can define dynamic ones
    size:"0.5em",

  color: black;
  font-size: 1em;
  border: 2px solid #ed6622;
  border-radius: 5px;
  
  /* here we use the dynamically computed prop */
  margin-top: 0px;
  margin-bottom: 20px;
  padding:5px;
`;
const Button = styled.button`
      text-align:center;
      font-size: 1em;
      padding: 0.25em 1em;
      border-radius: 10px;
      border: white;
      color: white;
      background: #00cddb;
      &:hover {
        background: #89b6b9;
      }
`;
function ForgotPassword(props) {
    const [username, setUsername] = useState("");
    //usernameInput handler
    const handleUsername = (event) => {
        setUsername(event.target.value);
    }
    //Submit forgot password.
    const handleSubmit = () => {
        props.handleForgotPassword(username);
        props.handleClose();
    }
    return (
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header>
                    <Modal.Title style={{cursor: "pointer"}} onClick={props.handleClose}>
                        <FontAwesomeIcon icon={faTimesCircle} size="lg"/>
                    </Modal.Title>
                    <Modal.Title style={{marginRight: "auto", marginLeft: "auto"}}>Forgot Password</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{display:"flex",flexDirection:"column"}}>
                    <UsernameInput value={username} onChange={(event)=>{handleUsername(event)}} placeholder={"Enter Username or Email"}/>
                    <Button style={{background:username.trim()==="" ? "#89b6b9" : "#00cddb"}} disabled={username.trim()===""} onClick={handleSubmit}>SUBMIT</Button>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);