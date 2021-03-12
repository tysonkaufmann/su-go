import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";
import {Route, Switch} from "react-router-dom";
import NavbarComponent from "./components/navbar.component"
import Home from "./components/home.component"
import Login from "./components/login.component"
import SignUp from "./components/signup.component"
import UserProfile from "./components/userprofile.component"
import useToken from "./components/useToken";
import RoutePage from "./components/routePage.component";

function App() {
    const { token, setToken } = useToken();
    //The user needs to login to access the application.
  if(!token) {
    return <>
        <Login setToken={setToken} />
        </>
  }

    return (
        <div className="fill-window" style={{display:"flex",flexDirection:"column"}}>
          <div><NavbarComponent /></div>
          <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Home" exact component={Home} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/routes" exact component={RoutePage} />
          <Route path="/userprofile" exact component={UserProfile} />
          </Switch>
        </div>
    );
}

export default App;