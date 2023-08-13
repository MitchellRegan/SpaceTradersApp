import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

//Styles
import Colors from '../../styles/Colors';
import globalStyles from '../../styles/global-stylesheet';

//Components
import StatusPercentBar from '../../components/ships screen/StatusPercentBar';


/**
 * Component to show all details about a ship's frame
 * Props:
 *  frameData: JSON object containing information about the ship's frame
 */
export default class FrameDetails extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={globalStyles.header2Text}>Frame Details</Text>

                <View style={styles.block}>
                    <Text style={globalStyles.textListLarge}>{this.props.frameData.name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[globalStyles.textList, { textAlignVertical: 'center' }]}>Condition:</Text>
                        <StatusPercentBar percent={this.props.frameData.condition} />
                    </View>
                    <Text style={globalStyles.defaultText}>{this.props.frameData.description}</Text>
                    <Text style={globalStyles.textListSmall}>Module Slots: {this.props.frameData.moduleSlots}</Text>
                    <Text style={globalStyles.textListSmall}>Mounting Points: {this.props.frameData.mountingPoints}</Text>
                    <Text style={globalStyles.textListSmall}>Max Fuel Capacity: {this.props.frameData.fuelCapacity}</Text>
                    <Text style={globalStyles.textListSmall}>Requirements:  {this.props.frameData.requirements.crew} Crew,  {this.props.frameData.requirements.power} Power</Text>
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