import React, {Component, useEffect, useRef} from 'react';
import {updateUsername,updateEmail,updateRoutesCompleted,updateDistanceCompleted,updateTotalTime} from "../actions/userProfile";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import styled from "styled-components";
import background3 from "../assets/images/background3.png";
import background2 from "../assets/images/background2.png";
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import EditProfile from "./editProfile.component";
import UserCreatedRoutes from "./userCreatedRoutes.component";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import FavouriteRoutes from "./favouriteRoutes.component";

const UserProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
`

const CoverPhoto = styled.div`
    width:100%;
    height: 30vh;
    background-image: url(${props => props.image ? props.image : background3});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`
const ProfilePicture = styled.div`
        background-image: url(${props => props.image ? props.image : background3});
        background-position: center;
        background-repeat: no-repeat;
        background-size: 200px 200px;
        border-radius: 50%;
        border: 5px solid white;
        width:200px;
        height:200px;
 `;

const UserInformationContainer = styled.div`
    height:200px;
    width:60%;
    display:flex;
    flex-direction: row;
    margin: -150px 0px 150px 0px;
    
`

const UserFullname = styled.div`
    font-size: 40px;
    font-weight:bold;
    color: black;
    margin: 10px;
    margin-bottom: 0px;
    `

const Map = styled.iframe`
            border: none;
            height: 100%;
            width: 100%;
            margin-bottom:30px;
        `
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

const TabDiv = styled.div`
    width:100%;
    height: 100vh;
    margin: 0 0 0 0;

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
const InnerContainer = styled.div`
    height: 950px;
    width: 95%;
    margin-top:100px;
    margin: 0px 0px 50px 40px;
    box-shadow: 0px 0px 20px #c1c1c1;
    text-align: center;
    overflow-y:auto;
`

const UserInformationCard = styled.div`
    display:flex;
    flex-direction:row;
    
`

const CardTitle = styled.div`
    font-weight:bold;
    margin-right: 3px;
`
const CardText = styled.div`
`
const Username = styled(UserFullname)`
    font-weight: 500;
    font-size: 35px;
    color:#ed6622;
    margin: 0;
    
`
const CardItem = styled.div`
    display:flex;
    flex-direction: row;
    justify-content:flex-start;
    margin: 10px;
`

const EmptyListText = styled.div`
    margin-top: 10px;
    font-size: 40px;
    font-weight: 700;

`

const TabLabel = styled.div`
    font-size: 15px;
       
`
class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            editProfile: false,

        }
    }

    componentDidMount() {
        console.log(localStorage.getItem("Username"))
        this.props.updateUsername(localStorage.getItem("Username"))
    }

    componentWillUnmount() {
    }

    handleCloseEditProfile() {
        this.setState({editProfile: false})
    }

    updateUsername() {
        window.alert("update")
    }

    render() {
        return (
            <UserProfileContainer>
                <CoverPhoto/>
                <UserInformationContainer>
                    <div style={{display: "flex", flexDirection: "column", margin: "auto", alignItems: "center"}}>
                        <ProfilePicture image={background2}>
                        </ProfilePicture>
                        <UserFullname>HARSH PATEL
                        </UserFullname>
                        <Username>{this.props.username}
                        </Username>
                        <CardItem style={{margin:"auto"}}><CardTitle ><FontAwesomeIcon icon={faEnvelope} size="lg"/>
                        </CardTitle><CardText>{this.props.email}</CardText></CardItem>
                        <UserInformationCard >
                            <CardItem><CardTitle>{"Routes Completed: "}</CardTitle><CardText>{this.props.routesCompleted}</CardText></CardItem>
                            <CardItem><CardTitle>{"Distance Completed: "}</CardTitle><CardText>{this.props.distanceCompleted}</CardText></CardItem>
                            <CardItem><CardTitle>{"Total Time: "}</CardTitle><CardText>{this.props.totalTime}</CardText></CardItem>
                        </UserInformationCard>
                        <Button style={{marginTop:"10px"}} onClick={() => this.setState({editProfile: true})}>Edit Profile</Button>
                    </div>
                </UserInformationContainer>
                <TabDiv style={{width: "100%", marginTop: "10%"}}>
                    <UserProfileTabs createdRoutes={this.props.createdRoutes} favouriteRoutes={this.props.favouriteRoutes}/>
                </TabDiv>
                <EditProfile show={this.state.editProfile} handleClose={this.handleCloseEditProfile.bind(this)}
                             updateUsername={this.updateUsername.bind(this)}/>

            </UserProfileContainer>
        );
    }
}


const useStyles = makeStyles({
    root: {
        margin: "0",
        borderRadius: "50%",
        fontSize:"50px"
    },

});
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function UserProfileTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const SelectedTabStyle = {background:"#ed6622",color:"white",boxShadow:"0px 0px 20px #c1c1c1",borderRadius:"15px 15px 0px 0px"}

    return (<div style={{width: "100"}}>
            <div ><BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction style={value===0 ? SelectedTabStyle: {}} label={<TabLabel >Routes Created</TabLabel>}  />
                <BottomNavigationAction style={value===1 ? SelectedTabStyle: {}} label={<TabLabel background={value===1}>Favourite Routes</TabLabel>}  />
            </BottomNavigation>
            </div>
            <TabPanel value={value} index={0}>
                <div>
                    <InnerContainer>

                        {props.createdRoutes.length > 0 ? <UserCreatedRoutes/> : <EmptyListText>No Routes Created</EmptyListText>}

                </InnerContainer></div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <InnerContainer>
                    {props.favouriteRoutes.length > 0 ? <FavouriteRoutes/> : <EmptyListText>No Favourite Routes</EmptyListText>}

                </InnerContainer>

            </TabPanel>
    </div>
    );
}

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    const classes = useStyles();

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{width: "100%", margin: "0"}}
            className={classes.root}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


function mapDispatchToProps(dispatch) {
    return {
        updateUsername: (item) => {
            dispatch(updateUsername(item))
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

    }
}

function mapStateToProps(state) {
    return {
        username: state.userProfile.username,
        email: state.userProfile.email,
        routesCompleted: state.userProfile.routesCompleted,
        distanceCompleted: state.userProfile.distanceCompleted,
        totalTime: state.userProfile.totalTime,
        favouriteRoutes: state.routesReducer.favouriteRoutes,
        createdRoutes: state.routesReducer.createdRoutes,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);