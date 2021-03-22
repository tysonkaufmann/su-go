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
import jog from "../assets/jog.jpg";
import bike from "../assets/bike.jpg";
import background3 from "../assets/images/background2.png";
import Rating from '@material-ui/lab/Rating';
import {Form} from 'react-bootstrap/'
import {FormControl} from 'react-bootstrap/'
import {Button} from 'react-bootstrap/'
import {Navbar} from "./navbar.component";

/* STYLED COMPONENTS USED FOR THE PAGE.*/

const RoutePageContainer = styled.div`
    width: 100%;
    height: 90vh;
    display: grid;
    grid-template-rows: 6% 95%;
    grid-template-columns: 30% 70%;
    z-index:0  ;
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
const Sort = styled.button`
      text-align:center;
      font-size: 1em;
      padding: 0.25em 1em;
      border: white;
      color: white;
      width: 140px;
      height: 50px;
      background: #00cddb;
      align-self: flex-end;
      margin-bottom: 10px;
      margin-top:auto;
      &:hover {
        background: #89b6b9;
      }
`
const UpperRight = styled.div`
    box-shadow: inset -2px 0px 4px 1px #89b6b9;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: auto 300px;
`
const UpperLeft = styled.div`
    display: flex;
    justify-content: center;
    box-shadow: inset -2px 0px 4px 1px #89b6b9;
`

class RoutePage extends Component {
    constructor() {
        super();
        this.state = {
            currentRoute: -1,
            Routes: [],
            route: [],
            asc_routes: false,
            asc_title: false,
            asc_distance: false,
        }
    }

    componentDidMount() {
        this.setState({currentRoute: this.props.created, Routes: this.props.allRoutes})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    componentWillUnmount() {
    }

    setMapDetails = (key) => {
        console.log(key)
        this.setState({route: key.route})
    }
    // sort the routes by the type of sort selected by the users and update the list.
    sortRoute = (sort) => {

        if (sort === "TYPE") {
            let sortByTitle = this.state.Routes;
            if (!this.state.asc_title) {
                sortByTitle.sort((a, b) => b.routetitle < a.routetitle ? -1 : 1)
            } else {
                sortByTitle.sort((a, b) => a.routetitle < b.routetitle ? -1 : 1)
            }
            this.setState({Routes: sortByTitle, asc_title: !this.state.asc_title})
        }

        if (sort === "RATING") {
            let sortByRating = this.state.Routes;
            if (!this.state.asc_routes) {
                sortByRating.sort((a, b) => b.rating - a.rating)
            } else {
                sortByRating.sort((a, b) => a.rating - b.rating)
            }
            this.setState({Routes: sortByRating, asc_routes: !this.state.asc_routes})
        }

        if (sort === "DISTANCE") {
            let sortByDistance = this.state.Routes;
            if (!this.state.asc_distance) {
                sortByDistance.sort((a, b) => b.routedistance - a.routedistance)
            } else {
                sortByDistance.sort((a, b) => a.routedistance - b.routedistance)
            }
            this.setState({Routes: sortByDistance, asc_distance: !this.state.asc_distance})
        }


    }

    render() {
        let arr = [1, 2, 3, 4, 5]
        return (
            <RoutePageContainer>
                <UpperLeft>
                    <Sort onClick={() => this.sortRoute("TYPE")}>TYPE</Sort>
                    <Sort onClick={() => this.sortRoute("RATING")}>RATING</Sort>
                    <Sort onClick={() => this.sortRoute("DISTANCE")}>DISTANCE</Sort>
                </UpperLeft>
                <UpperRight>
                    <div>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                            <Button variant="outline-info">Search</Button>
                        </Form>
                    </div>
                </UpperRight>
                <RouteLeft>
                    {this.state.Routes.map((route, i) =>
                        <MapDetailCard image={route.image} key={i} route={route} setMapDetails={this.setMapDetails}/>
                    )}
                </RouteLeft>
                <RouteRight>
                    <MapContainerComponent route={this.state.route} locate={true} allRoutes={this.props.allRoutes} />
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

// MAP DETAIL CARD COMPONENTS
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
    background-image: url(${(props) => {
    return props.image ? props.image : background3
}});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`

function MapDetailCard(props) {
    // temp image selection.
    let image = props.route.routetitle === "Biking Route" ? bike : props.route.routetitle === "Jogging" ? jog : undefined;
    return (<MapDetailCardDiv>
        <TrailImage image={image}/>
        <RouteTitleText>{props.route.routetitle}</RouteTitleText>
        <RouteNameText>{props.route.routedescription}{" ("}{props.route.routedistance}{" KM)"}</RouteNameText>
        <Rating
            disabled={true}
            precision={1}
            value={props.route.rating}
        />
        <ViewMapButton onClick={() => props.setMapDetails(props.route)}>View Map</ViewMapButton>
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
        allRoutes: state.routesReducer.allRoutes,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutePage);