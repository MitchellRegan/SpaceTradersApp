import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

//Styles
import globalStyles from '../styles/global-stylesheet';

//API Calls
import ShipAPICalls from '../api-calls/ship-api-calls';

//Components
import HeaderBar from '../components/shared/HeaderBar';
import NavBar from '../components/shared/NavBar';
import ShipDetailsButton from '../components/ships screen/ShipDetailsButton';
import GradientScreenBackground from '../components/shared/GradientScreenBackground';


export default class ShipsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ships: [],
            curPage: 1,
            pageCount: 1,
        }
    }


    /**
     * Function called when this screen loads. Calls the getMyShipList API to get the list of all ships owned by this player
     */
    componentDidMount() {
        let localShipData = require("../save data/local-ship-data.json");

        //If there are no ships saved locally, we do an API call to get the player's ship list
        if (Object.keys(localShipData).length == 0) {
            let data = ShipAPICalls.listShips()
                .then(data => {
                    let ships_ = [];
                    for (var i = 0; i < data.data.length; i++) {
                        ships_.push({
                            symbol: data.data[i].symbol,
                            role: data.data[i].registration.role,
                            frame: data.data[i].frame.name,
                            status: data.data[i].nav.status,
                            waypointSymbol: data.data[i].nav.waypointSymbol,
                            destination: data.data[i].nav.route.destination.symbol,
                        });
                    }

                    //Saving the list of ship names under the name of the logged-in user
                    localShipData[ships_[0].symbol.split('-')[0]] = ships_;

                    this.setState(prevState => {
                        return ({
                            ...prevState,
                            ships: ships_,
                            curPage: data.meta.page,
                            pageCount: Math.ceil(data.meta.total / data.meta.limit)
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
        //If there are ships saved locally, we get the ship data for the logged-in user
        else {
            const userData = require("../save data/user-preferences.json");
            //Only getting the first 20 ship results
            let ships_ = [];
            for (var i = 0; i < localShipData[userData.username].length; i++) {
                ships_.push(localShipData[userData.username][i]);

                if (i > 19) {
                    break;
                }
            }

            this.setState(prevState => {
                return ({
                    ...prevState,
                    ships: ships_,
                    curPage: 1,
                    pageCount: Math.ceil(Object.keys(localShipData).length / 20)
                })
            })
        }
    }


    /**
     * Method called from buttons on the page if there are more than 1 page (20) of ships in the player's fleet.
     * @param {number} newPageNum_ Number of the page of results to fetch in the API
     */
    changePage = function (newPageNum_) {
        let data = ShipAPICalls.listShips(pageNum_=newPageNum_)
            .then(data => {
                this.setState(prevState => {
                    return ({
                        ...prevState,
                        ships: data.data,
                        curPage: data.meta.page,
                        pageCount: Math.ceil(data.meta.total / data.meta.limit)
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
            <GradientScreenBackground>
                <HeaderBar
                    title={"Fleet List"}
                    navigation={this.props.navigation}
                    showBackButton={true}
                />

                <ScrollView style={styles.scrollView}>
                    <Text style={globalStyles.screenInfoText}>Manage the ships under your agent's fleet.</Text>

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

                <NavBar navigation={this.props.navigation} />
            </GradientScreenBackground>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        paddingTop: 10,
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