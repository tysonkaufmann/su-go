import React, {useState} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {
    removeCreatedRoute,
    updateCreatedRoutes
} from "../actions/routes";
import MapContainerComponent from "./mapContainer.component";
import Modal from "react-bootstrap/Modal";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

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
const NoButton = styled(RouteButton)`
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
                    return (<div style={{borderBottom:"1px solid gray",marginBottom:"10px"}} key={index}>
                        <TitleDiv>{route.routetitle? route.routetitle.toUpperCase(): ""}</TitleDiv>
                        <RouteListItem key={route}>
                        <UserCreatedMapContainer updateCreatedRoutes={props.updateCreatedRoutes} removeCreatedRoute={props.removeCreatedRoute} route={route}/>
                    </RouteListItem>
                        <div>{"Route Description: "}{route.routedescription}</div>
                        <div>{"Route Distance: "}{route.routedistance}{"(KM)"}</div>
                    </div>)
                }
            )
        }</>);
}

function UserCreatedMapContainer(props){
    let [alert, setAlert] = useState(false)
    let [confirm, setConfirm] = useState(false)
    const [submitLoader, setLoader] = useState(false);
    let handleDeleteRoute = (routeid) => {
        setLoader(true)
        axios.post(`http://localhost:5000/api/routes/${routeid}/delete`, {username:props.route.username},{
            headers: {
                "x-auth-username": props.route.username,
                "x-auth-token": JSON.parse(localStorage.getItem("token"))
            }
        })
            .then(function (response) {
                if(response.data.success === "true") {
                    props.removeCreatedRoute(routeid)

                    setTimeout(()=>{
                        handleClose()
                        setLoader(false)
                    },3000)
                }else{
                    setLoader(false)
                    handleClose()
                    window.alert("ERROR Please try again.")
                    window.alert(response.msg)
                }
            })
            .catch(function (error) {
                console.log(error);
                setLoader(false)
                handleClose()
                window.alert(error)

            });

    }

    let handleClose = () => {
        setAlert(false)

        axios.get(`http://localhost:5000/api/routes/usercreatedroutes/${props.route.username}`, {
                headers: {
                    "x-auth-username":
                    props.route.username,
                    "x-auth-token":
                        JSON.parse(localStorage.getItem("token"))
                }
            }
        ).then(function (response) {
            // handle success and update routes.
            if (response.data.success === "true") {
                let createdRoutes = []
                for (let i = 0; i < response.data.data.length; i++) {
                    let item = {...response.data.data[i], route:response.data.data[i].mapdata.coordinates}
                    createdRoutes.push(item)
                }
                props.updateCreatedRoutes(createdRoutes)
            }
        })
            .catch(function (error) {
                // handle
                console.log(error);
            })
    }

    let route = props.route;
    return<>
        <MapContainerComponent route={route.route} lat={route.lat} long={route.long} locate={false}
        />
        <RouteButton onClick={()=>setAlert(true)} color={"#D40943"}>Delete</RouteButton>
        <ConfirmAlert routeid={route.routeid} routedescription={route.routedescription} submitLoader={submitLoader} show={alert} handleDeleteRoute={handleDeleteRoute} handleClose={handleClose}/>
        </>
}

function ConfirmAlert(props){
    return        <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Body>
            <div style={{fontWeight:"bold",fontSize:"20px"}}>
                Are you sure you want to delete the route?
            </div>
            <RouteButton  color={"#D40943"} style={{width:"50%"}} onClick={()=>props.handleDeleteRoute(props.routeid)}>
                {props.submitLoader ? <CircularProgress style={{margin:"auto"}} size={20} style={{color: "white"}} thickness={4}
                /> : "Yes"}
            </RouteButton>

            <NoButton style={{width:"50%",}} onClick={props.handleClose}>No</NoButton>
        </Modal.Body>

    </Modal>
}

function mapDispatchToProps(dispatch) {
    return {
        updateCreatedRoutes: (item) => {
            dispatch(updateCreatedRoutes(item))
        },
        removeCreatedRoute: (item) => {
            dispatch(removeCreatedRoute(item))
        },
    }
}


function mapStateToProps(state) {
    return {
        createdRoutes: state.routesReducer.createdRoutes,
        username: state.userProfile.username,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserCreatedRoutes);