import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {updateEmail, updateUsername, updateFullname} from "../actions/userProfile";
import {connect} from "react-redux";
import styled from "styled-components";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";
import MapContainerComponent from "./mapContainer.component";
import CreateRouteMapComponent from "./createRouteMap.component";
import {makeStyles} from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

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

const MapContainer = styled.div`
    width:"80vh";
    height:"80vh";
`
/********************************/

function CreateRouteComponent(props) {

    return (
        <Modal onHide={props.handleClose} size={"lg"} show={props.show} centered>
            <Modal.Header>
                <Modal.Title>CREATE ROUTE</Modal.Title>
            </Modal.Header>
            <Modal.Body>
        <MapContainer>
            <div style={{width:"60vh",height:"60vh"}} >
                <CreateRouteMapComponent route={[]} locate={true}/>
            </div>
        </MapContainer>

            </Modal.Body>
        </Modal>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        updateUsername: (item) => {
            dispatch(updateUsername(item))
        },
        updateEmail: (item) => {
            dispatch(updateEmail(item))
        },
        updateFullname: (item) => {
            dispatch(updateFullname(item))
        },

    }
}

function mapStateToProps(state) {
    return {
        username: state.userProfile.username,
        fullname: state.userProfile.fullname,
        email: state.userProfile.email,
    }
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'DE';
        case 1:
            return 'What is an ad group anyways?';
        case 2:
            return 'This is the bit I really care about!';
        default:
            return 'Unknown step';
    }
}

function HorizontalLinearStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={handleReset} className={classes.button}>
                            Reset
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        <div>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Back
                            </Button>
                            {isStepOptional(activeStep) && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSkip}
                                    className={classes.button}
                                >
                                    Skip
                                </Button>
                            )}

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRouteComponent);