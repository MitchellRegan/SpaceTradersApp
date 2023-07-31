import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';

//SVG Icons
import Logo from '../assets/icons/logo-over-black.svg';

//Styles
import Fonts from '../styles/Fonts';
import Colors from '../styles/Colors';

//Components
import HeaderBar from '../components/HeaderBar';

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
                <HeaderBar
                    title={"SpaceTraders"}
                    navigation={this.props.navigation}
                    showBackButton={false}
                    showMenuButton={false}
                />

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

    logo: {
        alignSelf: 'center',
        margin: 20
    },

    inputBox: {

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

    loginButton: {
        backgroundColor: Colors.button1Color,
        borderRadius: 5,
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 8,
        paddingBottom: 8,
        marginTop: 15,
        alignSelf: 'center'
    },

    loginButtonText: {
        color: Colors.button1TextColor,
        fontSize: 20,
        fontFamily: Fonts.monospace,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingRight: 20
    },

    newAccountButton: {
        alignItems: "center",
        margin: 5
    },

    newAccountText: {
        fontSize: 15,
        color: Colors.textHyperlinkColor,
        fontFamily: Fonts.monospace,
        padding: 7
    }
});