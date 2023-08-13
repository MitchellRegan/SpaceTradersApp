import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

//Styles
import Colors from '../../styles/Colors';
import globalStyles from '../../styles/global-stylesheet';

//Components
import StatusPercentBar from '../../components/ships screen/StatusPercentBar';


/**
 * Component to show all details about a ship's crew
 * Props:
 *  crewData: JSON object containing information about the ship's crew
 */
export default class CrewDetails extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={globalStyles.header2Text}>Crew Details</Text>

                <View style={styles.block}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[globalStyles.textList, { textAlignVertical: 'center' }]}>Morale:</Text>
                        <StatusPercentBar percent={this.props.crewData.morale} />
                    </View>
                    <Text style={globalStyles.defaultText}>Required Crew Size: {this.props.crewData.required}</Text>
                    <Text style={globalStyles.defaultText}>Maximum Crew Size: {this.props.crewData.capacity}</Text>
                    <Text style={globalStyles.textListSmall}>Shift Rotation: {this.props.crewData.rotation}</Text>
                    <Text style={globalStyles.textListSmall}>Wages: ${this.props.crewData.wages}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        borderColor: Colors.primaryColor,
        borderBottomWidth: 2,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        padding: 5,
        justifyContent: 'center',
    },

    block: {
        paddingLeft: 10,
    },
});