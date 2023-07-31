import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

//SVG Icons
import BackArrowIcon from '../assets/icons/BackArrow_icon.svg';
import HamburgerIcon from '../assets/icons/Hamburger_icon.svg';

//Styles
import Colors from '../styles/Colors';
import Fonts from '../styles/Fonts';


/**
 * Component to display at the top of the screen. Includes a screen title, back arrow, and hamburger menu button.
 * Props:
 *  title: String for what this screen's title is.
 *  navigation: React.Navigation component.
 *  showBackButton: Boolean to determine if the back arrow should be shown or not.
 *  showMenuButton: Boolean to determine if the menu button should be shown or not.
 */
export default class HeaderBar extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.wrapper }>
                {(this.props.showBackButton) && <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <BackArrowIcon
                        height={'30'}
                        width={'40'}
                        color={'#000'}
                    />
                </TouchableOpacity>}
                {(!this.props.showBackButton) && <View style={{ width: 40, height: 30 }} />}

                <Text style={styles.headerText}>{this.props.title}</Text>

                {(this.props.showMenuButton) && <TouchableOpacity
                    style={styles.drawerButton}
                    onPress={() => this.props.navigation.openDrawer()}
                >
                    <HamburgerIcon height={40} width={40} />
                </TouchableOpacity>}
                {(!this.props.showMenuButton) && <View style={{width: 40, height: 40}} />}
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