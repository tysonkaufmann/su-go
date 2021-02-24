import React from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {
    updateCreatedRoutes
} from "../actions/routes";

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
// List of user created routes.
function UserCreatedRoutes(props){
    return (
        <>{
            props.createdRoutes.map((route) =>
                <RouteListItem>
                    {/*stub map for now.*/}
                    <Map
                        title="map"
                        src="https://maps.google.com/maps?width=300&amp;height=300&amp;hl=en&amp;q=1%20Grafton%20Street%2C%20Dublin%2C%20Ireland+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"/>
                    <RouteButton>Edit</RouteButton>
                    <RouteButton color={"#D40943"}>Delete</RouteButton>
                </RouteListItem>
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