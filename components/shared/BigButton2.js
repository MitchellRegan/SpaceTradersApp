import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

//Styles
import globalStyles from '../../styles/global-stylesheet';


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
                style={globalStyles.bigButton2}
                onPress={() => this.props.onPress()}
            >
                <Text style={globalStyles.bigButton2Text}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}