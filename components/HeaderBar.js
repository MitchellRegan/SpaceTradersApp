import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

//import BackArrowIcon from '../assets/icons/BackArrow_icon.svg';
//import HamburgerIcon from '../assets/icons/Hamburger_icon.svg';

//Styles
import Colors from '../styles/Colors';
import Fonts from '../styles/Fonts';


/**
 * Component to display at the top of the screen. Includes a screen title, back arrow, and hamburger menu button.
 * Props:
 *  title: String for what this screen's title is.
 *  navigation: React.Navigation component.
 *  showBackButton: Boolean to determine if the back arrow should be shown or not.
 */
export default class HeaderBar extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.wrapper }>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: Colors.headerColor
    },

    backButton: {
        alignSelf: 'center'
    },

    headerText: {
        alignSelf: 'center',
        fontFamily: Fonts.monospace,
        fontWeight: 'bold',
        color: Colors.button1TextColor,
        fontSize: 26
    },

    drawerButton: {
        height: 40,
        width: 40,
        alignSelf: 'center'
    }
});