import React from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {
    updateCreatedRoutes
} from "../actions/routes";
import MapContainerComponent from "./mapContainer.component";

/* STYLED COMPONENTS USED FOR THE PAGE.*/

const RouteListItem = styled.div`
    width: 97%;
    height: 200px;
    background: white;
    border-radius: 10px;
    margin: 20px;
    border:1px gray black;
    display: flex;
    flex-direction: row;
    
`
const Map = styled.iframe`
            border: none;
            height: 100%;
            width: 100%;
            margin-bottom:30px;
        `

const Button = styled.button`
      text-align:center;
      font-size: 20px;
      padding: 0.25em 1em;
      border-radius: 10px;
      border: white;
      color: white;
      background: #00cddb;
      &:hover {
        background: #89b6b9;
      }
`;

const RouteButton = styled(Button)`
    width:130px;
    border-radius:0px;
    background: ${props => props.color ? props.color : "#00cddb"}
`

const TitleDiv = styled.div`
    margin-top: 25px;
    font-weight:bold;
    font-size: 25px;
`
// List of user created routes.
function UserCreatedRoutes(props){
    return (
        <>{
            props.createdRoutes.map((route,index) => {
                    console.log(route)
                    return (<div style={{borderBottom:"1px solid gray",marginBottom:"10px"}} key={index}>
                        <TitleDiv>{route.routetitle? route.routetitle.toUpperCase(): ""}</TitleDiv>
                        <RouteListItem key={route}>
                        {/*stub map for now.*/}
                        <MapContainerComponent route={
                            route.route} lat={route.lat} long={route.long} locate={false}
                        />
                        <RouteButton>Edit</RouteButton>
                        <RouteButton color={"#D40943"}>Delete</RouteButton>

                    </RouteListItem>
                        <div>{"Route Description: "}{route.routedescription}</div>
                        <div>{"Route Distance: "}{route.routedistance}{"(KM)"}</div>
                    </div>)
                }
            )
        }</>);
}


function mapDispatchToProps(dispatch) {
    return {
        updateCreatedRoutes: (item) => {
            dispatch(updateCreatedRoutes(item))
        },
    }
}


function mapStateToProps(state) {
    return {
        createdRoutes: state.routesReducer.createdRoutes,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserCreatedRoutes);