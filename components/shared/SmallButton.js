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
 *  state: The state of this button. Can be "default", "disabled", or "highlighted".
 */
export default class SmallButton extends Component {
    constructor(props) {
        super(props);
    }


    getGradient = function () {
        switch (this.props.state) {
            case "disabled":
                return (
                    <LinearGradient
                        colors={[
                            Colors.tertiaryColorDark.toString(),
                            'rgba(0,0,0,0)',
                            Colors.tertiaryColorDark.toString()
                        ]}
                        start={{ x: 0.5, y: -0.5 }}
                        end={{ x: 0.5, y: 1.3 }}
                        style={styles.gradientStyle}
                    >
                        <Text style={styles.disabledText}>{this.props.text}</Text>
                    </LinearGradient>
                );
            case "highlighted":
                return (
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
                        <Text style={styles.highlightedText}>{this.props.text}</Text>
                    </LinearGradient>
                );
            default:
                return (
                    <LinearGradient
                        colors={[
                            Colors.primaryColor.toString(),
                            'rgba(0,0,0,0)',
                            Colors.primaryColor.toString()
                        ]}
                        start={{ x: 0.5, y: -0.7 }}
                        end={{ x: 0.5, y: 1.5 }}
                        style={styles.gradientStyle}
                    >
                        <Text style={styles.defaultText}>{this.props.text}</Text>
                    </LinearGradient>
                );
        }
    }


    render() {
        return (
            <TouchableOpacity
                style={[styles.gradientButton1, this.props.style]}
                onPress={() => this.props.onPress()}
                disabled={(this.props.state == "disabled" ? true : false) }
            >
                {this.getGradient()}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    gradientButton1: {
        borderColor: Colors.primaryColor,
        borderWidth: 1,
        padding: 2,
    },

    gradientStyle: {
        padding: 2
    },

    defaultText: {
        color: Colors.tertiaryColor,
        textAlign: 'center',
        fontSize: 15,
        fontFamily: Fonts.tektur,
        padding: 3,
    },

    disabledText: {
        color: Colors.tertiaryColorDark,
        textAlign: 'center',
        fontSize: 15,
        fontFamily: Fonts.tektur,
        padding: 3,
    },

    highlightedText: {
        color: Colors.tertiaryColorLight,
        textAlign: 'center',
        fontSize: 15,
        fontFamily: Fonts.tekturBold,
        padding: 3,
    },
})