import React, {useEffect, useState} from 'react';
import {updateEmail, updateUsername, updateFullname} from "../actions/userProfile";
import {connect} from "react-redux";
import styled from "styled-components";
import {updateCreateRouteDetails, addCreatedRoute} from "../actions/routes";

/* COMPONENTS USED FOR THE EDIT PROFILE UI*/
const Input = styled.input`
    // we can define static props
    type: "text",
    // or we can define dynamic ones
    size:"0.5em",
   width: 100%;
  color: black;
  font-size: 1em;
  border: 2px solid black;
  border-radius: 5px;
  
  /* here we use the dynamically computed prop */
  margin-top: 0px;
  margin-bottom: 20px;
  padding:5px;
`;
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
const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 50px 0px 50px 0px;
`
// Modal for Edit Profile.
function CreateRouteDetails(props) {
    // States.
    const [routetitle, setRouteTitle] = useState("");
    const [routedescription, setRouteDescription] = useState("");
    const [routedistance, setRouteDistance] = useState("");
    const [routetime, setRouteTime] = useState("");

    //full name input handler
    const handleRouteTitle = (event) => {
        setRouteTitle(event.target.value);
    }
    //full name input handler
    const handleRouteDescription = (event) => {
        setRouteDescription(event.target.value);

    }
    //full name input handler
    const handleRouteDistance = (event) => {
        setRouteDistance(event.target.value);

    }    //full name input handler
    const handleRouteTime = (event) => {
        setRouteTime(event.target.value);

    }


    const handleNextClick = () => {
        props.updateCreateRouteDetails({routetitle:routetitle,routedistance:routedistance,routedescription:routedescription,routetime:routetime,route:[]})
        props.handleNext()
    }

    useEffect(()=> {
            setRouteTitle(props.createRouteDetails.routetitle)
            setRouteDescription(props.createRouteDetails.routedescription)
            setRouteDistance(props.createRouteDetails.routedistance)
            setRouteTime(props.createRouteDetails.routetime)
        },[props]
    )

    let disabled = routetitle === "" ||
        routedescription === "" ||
        routedistance === "" ||
        routetime === ""

    return (
        <ContainerDiv>
            Route Title:<Input value={routetitle} onChange={(event) => {
            handleRouteTitle(event)
        }} placeholder={"Enter Route Title"}/>
            Route Description:<Input value={routedescription} onChange={(event) => {
            handleRouteDescription(event)
        }} placeholder={"Enter Route Description"}/>
            Enter Distance:<Input value={routedistance} type={"number"} onChange={(event) => {
            handleRouteDistance(event)
        }} placeholder={"Enter Distance (KM)"}/>
            Enter Approximate Time taken:<Input value={routetime} type={"number"} onChange={(event) => {
            handleRouteTime(event)
        }} placeholder={"Enter Time (Minutes)"}/>
        <Button
            style={{background: disabled ? '#89b6b9' : '#00cddb'}}
            disabled={
                disabled
        } onClick={()=>handleNextClick()}>Next</Button>
        </ContainerDiv>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        updateUsername: (item) => {
            dispatch(updateUsername(item))
        },
        updateFullname: (item) => {
            dispatch(updateFullname(item))
        },
        updateEmail: (item) => {
            dispatch(updateEmail(item))
        },
        updateCreateRouteDetails: (item) => {
            dispatch(updateCreateRouteDetails(item))
        },
    }
}

function mapStateToProps(state) {
    return {
        favouriteRoutes: state.routesReducer.favouriteRoutes,
        createdRoutes: state.routesReducer.createdRoutes,
        createRouteDetails: state.routesReducer.createRouteDetails,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRouteDetails);