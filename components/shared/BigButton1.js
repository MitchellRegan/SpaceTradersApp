import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//Styles
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';


/**
 * Component to display a button with custom text.
 * Props:
 *  text: Text to display on the button.
 *  onPress: The function to call when pressed.
 */
export default class BigButton1 extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <TouchableOpacity
                style={styles.gradientButton1}
                onPress={() => this.props.onPress()}
            >
                <LinearGradient
                    colors={[
                        Colors.primaryColor.toString(),
                        'rgba(0,0,0,0)',
                        Colors.primaryColor.toString()
                    ]}
                    start={{ x: 0.5, y: -0.4 }}
                    end={{ x: 0.5, y: 1.1 }}
                    style={styles.gradientStyle}
                >
                    <Text style={styles.gradientText}>{this.props.text}</Text>
                </LinearGradient>
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

    gradientStyle: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 5,
        paddingRight: 5,
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