import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

//Styles
import globalStyles from '../styles/global-stylesheet';


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
                style={globalStyles.bigButton1}
                onPress={() => this.props.onPress()}
            >
                <Text style={globalStyles.bigButton1Text}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}