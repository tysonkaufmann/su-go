import React, {Component} from 'react';
import styled from 'styled-components'
import background3 from "../assets/images/background1.png";

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
const ForgotPassword = styled.button`
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
  border: 2px solid #ed6622;
  border-radius: 5px;
  
  /* here we use the dynamically computed prop */
  margin-top: 0px;
  margin-bottom: 20px;
  padding:5px;
`;
const PasswordInput = styled(UsernameInput).attrs({
    type: "password",
})`
          border: 2px solid #ed6622;
          margin-bottom: 10px;
`;

export default class Login extends Component {
    constructor() {
        super();
        this.state = {username: "", password: ""};
    }

    handleUsername = (event) => {
        this.setState({password:event.target.value})
    }
    handleSubmit = () => {
        //Axios call to verify username and password
        //Setting user token
        console.log(this.props.setToken("Test123"))
    }
    render() {
        return (
            <BackgroundDiv style={{display: "flex", flexDirection: "column"}}>
                <Title>STAND UP; GET OUT</Title>
                <LoginContainer>
                    <LoginText>Log In</LoginText>
                    Your Account
                    <UsernameInput value={this.state.username} onChange={(event)=>{this.setState({username:event.target.value})}} placeholder={"Enter Username or Email"}/>
                    Password
                    <PasswordInput placeholder={"Enter Password"} onChange={this.handleUsername.bind(this)}/>
                    <ForgotPassword>Forgot your password?</ForgotPassword>
                    <Button onClick={this.handleSubmit.bind(this)}>Log In</Button>
                    <div style={{margin: "20px", display: "flex", justifyContent: "center", alignContent: "center"}}>
                        <Line/>
                        <div style={{color: "#659699", fontWeight: "bold"}}>OR</div>
                        <Line/>
                    </div>
                    <Button href={"/signup"}>Sign Up</Button>
                </LoginContainer>
            </BackgroundDiv>
        );
    }
}