import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Flatlist } from 'react-native';

//Styles
import globalStyles from '../../styles/global-stylesheet';

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
            <View style={ globalStyles.listViewWrapper1 }>
                <Text style={globalStyles.header2Text}>Ship Details</Text>

                {(this.state.myShips.length > 0) && <View style={globalStyles.listViewWrapper2}>
                    <Text style={[globalStyles.defaultText, {paddingLeft: 10}]}>{this.state.myShips[0].symbol}</Text>
                    <Text style={[globalStyles.smallText, {paddingLeft: 20}]}>{">>> "}Role: {this.state.myShips[0].registration.role}</Text>
                    <Text style={[globalStyles.smallText, {paddingLeft: 20}]}>{">>> "}Status: {this.state.myShips[0].nav.status}</Text>
                    <Text style={[globalStyles.smallText, {paddingLeft: 20}]}>{">>> "}Fuel: {this.state.myShips[0].fuel.current}/{this.state.myShips[0].fuel.capacity}</Text>
                    <Text style={[globalStyles.smallText, {paddingLeft: 20}]}>{">>> "}System: {this.state.myShips[0].nav.systemSymbol}</Text>
                    <Text style={[globalStyles.smallText, {paddingLeft: 20}]}>{">>> "}Waypoint: {this.state.myShips[0].nav.waypointSymbol}</Text>
                </View>}

                {(this.state.myShips.length > 1) && <View style={globalStyles.listViewWrapper2}>
                    <Text style={[globalStyles.defaultText, {paddingLeft: 10}]}>{this.state.myShips[1].symbol}</Text>
                    <Text style={[globalStyles.smallText, {paddingLeft: 20}]}>{">>> "}Role: {this.state.myShips[1].registration.role}</Text>
                    <Text style={[globalStyles.smallText, {paddingLeft: 20}]}>{">>> "}Status: {this.state.myShips[1].nav.status}</Text>
                    <Text style={[globalStyles.smallText, {paddingLeft: 20}]}>{">>> "}Fuel: {this.state.myShips[1].fuel.current}/{this.state.myShips[1].fuel.capacity}</Text>
                    <Text style={[globalStyles.smallText, {paddingLeft: 20}]}>{">>> "}System: {this.state.myShips[1].nav.systemSymbol}</Text>
                    <Text style={[globalStyles.smallText, { paddingLeft: 20 }]}>{">>> "}Waypoint: {this.state.myShips[1].nav.waypointSymbol}</Text>
                </View>}

                {(this.state.myShips.length > 2) && <View style={globalStyles.listViewWrapper2}>
                    <Text style={[globalStyles.defaultText, {paddingLeft: 10}]}>{this.state.myShips[2].symbol}</Text>
                    <Text style={[globalStyles.smallText, {paddingLeft: 20}]}>{">>> "}Role: {this.state.myShips[2].registration.role}</Text>
                    <Text style={[globalStyles.smallText, {paddingLeft: 20}]}>{">>> "}Status: {this.state.myShips[2].nav.status}</Text>
                    <Text style={[globalStyles.smallText, {paddingLeft: 20}]}>{">>> "}Fuel: {this.state.myShips[2].fuel.current}/{this.state.myShips[2].fuel.capacity}</Text>
                    <Text style={[globalStyles.smallText, {paddingLeft: 20}]}>{">>> "}System: {this.state.myShips[2].nav.systemSymbol}</Text>
                    <Text style={[globalStyles.smallText, {paddingLeft: 20}]}>{">>> "}Waypoint: {this.state.myShips[2].nav.waypointSymbol}</Text>
                </View>}

                {(this.state.myShips.length > 3) && <Text style={[globalStyles.defaultText, {paddingLeft: 10}]}>+{this.state.myShips.length-3} More</Text>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
});