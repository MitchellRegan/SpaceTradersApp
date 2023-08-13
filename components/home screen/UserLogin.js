import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';

//SVG Icons
import Logo from '../../assets/icons/NebulaLogo.svg';
//import Logo from '../../assets/icons/logo-over-black.svg';
import ProfileIcon from '../../assets/icons/Profile_icon.svg';
import LockIcon from '../../assets/icons/Lock_icon.svg';

//Styles
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';
import globalStyles from '../../styles/global-stylesheet';

//Components
import BigButton1 from '../shared/BigButton1';
import InputField from '../shared/InputField';

//API Calls
import AccountAPICalls from '../../api-calls/account-api-calls';


/**
 * Component displayed on the HomeScreen to handle showing the user logins fields.
 * Props:
 *  navigation: React.Navigation prop used for changing screens.
 *  onLogin: Function passed from HomeScreen to reload the page once we successfully login.
 */
export default class UserLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            token: "",
            invalidLogin: false
        }
    }


    /**
     * Method to update the username stored in our state.
     * @param {string} uname_ The string currently in the username text entry field.
     */
    setUsername = function (uname_) {
        this.setState((prevState) => {
            return ({
                ...prevState,
                username: uname_.toUpperCase()
            });
        });
    }


    /**
     * Method to update the bearer token string stored in our state.
     * @param {string} token_ The string currently in the token text entry field.
     */
    setToken = function (token_) {
        this.setState((prevState) => {
            return ({
                ...prevState,
                token: token_
            });
        });
    }


    /**
     * Method to attempt logging in the user with the given user symbol and bearer token.
     */
    login = async function () {
        //Making sure the user has actually entered a username and token
        if (this.state.username == "" || this.state.token == "") {
            Alert.alert("Incomplete Login", "Either the Username or Token field is empty. Please make sure both are filled-out before attempting to login.", [
                {
                    text: "OK"
                }
            ])
            return;
        }

        let data = await AccountAPICalls.userLogin(this.state.username, this.state.token)
            .then(data => {
                //If there's an error, we display the Error screen with details about what went wrong
                if (data.error) {
                    this.props.navigation.navigate("Error", {
                        title: data.error.title,
                        message: data.error.message
                    });
                }
                else if (data.invalid) {
                    this.setState((prevState) => {
                        return ({
                            ...prevState,
                            invalidLogin: true
                        });
                    });
                }
                //If there's no error, we save the login details and then move to the Home screen
                else {
                    AccountAPICalls.userLogin(this.state.username, data.token)
                        .then(() => this.props.onLogin(true))
                }
            })
            .catch(error => { })
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.inputBox}>
                    <Logo
                        height={150}
                        width={150}
                        style={styles.logo}
                    />

                    <Text style={[globalStyles.header1Text, {width: '100%', textAlign:'center'}]}>User Login</Text>

                    <InputField
                        symbol={"Username"}
                        multiline={false}
                        placeholder={"USERNAME"}
                        value={this.state.username}
                        onChangeText={(newUname) => this.setUsername(newUname)}
                    />
                    <InputField
                        symbol={"Token"}
                        multiline={false}
                        placeholder={"TOKEN"}
                        value={this.state.token}
                        onChangeText={(newToken) => this.setToken(newToken)}
                    />
                    {(this.state.invalidLogin) && <Text style={globalStyles.invalidText}>Invalid Username or Token</Text>}

                    <BigButton1 text={"Sign In"} onPress={() => this.login()} />
                    <BigButton1 text={"Create Account"} onPress={() => this.props.navigation.navigate("NewAccount")} />
                </View>

                <View style={{flex: 1}} />
                <View style={styles.mitchView}>
                    <Text style={[globalStyles.textListSmall, {textAlign: 'center'}]}>An app developed by Mitchell Regan for the SpaceTraders API-based game.</Text>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },

    logo: {
        alignSelf: 'center',
        margin: 8,
    },

    input: {
        width: 170,
        marginLeft: 5,
        paddingLeft: 3,
        fontFamily: Fonts.tektur,
        color: Colors.tertiaryColor,
        fontSize: 18,
    },

    newAccountButton: {
        alignItems: "center",
        margin: 5
    },

    mitchView: {
        alignSelf: 'center',
        width: '75%',
        marginBottom: 25,
    }
});