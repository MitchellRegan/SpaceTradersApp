import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

//Styles
import Colors from '../styles/Colors';
import globalStyles from '../styles/global-stylesheet';

//Components
import HeaderBar from '../components/shared/HeaderBar';
import NavBar from '../components/shared/NavBar';
import ListElementView from '../components/shared/ListElementView';
import StatusPercentBar from '../components/ships screen/StatusPercentBar';
import DynamicMapIcon from '../components/map screen/DynamicMapIcon';

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


    getFrameName = function () {
        let fname = "";
        let nameParts = this.props.route.params.shipData.frame.name.split(" ");
        for (var i = 1; i < nameParts.length; i++) {
            fname = fname + nameParts[i] + " ";
        }
        return fname;
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
                    <View style={styles.blockRow}>
                        <View style={[styles.block, {paddingLeft: 10, paddingRight: 10}]}>
                            <DynamicMapIcon
                                typeName_={""}
                                pixelSize_={90}
                            />
                        </View>
                        <View style={[styles.block, {flex: 1}]}>
                            <Text style={globalStyles.header1Text}>{this.props.route.params.shipData.registration.name}</Text>
                            <Text style={globalStyles.header2Text}>{this.props.route.params.shipData.registration.role}</Text>
                            <Text style={globalStyles.header2Text}>{this.getFrameName()}</Text>
                        </View>
                    </View>

                    <View style={styles.blockRow}>
                        <View style={styles.block}>
                            <Text style={[globalStyles.header3Text, {padding: 10}]}>Status</Text>
                        </View>

                        <View style={[styles.block, {flex: 1}]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between'} }>
                                <Text style={[globalStyles.textList, { textAlignVertical: 'center' }]}>Frame:</Text>
                                <StatusPercentBar percent={this.props.route.params.shipData.frame.condition} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[globalStyles.textList, { textAlignVertical: 'center' }]}>Reactor:</Text>
                                <StatusPercentBar percent={this.props.route.params.shipData.reactor.condition} />
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[globalStyles.textList, { textAlignVertical: 'center' }]}>Engine:</Text>
                                <StatusPercentBar percent={this.props.route.params.shipData.engine.condition} />
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[globalStyles.textList, {textAlignVertical: 'center'}]}>Morale:</Text>
                                <StatusPercentBar percent={this.props.route.params.shipData.crew.morale} />
                            </View>
                        </View>
                    </View>

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

                    {/* Details about the ship's hardware */}
                    <Text style={globalStyles.textList}>Specs</Text>

                    {/* Details about the ship's installed modules */}
                    <Text style={globalStyles.textList}>Installed Modules    ({this.props.route.params.shipData.modules.length}/{this.props.route.params.shipData.frame.moduleSlots})</Text>
                    {this.props.route.params.shipData.modules.map((itemData, key) => (
                        <ListElementView key={key}>
                            <Text style={globalStyles.textList}>#{key + 1}: {itemData.name}</Text>
                        </ListElementView>
                    ))}

                    {/* Details about the ship's installed mounts */}
                    <Text style={globalStyles.textList}>Installed Mounts    ({this.props.route.params.shipData.mounts.length}/{this.props.route.params.shipData.frame.mountingPoints})</Text>
                    {this.props.route.params.shipData.mounts.map((itemData, key) => (
                        <ListElementView key={key}>
                            <Text style={globalStyles.textList}>#{key + 1}: {itemData.name}</Text>
                        </ListElementView>
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
        paddingBottom: 10,
    },

    blockRow: {
        width: '100%',
        flexDirection: 'row',
    },

    block: {
        borderColor: Colors.primaryColor,
        borderBottomWidth: 2,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        padding: 5,
        justifyContent: 'center',
    }
})