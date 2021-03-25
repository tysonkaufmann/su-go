import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {updateEmail, updateUsername, updateFullname} from "../actions/userProfile";
import {connect} from "react-redux";
import styled from "styled-components";
import MapContainerComponent from "./mapContainer.component";
import CreateRouteMapComponent from "./createRouteMap.component";
import {makeStyles} from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import CreateRouteDetails from "./createRouteDetails.component";
import {updateCreateRouteDetails, addCreatedRoute, updateTraffic} from "../actions/routes";
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

const MapContainer = styled.div`
    height: 60vh;
    margin:auto 50px;
`

/********************************/

function CreateRouteComponent(props) {
    //ADDS IT TO THE REDUX STORE
    const handleFinish = () => {
        props.updateCreateRouteDetails({})
        let post_data = {
            routetitle:props.createRouteDetails.routetitle,
            routetime:props.createRouteDetails.routetime.toString(),
            routedescription:props.createRouteDetails.routedescription,
            routedistance: parseInt(props.createRouteDetails.routedistance),
            username:props.username,
            mapdata: {coordinates: props.createRouteDetails.route},
            routetype: props.createRouteDetails.routetype,
            photos:[
                "fake photo",
                "another fake photo"
            ],
        }
        axios.post('http://localhost:5000/api/routes/createroute', post_data,{
            headers: {
                "x-auth-username": props.username,
                "x-auth-token": JSON.parse(localStorage.getItem("token"))
            }
        })
            .then(function (response) {
                if(response.data.success === "true") {
                    props.addCreatedRoute({...response.data.data.route, route: response.data.data.route.mapdata.coordinates})
                    let traffic = [...props.traffic]
                    traffic.push({routeid: response.data.data.route.routeid, count: 0})
                    props.updateTraffic(traffic)
                    props.handleClose();
                }else{
                    window.alert("ERROR Please try again.")
                    window.alert(response.msg)
                }
            })
            .catch(function (error) {
                console.log(error);
                window.alert(error)

            });

    }
    return (
        <Modal onHide={props.handleClose} size={"lg"} show={props.show} centered>
            <Modal.Header>
                <Modal.Title>CREATE ROUTE</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <MapContainer>
                    <ResponsiveDiv >
                        <HorizontalLinearStepper handleClose={handleFinish} routeDetails={props.createRouteDetails}/>
                    </ResponsiveDiv>
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
        addCreatedRoute: (item) => {
            dispatch(addCreatedRoute(item))
        },
        updateCreateRouteDetails: (item) => {
            dispatch(updateCreateRouteDetails(item))
        },
        updateTraffic: (item) => {
            dispatch(updateTraffic(item))
        },
    }
}

function mapStateToProps(state) {
    return {
        username: state.userProfile.username,
        fullname: state.userProfile.fullname,
        email: state.userProfile.email,
        createRouteDetails: state.routesReducer.createRouteDetails,
        traffic: state.routesReducer.traffic,
    }
}

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

const ResponsiveDiv = styled.div`
    width: 100%;
    height: 40vh;
    @media (max-width: 600px) {
    width: 100%;
}
    
`
const RowDiv = styled.div`
    display: flex;
    flex-direction: row;
    `
const ColumnDiv = styled.div`
    display: flex;
    flex-direction: column;
    height:100%
    `

function getSteps() {
    return ['Enter Map Information', 'Create the route', 'Confirm Route Details'];
}

function getStepContent(step, handleNext, handleBack, route,handleReset) {
    switch (step) {
        case 0:
            return <ResponsiveDiv>
                <CreateRouteDetails handleNext={handleNext}/>
            </ResponsiveDiv>
        case 1:
            return <ResponsiveDiv>
                <CreateRouteMapComponent route={route.route.length < 1 ?  [] : route.route} handleBack={handleBack} handleNext={handleNext}/></ResponsiveDiv>;
        case 2:
            return <ResponsiveDiv>
                <ColumnDiv>
                    <RowDiv>{"Route Title: "}{route.routetitle}</RowDiv>
                    <RowDiv>{"Route Description: "}{route.routedescription}</RowDiv>
                    <RowDiv>{"Route Distance: "}{route.routedistance}(KM)</RowDiv>
                    <MapContainerComponent route={route.route.length < 1 ?  [] : route.route} locate={false}/>
                </ColumnDiv>
            </ResponsiveDiv>;
        default:
            return <></>
    }
}

function HorizontalLinearStepper(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        if(activeStep === steps.length-1){
            props.handleClose();
        }

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

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <ResponsiveDiv className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                    <div>
                        <Typography component={'span'} className={classes.instructions}>{getStepContent(activeStep,handleNext,handleBack,props.routeDetails,handleReset)}</Typography>
                        <div>
                            {
                                activeStep == 2 && <><Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Back
                            </Button>
                                <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                                >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button></>}
                        </div>
                    </div>
            </div>
        </ResponsiveDiv>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRouteComponent);