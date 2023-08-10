import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

//Styles
import Colors from '../styles/Colors';
import globalStyles from '../styles/global-stylesheet';

//Components
import HeaderBar from '../components/shared/HeaderBar';
import NavBar from '../components/shared/NavBar';
import ListElementView from '../components/shared/ListElementView';
import StatusPercentBar from '../components/ships screen/StatusPercentBar';
import DynamicMapIcon from '../components/map screen/DynamicMapIcon';
import SmallButton from '../components/shared/SmallButton';

/**
 * Screen to show all details about a specific ship in the user's fleet.
 * Props:
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

        fname = fname + this.props.route.params.shipData.registration.role[0];
        fname = fname + this.props.route.params.shipData.registration.role.slice(1).toLowerCase();

        let nameParts = this.props.route.params.shipData.frame.name.split(" ");
        for (var i = 1; i < nameParts.length; i++) {
            fname = fname + " " + nameParts[i][0] + nameParts[i].slice(1).toLowerCase();
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
                    {/*=============== Top Header ===============*/}
                    <View style={styles.blockRow}>
                        <View style={[styles.block, {paddingLeft: 10, paddingRight: 10}]}>
                            <DynamicMapIcon
                                typeName_={""}
                                pixelSize_={90}
                            />
                        </View>
                        <View style={[styles.block, {flex: 1}]}>
                            <Text style={globalStyles.header1Text}>{this.props.route.params.shipData.registration.name}</Text>
                            <Text style={globalStyles.header2Text}>{this.getFrameName()}</Text>
                        </View>
                    </View>

                    {/*=============== Navigation Status ===============*/}
                    <View style={styles.blockRow}>
                        <View style={styles.block}>
                            <Text style={[globalStyles.header3Text, { padding: 6 }]}>Status</Text>
                        </View>

                        <View style={[styles.block, {flex: 1, alignItems: 'center'}]}>
                            {(this.props.route.params.shipData.nav.status == "DOCKED") && <Text style={globalStyles.textList}>Docked at <Text
                                style={globalStyles.hyperlinkText}
                                onPress={() => this.props.navigation.navigate("WaypointsMap", { systemName_: this.props.route.params.shipData.nav.waypointSymbol})}
                            >
                                {this.props.route.params.shipData.nav.waypointSymbol}
                            </Text></Text>}

                            {(this.props.route.params.shipData.nav.status == "IN_ORBIT") && <Text style={globalStyles.textList}>Orbiting <Text
                                style={globalStyles.hyperlinkText}
                                onPress={() => this.props.navigation.navigate("WaypointsMap", { systemName_: this.props.route.params.shipData.nav.waypointSymbol})}
                            >
                                {this.props.route.params.shipData.nav.waypointSymbol}
                            </Text></Text>}
                        </View>
                    </View>

                    {/*=============== Condition ===============*/}
                    <View style={styles.blockRow}>
                        <View style={styles.block}>
                            <Text style={[globalStyles.header3Text, {padding: 6}]}>Condition</Text>
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
                                <Text style={[globalStyles.textList, { textAlignVertical: 'center' }]}>Morale:</Text>
                                <StatusPercentBar percent={this.props.route.params.shipData.crew.morale} />
                            </View>
                        </View>
                    </View>

                    {/*=============== Controls ===============*/}
                    <View style={[styles.block, { top: 0, left: 0, borderRightWidth: 2 }]}>
                        <Text style={[globalStyles.header3Text, { padding: 6 }]}>Navigation Controls</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <SmallButton
                            text={"Navigate"}
                            onPress={() => this.props.navigation.navigate("ShipNavigate", {
                                shipName: this.props.route.params.shipData.registration.name,
                                currentWaypoint: this.props.route.params.shipData.nav.waypointSymbol
                            })}
                            state={(this.props.route.params.shipData.fuel.current == 0 ? "disabled" : "default")}
                            style={{ flex: 1 }}
                        />

                        <SmallButton
                            text={"Warp"}
                            onPress={() => this.props.navigation.navigate("ShipWarp", {
                                shipName: this.props.route.params.shipData.registration.name,
                                currentSystem: this.props.route.params.shipData.nav.waypointSymbol.substring(0, 6)
                            })}
                            style={{ flex: 1 }}
                        />

                        <SmallButton
                            text={"Jump"}
                            onPress={() => this.props.navigation.navigate("ShipJump", {
                                shipName: this.props.route.params.shipData.registration.name,
                                currentSystem: this.props.route.params.shipData.nav.waypointSymbol.substring(0,6)
                            })}
                            state={"highlighted"}
                            style={{flex: 1} }
                        />
                    </View>

                    {/* Details about the ship's location and destination */}
                    <Text style={globalStyles.textList}>Navigation</Text>
                    {(this.props.route.params.shipData.nav.status == "IN_TRANSIT") && <Text style={globalStyles.textListSmall}>Departed From {this.props.route.params.shipData.nav.route.departure.symbol}</Text>}
                    {(this.props.route.params.shipData.nav.status == "IN_TRANSIT") && <Text style={globalStyles.textListSmall}>Traveling To {this.props.route.params.shipData.nav.route.destination.symbol}</Text>}
                    <Text style={globalStyles.textListSmall}>Fuel: {this.props.route.params.shipData.fuel.current}/{this.props.route.params.shipData.fuel.capacity}</Text>
                    <Text style={globalStyles.textListSmall}>Speed: {this.props.route.params.shipData.engine.speed}</Text>

                    {/* Details about the crew */}
                    <Text style={globalStyles.textList}>Crew</Text>
                    <Text style={globalStyles.textListSmall}>Current Crew: {this.props.route.params.shipData.crew.current}/{this.props.route.params.shipData.crew.capacity}</Text>
                    <Text style={globalStyles.textListSmall}>Required Crew Size: {this.props.route.params.shipData.crew.required}</Text>

                    {/*=============== Modules ===============*/}
                    <View style={[styles.blockRow, {justifyContent: 'space-between'}]}>
                        <View style={[styles.block, {top: 0, left: 0, borderRightWidth: 2}]}>
                            <Text style={[globalStyles.header3Text, { padding: 6 }]}>Installed Modules</Text>
                        </View>

                        <View style={[styles.block, {top: 0, right: 0, borderLeftWidth: 2 }]}>
                            <Text style={[globalStyles.header3Text, { padding: 6 }]}>{this.props.route.params.shipData.modules.length}/{this.props.route.params.shipData.frame.moduleSlots}</Text>
                        </View>
                    </View>

                    <View style={styles.block}>
                        {this.props.route.params.shipData.modules.map((itemData, key) => (
                            <ListElementView key={key}>
                                <Text style={globalStyles.textList}>#{key + 1}: {itemData.name}</Text>
                            </ListElementView>
                        ))}
                    </View>

                    {/*=============== Mounts ===============*/}
                    <View style={[styles.blockRow, { justifyContent: 'space-between' }]}>
                        <View style={[styles.block, { top: 0, left: 0, borderRightWidth: 2 }]}>
                            <Text style={[globalStyles.header3Text, { padding: 6 }]}>Installed Mounts</Text>
                        </View>

                        <View style={[styles.block, { top: 0, right: 0, borderLeftWidth: 2 }]}>
                            <Text style={[globalStyles.header3Text, { padding: 6 }]}>{this.props.route.params.shipData.mounts.length}/{this.props.route.params.shipData.frame.mountingPoints}</Text>
                        </View>
                    </View>
                    <View style={styles.block}>
                        {this.props.route.params.shipData.mounts.map((itemData, key) => (
                            <ListElementView key={key}>
                                <Text style={globalStyles.textList}>#{key + 1}: {itemData.name}</Text>
                            </ListElementView>
                        ))}
                    </View>
                </ScrollView>

                <NavBar navigation={this.props.navigation} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        paddingBottom: 20,
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