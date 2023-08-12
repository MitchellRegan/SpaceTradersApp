import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';

//Styles
import globalStyles from '../styles/global-stylesheet';

//SVG Icons
import InfoIcon from '../assets/icons/Info_icon.svg';

//Components
import HeaderBar from '../components/shared/HeaderBar';
import ListElementView from '../components/shared/ListElementView';
import DynamicMapIcon from '../components/map screen/DynamicMapIcon';
import TraitDetailsButton from '../components/map screen/TraitDetailsButton';


/**
 * Screen to display all valid waypoints that players can send one of their ships.
 * Warping a ship uses fuel to send it to another WAYPOINT.
 * Props:
 *  shipName: The name of the ship that can warp.
 *  currentWaypoint: The name of the waypoint that the ship is currently in.
 */
export default class ShipNavigationScreen extends Component {
    constructor(props) {
        super(props);
    }


    renderWaypoints = function () {
        const starmap = require('../save data/local-starmap.json');

        //Getting all waypoints in the ship's current system
        const wpts = starmap[this.props.route.params.currentWaypoint.substring(0, 6)].waypoints;
        let waypoints = [];
        for (var i = 0; i < wpts.length; i++) {
            waypoints.push(wpts[i]);

            for (var j = 0; j < wpts[i].orbitals.length; j++) {
                waypoints.push(wpts[i].orbitals[j]);
            }
        }

        return (
            waypoints.map((item, key) => (
                <ListElementView key={key}>
                    <TouchableOpacity
                        style={{flexDirection: 'row'} }
                        disabled={(this.props.route.params.currentWaypoint == item.symbol)}
                        onPress={() => this.confirmDestination(item.symbol)}
                    >
                        <DynamicMapIcon typeName_={item.type} pixelSize_={45} />
                        <View style={styles.buttonTextView}>
                            <Text style={globalStyles.header3Text}>{item.symbol}</Text>
                            <Text style={globalStyles.defaultText}>{item.type}</Text>
                            <View style={globalStyles.traitListView}>
                                {item.traits.map((item, key) => (
                                    <TraitDetailsButton
                                        key={key}
                                        traitName={item.name}
                                        traitDetails={item.description}
                                    />
                                ))}
                            </View>
                            {(this.props.route.params.currentWaypoint == item.symbol) &&
                                <Text style={globalStyles.defaultText}>
                                    [Current Location]
                                </Text>}
                        </View>
                    </TouchableOpacity>
                </ListElementView>
            ))
        );
    }


    /**
     * Method called from the list of waypoint buttons to confirm that the user wants to travel to a destination.
     * @param {string} dest_ The name of the waypoint that the user is designating as the navigation destination.
     */
    confirmDestination = function (dest_) {
        Alert.alert("Confirm Destination", "Are you sure you want " + this.props.route.params.shipName + " to navigate from waypoint " + this.props.route.params.currentWaypoint + " to waypoint " + dest_,
            [
                {
                    text: 'Go Back',
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: () => console.log("Confirm travel")
                }
            ])
    }


    render() {
        return (
            <View style={globalStyles.screenWrapperView}>
                <HeaderBar
                    title={"Navigation Destinations"}
                    navigation={this.props.navigation}
                    showBackButton={true}
                />

                <View style={styles.textView}>
                    <Text
                        style={[globalStyles.header2Text, { textAlign: 'center' }]}
                    >
                        Select A Waypoint For {this.props.route.params.shipName} To Travel To.
                    </Text>

                    <TouchableOpacity
                        style={styles.infoButton}
                        onPress={() => Alert.alert(
                            "Navigation Info",
                            "Navigating allows ships to travel between waypoints in the same system. Performing this action uses fuel, and most ship actions will be unavailable until it arrives at its destination.",
                            [{ text: 'OK' }]
                        )}
                    >
                        <InfoIcon height={20} width={20} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView}>
                    {this.renderWaypoints()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textView: {
        padding: 10,
    },

    infoButton: {
        position: 'absolute',
        right: 10,
        bottom: 0
    },

    scrollView: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 20,
    },

    buttonTextView: {
        paddingLeft: 10,
    }
})