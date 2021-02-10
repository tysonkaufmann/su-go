import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import styled from 'styled-components'
import background3 from "../assets/images/background1.png";
export default class Login extends Component {
    render() {
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
        const Button = styled.a`
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
    height: 90vh; 

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
        `
        return (
            <BackgroundDiv style={{display: "flex", flexDirection: "column"}}>
                <Title>STAND UP; GET OUT</Title>
                <LoginContainer>
                    <LoginText>Log In</LoginText>
                    <Form>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Your Account</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username or Email"/>
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"/>
                        </Form.Group>
                        <ForgotPassword>Forgot your password?</ForgotPassword>
                    </Form>
                    <Button>Log In</Button>
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