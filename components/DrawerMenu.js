import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

//Styles
import Fonts from '../styles/Fonts';
import Colors from '../styles/Colors';


/**
 * Component that's loaded into the react-navigation drawer navigator in App.js to act as a custom menu.
 * Props:
 *  navigation: React.Navigation component to change screens.
 */
export default class DrawerMenu extends Component {
    constructor(props) {
        super(props);

        this.props.navigation.swipeEnabled = false;
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <View>
                    <TouchableOpacity style={styles.topPadding} onPress={() => this.props.navigation.navigate("Home")}>
                        <Text style={styles.buttonText}
                            allowFontScaling={Fonts.allowScaling}
                            maxFontSizeMultiplier={Fonts.maxFontSizeMultiplier}>Home</Text>
                    </TouchableOpacity>

                    <View style={styles.break} />

                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Map")}>
                        <Text style={styles.buttonText}
                            allowFontScaling={Fonts.allowScaling}
                            maxFontSizeMultiplier={Fonts.maxFontSizeMultiplier}>Map</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.versionText}
                        allowFontScaling={Fonts.allowScaling}
                        maxFontSizeMultiplier={Fonts.maxFontSizeMultiplier}>App Version: v0.0.1</Text>
                    <Text style={styles.versionText}
                        allowFontScaling={Fonts.allowScaling}
                        maxFontSizeMultiplier={Fonts.maxFontSizeMultiplier}>Created by Mitch Regan, 2023</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'space-between',
    },

    topPadding: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 45,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
    },

    break: {
        height: 3,
        width: '85%',
        alignSelf: 'center',
        margin: 10,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
    },

    buttonText: {
        fontFamily: Fonts.monospace,
        fontSize: 18,
        paddingLeft: 15,
    },

    versionText: {
        fontFamily: Fonts.monospace,
        fontSize: 11,
        alignSelf: 'center',
        paddingBottom: 5,
    },
});