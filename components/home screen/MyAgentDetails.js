import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

//Styles
import globalStyles from '../../styles/global-stylesheet';

//API Calls
import AgentAPICalls from '../../api-calls/agent-api-calls';


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
        let data = AgentAPICalls.myAgentDetails()
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
                <Text style={[globalStyles.defaultText, { paddingLeft: 20 }]}>Headquarters: {this.state.headquarters}</Text>
                <Text style={[globalStyles.defaultText, { paddingLeft: 20 }]}>Faction: {this.state.startingFaction}</Text>
                <Text style={[globalStyles.defaultText, { paddingLeft: 20 }]}>Credits: ${this.state.credits}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
});