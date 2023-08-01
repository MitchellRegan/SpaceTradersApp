import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

//Styles
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';
import globalStyles from '../../styles/global-stylesheet';

//API Calls
import ShipAPICalls from '../../api-calls/ship-api-calls';


/**
 * Component displayed on the ShipsScreen to handle showing details about a specific ship in the user's fleet.
 * Props:
 *  navigation: React.Navigation prop used for changing screens.
 *  shipData: JSON object passed from ShipsScreen with details to be displayed in this button.
 *  reloadScreen: Function passed from ShipsScreen to force a reload when a ship's state changes.
 */
export default class ShipDetailsButton extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={globalStyles.listViewWrapper1}>
                <Text style={globalStyles.header2Text}>{this.props.shipData.registration.name}</Text>
                <Text style={globalStyles.textList}>Role: {this.props.shipData.registration.role}</Text>

                {/* Details about the ship's location and destination */}
                <Text style={globalStyles.textList}>Navigation</Text>
                <Text style={globalStyles.textListSmall}>Status: {this.props.shipData.nav.status}</Text>
                <Text style={globalStyles.textListSmall}>Location: {this.props.shipData.nav.waypointSymbol}</Text>
                {(this.props.shipData.nav.status == "IN_TRANSIT") && <Text style={globalStyles.textListSmall}>Departed From {this.props.shipData.nav.route.departure.symbol}</Text>}
                {(this.props.shipData.nav.status == "IN_TRANSIT") && <Text style={globalStyles.textListSmall}>Traveling To {this.props.shipData.nav.route.destination.symbol}</Text>}
                <Text style={globalStyles.textListSmall}>Fuel: {this.props.shipData.fuel.current}/{this.props.shipData.fuel.capacity}</Text>
                <Text style={globalStyles.textListSmall}>Speed: {this.props.shipData.engine.speed}</Text>

                {/* Details about the crew */}
                <Text style={globalStyles.textList}>Crew</Text>
                <Text style={globalStyles.textListSmall}>Current Crew: {this.props.shipData.crew.current}/{this.props.shipData.crew.capacity}</Text>
                <Text style={globalStyles.textListSmall}>Required Crew Size: {this.props.shipData.crew.required}</Text>
                <Text style={globalStyles.textListSmall}>Morale: {this.props.shipData.crew.morale}%</Text>

                {/* Details about the ship's hardware */}
                <Text style={globalStyles.textList}>Specs</Text>
                <Text style={globalStyles.textListSmall}>Frame: {this.props.shipData.frame.name} ({this.props.shipData.frame.condition}%)</Text>
                <Text style={globalStyles.textListSmall}>Reactor: {this.props.shipData.reactor.name} ({this.props.shipData.reactor.condition}%)</Text>
                <Text style={globalStyles.textListSmall}>Engine: {this.props.shipData.engine.name} ({this.props.shipData.engine.condition}%)</Text>

                {/* Details about the ship's installed modules */}
                <Text style={globalStyles.textList}>Installed Modules ({this.props.shipData.modules.length}/{this.props.shipData.frame.moduleSlots})</Text>
                {this.props.shipData.modules.map((itemData, key) => (
                    <View key={key} style={styles.taskView}>
                        <Text style={globalStyles.textList}>#{key + 1}: {itemData.name}</Text>
                    </View>
                ))}

                {/* Details about the ship's installed mounts */}
                <Text style={globalStyles.textList}>Installed Mounts ({this.props.shipData.mounts.length}/{this.props.shipData.frame.mountingPoints})</Text>
                {this.props.shipData.mounts.map((itemData, key) => (
                    <View key={key} style={styles.taskView}>
                        <Text style={globalStyles.textListSmall}>#{key + 1}: {itemData.name}</Text>
                    </View>
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    taskView: {
        marginLeft: 25,
        paddingLeft: 5,
        borderLeftWidth: 1,
        borderLeftColor: Colors.primaryColor,
    },

    taskText: {
        fontFamily: Fonts.monospace,
        fontSize: 11,
        fontWeight: 'bold',
        paddingLeft: 20,
    }
})