import React, {Component} from 'react';
import {updateUsername} from "../actions/userProfile";
import {updateAllRoutes, updateCurrentRoute} from "../actions/routes";
import {connect} from "react-redux";
import styled from "styled-components";
import background3 from "../assets/images/background3.png";
import background2 from "../assets/images/background2.png";
import background1 from "../assets/images/background1.png";
import {Form} from 'react-bootstrap/'
import {FormControl} from 'react-bootstrap/'
import {Button} from 'react-bootstrap/'
import MapContainerComponent from "./mapContainer.component";
import axios from "axios";
//Home page components.
const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const JumboDiv = styled.div`
    display:flex;
    flex-directions:column;
    justify-content:center;
    align-items:center;
    width:100%;
    height: 80vh;
    background-image: url(${props => props.image ? props.image : background3});
    
    /* Center and scale the imagboe nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`

const Map = styled.iframe`
            border: none;
            height: 100%;
            width: 100%;
            margin-bottom:30px;
        `
const StyledText = styled.h2`
            font-size: 50px;
            text-align:center;
            width:100%;
            color:white;
            background:#00cddb;
            
        `
const TextDiv = styled.div`
        background:${props => props.invert ? "#00cddb" : "white"};
        color:${props => props.invert ? "white" : "#00cddb"};
       font-size:50px;
       width:${props => props.width ? props.width : "650px"};
     text-align: center;
     margin: 50px;

       
`
const JumboTextDiv = styled.div`
       background:transparent;
       color:${props => props.inputColor ? props.inputColor : "#00cddb"};
       font-size:45px;
        text-align: center;
        margin: 200px auto;       
        font-weight:bold;
`

class Home extends Component {
    componentDidMount() {
        // auto update data every 5 mins
        var intervalId = setInterval(this.retrieveData, 60000 * 5);
        this.setState({intervalId: intervalId});
        this.retrieveData()
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }
    
    retrieveData = () => {
        this.props.updateUsername(localStorage.getItem("Username"))
        this.getRoutes()
        this.getCurrentRoute()
    }

    getCurrentRoute() {
        let self = this;
        axios.get(`http://localhost:5000/api/user/${localStorage.getItem("Username")}/currentroute`, {
                headers: {
                    "x-auth-username":
                        localStorage.getItem("Username"),
                    "x-auth-token":
                        JSON.parse(localStorage.getItem("token"))
                }
            }
        ).then(function(response) {
            // handle success
            if (response.data.success === "true"){
                self.props.updateCurrentRoute({...response.data.data.route, route:response.data.data.route.mapdata.coordinates})
            }
            else {
                console.log(response.data.msg)
            }
        }).catch(function(error) {
            console.error("error in getting user current route", error)
        })
    }

    getRoutes() {
        let self = this;
        axios.get(`http://localhost:5000/api/routes`, {
            headers: {
                "x-auth-username":
                    localStorage.getItem("Username"),
                "x-auth-token":
                    JSON.parse(localStorage.getItem("token"))
            }
        }).then(function(response) {
            // handle success
            if (response.data.success === "true"){
                let allRoutes = []
                for (let index = 0; index < response.data.data.length; index++) {
                    let item = {...response.data.data[index], route:response.data.data[index].mapdata.coordinates}
                    allRoutes.push(item)
                }
                self.props.updateAllRoutes(allRoutes)
            }
            else {
                console.log(response.data.msg)
            }
        }).catch(function(error) {
            console.error("error in getting all routes", error)
        })
    }

    render() {
        return (
            <HomeContainer>
                <JumboDiv>
                    <Form inline>
                        <FormControl type="text" placeholder="Search Route" size={"lg"}/>
                        <Button size={"lg"} variant="info">Search</Button>
                    </Form>
                </JumboDiv>
                <JumboDiv image={background1}>
                    <JumboTextDiv inputColor={"white"}>More Than 50,000 trails. Different adventures. Countless fun.</JumboTextDiv>
                </JumboDiv>

                <TextDiv>EXPLORE THE NATURE</TextDiv>
                <JumboDiv image={background2}>
                    <JumboTextDiv inputColor={"white"}>Make Custom Routes. Share Routes. Enjoy!</JumboTextDiv>

                </JumboDiv>
                <TextDiv width={"100%"} invert={false}>Start Now.</TextDiv>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    height: "500px"
                }}><StyledText>EXPLORE ROUTES NEARBY</StyledText>
                <MapContainerComponent route={[]} locate={true}/>
                </div>
            </HomeContainer>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        updateUsername: (item) => {
            dispatch(updateUsername(item))
        },
        updateAllRoutes: (item) => {
            dispatch(updateAllRoutes(item))
        },
        updateCurrentRoute: (item) => {
            dispatch(updateCurrentRoute(item))
        },
    }
}

function mapStateToProps(state) {
    return {
        username: state.userProfile.username,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);