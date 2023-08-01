import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

//Styles
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';
import globalStyles from '../../styles/global-stylesheet';

//API Calls
import ContractAPICalls from '../../api-calls/contract-api-calls';


/**
 * Component displayed on the ContractScreen to handle showing details about what contracts are available.
 * Props:
 *  navigation: React.Navigation prop used for changing screens.
 *  contractData: JSON object passed from ContractsScreen with details to be displayed in this button.
 *  reloadScreen: Function passed from ContractsScreen to force a reload when a contract's state changes.
 */
export default class ContractDetailsButton extends Component {
    constructor(props) {
        super(props);
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


    /**
     * Method called from the TouchableOpacity that's only shown for 'available' contracts. Sends the API call to accept the contract.
     */
    acceptContract = function () {
        ContractAPICalls.acceptContract(this.props.contractData.id)
            //If there isn't an error, we force the ContractsScreen to reload to correctly switch this contract to the "In-progress" category.
            .then(() => this.props.reloadScreen(true))
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
                <Text style={globalStyles.textList}>{this.props.contractData.type} for {this.props.contractData.factionSymbol}</Text>
                {(!this.props.contractData.accepted) &&
                    <Text style={[globalStyles.textListSmall, { color: '#f00' }]}>Expires: {this.formatDateString(this.props.contractData.deadlineToAccept)}
                    </Text>}
                <Text style={globalStyles.textListSmall}>Deadline: {this.formatDateString(this.props.contractData.terms.deadline)}</Text>

                <Text style={globalStyles.textList}>Payment Details</Text>
                <Text style={globalStyles.textListSmall}>${this.props.contractData.terms.payment.onAccepted} Upfront</Text>
                <Text style={globalStyles.textListSmall}>${this.props.contractData.terms.payment.onFulfilled} On Completion</Text>

                <Text style={globalStyles.textList}>Task Details</Text>
                {this.props.contractData.terms.deliver.map((itemData, key) => (
                    <View key={key} style={styles.taskView}>
                        {(this.props.contractData.terms.deliver.length > 0) && <Text>Task #{key + 1}</Text>}
                        <Text style={globalStyles.textListSmall}>{itemData.tradeSymbol} delivered: {itemData.unitsFulfilled}/{itemData.unitsRequired}</Text>
                        <Text style={globalStyles.textListSmall}>Destination: {itemData.destinationSymbol}</Text>
                    </View>
                ))}

                {(!this.props.contractData.accepted) && <TouchableOpacity
                    style={globalStyles.acceptButton}
                    onPress={() => this.acceptContract()}
                >
                    <Text style={globalStyles.acceptButtonText}>ACCEPT</Text>
                </TouchableOpacity>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    taskView: {
        marginLeft: 25,
        paddingLeft: 5,
        borderLeftWidth: 1,
        borderLeftColor: Colors.primaryColor,
    },

    taskText: {
        fontFamily: Fonts.monospace,
        fontSize: 11,
        fontWeight: 'bold',
        paddingLeft: 20,
    }
})