import React, {Component, useRef, useState} from 'react';
import {
    updateUsername,
    updateEmail,
    updateRoutesCompleted,
    updateDistanceCompleted,
    updateFullname,
    updateTotalTime
} from "../actions/userProfile";
import {connect} from "react-redux";
import {updateCreatedRoutes, updateCurrentRoute, updateTraffic, updateSelectedRoute, updateExpiryTime, updateRating} from "../actions/routes";
import styled from "styled-components";
import OverviewMap from "./overviewMap.component"
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
import Countdown from "react-countdown";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

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
            if (!this.props.currentRoute.routeid) {
                this.filterByType()
            }
        }
        if (prevState.selectedType !== this.state.selectedType) {
            this.filterByType()
        }
        if (prevState.selectedSort !== this.state.selectedSort) {
            this.sortRoutes()
        }
        if (prevProps.selectedRoute !== this.props.selectedRoute) {
            if (this.props.selectedRoute.routeid) {
                const scrollTo = document.getElementById('mapcard-' + this.props.selectedRoute.routeid)
                if (scrollTo) {
                    scrollTo.scrollIntoView({ block: "nearest", behavior: 'smooth' })
                }
            }
        }
    }

    componentWillUnmount() {
    }

    setMapDetails = (key) => {
        this.setState({route: key})
        this.props.updateSelectedRoute(key)
    }

    timerOnComplete = (routeid) => {
        let self = this;
        self.props.updateCurrentRoute({})
        self.updateTraffic(routeid, false)
        self.props.updateExpiryTime(0)
    }

    updateTraffic = (routeid, routeStart) => {
        let self = this;
        let traffic = [...self.props.traffic]
        let trafficFound = traffic.find(t => t.routeid === routeid)
        if (trafficFound) {
            let index = traffic.indexOf(trafficFound)
            routeStart 
            ? traffic[index].count += 1
            : traffic[index].count -= 1

            self.props.updateTraffic(traffic)
        }
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
                    self.updateTraffic(id, true)
                    self.props.updateExpiryTime(Date.now() + 1000*60*60*6)
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
                    self.updateTraffic(id, false)
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

    rateRoute = (routeid, score) => {
        let self = this
        let postData = {
            username: self.props.username,
            score: score
        }
        axios.post(`http://localhost:5000/api/routes/${routeid}/vote`, postData, {
            headers: {
                "x-auth-username": self.props.username,
                "x-auth-token": JSON.parse(localStorage.getItem("token"))
            }
        }).then(function(response) {
            if (response.data.success === "true") {
                self.props.updateRating(response.data.data.route)
            }
            else {
                console.log("rate route failed")
            }
        }).catch(function(error) {
            console.log(error)
        })
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
            if (this.props.currentRoute.routeid && 
                !filteredRoutes.find(r => r.routeid === this.props.currentRoute.routeid)) {
                filteredRoutes.push(this.props.currentRoute)
            }
        }


        this.setState({Routes: filteredRoutes}, ()=> {
            if (filteredRoutes.indexOf(this.state.route) === -1) {
                this.setState({route: []})
                this.props.updateSelectedRoute({})
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
                        <MapDetailCard 
                            
                            image={route.image} 
                            key={i} route={route} 
                            setMapDetails={this.setMapDetails} 
                            setCurrentRoute={this.setCurrentRoute} 
                            currentRoute={this.state.currentRoute}
                            selectedRoute={this.props.selectedRoute}
                            timerOnComplete={this.timerOnComplete}
                            routeExpiryTime={this.props.routeExpiryTime}
                            rateRoute={this.rateRoute}
                        />
                    )}
                </RouteLeft>
                <RouteRight>
                    <OverviewMap locate={true} allRoutes={this.state.Routes}/>
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
        updateSelectedRoute: (item) => {
          dispatch(updateSelectedRoute(item))
        },
        updateExpiryTime: (item) => {
            dispatch(updateExpiryTime(item))
        },
        updateRating: (item) => {
            dispatch(updateRating(item))
        }
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
    width: 100%;
    margin-top: 5px;
    margin-left: 10px;
    margin-bottom: 5px;
    color: black;
    // font-weight: bold;
    height: fit-content;

`

const RouteInfo = styled.div`
    height: 25px;
    display: flex;
    justify-content: space-between;
    margin-right: 20px;
`

const RatingValue = styled.span`
    font-weight: bold;
    font-size: 15px;
    font-family: sans-serif;
`
const RatingSpan = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
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

const RouteRatingDiv = styled.div`
    width: 500px;
    padding: 20px 65px;
    text-align: center;
`

const RouteRatingButton = styled.button`
    text-align:center;
    font-size: 1em;
    padding: 0.25em 1em;
    border: white;
    color: white;
    background: #ed6622;
    align-self: flex-end;
    margin: 0px 10px 10px;
    border-radius: 8px;
`

const getAvgRating = (votes) => {
    let sum = 0
    let avg = -1
    if(votes && votes.length > 0) {
        votes.forEach(vote => {
            sum += vote.score
        })
        avg = Math.round((sum / votes.length) * 10) / 10
    }

    return avg
}

function RateRouteDialog(props) {
    let [value, setValue] = useState(0)

    const handleClose = () => {
        props.onClose()
    }

    const handleSubmit = () => {
        props.rateRoute(value)
        props.onClose()
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={props.open}>
            <DialogTitle id="dialog-title" style={{textAlign:"center", backgroundColor:"#00cddb", color:"white"}}>
                <b>How would you like to rate this route?</b>
            </DialogTitle>
            <RouteRatingDiv>
                <div style={{marginBottom:"30px"}}>
                    <div style={{color:"#00cddb", fontSize:"25px", fontWeight:"bold", marginBottom:"10px"}}>{props.route.routetitle}</div>
                    <div><b>Description: </b>{props.route.routedescription}</div>
                    <div><b>Distance: </b>{`${props.route.routedistance} (km)`}</div>
                    <div><b>Time: </b>{`${props.route.routetime} (minutes)`}</div>
                </div>
                <Rating 
                    name="hover-feedback"
                    size="large" 
                    value={value}
                    onChange={(_, newValue) => {
                        setValue(newValue ? newValue : 0)
                    }}
                />
                <div style={{color:"#ffb504"}}>
                    <span style={{fontSize:"50px"}}><b>{value}</b></span>
                    <span><b>{"/5"}</b></span>
                </div>
            </RouteRatingDiv>
            <RouteRatingButton onClick={handleSubmit}>Submit</RouteRatingButton>
        </Dialog>
    )
}

function MapDetailCard(props) {
    let [dialogOpen, setdialogOpen] = useState(false)

    // image selection.
    let image = props.route.routetype === "Biking" ? bike : props.route.routetype === "Walking" ? jog : undefined;
    let ratingAvg = getAvgRating(props.route.votes)


    const openDialog = () => {
        setdialogOpen(true)
    }

    const closeDialog = () => {
        setdialogOpen(false)
    }

    const rateRoute = (score) => {
        props.rateRoute(props.route.routeid, score)
    }

    return (<MapDetailCardDiv 
        id={'mapcard-' + props.route.routeid}
        style={props.currentRoute.routeid === props.route.routeid 
        ? {backgroundColor: "#ffc2a3"}
        : (props.selectedRoute.routeid === props.route.routeid ? {backgroundColor: "#ccfeff"} : {})}
        >
        <TrailImage image={image}/>
        <RouteTitleText>
            {props.route.routetitle}
            {props.route.routetype === "Walking" && <Chip label="Footpath" style={{marginRight: "20px", color: "white", backgroundColor: "#00cddb"}}/>}
            {props.route.routetype === "Biking" && <Chip label="Biking Route" style={{marginRight: "20px", color: "white", backgroundColor: "#00cddb"}}/>}
            {props.route.routetype === "Hiking" && <Chip label="Hiking Trail" style={{marginRight: "20px", color: "white", backgroundColor: "#00cddb"}}/>}
        </RouteTitleText>
        <RouteNameText>
            <RouteInfo>
                <span><b>Description:</b> {props.route.routedescription}</span>
                <RatingSpan onClick={openDialog}>
                    <Rating name="rating-read-only" precision={0.1} value={ratingAvg === -1 ? 0 : ratingAvg} readOnly/>
                    <RatingValue>
                        &nbsp;{ratingAvg === -1 ? "N/A" : ratingAvg}
                    </RatingValue>
                </RatingSpan>
                <RateRouteDialog open={dialogOpen} onClose={closeDialog} route={props.route} rateRoute={rateRoute} />
            </RouteInfo>
            <b>Distance:</b> {props.route.routedistance}{" (km)"}
            <RouteInfo>
                <span><b>Time:</b> {props.route.routetime}{" (minutes)"}</span>
                {
                    props.currentRoute.routeid === props.route.routeid && props.routeExpiryTime !== 0 &&
                        <div style={{color:"white", fontFamily: "sans-serif", fontWeight: "bold", fontSize:"large"}}>
                            <span>Expires in </span>
                            <Countdown date={props.routeExpiryTime} onComplete={() => props.timerOnComplete(props.route.routeid)} daysInHours>
                                <div />
                            </Countdown>
                        </div>
                }
            </RouteInfo>
        </RouteNameText>
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
            >
                {props.currentRoute.routeid === props.route.routeid? "End Route" : "Start Route"}
            </StartRouteButton>
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
        selectedRoute: state.routesReducer.selectedRoute,
        routeExpiryTime: state.routesReducer.routeExpiryTime,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutePage);