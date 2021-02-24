import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {updateEmail, updateUsername, updateFullname} from "../actions/userProfile";
import {connect} from "react-redux";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

/* COMPONENTS USED FOR THE FORGOT PASSWORD UI*/
const Input = styled.input`
    // we can define static props
    type: "text",
    // or we can define dynamic ones
    size:"0.5em",

  color: black;
  font-size: 1em;
  border: 2px solid black;
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

const PasswordInput = styled(Input).attrs({
    type: "password",
})`
          border: 2px solid black;
          margin-bottom: 10px;
`;

const VerificationInput = styled(Input).attrs({
    type: "text",
})`
          border: 2px solid black;
          margin-bottom: 10px;
`;


function EditProfile(props) {
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [changed, setChanged] = useState(false);
    //username input handler
    const handleUsername = (event) => {
        setUsername(event.target.value);
        setChanged(true)
    }

    //username input handler
    const handleFullname = (event) => {
        setFullname(event.target.value);
        setChanged(true)

    }
    //username email handler
    const handleEmail = (event) => {
        setEmail(event.target.value);
        setChanged(true)

    }
    //password input handler
    const handlePasswordInput = (event) => {
        setPassword(event.target.value);
        setChanged(true)

    }
    //new password input handler
    const handleNewPasswordInput = (event) => {
        setNewPassword(event.target.value);
        setChanged(true)

    }

    //Submit forgot password.
    const handleSubmit = () => {
        setSubmitted(true)
        if(!successful) {
            props.updateUsername(username);
            props.updateFullname(fullname);
            props.updateEmail(email);
            setTimeout(() => {
                setSuccessful(true)
                setSubmitted(false)
                props.handleClose()
            }, 2000)
        }
    }

    // mount and unmount hooks.
    useEffect(() => {
        setSubmitted(false)
        setSuccessful(false)
        return () => {
            setSubmitted(false)
            setSuccessful(false)
        }
    }, [])
    //

    return (
        <Modal show={props.show} onHide={props.handleClose} centered>
            <Modal.Header>
                <Modal.Title style={{cursor: "pointer"}} onClick={props.handleClose}>
                    <FontAwesomeIcon icon={faTimesCircle} size="lg"/>
                </Modal.Title>
                <Modal.Title style={{marginRight: "auto", marginLeft: "auto"}}>Edit Profile</Modal.Title>
            </Modal.Header>
            {!submitted ? <Modal.Body style={{display: "flex", flexDirection: "column"}}>
                    Username:<Input value={username} onChange={(event) => {
                        handleUsername(event)
                    }} placeholder={"Enter Username"}/>
                    Fullname:<Input value={fullname} onChange={(event) => {
                        handleFullname(event)
                    }} placeholder={"Enter Fullname"}/>
                    Email:<Input value={email} onChange={(event) => {
                        handleEmail(event)
                    }} placeholder={"Enter Email"}/>
                    Password:<PasswordInput value={password} onChange={(event) => {
                        handlePasswordInput(event)
                    }} placeholder={"Enter Password"}/>
                    New Password:<PasswordInput value={newPassword} onChange={(event) => {
                        handleNewPasswordInput(event)
                    }} placeholder={"Enter New Password"}/>
                    <Button style={{background: !changed ? "#89b6b9" : "#00cddb"}}
                            disabled={!changed} onClick={handleSubmit}>SUBMIT</Button>
                </Modal.Body> :
                <Modal.Body style={{display: "flex", flexDirection: "column"}}>
                    <div style={{fontWeight:"bold",margin:"auto",fontSize:"25px"}}>Updating Information</div>
                    {successful ? <>
                        SUBMITTED SUCCESSFULLY!
                    </> : <div style={{margin:"auto"}} ><CircularProgress size={40} style={{color:"#00cddb"}} thickness={6}/></div>
                    }
                </Modal.Body>}

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
        updateFullname: (item) => {
            dispatch(updateFullname(item))
        },
        updateEmail: (item) => {
            dispatch(updateEmail(item))
        },
    }
}

function mapStateToProps(state) {
    return {
        username: state.userProfile.username,
        email: state.userProfile.email,

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);