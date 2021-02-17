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


const UserProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
        width:200px;
        height:200px;
 `;

const UserInformationContainer = styled.div`
    height:200px;
    display:flex;
    flex-direction: row;
    margin: -50px 0px 0px 0px;
    background: linear-gradient(90deg, rgba(0,205,219,0) 0%, rgba(0,205,219,1) 52%, rgba(0,205,219,0) 100%);
    width: 100%;

`

const Username = styled.div`
    font-size: 40px;
    font-weight:bold;
    color: black;
    margin: 50px 50px 50px 5px;
`
//Stub email for now.
const Email = styled(Username)`
    font-size: 20px;
    margin: 0;
`

class UserProfile extends Component {
    componentDidMount() {
        updateUsername(localStorage.getItem("username"))
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <UserProfileContainer>
                <CoverPhoto/>
                <UserInformationContainer>
                    <div style={{display: "flex", flexDirection: "row", margin: "auto"}}>
                        <ProfilePicture image={background2}>
                        </ProfilePicture>
                        <Username>{this.props.username}
                            <Email>
                                {"Full Name | "}
                                email@email.com
                            </Email>
                        </Username>
                    </div>
                </UserInformationContainer>
                <div style={{width:"80%"}}>
                    <UserProfileTabs/>
                </div>

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
        display:"flex",
        width: "80%",
        height: "50px"

    },
});

function UserProfileTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (<><AppBar color={'inherit'} position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Favourite Routes" {...a11yProps(0)} />
            <Tab label="Routes Created" {...a11yProps(1)} />
            <Tab label="User Statistics" {...a11yProps(2)} />
            <Tab label="User Profile" {...a11yProps(3)} />
            <Tab label="User Statistics" {...a11yProps(4)} />
        </Tabs>
    </AppBar>
    <TabPanel value={value} index={0}>
        Item One
    </TabPanel>
    <TabPanel value={value} index={1}>
        Item Two
    </TabPanel>
    <TabPanel value={value} index={2}>
        Item Three
    </TabPanel>
    <TabPanel value={value} index={3}>
        Item Four
    </TabPanel>
    <TabPanel value={value} index={4}>
        Item Five
    </TabPanel></>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
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