import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//Styles
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';


/**
 * Component for the ShipDetailsScreen to display the percentage status as a bar.
 * Props:
 *  percent: Number for what percentage to display.
 */
export default class StatusPercentBar extends Component {
    constructor(props) {
        super(props);
    }


    getLeftPos = function() {
        let l = this.props.percent - 3;
        return l.toString() + "%";
    }


    getRightPos = function () {
        let r = 100 - this.props.percent + 3;
        return r.toString() + "%";
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.percentText}>{this.props.percent}%</Text>
                <LinearGradient
                    colors={[
                        '#f00',
                        '#0f0'
                    ]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.gradientView}
                >
                    <View style={[styles.tickMarkSmall, { left: 0 }]} />
                    <View style={[styles.tickMarkBig, { left: 0 }]} />
                    <View style={[styles.tickMarkSmall, { left: '25%' }]} />
                    <View style={[styles.tickMarkBig, { left: '25%' }]} />
                    <View style={[styles.tickMarkSmall, { left: '50%' }]} />
                    <View style={[styles.tickMarkBig, { left: '50%' }]} />
                    <View style={[styles.tickMarkSmall, { left: '75%' }]} />
                    {/*<View style={[styles.markerPos, {left: this.getLeftPos(), right: this.getRightPos()}]}/>*/}
                    <View style={{height: '100%', backgroundColor: '#000', alignSelf: 'flex-end', width: ((100 - this.props.percent).toString() + "%")}} />
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        minWidth: 160,
        height: 18,
        margin: 5,
        flexDirection: 'row',
    },

    percentText: {
        color: Colors.primaryColor,
        fontFamily: Fonts.tektur,
        fontSize: 16,
        marginRight: 5,
        textAlignVertical: 'center',
        width: 40,
    },

    gradientView: {
        flex: 1,
        borderWidth: 2,
        borderColor: 'black',
    },

    tickMarkBig: {
        position: 'absolute',
        width: '25%',
        height: '70%',
        bottom: 0,
        borderRightWidth: 1,
        borderColor: '#000',
    },

    tickMarkSmall: {
        position: 'absolute',
        width: '12.5%',
        height: '40%',
        bottom: 0,
        borderRightWidth: 1,
        borderColor: '#000',
    },

    markerPos: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 10,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "grey",
        transform: [{rotate: '180deg'}]
    }
})