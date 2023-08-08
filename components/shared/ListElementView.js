import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//Styles
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import globalStyles from '../../styles/global-stylesheet';


/**
 * Component to act as a wrapper for elements in a list view
 */
export default class WaypointDetailsButton extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={[styles.wrapper, this.props.style]}>
                <View style={styles.sideBar} />
                <LinearGradient
                    colors={[
                        Colors.secondaryColorLight.toString(),
                        Colors.secondaryColor.toString()
                    ]}
                    style={styles.gradientStyle}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                >
                    {this.props.children}
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
    },

    gradientStyle: {
        flex: 1,
        paddingLeft: 4,
        paddingRight: 4,
    },

    sideBar: {
        height: '100%',
        backgroundColor: Colors.primaryColorDark,
        width: 3,
        marginRight: 3,
    },
})