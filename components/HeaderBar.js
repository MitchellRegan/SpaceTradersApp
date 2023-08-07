import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

//SVG Icons
import BackArrowIcon from '../assets/icons/BackArrow2_icon.svg';

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
                {(this.props.showBackButton) && <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <BackArrowIcon
                        height={'25'}
                        width={'35'}
                        color={'#000'}
                    />
                </TouchableOpacity>}
                {(!this.props.showBackButton) && <View style={{ width: 35, height: 25 }} />}

                <Text style={styles.headerText}>{this.props.title}</Text>

                <View style={{width: 35, height: 25}} />
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
        backgroundColor: Colors.primaryColor
    },

    backButton: {
        alignSelf: 'center'
    },

    headerText: {
        alignSelf: 'center',
        fontFamily: Fonts.tekturBold,
        color: Colors.button1TextColor,
        fontSize: 20
    },
});