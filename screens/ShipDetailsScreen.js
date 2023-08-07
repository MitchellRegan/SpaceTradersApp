import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

//Styles
import globalStyles from '../styles/global-stylesheet';

//Components
import HeaderBar from '../components/HeaderBar';
import NavBar from '../components/NavBar';

/**
 * Screen to show all details about a specific ship in the user's fleet.
 * Props:
 *  navigation: React.Navigation prop used for changing screens.
 *  shipData: JSON object passed from ShipsScreen with details to be displayed in this button.
 */
export default class ShipsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ships: []
        }
    }


    render() {
        return (
            <View style={globalStyles.screenWrapperView}>
                <HeaderBar
                    title={"Ship Details"}
                    navigation={this.props.navigation}
                    showBackButton={true}
                />

                <ScrollView style={styles.scrollView}>
                    <Text style={globalStyles.header2Text}>{this.props.route.params.shipData.registration.name}</Text>
                    <Text style={globalStyles.textList}>Role: {this.props.route.params.shipData.registration.role}</Text>

                    {/* Details about the ship's location and destination */}
                    <Text style={globalStyles.textList}>Navigation</Text>
                    <Text style={globalStyles.textListSmall}>Status: {this.props.route.params.shipData.nav.status}</Text>
                    <Text style={globalStyles.textListSmall}>Location: {this.props.route.params.shipData.nav.waypointSymbol}</Text>
                    {(this.props.route.params.shipData.nav.status == "IN_TRANSIT") && <Text style={globalStyles.textListSmall}>Departed From {this.props.route.params.shipData.nav.route.departure.symbol}</Text>}
                    {(this.props.route.params.shipData.nav.status == "IN_TRANSIT") && <Text style={globalStyles.textListSmall}>Traveling To {this.props.route.params.shipData.nav.route.destination.symbol}</Text>}
                    <Text style={globalStyles.textListSmall}>Fuel: {this.props.route.params.shipData.fuel.current}/{this.props.route.params.shipData.fuel.capacity}</Text>
                    <Text style={globalStyles.textListSmall}>Speed: {this.props.route.params.shipData.engine.speed}</Text>

                    {/* Details about the crew */}
                    <Text style={globalStyles.textList}>Crew</Text>
                    <Text style={globalStyles.textListSmall}>Current Crew: {this.props.route.params.shipData.crew.current}/{this.props.route.params.shipData.crew.capacity}</Text>
                    <Text style={globalStyles.textListSmall}>Required Crew Size: {this.props.route.params.shipData.crew.required}</Text>
                    <Text style={globalStyles.textListSmall}>Morale: {this.props.route.params.shipData.crew.morale}%</Text>

                    {/* Details about the ship's hardware */}
                    <Text style={globalStyles.textList}>Specs</Text>
                    <Text style={globalStyles.textListSmall}>Frame: {this.props.route.params.shipData.frame.name} ({this.props.route.params.shipData.frame.condition}%)</Text>
                    <Text style={globalStyles.textListSmall}>Reactor: {this.props.route.params.shipData.reactor.name} ({this.props.route.params.shipData.reactor.condition}%)</Text>
                    <Text style={globalStyles.textListSmall}>Engine: {this.props.route.params.shipData.engine.name} ({this.props.route.params.shipData.engine.condition}%)</Text>

                    {/* Details about the ship's installed modules */}
                    <Text style={globalStyles.textList}>Installed Modules ({this.props.route.params.shipData.modules.length}/{this.props.route.params.shipData.frame.moduleSlots})</Text>
                    {this.props.route.params.shipData.modules.map((itemData, key) => (
                        <View key={key} style={styles.taskView}>
                            <Text style={globalStyles.textList}>#{key + 1}: {itemData.name}</Text>
                        </View>
                    ))}

                    {/* Details about the ship's installed mounts */}
                    <Text style={globalStyles.textList}>Installed Mounts ({this.props.route.params.shipData.mounts.length}/{this.props.route.params.shipData.frame.mountingPoints})</Text>
                    {this.props.route.params.shipData.mounts.map((itemData, key) => (
                        <View key={key} style={styles.taskView}>
                            <Text style={globalStyles.textListSmall}>#{key + 1}: {itemData.name}</Text>
                        </View>
                    ))}
                </ScrollView>

                <NavBar navigation={this.props.navigation} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
})