import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';

//Styles
import globalStyles from '../styles/global-stylesheet';

//SVG Icons
import InfoIcon from '../assets/icons/Info_icon.svg';

//Components
import HeaderBar from '../components/shared/HeaderBar';
import ListElementView from '../components/shared/ListElementView';


/**
 * Screen to display all valid jump destinations that players can send one of their ships.
 * Warping a ship uses fuel to send it to another SYSTEM.
 * Props:
 *  shipName: The name of the ship that can warp.
 *  currentSystem: The name of the system that the ship is currently in.
 */
export default class ShipJumpScreen extends Component {
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
                            <Text style={globalStyles.defaultText}>
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
                    title={"Jump Destinations"}
                    navigation={this.props.navigation}
                    showBackButton={true}
                />

                <View style={styles.textView}>
                    <Text
                        style={[globalStyles.header2Text, { textAlign: 'center' }]}
                    >
                        Select A System For {this.props.route.params.shipName} To Jump To.
                    </Text>

                    <TouchableOpacity
                        style={styles.infoButton}
                        onPress={() => Alert.alert(
                            "Jump Info",
                            "Jumping allows ships to travel from one system to another. In order to jump systems, the ship must either be orbiting a Jump Gate waypoint, or it must have a Jump Drive module installed. Any ship can jump using Jump Gates, but using a ship's Jump Drive uses 1 unit of antimatter.",
                            [{ text: 'OK' }]
                        )}
                    >
                        <InfoIcon height={20} width={20} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView}>
                    {this.renderSystems()}
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
        paddingBottom: 20,
    }
})