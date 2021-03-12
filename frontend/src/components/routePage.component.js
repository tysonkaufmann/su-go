import React, {Component, useEffect, useRef} from 'react';
import {
    updateUsername,
    updateEmail,
    updateRoutesCompleted,
    updateDistanceCompleted,
    updateFullname,
    updateTotalTime
} from "../actions/userProfile";
import {connect} from "react-redux";
import {updateCreatedRoutes} from "../actions/routes";
import styled from "styled-components";
import MapContainerComponent from "./mapContainer.component";
import background3 from "../assets/images/background2.png";
import Rating from '@material-ui/lab/Rating';

/* STYLED COMPONENTS USED FOR THE PAGE.*/

const RoutePageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 30% 70%
`
const RouteLeft = styled.div`
    background : white;
    overflow: auto; 
    box-shadow: inset -2px 0px 4px 1px #89b6b9;
`
const RouteRight = styled.div`
    background : white;
    box-shadow: inset -5px 0px 5px 1px #89b6b9;

`

class RoutePage extends Component {
    constructor() {
        super();
        this.state = {
            currentRoute:-1,
            route:[]
        }
    }

    componentDidMount() {
        this.setState({currentRoute:this.props.created})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    componentWillUnmount() {
    }

    setMapDetails = (key) => {
        console.log(key)
        this.setState({route:key.route})
    }

    render() {
        let arr = [1, 2, 3, 4, 5]
        return (
            <RoutePageContainer>
                <RouteLeft>
                    {this.props.createdRoutes.map((route,i) =>
                        <MapDetailCard key={i} route={route} setMapDetails={this.setMapDetails}></MapDetailCard>
                    )}
                </RouteLeft>
                <RouteRight>
                    <MapContainerComponent route={this.state.route} locate={true}/>
                </RouteRight>
            </RoutePageContainer>
        );
    }
}


// Redux functions.
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
        updateRoutesCompleted: (item) => {
            dispatch(updateRoutesCompleted(item))
        },
        updateDistanceCompleted: (item) => {
            dispatch(updateDistanceCompleted(item))
        },
        updateTotalTime: (item) => {
            dispatch(updateTotalTime(item))
        },
        updateCreatedRoutes: (item) => {
            dispatch(updateCreatedRoutes(item))
        },

    }
}

const MapDetailCardDiv = styled.div`
    width:100%;
    height: 300px;
    box-shadow: inset 0px 0px 10px 6px #89b6b9;
    margin-bottom: 3px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 15px;
`
const ViewMapButton = styled.button`
      text-align:center;
      font-size: 1em;
      padding: 0.25em 1em;
      border: white;
      color: white;
      width: 100%;
      height: 50px;
      background: #00cddb;
      align-self: flex-end;
      margin-bottom: 10px;
      margin-top:auto;
      &:hover {
        background: #89b6b9;
      }
`
const RouteNameText = styled.div`
    margin-top: 5px;
    margin-left: 10px;
    margin-bottom: 10px;
    color: black;
    font-weight: bold;
    height: fit-content;

`
const RouteTitleText = styled.div`
    color: #00cddb;
    font-weight: bold;
    margin-top: 10px;
    margin-left: 10px;
    font-size: 25px;
`

const TrailImage = styled.div`
    width:100%;
    height: 30vh;
    background-image: url(${props => props.image ? props.image : background3});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`
function MapDetailCard(props) {

    return (<MapDetailCardDiv>
        <TrailImage />
        <RouteTitleText>{props.route.routetitle}</RouteTitleText>
        <RouteNameText>{props.route.routedescription}</RouteNameText>
        <Rating
            disabled={true}
            precision={1}
            value={props.route.rating}
        />
        <ViewMapButton onClick={()=>props.setMapDetails(props.route)}>View Map</ViewMapButton>
    </MapDetailCardDiv>)
}

function mapStateToProps(state) {
    return {
        username: state.userProfile.username,
        fullname: state.userProfile.fullname,
        email: state.userProfile.email,
        routesCompleted: state.userProfile.routesCompleted,
        distanceCompleted: state.userProfile.distanceCompleted,
        totalTime: state.userProfile.totalTime,
        favouriteRoutes: state.routesReducer.favouriteRoutes,
        createdRoutes: state.routesReducer.createdRoutes,

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutePage);