import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

//Styles
import Colors from '../styles/Colors';
import globalStyles from '../styles/global-stylesheet';

//Components
import HeaderBar from '../components/shared/HeaderBar';
import NavBar from '../components/shared/NavBar';
import DynamicMapIcon from '../components/map screen/DynamicMapIcon';
import SmallButton from '../components/shared/SmallButton';
import LoadingDisplay from '../components/shared/LoadingDisplay';
import GradientScreenBackground from '../components/shared/GradientScreenBackground';
import MenuSelector from '../components/ships screen/MenuSelector';

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
            <GradientScreenBackground>
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
                                currentFuel: this.state.shipData.fuel.current,
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


                    <MenuSelector
                        frameData={this.state.shipData.frame}
                        reactorData={this.state.shipData.reactor}
                        engineData={this.state.shipData.engine}
                        crewData={this.state.shipData.crew}
                        moduleData={this.state.shipData.modules}
                        mountData={this.state.shipData.mounts}
                        cargoData={this.state.shipData.cargo}
                    />
                </ScrollView>}

                {(this.state.shipData == null) && <LoadingDisplay />}

                <NavBar navigation={this.props.navigation} />
            </GradientScreenBackground>
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