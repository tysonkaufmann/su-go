import React, {Component, useEffect} from 'react';
import {updateUsername} from "../actions/userProfile";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import styled from "styled-components";
import background3 from "../assets/images/background3.png";
import background2 from "../assets/images/background2.png";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import EditProfile from "./editProfile.component";


const UserProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.05);
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
//Stub email for now.
const Email = styled(Username)`
    font-size: 20px;
    margin: 0;
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

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            editProfile:false,

        }
    }
    componentDidMount() {
        console.log(localStorage.getItem("Username"))
        this.props.updateUsername(localStorage.getItem("Username"))
    }

    componentWillUnmount() {
    }

    handleCloseEditProfile(){
        this.setState({editProfile:false})
    }

    updateUsername(){
        window.alert("update")
    }

    render() {
        return (
            <UserProfileContainer>
                <CoverPhoto/>
                <UserInformationContainer>
                    <div style={{display: "flex", flexDirection: "column", margin: "auto",alignItems:"center"}}>
                        <ProfilePicture image={background2}>
                        </ProfilePicture>
                        <Username>{this.props.username}
                        </Username>
                        <Button onClick={()=>this.setState({editProfile:true})}>Edit Profile</Button>
                    </div>
                </UserInformationContainer>
                <TabDiv style={{width:"100%",marginTop:"10%"}}>
                    <UserProfileTabs/>
                </TabDiv>
                <EditProfile show={this.state.editProfile} handleClose={this.handleCloseEditProfile.bind(this)} updateUsername={this.updateUsername.bind(this)}/>

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
        margin:"0",
        borderRadius:"50%"

    },

});

function UserProfileTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (<div style={{width:"100"}}><div style={{marginLeft:"50px",width:"100"}}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Favourite Routes" {...a11yProps(0)} />
            <Tab label="Routes Created" {...a11yProps(1)} />
            <Tab label="User Statistics" {...a11yProps(2)} />
        </Tabs>
    </div>
    <TabPanel value={value} index={0}>
        <div>Item One</div>
    </TabPanel>
    <TabPanel value={value} index={1}>
        <div>Item Two</div>
    </TabPanel>
    <TabPanel value={value} index={2}>
       <div> Item Three</div>
    </TabPanel>
    <TabPanel value={value} index={3}>
     <div>   Item Four</div>
    </TabPanel>
    <TabPanel value={value} index={4}>
       <div> Item Five</div>
    </TabPanel></div>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{width:"100%",margin:"0"}}
            className={classes.root}
        >
            {value === index && (
                <Box >
                    <Typography >{children}</Typography>
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