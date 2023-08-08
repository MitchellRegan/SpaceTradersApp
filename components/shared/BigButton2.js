import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

//Styles
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';


/**
 * Component to display a button with custom text.
 * Props:
 *  text: Text to display on the button.
 *  onPress: The function to call when pressed.
 */
export default class BigButton2 extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <TouchableOpacity
                style={styles.gradientButton1}
                onPress={() => this.props.onPress()}
            >
                <View style={styles.innerSpacing }>
                    <Text style={styles.gradientText}>{this.props.text}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    gradientButton1: {
        borderColor: Colors.primaryColor,
        borderWidth: 1,
        padding: 2,
        marginTop: 15,
        alignSelf: 'center',
    },

    innerSpacing: {
        borderColor: Colors.primaryColor,
        borderWidth: 3,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 2,
        paddingRight: 2,
    },

    gradientText: {
        color: Colors.tertiaryColor,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: Fonts.tektur,
        paddingLeft: 20,
        paddingRight: 20,
        minWidth: 190,
    }
})