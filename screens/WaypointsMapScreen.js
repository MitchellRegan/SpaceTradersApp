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
                            wData.data.splice(deleteIndexes[di],1);
                        }

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


    render() {
        return (
            <View style={globalStyles.screenWrapperView}>
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
                                <DynamicMapIcon typeName_={item.type} />
                                {item.orbitals.map((orbitItem, oKey) => (
                                    <DynamicMapIcon key={oKey} typeName_={orbitItem.type} />
                                ))}
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
            </View>
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
        alignContent: 'center',
        verticalAlign: 'center',
        height: '50%',
    },
});