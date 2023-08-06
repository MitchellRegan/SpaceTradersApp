import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

//Styles
import Fonts from '../styles/Fonts';
import Colors from '../styles/Colors';
import globalStyles from '../styles/global-stylesheet';

//Components
import HeaderBar from '../components/HeaderBar';

//API Calls
import AccountAPICalls from '../api-calls/account-api-calls';


export default class NewAccountScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            faction: "COSMIC",
            token: ""
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
     * Method to update the email stored in our state.
     * @param {string} email_ The string currently in the email text entry field.
     */
    setEmail = function (email_) {
        this.setState((prevState) => {
            return ({
                ...prevState,
                email: email_
            });
        });
    }


    /**
     * Method to update the faction name string stored in our state.
     * @param {string} faction_ The string currently in the token text entry field.
     */
    setFaction = function (faction_) {
        var localData = require("../user-preferences.json");
        console.log(localData.token);

        this.setState((prevState) => {
            return ({
                ...prevState,
                faction: faction_
            });
        });
    }


    /**
     * Method to attempt to create a new user with the given username and faction.
     */
    createAccount = async function () {
        let data = await AccountAPICalls.makeNewAccount(this.state.username, this.state.faction)
            .then(data => {
                //If there's an error, we display the Error screen with details about what went wrong
                if (data.error) {
                    this.props.navigation.navigate("Error", {
                        title: data.error.title,
                        message: data.error.message
                    });
                }
                //If there's no error, we save the login details and then move to the Home screen
                else {
                    console.log("Login data:");
                    console.log(data);
                    let loginData = AccountAPICalls.userLogin(this.state.username, data.data.token)
                        .then(validLogin => {
                            this.setState(prevState => {
                                return ({
                                    ...prevState,
                                    token: data.data.token
                                })
                            })
                        })
                        .catch(error => {

                        })
                    //this.props.navigation.navigate("Home");
                }
            })
            .catch(error => {
            })
    }


    render() {
        return (
            <View style={globalStyles.screenWrapperView}>
                <HeaderBar
                    title={"New Account"}
                    navigation={this.props.navigation}
                    showBackButton={true}
                    showMenuButton={false}
                />
                
                {(this.state.token == "") && <View style={styles.inputBox}>
                    <View style={styles.inputRow}>
                        <Text style={styles.inputHeaderText}>Username:</Text>
                        <TextInput
                            style={styles.input}
                            multiline={false}
                            placeholder={"Example: Han Solo"}
                            value={this.state.username}
                            onChangeText={(newUname) => this.setUsername(newUname)}
                            maxLength={14}
                        />
                    </View>
                    {(this.state.username.length < 3) &&
                        <Text style={globalStyles.invalidText}>
                            *Must be between 3 and 14 characters
                        </Text>}

                    <View style={styles.inputRow}>
                        <Text style={styles.inputHeaderText}>Email:</Text>
                        <TextInput
                            style={styles.input}
                            multiline={false}
                            keyboardType={"email-address"}
                            placeholder={"Example: john@doe.com"}
                            value={this.state.email}
                            onChangeText={(newEmail) => this.setEmail(newEmail)}
                        />
                    </View>

                    <View style={styles.inputRow}>
                        <Text style={styles.inputHeaderText}>Faction:</Text>
                        <Dropdown
                            style={styles.dropdown}
                            data={[
                                { label: 'Cosmic', value: 'COSMIC' },
                                { label: 'Void', value: 'VOID' },
                                { label: 'Galactic', value: 'GALACTIC' },
                                { label: 'Quantum', value: 'QUANTUM' },
                                { label: 'Dominion', value: 'DOMINION' },
                                { label: 'Astro', value: 'ASTRO' },
                                { label: 'Corsairs', value: 'CORSAIRS' },
                                { label: 'Obsidian', value: 'OBSIDIAN' },
                                { label: 'Aegis', value: 'AEGIS' },
                                { label: 'United', value: 'UNITED' },
                                { label: 'Solitary', value: 'SOLITARY' },
                                { label: 'Cobalt', value: 'COBALT' },
                                { label: 'Omega', value: 'OMEGA' },
                                { label: 'Echo', value: 'ECHO' },
                                { label: 'Lords', value: 'LORDS' },
                                { label: 'Cult', value: 'CULT' },
                                { label: 'Ancients', value: 'ANCIENTS' },
                                { label: 'Shadow', value: 'SHADOW' },
                                { label: 'Ethereal', value: 'ETHEREAL' }
                            ]}
                            value={this.state.faction}
                            onChange={item => { this.setFaction(item.value); }}
                            labelField="label"
                            valueField="value"
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.createAccountButton}
                        onPress={() => this.createAccount()}
                    >
                        <Text style={styles.createAccountButtonText}>Create</Text>
                    </TouchableOpacity>
                </View>}

                {(this.state.token != "") && <View style={styles.successView}>
                    <Text style={[globalStyles.header1Text, {alignSelf:'center'}] }>SUCCESS!</Text>
                    <Text style={[globalStyles.header2Text, {alignSelf:'center'}]}>Created account '{this.state.username}'</Text>
                    <Text style={[globalStyles.defaultText, {alignSelf:'center'}]}>This is your account's unique bearer token. Save it in a secure location, because you will need it to log into your account:</Text>
                    <Text
                        style={styles.tokenText}
                        selectable={true}
                    >
                        {this.state.token}
                    </Text>
                    <TouchableOpacity
                        style={styles.createAccountButton}
                        onPress={() => this.props.navigation.navigate("Home", {refresh:true})}
                    >
                        <Text style={styles.createAccountButtonText }>Login</Text>
                    </TouchableOpacity>
                </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputBox: {
        paddingTop: '45%'
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
        width: '60%',
        marginLeft: 5,
        paddingLeft: 3,
        borderRadius: 3,
        fontFamily: Fonts.monospace
    },

    dropdown: {
        borderWidth: 1,
        borderColor: '#555',
        width: '60%',
        marginLeft: 5,
        paddingLeft: 3,
        borderRadius: 3,
        fontFamily: Fonts.monospace
    },

    createAccountButton: {
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

    createAccountButtonText: {
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
        fontSize: 14,
        fontFamily: Fonts.monospace,
        padding: 5
    },

    successView: {
        flex: 1,
        padding: 10,
        marginTop: 30,
        verticalAlign: 'center',
    },

    tokenText: {
        fontFamily: Fonts.monospace,
        fontSize: 10,
        color: Colors.primaryColorDark,
        marginTop: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
    }
});