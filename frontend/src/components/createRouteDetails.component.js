import React, {useEffect, useState} from 'react';
import {updateEmail, updateUsername, updateFullname} from "../actions/userProfile";
import {connect} from "react-redux";
import styled from "styled-components";
import {updateCreateRouteDetails} from "../actions/routes";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
  margin-bottom: 15px;
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
    const [routetime, setRouteTime] = useState("");
    const [routetype, setRouteType] = useState("");
    // Handles information input by the user
    const handleRouteTitle = (event) => {
        setRouteTitle(event.target.value);
    }
    const handleRouteDescription = (event) => {
        setRouteDescription(event.target.value);
    }
    const handleRouteTime = (event) => {
        setRouteTime(event.target.value);
    }
    const handleRouteType = (event) => {
        setRouteType(event.target.value)
    }

    // update store when next clicked
    const handleNextClick = () => {
        props.updateCreateRouteDetails({
            routetitle: routetitle,
            routedescription: routedescription,
            routetime: routetime,
            routetype: routetype,
            route: props.createRouteDetails.route
        })
        props.handleNext()
    }

    useEffect(() => {
            setRouteTitle(props.createRouteDetails.routetitle)
            setRouteDescription(props.createRouteDetails.routedescription)
            setRouteTime(props.createRouteDetails.routetime)
            setRouteType(props.createRouteDetails.routetype)
        }, [props]
    )
    
    let disabled = routetitle === "" ||
        routedescription === "" ||
        routetime === "" ||
        routetype === ""

    return (
        <ContainerDiv>
            <FormControl variant="outlined" margin='dense' style={{marginBottom: "15px"}}>
                <InputLabel>Route Type</InputLabel>
                <Select
                native
                value={routetype}
                onChange={handleRouteType}
                label="Route Type"
                inputProps={{
                    name: 'Route Type',
                    id: 'route-type-select',
                }}
                >
                <option aria-label="None" value="" />
                <option value="Walking">Footpath</option>
                <option value="Biking">Biking Route</option>
                <option value="Hiking">Hiking Trail</option>
                </Select>
            </FormControl>
            Route Title:<Input value={routetitle} onChange={(event) => {
                handleRouteTitle(event)
            }} placeholder={"Enter Route Title"} />
            Route Description:<Input value={routedescription} onChange={(event) => {
                handleRouteDescription(event)
            }} placeholder={"Enter Route Description"} />
            Enter Approximate Time taken (Minutes):<Input value={routetime} type={"number"} onChange={(event) => {
                handleRouteTime(event)
            }} placeholder={"Enter Time (Minutes)"} />
            <Button
                style={{ background: disabled ? '#89b6b9' : '#00cddb' , marginTop: "10px"}}
                disabled={
                    disabled
                } onClick={() => handleNextClick()}>Next</Button>
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