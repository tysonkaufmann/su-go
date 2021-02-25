import React, {Component} from 'react';
import styled from 'styled-components'
import background3 from "../assets/images/background1.png";
import {connect} from "react-redux";
import {updateUsername} from "../actions/userProfile"
import ForgotPassword from "./forgotPassword.component";
import SignUp from "./signup.component";
import {Link} from "react-router-dom";

/* STYLED COMPONENTS USED FOR THE PAGE.*/
const LoginContainer = styled.div`
      display: flex;
      flex-direction: column;
      width: 400px;
      height: 450px;
      border-radius: 10px;
      margin: 20px auto 100px auto;
      padding: 20px;
      box-shadow: 0px 0px 25px #89b6b9;
        background:white;
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
const LoginText = styled.p`
        font-weight: bolder;
        font-size: 26px;
        color: #89b6b9
    `
const ForgotPasswordButton = styled.button`
      color: #00cddb;
      background: white;
      border: 0;
      margin-top: 0;
      margin-bottom: 20px;
            &:hover {
        color: #89b6b9;
      }
      `
const Line = styled.hr`
        border: none;
        border-top: 3px solid #ccfdff;
        width:200px;
        margin:10px 10px;

      `
const Title = styled.h1`
          padding: 20px;
          text-align: center;
          color: #ed6622;
          font-size: 40px;
          font-family: Arial, Helvetica, sans-serif;
          text-decoration: underline;
          font-weight:bold;
        `
const BackgroundDiv = styled.div`
            background-image: url(${background3});

    /* Full height */
    height: 100vh; 

    /* Center and scale the imagboe nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
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

class Login extends Component {
    constructor() {
        super();
        this.state = {username: "", password: "", showForgotPasswordModal: false, showSignUp:false,
        loginVerification: false
        };
    }

    //Username handler
    handleUsername = (event) => {
        this.setState({username: event.target.value})
    }
    //Password handler
    handlePassword = (event) => {
        this.setState({password: event.target.value})
    }

    // Validation of username and password ( mocked for now. )
    handleSubmit = () => {
        //Axios call to verify username and password
        //Setting mock user token
        this.props.setToken("Test123");
        localStorage.setItem("Username",this.state.username)
        // If successful login update redux state username. (user profile)
        this.props.updateUsername(this.state.username)
    }
    //Handle modal close.
    handleForgotPasswordClose = () => {
        this.setState({showForgotPasswordModal: false})
    }

    handleSignUpClose = () => {
        this.setState({showSignUp: false})
    }
    // handling forgotten password. ( TODO: update endpoint )
    handleForgotPassword = (username) => {
        // window.alert(`Please check your email ${username} for your password.`)
        // check if email sent is successful
        // if true set Login Verification true
        this.setState({loginVerification: true,})
    }

    render() {
        let isInputValid = this.state.username.trim() === "" || this.state.password.trim() === ""
        return (
            <>
                <BackgroundDiv style={{display: "flex", flexDirection: "column"}}>
                    <Title>STAND UP; GET OUT</Title>
                    <LoginContainer>
                        <LoginText>Log In</LoginText>
                        Your Account
                        <UsernameInput value={this.state.username} onChange={this.handleUsername.bind(this)}
                                       placeholder={"Enter Username or Email"}/>
                        Password
                        <PasswordInput placeholder={"Enter Password"} onChange={this.handlePassword.bind(this)}/>
                        <ForgotPasswordButton onClick={() => {
                            this.setState({showForgotPasswordModal: true})
                        }}>Forgot your password?</ForgotPasswordButton>
                        <ForgotPassword show={this.state.showForgotPasswordModal}
                                        handleForgotPassword={this.handleForgotPassword}
                                        handleClose={this.handleForgotPasswordClose}
                                        loginVerification={this.state.loginVerification}
                        />

                        <Button style={{background: isInputValid ? "#89b6b9" : "#00cddb"}}
                                                   disabled={isInputValid} onClick={this.handleSubmit.bind(this)}><Link to={"/home"} style={{color:"white"}}>Log In</Link></Button>
                        <div
                            style={{margin: "20px", display: "flex", justifyContent: "center", alignContent: "center"}}>
                            <Line/>
                            <div style={{color: "#659699", fontWeight: "bold"}}>OR</div>
                            <Line/>
                        </div>
                        <Button onClick={()=>this.setState({showSignUp:true})}>Sign Up</Button>
                        <SignUp  show={this.state.showSignUp}  handleClose={this.handleSignUpClose}/>
                    </LoginContainer>
                </BackgroundDiv>
            </>
        );
    }
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
        username: state,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);