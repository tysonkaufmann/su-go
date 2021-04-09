import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { updateEmail, updateUsername, updateFullname } from '../actions/userProfile'
import { connect } from 'react-redux'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'

/* STYLED COMPONENTS USED FOR THE PAGE. */
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
`
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
`
const PasswordInput = styled(UsernameInput).attrs({
  type: 'password'
})`
          border: 2px solid black;
          margin-bottom: 10px;
`

/********************************/

function SignUp (props) {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [fullname, setFullname] = useState('')
  const [password, setPassword] = useState('')
  const [submitLoader, setLoader] = useState(false)

  const isInputValid = username.trim() === '' || fullname.trim() === '' || email.trim() === '' || password.trim() === ''
  // Handle Username input
  const handleUsernameInput = (event) => {
    setUsername(event.target.value)
  }
  // Handle Fullanme input
  const handleFullnameInput = (event) => {
    setFullname(event.target.value)
  }
  // Handle Email input
  const handleEmailInput = (event) => {
    setEmail(event.target.value)
  }
  // Handle Password input
  const handlePasswordInput = (event) => {
    setPassword(event.target.value)
  }

  // Handle Signup input
  const handleSignUp = () => {
    setLoader(true)
    axios.post('http://localhost:5000/api/user/signup', {
      email: email,
      fullname: fullname,
      username: username,
      password: password,
      photo: 'FAKE BASE64 ENCODED IMAGE'
    })
      .then(function (response) {
        if (response.data.success === 'true') {
          setTimeout(() => { setLoader(false); props.handleClose(); window.alert('SUCCESSFUL! YOU CAN NOW LOGIN.') }, 2000)
        } else {
          setTimeout(() => {
            setLoader(false); props.handleClose(); window.alert(response.data.msg)
          }, 2000)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
        <Modal style={{ height: 'fit-content' }} size={'md'} show={props.show} onHide={props.handleClose} centered>
            <Modal.Header>
                <Modal.Title style={{ cursor: 'pointer' }} onClick={props.handleClose}>
                    <FontAwesomeIcon icon={faTimesCircle} size="lg"/>
                </Modal.Title>
                <Modal.Title style={{ marginRight: 'auto', marginLeft: 'auto' }}>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <SignUpContainer>
                    <SignUpText>Log In</SignUpText>
                    Email
                    <UsernameInput value={email} onChange={handleEmailInput} placeholder={'Enter Email'}/>
                    Username
                    <UsernameInput value={username} onChange={handleUsernameInput} placeholder={'Enter Username'}/>
                    Full Name
                    <UsernameInput value={fullname} onChange={handleFullnameInput} placeholder={'Enter Full Name'}/>
                    Password
                    <PasswordInput value={password} onChange={handlePasswordInput} placeholder={'New Password'} />
                    <Button onClick={handleSignUp} style={{ background: isInputValid || submitLoader ? '#89b6b9' : '#00cddb' }}>{
                        submitLoader
                          ? <CircularProgress style={{ marginTop: '3px', color: 'white' }} size={20} thickness={4}
                        />
                          : 'Sign Up'}</Button>
                    <div
                        style={{ margin: '20px 20px 0 20px ', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                        Already have an account?
                    </div>
                    {/* Already have an account? */}
                    <Button onClick={props.handleClose}>Log in</Button>
                </SignUpContainer>
            </Modal.Body>
        </Modal>
  )
}

function mapDispatchToProps (dispatch) {
  return {
    updateUsername: (item) => {
      dispatch(updateUsername(item))
    },
    updateEmail: (item) => {
      dispatch(updateEmail(item))
    },
    updateFullname: (item) => {
      dispatch(updateFullname(item))
    }

  }
}

function mapStateToProps (state) {
  return {
    username: state.userProfile.username,
    fullname: state.userProfile.fullname,
    email: state.userProfile.email
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
