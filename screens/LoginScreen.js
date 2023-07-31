import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';

//Styles
import Fonts from '../styles/Fonts';
import Colors from '../styles/Colors';


export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.inputBox}>
                    <Text>Login Screen</Text>

                    <View style={styles.inputRow}>
                        <Text style={styles.inputHeaderText}>Call Sign:</Text>
                        <TextInput
                            style={styles.input}
                            multiline={false}
                            placeholder={"Example: Han Solo"}
                        />
                    </View>
                    <View style={styles.inputRow}>
                        <Text style={styles.inputHeaderText}>Token:</Text>
                        <TextInput
                            style={styles.input}
                            multiline={false}
                            secureTextEntry={true}
                            placeholder={"Example: Han Solo"}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.loginButton}
                    >
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.newAccountButton}
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