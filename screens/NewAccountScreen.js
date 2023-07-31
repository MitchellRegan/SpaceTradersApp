import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';

//Styles
import Fonts from '../styles/Fonts';
import Colors from '../styles/Colors';

//Components
import HeaderBar from '../components/HeaderBar';

//API Calls
import AccountAPICalls from '../api-calls/account-api-calls';


export default class NewAccountScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            faction: ''
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
     * Method to update the faction name string stored in our state.
     * @param {string} faction_ The string currently in the token text entry field.
     */
    setFaction = function (faction_) {
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
    createAccount = function () {
        AccountAPICalls.makeNewAccount(this.state.username, this.state.faction);
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <HeaderBar
                    title={"New Account"}
                    navigation={this.props.navigation}
                    showBackButton={true}
                    showMenuButton={false}
                />
                
                <View style={styles.inputBox}>
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
                        <Text style={styles.inputHeaderText}>Faction:</Text>
                        <TextInput
                            style={styles.input}
                            multiline={false}
                            secureTextEntry={true}
                            placeholder={"Example: Rebellion"}
                            value={this.state.faction}
                            onChangeText={(newFaction) => this.setFaction(newFaction)}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.createAccountButton}
                        onPress={() => this.createAccount()}
                    >
                        <Text style={styles.createAccountButtonText}>Create</Text>
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
    }
});