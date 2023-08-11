import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

//Styles
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';


/**
 * Component to display a loading icon and message to the user when waiting for API calls.
 */
export default class LoadingDisplay extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
    },

    loadingText: {
        width: '100%',
        textAlign: 'center',
        fontFamily: Fonts.tektur,
        fontSize: 26,
        color: Colors.primaryColor,
    }
})