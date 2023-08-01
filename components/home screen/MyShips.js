import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Flatlist } from 'react-native';

//Styles
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';

//API Calls
import ShipAPICalls from '../../api-calls/ship-api-calls';


/**
 * Component displayed on the HomeScreen to handle showing a list of ships owned by this player.
 * Props:
 *  navigation: React.Navigation prop used for changing screens.
 */
export default class MyShips extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myShips: []
        }
    }


    /**
     * Function called when this component loads. Calls the getMyShipList API call to get the overview of all of the player's ships.
     */
    componentDidMount() {
        let data = ShipAPICalls.getMyShipList()
            .then(data => {
                this.setState(prevState => {
                    return ({
                        ...prevState,
                        myShips: data.data
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
            <View style={styles.wrapper}>
                <Text style={styles.headerText}>Ship Details</Text>

                {(this.state.myShips.length > 0) && <View style={styles.shipView}>
                    <Text style={styles.shipName}>{this.state.myShips[0].symbol}</Text>
                    <Text style={styles.detailsText}>{">>> "}Role: {this.state.myShips[0].registration.role}</Text>
                    <Text style={styles.detailsText}>{">>> "}Status: {this.state.myShips[0].nav.status}</Text>
                    <Text style={styles.detailsText}>{">>> "}Fuel: {this.state.myShips[0].fuel.current}/{this.state.myShips[0].fuel.capacity}</Text>
                    <Text style={styles.detailsText}>{">>> "}System: {this.state.myShips[0].nav.systemSymbol}</Text>
                    <Text style={styles.detailsText}>{">>> "}Waypoint: {this.state.myShips[0].nav.waypointSymbol}</Text>
                </View>}

                {(this.state.myShips.length > 1) && <View style={styles.shipView}>
                    <Text style={styles.shipName}>{this.state.myShips[1].symbol}</Text>
                    <Text style={styles.detailsText}>{">>> "}Role: {this.state.myShips[1].registration.role}</Text>
                    <Text style={styles.detailsText}>{">>> "}Status: {this.state.myShips[1].nav.status}</Text>
                    <Text style={styles.detailsText}>{">>> "}Fuel: {this.state.myShips[1].fuel.current}/{this.state.myShips[1].fuel.capacity}</Text>
                    <Text style={styles.detailsText}>{">>> "}System: {this.state.myShips[1].nav.systemSymbol}</Text>
                    <Text style={styles.detailsText}>{">>> "}Waypoint: {this.state.myShips[1].nav.waypointSymbol}</Text>
                </View>}

                {(this.state.myShips.length > 2) && <View style={styles.shipView}>
                    <Text style={styles.shipName}>{this.state.myShips[2].symbol}</Text>
                    <Text style={styles.detailsText}>{">>> "}Role: {this.state.myShips[2].registration.role}</Text>
                    <Text style={styles.detailsText}>{">>> "}Status: {this.state.myShips[2].nav.status}</Text>
                    <Text style={styles.detailsText}>{">>> "}Fuel: {this.state.myShips[2].fuel.current}/{this.state.myShips[2].fuel.capacity}</Text>
                    <Text style={styles.detailsText}>{">>> "}System: {this.state.myShips[2].nav.systemSymbol}</Text>
                    <Text style={styles.detailsText}>{">>> "}Waypoint: {this.state.myShips[2].nav.waypointSymbol}</Text>
                </View>}

                {(this.state.myShips.length > 3) && <Text>+{this.state.myShips.length-3} More</Text>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        padding: 5
    },

    headerText: {
        fontFamily: Fonts.monospace,
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 5,
    },

    shipView: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 3,
        paddingBottom: 3,
        borderTopWidth: 1,
        borderTopColor: '#bbb'
    },

    shipName: {
        fontFamily: Fonts.monospace,
        fontSize: 14,
        paddingLeft: 10
    },

    detailsText: {
        fontFamily: Fonts.monospace,
        fontSize: 12,
        paddingLeft: 20
    }
});