import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

//Styles
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';

//API Calls
import AgentAPICalls from '../../api-calls/agent-api-calls';


/**
 * Component displayed on the HomeScreen to handle showing the basic overview of the player's account.
 * Props:
 *  navigation: React.Navigation prop used for changing screens.
 *  onLogin: Function passed from HomeScreen to reload the page once we successfully login.
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
            <View style={styles.wrapper}>
                <Text>AccountID: {this.state.accountID}</Text>
                <Text>Symbol: {this.state.symbol}</Text>
                <Text>Headquarters: {this.state.headquarters}</Text>
                <Text>Starting Faction: {this.state.startingFaction}</Text>
                <Text>Credits: ${this.state.credits}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        borderBottomWidth: 1,
        borderBottomColor: '#000'
    },
});