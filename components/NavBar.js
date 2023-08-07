import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

//SVG Icons
import HomeIcon from '../assets/icons/Home_icon.svg';
import MapIcon from '../assets/icons/Map_icon.svg';
import ShipIcon from '../assets/icons/Ship_icon.svg';
import ContractIcon from '../assets/icons/Contracts_icon.svg';
import SettingsIcon from '../assets/icons/Settings_icon.svg';

//Styles
import Colors from '../styles/Colors';
import Fonts from '../styles/Fonts';


/**
 * Component to display at the bottom of the screen to allow for quick navigation to the main pages.
 * Props:
 *  navigation: React.Navigation component.
 */
export default class HeaderBar extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <TouchableOpacity
                    style={styles.buttonView}
                    onPress={() => console.log("Settings")}
                >
                    <SettingsIcon
                        height={'35'}
                        width={'35'}
                        style={styles.icon}
                    />
                </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonView}
                        onPress={() => this.props.navigation.navigate("Map")}
                    >
                        <MapIcon
                            height={'35'}
                            width={'35'}
                            style={styles.icon}
                        />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonView}
                    onPress={() => this.props.navigation.navigate("Home")}
                >
                    <HomeIcon
                        height={'35'}
                        width={'35'}
                        style={styles.icon}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonView}
                    onPress={() => this.props.navigation.navigate("Contracts")}
                >
                    <ContractIcon
                        height={'35'}
                        width={'35'}
                        style={styles.icon}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonView}
                    onPress={() => this.props.navigation.navigate("Ships")}
                >
                    <ShipIcon
                        height={'35'}
                        width={'35'}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: Colors.primaryColor,
        justifyContent: 'space-around',
        flexDirection: 'row',
        position: 'absolute',
        width: '100%',
        paddingBottom: 10,
        paddingTop: 6,
        paddingLeft: 10,
        paddingRight: 10,
        bottom: 0,
    },

    buttonView: {
        alignItems: 'center',
        padding: 5,
    },

    icon: {
        color: '#fff',
        verticalAlign: 'center',
        padding: 5,
    }
})