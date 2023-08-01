import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';

//SVG Icons
import Logo from '../../assets/icons/logo-over-black.svg';

//Styles
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';
import globalStyles from '../../styles/global-stylesheet';

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
                username: uname_
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
                        height={180}
                        width={180}
                        style={styles.logo}
                    />

                    <View style={styles.inputRow}>
                        <Text style={styles.inputHeaderText}>Username:</Text>
                        <TextInput
                            style={styles.input}
                            multiline={false}
                            placeholder={"Example: Han Solo"}
                            value={this.state.username}
                            onChangeText={(newUname) => this.setUsername(newUname)}
                        />
                    </View>
                    <View style={styles.inputRow}>
                        <Text style={styles.inputHeaderText}>Token:</Text>
                        <TextInput
                            style={styles.input}
                            multiline={false}
                            placeholder={"Paste Token Here"}
                            value={this.state.token}
                            onChangeText={(newToken) => this.setToken(newToken)}
                        />
                    </View>
                    {(this.state.invalidLogin) && <Text style={globalStyles.invalidText}>Invalid Username or Token</Text>}

                    <TouchableOpacity
                        style={globalStyles.bigButton}
                        onPress={() => this.login()}
                    >
                        <Text style={globalStyles.bigButtonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.newAccountButton}
                        onPress={() => this.props.navigation.navigate("NewAccount")}
                    >
                        <Text style={globalStyles.hyperlinkText}>Create Account</Text>
                    </TouchableOpacity>
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
        margin: 20
    },

    inputRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 3
    },

    inputHeaderText: {
        width: '25%',
        textAlignVertical: "center",
        fontFamily: Fonts.monospace
    },

    input: {
        borderWidth: 1,
        borderColor: '#555',
        width: "60%",
        marginLeft: 5,
        paddingLeft: 3,
        borderRadius: 3,
        fontFamily: Fonts.monospace
    },

    newAccountButton: {
        alignItems: "center",
        margin: 5
    },
});