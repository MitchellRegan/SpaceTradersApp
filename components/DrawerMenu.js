import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

//Styles
import Fonts from '../styles/Fonts';
import Colors from '../styles/Colors';
import globalStyles from '../styles/global-stylesheet';


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
                    <View style={styles.topPadding} />

                    <TouchableOpacity style={globalStyles.drawerButton} onPress={() => this.props.navigation.navigate("Home")}>
                        <Text style={globalStyles.drawerButtonText}
                            allowFontScaling={Fonts.allowScaling}
                            maxFontSizeMultiplier={Fonts.maxFontSizeMultiplier}>Home</Text>
                    </TouchableOpacity>

                    <View style={globalStyles.pageBreak} />

                    <TouchableOpacity style={globalStyles.drawerButton} onPress={() => this.props.navigation.navigate("Map")}>
                        <Text style={globalStyles.drawerButtonText}
                            allowFontScaling={Fonts.allowScaling}
                            maxFontSizeMultiplier={Fonts.maxFontSizeMultiplier}>Map</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.versionView }>
                    <Text style={globalStyles.smallText}
                        allowFontScaling={Fonts.allowScaling}
                        maxFontSizeMultiplier={Fonts.maxFontSizeMultiplier}>App Version: v0.0.1</Text>
                    <Text style={globalStyles.smallText}
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
        paddingTop: 25,
    },

    versionView: {
        width: '100%',
        marginBottom: 10,
        alignItems: 'center',
    },
});