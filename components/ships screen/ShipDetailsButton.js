import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//Styles
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';
import globalStyles from '../../styles/global-stylesheet';

//Components
import DynamicMapIcon from '../map screen/DynamicMapIcon';
import ListElementView from '../shared/ListElementView';


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


    getShipName = function () {
        let shipName = this.props.shipData.registration.role[0];
        shipName = shipName + this.props.shipData.registration.role.slice(1).toLowerCase();
        let frameWords = this.props.shipData.frame.name.split(" ");
        for (var i = 1; i < frameWords.length; i++) {
            shipName = shipName + " " + frameWords[i];
        }
        //shipName = shipName + "  " + this.props.shipData.registration.name;
        return shipName
    }


    render() {
        return (
            <ListElementView>
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
                        <Text style={globalStyles.textList}>{this.getShipName()}</Text>

                        <Text style={globalStyles.textListSmall}>Location: {this.props.shipData.nav.waypointSymbol}</Text>
                        <Text style={globalStyles.textListSmall}>Status: {this.props.shipData.nav.status}</Text>
                        {(this.props.shipData.nav.status == "IN_TRANSIT") && <Text style={globalStyles.textListSmall}>Traveling To {this.props.shipData.nav.route.destination.symbol}</Text>}
                    </View>
                </TouchableOpacity>
            </ListElementView>
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
        paddingTop: 3,
        paddingBottom: 3,
    }
})