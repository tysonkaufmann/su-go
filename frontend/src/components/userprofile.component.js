import React, {Component, useEffect} from 'react';
import {updateUsername} from "../actions/userProfile";
import {connect} from "react-redux";

class UserProfile extends Component {
    componentDidMount() {
    }
    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <h1 style={{margin:"100px"}}>
                   User Profile
                </h1>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        updateUsername: (item) => {
            dispatch(updateUsername(item))
        },

    }
}

function mapStateToProps(state) {
    return {
        username: state.userProfile.username,
    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(UserProfile);