import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

//Styles
import Fonts from '../styles/Fonts';
import Colors from '../styles/Colors';
import globalStyles from '../styles/global-stylesheet';

//Components
import HeaderBar from '../components/shared/HeaderBar';
import NavBar from '../components/shared/NavBar';
import DynamicMapIcon from '../components/map screen/DynamicMapIcon';
import SystemCoreDetailsButton from '../components/map screen/SystemCoreDetailsButton';
import WaypointDetailsButton from '../components/map screen/WaypointDetailsButton';
import GradientScreenBackground from '../components/shared/GradientScreenBackground';

//API Calls
import NavigationAPICalls from '../api-calls/navigation-api-calls';


/**
 * Screen to display a graphical view of all waypoints in a given system, as well as a list of details.
 * Props (accessed through this.props.route.params):
 *  systemName_: The name of the system to display info about.
 */
export default class WaypointsMapScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            systemData: {
                symbol: "Loading...",
                type: "",
                x: 0,
                y: 0,
                waypoints: [],
                factions: []
            }
        }
    }


    /**
     * Function called when this component loads. Calls the listWaypointsInSystem API call to get all waypoints in this system.
     */
    componentDidMount() {
        let splitString = this.props.route.params.systemName_.split("-");
        let sysName = splitString[0] + "-" + splitString[1];

        let starmap = require('../save data/local-starmap.json');

        //If we've already saved this system's data locally, we just load that instead of doing an API call
        if (starmap[sysName]) {
            this.setState(prevState => {
                return ({
                    ...prevState,
                    systemData: {
                        symbol: starmap[sysName].symbol,
                        type: starmap[sysName].type,
                        x: starmap[sysName].x,
                        y: starmap[sysName].y,
                        factions: starmap[sysName].factions,
                        waypoints: starmap[sysName].waypoints
                    }
                })
            })
        }
        //Otherwise, we send an API call to get the system data and then save it locally
        else {
            let data = NavigationAPICalls.getSystem(sysName)
                .then(sData => {
                    let data2 = NavigationAPICalls.listWaypointsInSystem(sysName)
                        .then(wData => {
                            let deleteIndexes = [];
                            //Iterating through each waypoint to look for orbital objects
                            for (var i = 0; i < wData.data.length; i++) {
                                //For each orbital, we need to find its associated index in the overall array
                                for (var o = 0; o < wData.data[i].orbitals.length; o++) {
                                    for (var d = 0; d < wData.data.length; d++) {
                                        if (wData.data[d].symbol == wData.data[i].orbitals[o].symbol) {
                                            deleteIndexes.push(d);
                                            wData.data[i].orbitals[o] = wData.data[d];
                                            break;
                                        }
                                    }
                                }
                            }
                            //Deleting the duplicate orbital objects
                            for (var di = deleteIndexes.length - 1; di > -1; di--) {
                                wData.data.splice(deleteIndexes[di], 1);
                            }

                            //Saving this system to the local starmap file
                            starmap[sysName] = {
                                symbol: sData.data.symbol,
                                type: sData.data.type,
                                x: sData.data.x,
                                y: sData.data.y,
                                factions: sData.data.factions,
                                waypoints: wData.data
                            };


                            this.setState(prevState => {
                                return ({
                                    ...prevState,
                                    systemData: {
                                        symbol: sData.data.symbol,
                                        type: sData.data.type,
                                        x: sData.data.x,
                                        y: sData.data.y,
                                        factions: sData.data.factions,
                                        waypoints: wData.data
                                    }
                                })
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
    }


    /**
     * Method called in the render function to make a vertical layout of each waypoint and nearby orbital.
     * @param {object} waypoint_ JSON object for the waypoint to render.
     * @returns Screen items for each waypoint and orbital that will be rendered.
     */
    renderWaypoint = function (waypoint_) {
        //If this waypoint has no orbitals, we just render the waypoint by itself
        if (waypoint_.orbitals.length == 0 && waypoint_.type != "ASTEROID_FIELD") {
            return (<DynamicMapIcon typeName_={waypoint_.type} />);
        }
        //If the waypoint is an asteroid field, we render multiple icons for the field
        else if (waypoint_.type == "ASTEROID_FIELD") {
            let wplist = [];
            for (var i = 0; i < 8; i++) {
                wplist.push({ "type": "ASTEROID_FIELD" });
            }

            return (
                wplist.map((item, key) => (
                    <DynamicMapIcon key={key} typeName_={item.type} style={{ transform: [{rotate: (key*53).toString()+'deg'}]}} />
                ))
            );
        }
        //If it has orbitals, we render the waypoint in the center with all of the orbitals lined-up above and below it
        else {
            let wplist = [];
            for (var i = 0; i < waypoint_.orbitals.length; i++) {
                wplist.push(waypoint_.orbitals[i]);
            }

            //If there are an odd-number of orbitals, we add an empty icon for visual padding
            if (waypoint_.orbitals.length % 2 == 1) {
                //If the first number in the waypoint's name is 0-4, we put the padding at the top
                if (Number(waypoint_.symbol[0]) < 5) {
                    wplist.splice(0, 0, { "type": "None" });
                }
                //If the number is 5-9, we put the padding at the bottom
                else {
                    wplist.push({ "type": "None" });
                }
            }

            //Adding the waypoint object to the center of the array
            wplist.splice(wplist.length / 2, 0, waypoint_);

            return (
                wplist.map((item, key) => (
                    <DynamicMapIcon key={key} typeName_={item.type} />
                ))
            );
        }
    }


    render() {
        return (
            <GradientScreenBackground>
                <HeaderBar
                    title={"Waypoint Map"}
                    navigation={this.props.navigation}
                    showBackButton={true}
                />

                <View style={styles.mapBox}>
                    <View style={styles.horizontalMapView}>
                        <TouchableOpacity onPress={() => console.log(this.state.systemData.symbol + " " + this.state.systemData.type)}>
                            <DynamicMapIcon typeName_={this.state.systemData.type} />
                        </TouchableOpacity>

                        {this.state.systemData.waypoints.map((item, key) => (
                            <View key={key} style={styles.verticalView }>
                                {/*<DynamicMapIcon typeName_={item.type} />*/}
                                {/*item.orbitals.map((orbitItem, oKey) => (
                                    <DynamicMapIcon key={oKey} typeName_={orbitItem.type} />
                                ))*/}
                                {this.renderWaypoint(item)}
                            </View>
                        ))}
                    </View>

                    <View style={styles.systemNameBox}>
                        <Text style={styles.systemNameText}>{this.state.systemData.symbol}</Text>
                    </View>
                </View>

                <ScrollView style={styles.scrollView}>
                    {(this.state.systemData.symbol != "Loading...") && <SystemCoreDetailsButton systemObj_={{
                        symbol: this.state.systemData.symbol,
                        type: this.state.systemData.type,
                        x: this.state.systemData.x,
                        y: this.state.systemData.y,
                        factions: this.state.systemData.factions
                    }}
                    />}
                    {this.state.systemData.waypoints.map((item, key) => (
                        <View key={key}>
                            <WaypointDetailsButton waypointObj={item} />
                            {item.orbitals.map((orbitItem, oKey) => (
                                <WaypointDetailsButton
                                    key={oKey}
                                    waypointObj={orbitItem}
                                    isOrbital={true}
                                />
                            ))}
                        </View>
                    ))}
                    <View style={{height: 30} }/>
                </ScrollView>

                <NavBar navigation={this.props.navigation} />
            </GradientScreenBackground>
        );
    }
}

const styles = StyleSheet.create({
    mapBox: {
        width: '100%',
        height: '30%',
        backgroundColor: '#000',
        borderBottomColor: Colors.primaryColor,
        borderBottomWidth: 4,
    },

    systemNameBox: {
        alignItems: "center",
        position: 'absolute',
        left: 0,
        top: 0,
    },

    systemNameText: {
        color: Colors.primaryColor,
        fontFamily: Fonts.tektur,
        fontSize: 25,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2,
        paddingBottom: 2,
    },

    horizontalMapView: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        verticalAlign: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },

    scrollView: {
        backgroundColor: Colors.secondaryColor,
        paddingTop: 10,
    },

    verticalView: {
        justifyContent: 'space-around',
        alignItems: 'center',
        verticalAlign: 'center',
        height: '85%',
    },
});