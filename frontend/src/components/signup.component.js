import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {updateUsername} from "../actions/userProfile";
import {connect} from "react-redux";

function SignUp(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose} centered>
            <Modal.Header>
                <Modal.Title style={{cursor: "pointer"}} onClick={props.handleClose}>
                    <FontAwesomeIcon icon={faTimesCircle} size="lg"/>
                </Modal.Title>
                <Modal.Title style={{marginRight: "auto", marginLeft: "auto"}}>Sign Up</Modal.Title>
            </Modal.Header>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);