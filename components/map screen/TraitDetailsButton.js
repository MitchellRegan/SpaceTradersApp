import React, { Component } from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';

//Styles
import globalStyles from '../../styles/global-stylesheet';


/**
 * Component displayed on WaypointsMapScreen to display the name of a waypoint's trait and show details when pressed.
 * Props:
 *  traitName: String for the name of the trait.
 *  traitDetails: String for details about the given trait.
 */
export default class TraitDetailsButton extends Component {
    constructor(props) {
        super(props);
    }


    /**
     * Method called from this component's TouchableOpacity to display an alert with the trait details.
     */
    viewDetails = function () {
        Alert.alert(
            this.props.traitName,
            this.props.traitDetails,
            [
                {
                    text: 'OK',
                }
            ]
        );
    }


    render() {
        return (
            <TouchableOpacity
                style={globalStyles.traitButton}
                onPress={() => this.viewDetails()}
            >
                <Text style={globalStyles.traitButtonText}>{this.props.traitName}</Text>
            </TouchableOpacity>
        );
    }
}