import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

//Styles
import globalStyles from '../../styles/global-stylesheet';

//API Calls
import AgentAPICalls from '../../api-calls/agent-api-calls';
import NavigationAPICalls from '../../api-calls/navigation-api-calls';


/**
 * Component displayed on the HomeScreen to handle showing the basic overview of the player's account.
 * Props:
 *  navigation: React.Navigation prop used for changing screens.
 */
export default class MyAgentDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accountID: "",
            symbol: "",
            headquarters: "",
            credits: 0,
            startingFaction: ""
        }
    }


    /**
     * Function called when this component loads. Calls the myAgentDetails API call to get the overview of the player's state.
     */
    componentDidMount() {
        let data = AgentAPICalls.getAgent()
            .then(data => {
                this.setState(prevState => {
                    return ({
                        ...prevState,
                        accountID: data.data.accountId,
                        symbol: data.data.symbol,
                        headquarters: data.data.headquarters,
                        credits: data.data.credits,
                        startingFaction: data.data.startingFaction
                    })
                })
            })
            .then((data) => {
                let starmap = require('../../save data/local-starmap.json');

                //If there are no systems saved in our local starmap, we need to save our agent's headquarters system
                if (Object.keys(starmap).length == 0) {
                    NavigationAPICalls.getSystem(this.state.headquarters.substring(0, 6))
                        .then(sData => {
                            NavigationAPICalls.listWaypointsInSystem(this.state.headquarters.substring(0, 6))
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
                                    starmap[this.state.headquarters.substring(0, 6)] = {
                                        symbol: sData.data.symbol,
                                        type: sData.data.type,
                                        x: sData.data.x,
                                        y: sData.data.y,
                                        factions: sData.data.factions,
                                        waypoints: wData.data
                                    };
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
            <View style={globalStyles.listViewWrapper1}>
                <Text style={globalStyles.header2Text}>Agent Details</Text>
                <Text style={[globalStyles.defaultText, { paddingLeft: 20 }]}>Symbol: {this.state.symbol}</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("WaypointsMap", {systemName_:this.state.headquarters})}
                >
                    <Text style={[globalStyles.defaultText, { paddingLeft: 20 }]}>
                        Headquarters: <Text style={globalStyles.hyperlinkText}>{this.state.headquarters}</Text>
                    </Text>
                </TouchableOpacity>
                <Text style={[globalStyles.defaultText, { paddingLeft: 20 }]}>Faction: {this.state.startingFaction}</Text>
                <Text style={[globalStyles.defaultText, { paddingLeft: 20 }]}>Credits: ${this.state.credits}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
});