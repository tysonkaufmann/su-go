import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {updateUsername} from "../actions/userProfile";
import {connect} from "react-redux";
import ForgotPassword from "./forgotPassword.component";
import styled from "styled-components";
import background3 from "../assets/images/background1.png";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";

/* STYLED COMPONENTS USED FOR THE PAGE.*/
const SignUpContainer = styled.div`
      display: flex;
      flex-direction: column;
      width: 400px;
      height: 400px;
      border-radius: 10px;
      margin: 20px auto 100px auto;
      padding: 20px;
      // box-shadow: 0px 0px 25px #89b6b9;
      background: white;
    `
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
const SignUpText = styled.p`
        font-weight: bolder;
        font-size: 26px;
        color: #89b6b9
    `
const UsernameInput = styled.input`
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
const PasswordInput = styled(UsernameInput).attrs({
    type: "password",
})`
          border: 2px solid black;
          margin-bottom: 10px;
`;

/********************************/

function SignUp(props) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("");
    const [submitLoader, setLoader] = useState(false);

    let isInputValid = username.trim() === "" || fullname.trim() === "" || email.trim() === "" || password.trim() === ""
    // Handle Username input
    let handleUsernameInput = (event) => {
        setUsername(event.target.value)
    }
    // Handle Fullanme input
    let handleFullnameInput = (event) => {
        setFullname(event.target.value)
    }
    // Handle Email input
    let handleEmailInput = (event) => {
        setEmail(event.target.value)
    }
    // Handle Password input
    let handlePasswordInput = (event) => {
        setPassword(event.target.value)
    }

    // Handle Signup input
    let handleSignUp = () => {
        console.log(username,email, password, )
        setLoader(true);
        setTimeout(()=>{setLoader(false);props.handleClose() }, 5000)

        console.log(this.state.username)
        var self = this;
        this.props.updateUsername(this.state.username)
        axios.post('http://localhost:5000/api/user/login', {
            username: this.state.username,
            password: this.state.password,
        })
            .then(function (response) {
                if(response.data.success === "true") {
                    localStorage.setItem("Username", self.state.username)
                    localStorage.setItem("Expires", response.data.expiresin)
                    self.props.setToken(response.data.token);
                }else{
                    window.alert(response.data.msg)
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Modal style={{height:"fit-content"}} size={"md"} show={props.show} onHide={props.handleClose} centered>
            <Modal.Header>
                <Modal.Title style={{cursor: "pointer"}} onClick={props.handleClose}>
                    <FontAwesomeIcon icon={faTimesCircle} size="lg"/>
                </Modal.Title>
                <Modal.Title style={{marginRight: "auto", marginLeft: "auto"}}>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <SignUpContainer>
                    <SignUpText>Log In</SignUpText>
                    Email
                    <UsernameInput value={email} onChange={handleEmailInput} placeholder={"Enter Email"}/>
                    Username
                    <UsernameInput value={username} onChange={handleUsernameInput} placeholder={"Enter Username"}/>
                    Full Name
                    <UsernameInput value={fullname} onChange={handleFullnameInput} placeholder={"Enter Full Name"}/>
                    Password
                    <PasswordInput value={password} onChange={handlePasswordInput} placeholder={"New Password"} />
                    <Button onClick={handleSignUp} style={{background: isInputValid || submitLoader ? "#89b6b9" : "#00cddb"}}>{
                        submitLoader ? <CircularProgress style={{marginTop:"3px"}}size={20} style={{color:"white"}}      thickness={4}
                        /> : "Sign Up"}</Button>
                    <div
                        style={{margin: "20px 20px 0 20px ", display: "flex", justifyContent: "center", alignContent: "center"}}>
                        Already have an account?
                    </div>
                    {/*Already have an account?*/}
                    <Button onClick={props.handleClose}>Log in</Button>
                    <SignUp  />
                </SignUpContainer>
            </Modal.Body>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);