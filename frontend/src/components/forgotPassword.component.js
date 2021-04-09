import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { updateUsername } from '../actions/userProfile'
import { connect } from 'react-redux'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'

/* COMPONENTS USED FOR THE FORGOT PASSWORD UI */
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

const PasswordInput = styled(UsernameInput).attrs({
  type: 'password'
})`
          border: 2px solid black;
          margin-bottom: 10px;
`

const VerificationInput = styled(UsernameInput).attrs({
  type: 'text'
})`
          border: 2px solid black;
          margin-bottom: 10px;
`

function ForgotPassword (props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [verificationCode, setVerification] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [successful, setSuccessful] = useState(false)
  const [changeSuccessful, setChangeSuccessful] = useState(false)
  const [loginVerification, setLoginVerification] = useState(false)
  // username input handler
  const handleUsername = (event) => {
    setUsername(event.target.value)
  }
  // password input handler
  const handlePasswordInput = (event) => {
    setPassword(event.target.value)
  }
  // Verification input handler
  const handleVerificationInput = (event) => {
    setVerification(event.target.value)
  }
  // Submit forgot password.
  const handleSubmit = () => {
    setSubmitted(true)

    axios.post('http://localhost:5000/api/user/resetpassword', {
      username: username
    })
      .then(function (response) {
        if (response.data.success === 'true') {
          setSuccessful(true)
          setLoginVerification(true)
        } else {
          window.alert(response.data.msg)
          setTimeout(() => {
            setSuccessful(false)
            setSubmitted(false)
            setChangeSuccessful(false)
            setLoginVerification(false)
            setUsername('')
            setPassword('')
            setVerification('')
          }, 3000)
        }
      })
      .catch(function (error) {
        console.log(error)
        setLoginVerification(false)
      })
  }
  // Submit forgot password.
  const handleResetPassword = () => {
    setSuccessful(false)

    axios.post('http://localhost:5000/api/user/changepassword ', {
      username: username,
      verificationcode: parseInt(verificationCode),
      newpassword: password

    })
      .then(function (response) {
        if (response.data.success === 'true') {
          setTimeout(() => {
            setSuccessful(true)
            setLoginVerification(true)
            setChangeSuccessful(false)
            setSubmitted(false)
            props.handleForgotPassword()
            props.handleClose()
          }, 2000)
        } else {
          window.alert(response.data.msg)
          setTimeout(() => {
            setSubmitted(false)
            setChangeSuccessful(false)
            setLoginVerification(false)
            setUsername('')
            setPassword('')
            setVerification('')
          }, 2000)
        }
      })
      .catch(function (error) {
        window.alert('Error occured please try again.')
        console.log(error)
        setLoginVerification(false)
      })
  }
  // mount and unmount hooks.
  useEffect(() => {
    setUsername('')
    setSubmitted(false)
    return () => {
      setUsername('')
      setSubmitted(false)
    }
  }, [])
  //
  useEffect(() => {
    if (loginVerification) {
      setTimeout(() => {
        setSuccessful(true)
        setChangeSuccessful(false)
      }, 2000)
    } else {
      // If the verification / email is not successful
      setSuccessful(false)
      setSubmitted(false)
    }
  }, [loginVerification])
  return (
        <Modal show={props.show} onHide={props.handleClose} centered>
            <Modal.Header>
                <Modal.Title style={{ cursor: 'pointer' }} onClick={props.handleClose}>
                    <FontAwesomeIcon icon={faTimesCircle} size="lg"/>
                </Modal.Title>
                <Modal.Title style={{ marginRight: 'auto', marginLeft: 'auto' }}>{props.changePassword ? 'Change Password' : 'Forgot Password'}</Modal.Title>
            </Modal.Header>
            {!submitted
              ? <Modal.Body style={{ display: 'flex', flexDirection: 'column' }}>
                    <UsernameInput value={username} onChange={(event) => {
                      handleUsername(event)
                    }} placeholder={'Enter Username'}/>
                    <Button style={{ background: username.trim() === '' ? '#89b6b9' : '#00cddb' }}
                            disabled={username.trim() === ''} onClick={handleSubmit}>SUBMIT</Button>
                </Modal.Body>
              : <Modal.Body style={{ display: 'flex', flexDirection: 'column' }}>
                    {successful
                      ? changeSuccessful
                        ? <> Password Changed Successfully.</>
                        : <>
                        <div>Verification email sent successfully</div>
                        Username
                        <UsernameInput style={{ marginBottom: '10px' }} value={username} onChange={(event) => {
                          handleUsername(event)
                        }} placeholder={'Enter Username'}/>
                        Change Password
                        <PasswordInput value={password} onChange={handlePasswordInput} placeholder={'New Password'}/>
                        Verification Code
                        <VerificationInput value={verificationCode} onChange={handleVerificationInput}
                                           placeholder={'Enter Verification Code'}/>
                        <Button onClick={handleResetPassword}>Reset Password</Button>

                    </>
                      : <div style={{ margin: 'auto' }}><CircularProgress size={40} style={{ color: '#00cddb' }}
                                                                          thickness={6}/></div>
                    }
                </Modal.Body>}

            <Modal.Footer>

            </Modal.Footer>
        </Modal>
  )
}

function mapDispatchToProps (dispatch) {
  return {
    updateUsername: (item) => {
      dispatch(updateUsername(item))
    }

  }
}

function mapStateToProps (state) {
  return {
    username: state.userProfile.username
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
