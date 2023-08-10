import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';

//Styles
import globalStyles from '../styles/global-stylesheet';

//Components
import HeaderBar from '../components/shared/HeaderBar';
import ListElementView from '../components/shared/ListElementView';


/**
 * Screen to display all valid warp destinations that players can send one of their ships.
 * Warping a ship uses fuel to send it to another SYSTEM.
 * Props:
 *  shipName: The name of the ship that can warp.
 *  currentSystem: The name of the system that the ship is currently in.
 */
export default class ShipWarpScreen extends Component {
    constructor(props) {
        super(props);
    }


    renderSystems = function () {
        const starmap = require('../save data/local-starmap.json');

        let systems = [];
        for (var i in starmap) {
            systems.push(i);
        }

        return (
            systems.map((item, key) => (
                <ListElementView key={key}>
                    <TouchableOpacity
                        disabled={(this.props.route.params.currentSystem == item)}
                    >
                        <Text style={globalStyles.header3Text}>{item}</Text>
                        {(this.props.route.params.currentSystem == item) &&
                            <Text style={globalStyles.defaultText }>
                                [Current Location]
                            </Text>}
                    </TouchableOpacity>
                </ListElementView>
            ))
        );
    }


    render() {
        return (
            <View style={globalStyles.screenWrapperView}>
                <HeaderBar
                    title={"Warp Destinations"}
                    navigation={this.props.navigation}
                    showBackButton={true}
                />

                <View style={styles.textView }>
                    <Text
                        style={[globalStyles.header2Text, {textAlign: 'center'}]}
                    >
                        Select a warp destination to send {this.props.route.params.shipName}
                    </Text>
                    <Text
                        style={[globalStyles.defaultText, { textAlign: 'center' }]}
                    >
                        Warping allows ships to travel from one system to another. This action uses fuel, and most ship actions will be unavailable until it arrives at its destination.
                    </Text>
                </View>

                <ScrollView style={styles.scrollView}>
                    {this.renderSystems() }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textView: {
        padding: 10,
    },

    scrollView: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 20,
    }
})