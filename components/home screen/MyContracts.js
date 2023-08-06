import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

//Styles
import globalStyles from '../../styles/global-stylesheet';

//API Calls
import ContractAPICalls from '../../api-calls/contract-api-calls';


/**
 * Component displayed on the HomeScreen to handle showing details about what contracts are available.
 * Props:
 *  navigation: React.Navigation prop used for changing screens.
 */
export default class MyContracts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            completed: 0,
            available: 0,
            incomplete: 0
        }
    }


    /**
     * Function called when this component loads. Calls the getContractList API to get an overview of available contracts.
     */
    componentDidMount() {
        let data = ContractAPICalls.listContracts()
            .then(data => {
                var completed_ = 0;
                var available_ = 0;
                var incomplete_ = 0;

                //Iterating through the list of contracts to count the ones in each category
                for (var i = 0; i < data.data.length; i++) {
                    //If it isn't accepted yet it's "available"
                    if (!data.data[i].accepted) {
                        available_ += 1;
                    }
                    //If it has been accepted but not fulfilled, it's "incomplete"
                    else if (!data.data[i].fulfilled) {
                        incomplete_ += 1;
                    }
                    //If it has been accepted and fulfilled, it's "completed"
                    else {
                        completed_ += 1;
                    }
                }

                this.setState(prevState => {
                    return ({
                        ...prevState,
                        completed: completed_,
                        available: available_,
                        incomplete: incomplete_
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
                <Text style={globalStyles.header2Text}>Contract List</Text>
                <Text style={globalStyles.textList}>In Progress: {this.state.incomplete}</Text>
                <Text style={globalStyles.textList}>Pending: {this.state.available}</Text>
                <Text style={globalStyles.textList}>Completed: {this.state.completed}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
});