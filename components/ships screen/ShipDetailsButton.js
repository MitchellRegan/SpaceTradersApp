import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//Styles
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';
import globalStyles from '../../styles/global-stylesheet';

//Components
import DynamicMapIcon from '../map screen/DynamicMapIcon';

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
            <LinearGradient
                colors={[
                    Colors.secondaryColorLight.toString(),
                    Colors.secondaryColor.toString(),
                    Colors.secondaryColorDark.toString()
                ]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={globalStyles.listViewWrapper1}
            >
                <TouchableOpacity
                    style={{ flex: 1, flexDirection:'row' }}
                    onPress={() => this.props.navigation.navigate("ShipDetails", {shipData: this.props.shipData})}
                >
                    <View style={styles.iconBox}>
                        <DynamicMapIcon
                            typeName_={""}
                            pixelSize_={45}
                        />
                    </View>
                    <View style={styles.textBox}>
                        <Text style={globalStyles.textListLarge}>{this.props.shipData.registration.name}</Text>
                        <Text style={globalStyles.textList}>Role: {this.props.shipData.registration.role}</Text>

                        <Text style={globalStyles.textListSmall}>Status: {this.props.shipData.nav.status}</Text>
                        <Text style={globalStyles.textListSmall}>Location: {this.props.shipData.nav.waypointSymbol}</Text>
                        {(this.props.shipData.nav.status == "IN_TRANSIT") && <Text style={globalStyles.textListSmall}>Departed From {this.props.shipData.nav.route.departure.symbol}</Text>}
                        {(this.props.shipData.nav.status == "IN_TRANSIT") && <Text style={globalStyles.textListSmall}>Traveling To {this.props.shipData.nav.route.destination.symbol}</Text>}
                    </View>
                </TouchableOpacity>
            </LinearGradient>
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
    },

    iconBox: {
        verticalAlign: 'center',
        margin: 7,
        justifyContent: 'center',
    },

    textBox: {
        flex: 1,
        paddingRight: 3,
    }
})