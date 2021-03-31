import React, {Component} from 'react';
import {
    updateUsername,
    updateEmail,
    updateRoutesCompleted,
    updateDistanceCompleted,
    updateFullname,
    updateTotalTime
} from "../actions/userProfile";
import {connect} from "react-redux";
import {updateCreatedRoutes, updateCurrentRoute, updateTraffic} from "../actions/routes";
import styled from "styled-components";
import MapContainerComponent from "./mapContainer.component";
import jog from "../assets/jog.jpg";
import bike from "../assets/bike.jpg";
import background3 from "../assets/images/background2.png";
import Rating from '@material-ui/lab/Rating';
import {Form} from 'react-bootstrap/'
import {FormControl} from 'react-bootstrap/'
import {Button} from 'react-bootstrap/'
import axios from "axios";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MuiFormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';

/* STYLED COMPONENTS USED FOR THE PAGE.*/

const RoutePageContainer = styled.div`
    width: 100%;
    height: 90vh;
    display: grid;
    grid-template-rows: 7% 94%;
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
            Routes: [],
            route: [],
            currentRoute: {},
            asc_routes: false,
            asc_title: false,
            asc_distance: false,
            selectedType: "All",
            selectedSort: "Default",
        }
    }

    componentDidMount() {
        this.setState({currentRoute: this.props.currentRoute, Routes: this.props.allRoutes})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.allRoutes !== this.props.allRoutes) {
            this.setState({Routes: this.props.allRoutes})
        }
        if (prevState.currentRoute !== this.props.currentRoute) {
            this.setState({currentRoute: this.props.currentRoute})
        }
        if (prevState.selectedType !== this.state.selectedType) {
            this.filterByType()
        }
        if (prevState.selectedSort !== this.state.selectedSort) {
            this.sortRoutes()
        }
    }

    componentWillUnmount() {
    }

    setMapDetails = (key) => {
        this.setState({route: key})
    }

    setCurrentRoute = (route, id) => {
        let self = this;
        let post_data = {
            username: self.props.username
        }
        // start route
        if (route.route) {
            axios.post(`http://localhost:5000/api/routes/${id}/startroute`, post_data,{
                headers: {
                    "x-auth-username": self.props.username,
                    "x-auth-token": JSON.parse(localStorage.getItem("token"))
                }
            }).then(function(response) {
                if (response.data.success === "true") {
                    window.alert("Route has been started")
                    self.props.updateCurrentRoute(route)
                    let traffic = [...self.props.traffic]
                    let trafficFound = traffic.find(t => t.routeid === id)
                    traffic[traffic.indexOf(trafficFound)].count += 1
                    self.props.updateTraffic(traffic)
                }
                else {
                    window.alert("failed to start route", response.data.msg)
                }
            }).catch(function(error) {
                console.log(error);
                window.alert(error)
            })
        }
        // end route
        else {
            axios.post(`http://localhost:5000/api/routes/${id}/endroute`, post_data,{
                headers: {
                    "x-auth-username": self.props.username,
                    "x-auth-token": JSON.parse(localStorage.getItem("token"))
                }
            }).then(function(response) {
                if (response.data.success === "true") {
                    window.alert("Route has been ended")
                    self.props.updateCurrentRoute(route)
                    let traffic = [...self.props.traffic]
                    let trafficFound = traffic.find(t => t.routeid === id)
                    traffic[traffic.indexOf(trafficFound)].count -= 1
                    self.props.updateTraffic(traffic)
                }
                else {
                    window.alert("failed to end route", response.data.msg)
                }
            }).catch(function(error) {
                console.log(error);
                window.alert(error)
            })
        }
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

    filterByType = () => {
        let filteredRoutes = this.props.allRoutes
        if (this.state.selectedType !== "All") {
            filteredRoutes = this.props.allRoutes.filter(r => r.routetype === this.state.selectedType)
        }


        this.setState({Routes: filteredRoutes}, ()=> {
            if (filteredRoutes.indexOf(this.state.route) === -1) {
                this.setState({route: []})
            }
            this.sortRoutes()
        })
    }

    handleType = (event) => {
        this.setState({selectedType: event.target.value})
    }

    sortRoutes = () => {
        let routesToSort = [...this.state.Routes]
        if (this.state.selectedSort === "Default") {
            let foundRoutes = []
            this.props.allRoutes.forEach(r => {
                if (routesToSort.indexOf(r) !== -1) {
                    foundRoutes.push(r)
                }
            })            
            routesToSort = foundRoutes
        }
        else if (this.state.selectedSort === "distance_asc") {
            routesToSort.sort((a, b) => a.routedistance - b.routedistance)
        }
        else if (this.state.selectedSort === "distance_des") {
            routesToSort.sort((a, b) => b.routedistance - a.routedistance)
        }
        else if (this.state.selectedSort === "time_asc") {
            routesToSort.sort((a, b) => a.routetime - b.routetime)
        }
        else if (this.state.selectedSort === "time_des") {
            routesToSort.sort((a, b) => b.routetime - a.routetime)
        }
        this.setState({Routes: routesToSort})
    }

    handleSortBy = (event) => {
        this.setState({selectedSort: event.target.value})
    }

    render() {
        return (
            <RoutePageContainer>
                <UpperLeft>
                    <MuiFormControl variant="outlined" margin='dense' style={{width: "45%", margin: "auto"}}>
                        <InputLabel>Route Type</InputLabel>
                        <Select
                            native
                            value={this.state.selectedType}
                            onChange={this.handleType}
                            label="Route Type"
                            inputProps={{
                                name: 'Route Type',
                                id: 'route-type-select',
                            }}>
                        <option value="All">All</option>
                        <option value="Walking">Footpath</option>
                        <option value="Biking">Biking Route</option>
                        <option value="Hiking">Hiking Trail</option>
                        </Select>
                    </MuiFormControl>
                    <MuiFormControl variant="outlined" margin='dense' style={{width: "45%", margin: "auto"}}>
                        <InputLabel>Sort by</InputLabel>
                        <Select
                            native
                            value={this.state.selectedSort}
                            onChange={this.handleSortBy}
                            label="Sort by"
                            inputProps={{
                                name: 'Sort by',
                                id: 'sort-by-select',
                            }}>
                        <option value="Default">Default</option>
                        <option value="distance_asc">Distance &#10835;</option>
                        <option value="distance_des">Distance &#10836;</option>
                        <option value="time_asc">Time &#10835;</option>
                        <option value="time_des">Time &#10836;</option>
                        </Select>
                    </MuiFormControl>
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
                        <MapDetailCard image={route.image} key={i} route={route} setMapDetails={this.setMapDetails} setCurrentRoute={this.setCurrentRoute} currentRoute={this.state.currentRoute}/>
                    )}
                </RouteLeft>
                <RouteRight>
                    {/* <MapContainerComponent currentRoute={this.state.currentRoute.route} route={this.state.route.route} locate={true} allRoutes={this.state.Routes} /> */}
                    <MapContainerComponent route={this.state.route.route || []} locate={true} />

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
        updateCurrentRoute: (item) => {
            dispatch(updateCurrentRoute(item))
        },
        updateTraffic: (item) => {
            dispatch(updateTraffic(item))
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
      width: 50%;
      height: 40px;
      background: #00cddb;
      align-self: flex-start;
      margin-bottom: 10px;
      margin-top:auto;
      &:hover {
        background: #89b6b9;
      }
`
const StartRouteButton = styled.button`
      text-align:center;
      font-size: 1em;
      padding: 0.25em 1em;
      border: white;
      color: white;
      width: 50%;
      height: 40px;
      background: #ed6622;
      align-self: flex-end;
      margin-bottom: 10px;
      margin-top:auto;
      &:hover {
        background: #c78f73;
      }
      &:disabled {
          background: #a8a8a7;
      }
`
const RouteNameText = styled.div`
    margin-top: 5px;
    margin-left: 10px;
    margin-bottom: 5px;
    color: black;
    // font-weight: bold;
    height: fit-content;

`
const RouteTitleText = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
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
    let image = props.route.routetype === "Biking" ? bike : props.route.routetype === "Walking" ? jog : undefined;
    return (<MapDetailCardDiv style={props.currentRoute.routeid === props.route.routeid ? {backgroundColor: "#ffc2a3"} : {}}>
        <TrailImage image={image}/>
        <RouteTitleText>
            {props.route.routetitle}
            {props.route.routetype === "Walking" && <Chip label="Footpath" style={{marginRight: "20px", color: "white", backgroundColor: "#00cddb"}}/>}
            {props.route.routetype === "Biking" && <Chip label="Biking Route" style={{marginRight: "20px", color: "white", backgroundColor: "#00cddb"}}/>}
            {props.route.routetype === "Hiking" && <Chip label="Hiking Trail" style={{marginRight: "20px", color: "white", backgroundColor: "#00cddb"}}/>}
        </RouteTitleText>
        <RouteNameText>
            <b>Description:</b> {props.route.routedescription}<br />
            <b>Distance:</b> {props.route.routedistance}{" (km)"}<br />
            <b>Time:</b> {props.route.routetime}{" (minutes)"}
        </RouteNameText>
        {/* <Rating
            name="hover-feedback"
            disabled={true}
            precision={1}
            value={props.route.rating}
        /> */}
        <div style={{width: "100%",display: "inline-block"}}>
            <ViewMapButton onClick={() => props.setMapDetails(props.route)}>View Map</ViewMapButton>
            <StartRouteButton 
            onClick={() => {
                if (props.currentRoute.routeid === props.route.routeid) {
                    props.setCurrentRoute({}, props.route.routeid)
                }
                else {
                    props.setCurrentRoute(props.route, props.route.routeid)
                }
            }}
            disabled={props.currentRoute.routeid !== props.route.routeid && props.currentRoute.route}
            >{props.currentRoute.routeid === props.route.routeid? "End Route" : "Start Route"}</StartRouteButton>
        </div>
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
        currentRoute: state.routesReducer.currentRoute,
        traffic: state.routesReducer.traffic,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutePage);