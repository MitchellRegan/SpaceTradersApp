import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

//Styles
import globalStyles from '../styles/global-stylesheet';

//API Calls
import ShipAPICalls from '../api-calls/ship-api-calls';

//Components
import HeaderBar from '../components/HeaderBar';
import ShipDetailsButton from '../components/ships screen/ShipDetailsButton';


export default class ShipsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ships: []
        }
    }


    /**
     * Function called when this screen loads. Calls the getMyShipList API to get the list of all ships owned by this player
     */
    componentDidMount() {
        let data = ShipAPICalls.listShips()
            .then(data => {
                var ships_ = data.data;

                this.setState(prevState => {
                    return ({
                        ...prevState,
                        ships: ships_
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
     * Method passed to child ShipDetailsButton to allow them to force this screen to reload when a ship's state changes.
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
            <View style={globalStyles.screenWrapperView}>
                <HeaderBar
                    title={"Ship List"}
                    navigation={this.props.navigation}
                    showBackButton={true}
                />

                <ScrollView style={styles.scrollView}>
                    {(this.state.ships.length > 0) &&
                        this.state.ships.map((item, key) => (
                            <ShipDetailsButton
                                key={key}
                                navigation={this.props.navigation}
                                shipData={item}
                                reloadScreen={this.forceReload.bind(this)}
                            />
                        ))
                    }
                    {(this.state.ships.length == 0) && <View style={styles.emptyListView}>
                        <Text style={globalStyles.defaultText}>--- EMPTY ---</Text>
                    </View>}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
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