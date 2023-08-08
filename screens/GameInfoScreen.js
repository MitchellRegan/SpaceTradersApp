import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Linking } from 'react-native';

//Styles
import globalStyles from '../styles/global-stylesheet';
import Colors from '../styles/Colors';

//API Calls
import ServerInfoAPICalls from '../api-calls/server-info-api-calls';

//Components
import HeaderBar from '../components/shared/HeaderBar';
import NavBar from '../components/shared/NavBar';


export default class GameInfoScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gameInfo: {},
            serverResets: {},
            announcements: [],
            links: [],
        }
    }


    /**
     * Function called when this screen loads to call the getServerInfo API.
     */
    componentDidMount() {
        let data = ServerInfoAPICalls.getServerInfo()
            .then(data => {
                this.setState(prevState => {
                    return ({
                        ...prevState,
                        gameInfo: data,
                        serverResets: data.serverResets,
                        announcements: data.announcements,
                        links: data.links,
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
     * Method to format the given UNIX time format for dates to a readable format.
     * @param {string} date_ String for the UNIX time to format.
     * @returns String for the formatted date string (DotW, DD MMM YYYY HH:MM:SS Timezone)
     */
    formatDateString = function (date_) {
        const unixTime = new Date(Date.parse(date_));
        return unixTime.toUTCString();
    }


    render() {
        return (
            <View style={globalStyles.screenWrapperView}>
                <HeaderBar
                    title={"Game Info"}
                    navigation={this.props.navigation}
                    showBackButton={true}
                />

                <ScrollView style={styles.scrollView}>
                    {/* =============== Details =============== */}
                    <View style={styles.sectionView}>
                        <Text style={[globalStyles.header1Text, { alignSelf: 'center' }]}>SpaceTradersAPI {this.state.gameInfo.version}</Text>
                        <View style={globalStyles.listViewWrapper2}>
                            <Text style={globalStyles.header3Text}>- About</Text>
                            <Text style={globalStyles.defaultText}>{this.state.gameInfo.description}</Text>
                            <Text style={globalStyles.header3Text}>- Server Status</Text>
                            <Text style={globalStyles.defaultText}>{this.state.gameInfo.status}</Text>
                        </View>
                    </View>


                    {/* =============== Resets =============== */}
                    <View style={styles.sectionView}>
                        <Text style={globalStyles.header1Text}>Server Resets</Text>
                        <View style={globalStyles.listViewWrapper2}>
                            <Text style={globalStyles.defaultText}>Reset Frequency: {this.state.serverResets.frequency}</Text>
                            <Text style={globalStyles.defaultText}>Next: <Text style={{color: Colors.textErrorColor}}>{this.formatDateString(this.state.serverResets.next)}</Text></Text>
                        </View>
                    </View>


                    {/* =============== Announcements =============== */}
                    <View style={styles.sectionView}>
                        <Text style={globalStyles.header1Text}>Announcements</Text>
                        {this.state.announcements.map((itemData, key) => (
                            <View key={key} style={globalStyles.listViewWrapper2}>
                                <Text style={globalStyles.header3Text}>- {itemData.title}</Text>
                                <Text style={globalStyles.defaultText}>{itemData.body}</Text>
                            </View>
                        ))}
                    </View>
                    

                    {/* =============== Links =============== */}
                    <View style={styles.sectionView}>
                        <Text style={globalStyles.header1Text}>Links</Text>
                        {this.state.links.map((itemData, key) => (
                            <Text
                                key={key }
                                style={[globalStyles.hyperlinkText, {paddingLeft: 10}]}
                                onPress={() => Linking.openURL(itemData.url)}
                            >
                                {itemData.name}
                            </Text>
                        ))}
                    </View>
                </ScrollView>

                <NavBar navigation={this.props.navigation} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },

    sectionView: {

    },
})