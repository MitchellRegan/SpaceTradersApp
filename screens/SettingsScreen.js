import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import RNRestart from 'react-native-restart';

//Styles
import Colors from '../styles/Colors';
import globalStyles from '../styles/global-stylesheet';

//API Calls
import ShipAPICalls from '../api-calls/ship-api-calls';

//Components
import HeaderBar from '../components/shared/HeaderBar';
import NavBar from '../components/shared/NavBar';
import BigButton1 from '../components/shared/BigButton1';


export default class SettingsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            colorScheme: "orange"
        }
    }


    componentDidMount() {
        const localData = require("../save data/user-preferences.json");
        this.setState(prevState => {
            return ({
                ...prevState,
                colorScheme: localData.colorScheme
            })
        })
    }


    /**
     * Method called from the Dropdown menu to set the new color scheme
     * @param {string} newColor_ The color scheme to change to
     */
    setColor = function (newColor_) {
        this.setState(prevState => {
            return ({
                ...prevState,
                colorScheme: newColor_
            })
        })
    }


    //Method to save the changes to the user preferences in the user-preferences.json file
    saveChanges = function () {
        let localData = require("../save data/user-preferences.json");
        localData.colorScheme = this.state.colorScheme;
        this.props.navigation.reset({
            index: 0,
            routes: [{name:'Home'}]
        })
    }


    render() {
        return (
            <View style={globalStyles.screenWrapperView}>
                <HeaderBar
                    title={"User Settings"}
                    navigation={this.props.navigation}
                    showBackButton={true}
                />

                <ScrollView style={styles.scrollView}>
                    <Text style={globalStyles.screenInfoText}>Edit the profile and UI settings for this app.</Text>

                    <Text style={globalStyles.header2Text}>Color Scheme</Text>
                    <Dropdown
                        style={globalStyles.dropdownView}
                        selectedTextStyle={globalStyles.dropdownText}
                        itemContainerStyle={{color: Colors.primaryColor} }
                        data={[
                            { label: 'Orange', value: 'orange' },
                            { label: 'Blue', value: 'blue' },
                            { label: 'Green', value: 'green' }
                        ]}
                        value={this.state.colorScheme}
                        onChange={item => this.setColor(item.value)}
                        labelField="label"
                        valueField="value"
                    />

                    <BigButton1 text={"Save Changes"} onPress={() => this.saveChanges()} />
                </ScrollView>

                <NavBar navigation={this.props.navigation} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
    }
})