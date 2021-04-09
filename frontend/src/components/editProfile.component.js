import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { updateEmail, updateUsername, updateFullname } from '../actions/userProfile'
import { connect } from 'react-redux'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import ForgotPassword from './forgotPassword.component'
import axios from 'axios'

/* COMPONENTS USED FOR THE EDIT PROFILE UI */
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

// Modal for Edit Profile.
function EditProfile (props) {
  // States.

  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [successful, setSuccessful] = useState(false)
  const [changed, setChanged] = useState(false)

  // full name input handler
  const handleFullname = (event) => {
    setFullname(event.target.value)
    setChanged(true)
  }
  // username email handler
  const handleEmail = (event) => {
    setEmail(event.target.value)
    setChanged(true)
  }

  // Submit the update profile.
  const handleSubmit = () => {
    setSubmitted(true)
    axios.post('http://localhost:5000/api/userprofile/updateuserinformation', {
      username: props.username,
      fullname: fullname,
      email: email,
      profilepic: 'FAKE BASE64 ENCODED IMAGE'
    }, {
      headers: {
        'x-auth-username': props.username,
        'x-auth-token': JSON.parse(localStorage.getItem('token'))
      }
    })
      .then(function (response) {
        if (response.data.success === 'true') {
          setTimeout(() => {
            props.updateFullname(fullname)
            props.updateEmail(email)
            setSuccessful(true)
            setSubmitted(false)
            props.handleClose()
          }, 2000)
        } else {
          setTimeout(() => {
            setSubmitted(false)
            props.handleClose()
            window.alert(response.data.msg)
          }, 2000)
        }
      })
      .catch(function (error) {
        // Errors.
        window.alert('An error occured while updating.')
        setSubmitted(false)
        props.handleClose()
        console.log(error)
      })
  }
  const handleForgotPassword = () => {
    window.alert('Your password has been changed')
  }
  const handleForgotPasswordClose = () => {
    setShowForgotPasswordModal(false)
  }

  // mount and unmount hooks.
  useEffect(() => {
    setSubmitted(false)
    return () => {
      setSubmitted(false)
    }
  }, [])

  useEffect(() => {
    setEmail(props.email)
    setFullname(props.fullname)
    return () => {
    }
  }, [props.show])
  return (
        <Modal show={props.show} onHide={props.handleClose} centered>
            <Modal.Header>
                <Modal.Title style={{ cursor: 'pointer' }} onClick={props.handleClose}>
                    <FontAwesomeIcon icon={faTimesCircle} size="lg"/>
                </Modal.Title>
                <Modal.Title style={{ marginRight: 'auto', marginLeft: 'auto' }}>Edit Profile</Modal.Title>
            </Modal.Header>
            {!submitted
              ? <Modal.Body style={{ display: 'flex', flexDirection: 'column' }}>
                    Full Name:<Input value={fullname} onChange={(event) => {
                handleFullname(event)
              }} placeholder={'Enter Fullname'}/>
                    Email:<Input value={email} onChange={(event) => {
                handleEmail(event)
              }} placeholder={'Enter Email'}/>
                    <ForgotPasswordButton onClick={() => {
                      setShowForgotPasswordModal(true)
                    }}>Change Password</ForgotPasswordButton>
                    <ForgotPassword changePassword={true}
                                    show={showForgotPasswordModal}
                                    handleForgotPassword={handleForgotPassword}
                                    handleClose={handleForgotPasswordClose}
                    />
                    <Button style={{ background: !changed ? '#89b6b9' : '#00cddb' }}
                            disabled={!changed} onClick={handleSubmit}>SUBMIT</Button>
                </Modal.Body>
              : <Modal.Body style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontWeight: 'bold', margin: 'auto', fontSize: '25px' }}>Updating Information</div>
                    {
                        <div style={{ margin: 'auto' }}><CircularProgress size={40} style={{ color: '#00cddb' }}
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
    },
    updateFullname: (item) => {
      dispatch(updateFullname(item))
    },
    updateEmail: (item) => {
      dispatch(updateEmail(item))
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
