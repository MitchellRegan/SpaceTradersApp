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
import LoadingDisplay from '../components/shared/LoadingDisplay';

//API Calls
import ShipAPICalls from '../api-calls/ship-api-calls';


/**
 * Screen to show all details about a specific ship in the user's fleet.
 * Props:
 *  shipName: String passed from ShipDetailsButton component for the name of the ship to display on this screen.
 */
export default class ShipsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shipData: null,
            viewFrame: true,
            viewReactor: true,
            viewEngine: true,
            viewCrew: true,
            viewModules: true,
            viewMounts: true,
            viewCargo: true,
        }
    }


    /**
     * Function called when this screen loads. Calls the getMyShip API to get the details of this specific ship
     */
    componentDidMount() {
        let data = ShipAPICalls.getShip(this.props.route.params.shipName)
            .then(data => {
                this.setState(prevState => {
                    return ({
                        ...prevState,
                        shipData: data.data,
                    })
                })
            })
            .catch(error => {
                //If there's an error, we display the Error screen with details about what went wrong
                if (data.error) {
                    this.props.navigation.navigate("Error", {
                        title: data.error.title,
                        message: data.error.message
                    });
                }
            })
    }


    /**
     * Method to turn the ship's designated role and frame name into a single formatted string
     * @returns String for the formatted frame/role name.
     */
    getFrameName = function () {
        let fname = "";

        fname = fname + this.state.shipData.registration.role[0];
        fname = fname + this.state.shipData.registration.role.slice(1).toLowerCase();

        let nameParts = this.state.shipData.frame.name.split(" ");
        for (var i = 1; i < nameParts.length; i++) {
            fname = fname + " " + nameParts[i][0] + nameParts[i].slice(1).toLowerCase();
        }

        return fname;
    }


    /**
     * Method to format the given UNIX time format for contract dates to a readable format.
     * @param {string} date_ String for the UNIX time to format.
     * @returns String for the formatted date string (DotW, DD MMM YYYY HH:MM:SS Timezone)
     */
    formatDateString = function (date_) {
        const unixTime = new Date(Date.parse(date_));
        return unixTime.toUTCString();
    }


    render() {
        return (
            <View style={globalStyles.screenWrapperView}>
                <HeaderBar
                    title={"Ship Details"}
                    navigation={this.props.navigation}
                    showBackButton={true}
                />

                {(this.state.shipData != null) && <ScrollView style={styles.scrollView}>
                    {/*=============== Top Header ===============*/}
                    <View style={styles.blockRow}>
                        <View style={[styles.block, {paddingLeft: 10, paddingRight: 10}]}>
                            <DynamicMapIcon
                                typeName_={""}
                                pixelSize_={90}
                            />
                        </View>
                        <View style={[styles.block, {flex: 1}]}>
                            <Text style={globalStyles.header1Text}>{this.state.shipData.registration.name}</Text>
                            <Text style={globalStyles.header2Text}>{this.getFrameName()}</Text>
                        </View>
                    </View>


                    {/*=============== Status ===============*/}
                    <View style={styles.blockRow}>
                        <View style={styles.block}>
                            <Text style={[globalStyles.header3Text, { padding: 6 }]}>Status</Text>
                        </View>

                        <View style={[styles.block, {flex: 1, alignItems: 'center'}]}>
                            {(this.state.shipData.nav.status == "DOCKED") && <Text style={globalStyles.textList}>Docked at <Text
                                style={globalStyles.hyperlinkText}
                                onPress={() => this.props.navigation.navigate("WaypointsMap", { systemName_: this.state.shipData.nav.waypointSymbol})}
                            >
                                {this.state.shipData.nav.waypointSymbol}
                            </Text></Text>}

                            {(this.state.shipData.nav.status == "IN_ORBIT") && <Text style={globalStyles.textList}>Orbiting <Text
                                style={globalStyles.hyperlinkText}
                                onPress={() => this.props.navigation.navigate("WaypointsMap", { systemName_: this.state.shipData.nav.waypointSymbol})}
                            >
                                {this.state.shipData.nav.waypointSymbol}
                            </Text></Text>}

                            {(this.state.shipData.nav.status == "In_TRANSIT") && <Text
                                style={globalStyles.textList}>Destination: <Text
                                    style={globalStyles.hyperlinkText}
                                >
                                    {this.state.shipData.nav.route.destination.symbol}
                                </Text></Text>}

                            {/*(this.state.shipData != null && this.state.shipData.nav.waypointSymbol != this.state.shipData.nav.destination.symbol) && <Text
                                style={globalStyles.textList}>Departure Time: {this.formatDateString(this.state.shipData.nav.destination.departureTime)}
                            </Text>*/}

                            {/*(this.state.shipData != null && this.state.shipData.nav.waypointSymbol != this.state.shipData.nav.destination.symbol) && <Text
                                style={globalStyles.textList}>Arrival Time: {this.formatDateString(this.state.shipData.nav.destination.arrival)}
                            </Text>*/}
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
                                shipName: this.state.shipData.registration.name,
                                shipStatus: this.state.shipData.nav.status,
                                currentWaypoint: this.state.shipData.nav.waypointSymbol
                            })}
                            style={{ flex: 1 }}
                        />

                        <SmallButton
                            text={"Warp"}
                            onPress={() => this.props.navigation.navigate("ShipWarp", {
                                shipName: this.state.shipData.registration.name,
                                currentSystem: this.state.shipData.nav.waypointSymbol.substring(0, 6)
                            })}
                            style={{ flex: 1 }}
                        />

                        <SmallButton
                            text={"Jump"}
                            onPress={() => this.props.navigation.navigate("ShipJump", {
                                shipName: this.state.shipData.registration.name,
                                currentSystem: this.state.shipData.nav.waypointSymbol.substring(0,6)
                            })}
                            style={{flex: 1} }
                        />
                    </View>


                    {/*=============== Frame ===============*/}
                    <View style={[styles.blockRow, { justifyContent: 'space-between' }]}>
                        <View style={[styles.block, { top: 0, left: 0, borderRightWidth: 2 }]}>
                            <TouchableOpacity onPress={() => this.setState(prevState => { return ({ ...prevState, viewFrame: !this.state.viewFrame }) })}>
                                <Text style={[globalStyles.header3Text, { padding: 6 }]}>Frame Details</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.block, { top: 0, right: 0, borderBottomWidth: 0, borderLeftWidth: 0 }]} />
                    </View>
                    {(this.state.viewFrame) && <View style={styles.block}>
                        <Text style={globalStyles.textListLarge}>{this.state.shipData.frame.name}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[globalStyles.textList, { textAlignVertical: 'center' }]}>Condition:</Text>
                            <StatusPercentBar percent={this.state.shipData.frame.condition} />
                        </View>
                        <Text style={globalStyles.defaultText}>{this.state.shipData.frame.description}</Text>
                        <Text style={globalStyles.textListSmall}>Module Slots: {this.state.shipData.frame.moduleSlots}</Text>
                        <Text style={globalStyles.textListSmall}>Mounting Points: {this.state.shipData.frame.mountingPoints}</Text>
                        <Text style={globalStyles.textListSmall}>Max Fuel Capacity: {this.state.shipData.frame.fuelCapacity}</Text>
                        <Text style={globalStyles.textListSmall}>Requirements:  {this.state.shipData.frame.requirements.crew} Crew,  {this.state.shipData.frame.requirements.power} Power</Text>
                    </View>}


                    {/*=============== Reactor ===============*/}
                    <View style={[styles.blockRow, { justifyContent: 'space-between' }]}>
                        <View style={[styles.block, { top: 0, left: 0, borderRightWidth: 2 }]}>
                            <TouchableOpacity onPress={() => this.setState(prevState => { return ({ ...prevState, viewReactor: !this.state.viewReactor }) })}>
                                <Text style={[globalStyles.header3Text, { padding: 6 }]}>Reactor Details</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.block, { top: 0, right: 0, borderBottomWidth: 0, borderLeftWidth: 0 }]} />
                    </View>
                    {(this.state.viewReactor) && <View style={styles.block}>
                        <Text style={globalStyles.textListLarge}>{this.state.shipData.reactor.name}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[globalStyles.textList, { textAlignVertical: 'center' }]}>Condition:</Text>
                            <StatusPercentBar percent={this.state.shipData.reactor.condition} />
                        </View>
                        <Text style={globalStyles.defaultText}>{this.state.shipData.reactor.description}</Text>
                        <Text style={globalStyles.textListSmall}>Power Output: {this.state.shipData.reactor.powerOutput}</Text>
                        <Text style={globalStyles.textListSmall}>Requirements:  {this.state.shipData.reactor.requirements.crew} Crew</Text>
                    </View>}


                    {/*=============== Engine ===============*/}
                    <View style={[styles.blockRow, { justifyContent: 'space-between' }]}>
                        <View style={[styles.block, { top: 0, left: 0, borderRightWidth: 2 }]}>
                            <TouchableOpacity onPress={() => this.setState(prevState => { return ({ ...prevState, viewEngine: !this.state.viewEngine }) })}>
                                <Text style={[globalStyles.header3Text, { padding: 6 }]}>Engine Details</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.block, { top: 0, right: 0, borderBottomWidth: 0, borderLeftWidth: 0}]}/>
                    </View>
                    {(this.state.viewEngine) && <View style={styles.block}>
                        <Text style={globalStyles.textListLarge}>{this.state.shipData.engine.name}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[globalStyles.textList, { textAlignVertical: 'center' }]}>Condition:</Text>
                            <StatusPercentBar percent={this.state.shipData.engine.condition} />
                        </View>
                        <Text style={globalStyles.defaultText}>{this.state.shipData.engine.description}</Text>
                        <Text style={globalStyles.textListSmall}>Speed: {this.state.shipData.engine.speed}</Text>
                        <Text style={globalStyles.textListSmall}>Requirements:  {this.state.shipData.engine.requirements.crew} Crew,  {this.state.shipData.engine.requirements.power} Power</Text>
                    </View>}


                    {/*=============== Crew ===============*/}
                    <View style={[styles.blockRow, { justifyContent: 'space-between' }]}>
                        <View style={[styles.block, { top: 0, left: 0, borderRightWidth: 2 }]}>
                            <TouchableOpacity onPress={() => this.setState(prevState => { return ({ ...prevState, viewCrew: !this.state.viewCrew }) })}>
                                <Text style={[globalStyles.header3Text, { padding: 6 }]}>Crew Details</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.block, { top: 0, right: 0, borderLeftWidth: 2 }]}>
                            <Text style={[globalStyles.header3Text, { padding: 6 }]}>{this.state.shipData.crew.current}/{this.state.shipData.crew.capacity}</Text>
                        </View>
                    </View>
                    {(this.state.viewCrew) && <View style={styles.block}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[globalStyles.textList, { textAlignVertical: 'center' }]}>Morale:</Text>
                            <StatusPercentBar percent={this.state.shipData.crew.morale} />
                        </View>
                        <Text style={globalStyles.textListSmall}>Required Crew Size: {this.state.shipData.crew.required}</Text>
                        <Text style={globalStyles.textListSmall}>Shift Rotation: {this.state.shipData.crew.rotation}</Text>
                        <Text style={globalStyles.textListSmall}>Wages: ${this.state.shipData.crew.wages} per hour per crew member</Text>
                    </View>}


                    {/*=============== Modules ===============*/}
                    <View style={[styles.blockRow, {justifyContent: 'space-between'}]}>
                        <View style={[styles.block, { top: 0, left: 0, borderRightWidth: 2 }]}>
                            <TouchableOpacity onPress={() => this.setState(prevState => { return ({ ...prevState, viewModules: !this.state.viewModules }) })}>
                                <Text style={[globalStyles.header3Text, { padding: 6 }]}>Installed Modules</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.block, {top: 0, right: 0, borderLeftWidth: 2 }]}>
                            <Text style={[globalStyles.header3Text, { padding: 6 }]}>{this.state.shipData.modules.length}/{this.state.shipData.frame.moduleSlots}</Text>
                        </View>
                    </View>
                    {(this.state.viewModules) && <View style={styles.block}>
                        {this.state.shipData.modules.map((itemData, key) => (
                            <ListElementView key={key}>
                                <Text style={globalStyles.textListLarge}>{itemData.name}</Text>
                                {(itemData.range) && <Text style={globalStyles.textListSmall}>Range: {itemData.range}</Text>}
                                <Text style={globalStyles.defaultText}>{itemData.description}</Text>
                                <Text style={globalStyles.textListSmall}>Requirements:  {itemData.requirements.crew} Crew,  {itemData.requirements.power} Power,  {itemData.requirements.slots} Slots</Text>
                            </ListElementView>
                        ))}
                    </View>}


                    {/*=============== Mounts ===============*/}
                    <View style={[styles.blockRow, { justifyContent: 'space-between' }]}>
                        <View style={[styles.block, { top: 0, left: 0, borderRightWidth: 2 }]}>
                            <TouchableOpacity onPress={() => this.setState(prevState => { return ({ ...prevState, viewMounts: !this.state.viewMounts }) })}>
                                <Text style={[globalStyles.header3Text, { padding: 6 }]}>Installed Mounts</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.block, { top: 0, right: 0, borderLeftWidth: 2 }]}>
                            <Text style={[globalStyles.header3Text, { padding: 6 }]}>{this.state.shipData.mounts.length}/{this.state.shipData.frame.mountingPoints}</Text>
                        </View>
                    </View>
                    {(this.state.viewMounts) && <View style={styles.block}>
                        {this.state.shipData.mounts.map((itemData, key) => (
                            <ListElementView key={key}>
                                <Text style={globalStyles.textListLarge}>{itemData.name}</Text>
                                <Text style={globalStyles.textListSmall}>Strength: {itemData.strength}</Text>
                                <Text style={globalStyles.defaultText}>{itemData.description}</Text>
                                <Text style={globalStyles.textListSmall}>Requirements:  {itemData.requirements.crew} Crew + {itemData.requirements.power} Power</Text>
                            </ListElementView>
                        ))}
                    </View>}


                    {/*=============== Cargo ===============*/}
                    <View style={[styles.blockRow, { justifyContent: 'space-between' }]}>
                        <View style={[styles.block, { top: 0, left: 0, borderRightWidth: 2 }]}>
                            <TouchableOpacity onPress={() => this.setState(prevState => { return ({ ...prevState, viewCargo: !this.state.viewCargo }) })}>
                                <Text style={[globalStyles.header3Text, { padding: 6 }]}>Cargo</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.block, { top: 0, right: 0, borderLeftWidth: 2 }]}>
                            <Text style={[globalStyles.header3Text, { padding: 6 }]}>{this.state.shipData.cargo.units}/{this.state.shipData.cargo.capacity}</Text>
                        </View>
                    </View>
                    {(this.state.viewCargo) && <View style={styles.block}>
                        {this.state.shipData.cargo.inventory.map((itemData, key) => (
                            <ListElementView key={key}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={globalStyles.textList}>{itemData.name}</Text>
                                    <Text style={globalStyles.textList}>x{itemData.units}</Text>
                                </View>
                                <Text style={globalStyles.textListSmall}>{itemData.description}</Text>
                            </ListElementView>
                        ))}
                    </View>}
                </ScrollView>}

                {(this.state.shipData == null) && <LoadingDisplay />}

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
    },

    loadingText: {
        flex: 1,

    },
})