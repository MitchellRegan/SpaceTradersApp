import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';

//Styles
import Fonts from '../styles/Fonts';
import Colors from '../styles/Colors';

//API Calls
import AccountAPICalls from '../api-calls/account-api-calls';


export default class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            token: ''
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
    login = function () {
        AccountAPICalls.userLogin(this.state.username, this.state.token);
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.inputBox}>
                    <Text>Login Screen</Text>

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
                            secureTextEntry={true}
                            placeholder={"Example: Han Solo"}
                            value={this.state.token}
                            onChangeText={(newToken) => this.setToken(newToken)}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => this.login() }
                    >
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.newAccountButton}
                        onPress={() => this.props.navigation.navigate("NewAccount")}
                    >
                        <Text style={styles.newAccountText}>Create Account</Text>
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

    inputBox: {
        paddingTop: "30%"
    },

    inputRow: {
        flexDirection: 'row'
    },

    inputHeaderText: {
        textAlignVertical: "center",
        fontFamily: Fonts.monospace
    },

    input: {
        borderWidth: 1,
        borderColor: '#000',
        width: "50%",
        marginLeft: 5,
        paddingLeft: 3,
        fontFamily: Fonts.monospace
    },

    loginButton: {
        backgroundColor: Colors.button1Color,
        borderRadius: 5,
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 8,
        paddingBottom: 8,
        marginTop: 15
    },

    loginButtonText: {
        color: Colors.button1TextColor,
        fontSize: 20,
        fontFamily: Fonts.monospace,
        fontWeight: "bold"
    },

    newAccountButton: {
        alignItems: "center",
        margin: 5
    },

    newAccountText: {
        fontSize: 14,
        fontFamily: Fonts.monospace,
        padding: 5
    }
});