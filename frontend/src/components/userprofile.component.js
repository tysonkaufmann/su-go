import React, {Component, useEffect, useRef} from 'react';
import {updateUsername} from "../actions/userProfile";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import styled from "styled-components";
import background3 from "../assets/images/background3.png";
import background2 from "../assets/images/background2.png";
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import EditProfile from "./editProfile.component";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

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
    margin: -150px 0px 0px 0px;
    
`

const Username = styled.div`
    font-size: 40px;
    font-weight:bold;
    color: black;
    margin: 10px;
    `

const Map = styled.iframe`
            border: none;
            height: 100%;
            width: 100%;
            margin-bottom:30px;
        `
//Stub email for now.
const Email = styled(Username)`
    font-size: 20px;
    margin: 0;
`

const RouteListItem = styled.div`
    width: 97%;
    height: 200px;
    background: white;
    border-radius: 10px;
    margin: 20px 20px 20px 20px;
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
                        <Username>{this.props.username}
                        </Username>
                        <Button onClick={() => this.setState({editProfile: true})}>Edit Profile</Button>
                    </div>
                </UserInformationContainer>
                <TabDiv style={{width: "100%", marginTop: "10%"}}>
                    <UserProfileTabs/>
                </TabDiv>
                <EditProfile show={this.state.editProfile} handleClose={this.handleCloseEditProfile.bind(this)}
                             updateUsername={this.updateUsername.bind(this)}/>

            </UserProfileContainer>
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

function UserProfileTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const Routes = ["a", "ab", "c", "d", "harsh", "fda", "harshasdfa", "harsasfh","c", "d", "harsh", "Bhaulik", "harsh"]

    const handleRemove = (route) => {

    }
    return (<div style={{width: "100"}}>
            <div ><BottomNavigation

                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction label={<div style={{fontSize:'15px'}}>User Information</div>}  />
                <BottomNavigationAction label={<div style={{fontSize:'15px'}}>Routes Created</div>}  />
                    <BottomNavigationAction label={<div style={{fontSize:'15px'}}>Favourite Routes</div>}  />
            </BottomNavigation>
            </div>
            <TabPanel value={value} index={0}>
                <div><InnerContainer/></div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div>
                    <InnerContainer>
                    {Routes.map((route) =>
                        <RouteListItem>
                            <Map
                                title="map"
                                src="https://maps.google.com/maps?width=300&amp;height=300&amp;hl=en&amp;q=1%20Grafton%20Street%2C%20Dublin%2C%20Ireland+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"/>
                            <RouteButton>Edit</RouteButton>
                            <RouteButton onClick={handleRemove} color={"#D40943"}>Delete</RouteButton>
                        </RouteListItem>
                    )
                    }

                </InnerContainer></div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <InnerContainer>
                    {Routes.map((route) =>
                        <RouteListItem>
                            <Map
                                title="map"
                                src="https://maps.google.com/maps?width=300&amp;height=300&amp;hl=en&amp;q=1%20Grafton%20Street%2C%20Dublin%2C%20Ireland+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"/>
                            <RouteButton>Directions</RouteButton>
                            <RouteButton onClick={handleRemove} color={"#D40943"}>Remove</RouteButton>
                        </RouteListItem>
                    )
                    }

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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);