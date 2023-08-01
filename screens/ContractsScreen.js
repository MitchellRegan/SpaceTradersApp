import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, Text, TouchableOpacity } from 'react-native';

//Styles
import globalStyles from '../styles/global-stylesheet';

//API Calls
import ContractAPICalls from '../api-calls/contract-api-calls';

//Components
import HeaderBar from '../components/HeaderBar';
import ContractDetailsButton from '../components/contracts screen/ContractDetailsButton';


export default class ContractsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            incompleteContracts: [],
            availableContracts: [],
            completedContracts: [],
            showIncomplete: true,
            showAvailable: true,
            showCompleted: true
        }
    }


    /**
     * Function called when this screen loads. Calls the getContractList API to get the list of all contracts
     */
    componentDidMount() {
        let data = ContractAPICalls.getContractList()
            .then(data => {
                var completed_ = [];
                var available_ = [];
                var incomplete_ = [];

                //Iterating through the list of contracts to count the ones in each category
                for (var i = 0; i < data.data.length; i++) {
                    //If it isn't accepted yet it's "available"
                    if (!data.data[i].accepted) {
                        available_.push(data.data[i]);
                    }
                    //If it has been accepted but not fulfilled, it's "incomplete"
                    else if (!data.data[i].fulfilled) {
                        incomplete_.push(data.data[i]);
                    }
                    //If it has been accepted and fulfilled, it's "completed"
                    else {
                        completed_.push(data.data[i]);
                    }
                }

                this.setState(prevState => {
                    return ({
                        ...prevState,
                        completedContracts: completed_,
                        availableContracts: available_,
                        incompleteContracts: incomplete_
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
     * Method passed to child ContractDetailsButtons to allow them to force this screen to reload when a contract's state changes.
     * @param {bool} true_ Bool param that's only here because the method requires it in order to reload.
     */
    forceReload = function (true_) {
        this.setState(prevState => {
            return ({
                ...prevState
            })
        })
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <HeaderBar
                    title={"Contract List"}
                    navigation={this.props.navigation}
                    showBackButton={true}
                    showMenuButton={true}
                />


                <TouchableOpacity
                    style={styles.viewToggleButton}
                    onPress={() => {
                        this.setState(prevState => {
                            return ({
                                ...prevState,
                                showIncomplete: !this.state.showIncomplete
                            })
                        })
                    }}
                >
                    <Text style={globalStyles.header1Text}>In Progress</Text>
                    {(this.state.showIncomplete) && <Text style={globalStyles.header1Text}>-</Text>}
                    {(!this.state.showIncomplete) && <Text style={globalStyles.header1Text}>+</Text>}
                </TouchableOpacity>
                {(this.state.showIncomplete && this.state.incompleteContracts.length > 0) &&
                    this.state.incompleteContracts.map((item, key) => (
                        <ContractDetailsButton
                            key={key}
                            navigation={this.props.navigation}
                            contractData={item}
                            reloadScreen={this.forceReload.bind(this)}
                        />
                    ))
                }
                {(this.state.showIncomplete && this.state.incompleteContracts.length == 0) && <View style={styles.emptyListView}>
                    <Text style={globalStyles.defaultText}>--- EMPTY ---</Text>
                </View>}


                <TouchableOpacity
                    style={styles.viewToggleButton}
                    onPress={() => {
                        this.setState(prevState => {
                            return ({
                                ...prevState,
                                showAvailable: !this.state.showAvailable
                            })
                        })
                    }}
                >
                    <Text style={globalStyles.header1Text}>Pending</Text>
                    {(this.state.showAvailable) && <Text style={globalStyles.header1Text}>-</Text>}
                    {(!this.state.showAvailable) && <Text style={globalStyles.header1Text}>+</Text>}
                </TouchableOpacity>
                {(this.state.showAvailable && this.state.availableContracts.length > 0) && 
                    this.state.availableContracts.map((item, key) => (
                        <ContractDetailsButton
                            key={key}
                            navigation={this.props.navigation}
                            contractData={item}
                            reloadScreen={this.forceReload.bind(this)}
                        />
                    ))
                }
                {(this.state.showAvailable && this.state.availableContracts.length == 0) && <View style={styles.emptyListView}>
                    <Text style={globalStyles.defaultText}>--- EMPTY ---</Text>
                </View>}


                <TouchableOpacity
                    style={styles.viewToggleButton}
                    onPress={() => {
                        this.setState(prevState => {
                            return ({
                                ...prevState,
                                showCompleted: !this.state.showCompleted
                            })
                        })
                    }}
                >
                    <Text style={globalStyles.header1Text}>Completed</Text>
                    {(this.state.showCompleted) && <Text style={globalStyles.header1Text}>-</Text>}
                    {(!this.state.showCompleted) && <Text style={globalStyles.header1Text}>+</Text>}
                </TouchableOpacity>
                {(this.state.showAvailable && this.state.completedContracts.length > 0) &&
                    this.state.completedContracts.map((item, key) => (
                        <ContractDetailsButton
                            key={key}
                            navigation={this.props.navigation}
                            contractData={item}
                            reloadScreen={this.forceReload.bind(this)}
                        />
                    ))
                }
                {(this.state.showCompleted && this.state.completedContracts.length == 0) && <View style={styles.emptyListView}>
                    <Text style={globalStyles.defaultText}>--- EMPTY ---</Text>
                </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },

    viewToggleButton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
    },

    emptyListView: {
        marginBottom: 5,
        alignItems: 'center',
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
    }
})