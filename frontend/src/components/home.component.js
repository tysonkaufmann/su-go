import React, { Component } from 'react';
import {updateUsername} from "../actions/userProfile";
import {connect} from "react-redux";

class Home extends Component {
    componentDidMount() {
        this.props.updateUsername(localStorage.getItem("Username"))
    }

    render() {
    return (
      <div>
        <h3 className="text-center">
            Hello, {this.props.username}. Welcome to Su;Go
        </h3>
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

export default connect(mapStateToProps ,mapDispatchToProps)(Home);