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
/* STYLED COMPONENTS USED FOR THE PAGE.*/

class RoutePage extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    componentWillUnmount() {
    }

    render() {

        return (
            <></>
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