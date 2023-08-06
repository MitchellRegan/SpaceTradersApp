import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//Styles
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import globalStyles from '../../styles/global-stylesheet';

//Components
import DynamicMapIcon from './DynamicMapIcon';


/**
 * Component that displays details about a given waypoint on the WaypointsMapScreen.
 * Props
 *  waypointObj_: JSON object that contains all of the waypoint's details.
 *      {
 *          systemSymbol: string,
 *          symbol: string,
 *          type: string,
 *          x: number,
 *          y: number,
 *          orbitals: [strings of waypoint symbols],
 *          traits: [strings of trait types]
 *      }
 *  isOrbital_: Boolean for if this object is orbiting another object. If true, this button's style changes slightly.
 */
export default class WaypointDetailsButton extends Component {
    constructor(props) {
        super(props);
    }


    /**
     * Method to get the wrapper style based on if the waypoint is orbiting another waypoint.
     * @returns object for the correct style.
     */
    getWrapper = function () {
        if (this.props.isOrbital_) {
            return styles.orbitalWrapper;
        }

        return styles.wrapper;
    }


    /**
     * Method to convert the type name of this waypoint to a normal format (first letter upper-case, spaces instead of underscores)
     * @returns {string} The formatted type name.
     */
    formatName = function () {
        let nameWords = this.props.waypointObj_.type.split('_');
        let fname = "";
        for (var i = 0; i < nameWords.length; i++) {
            if (i > 0) {
                fname = fname + " ";
            }
            fname = fname + nameWords[i][0];
            fname = fname + nameWords[i].slice(1).toLowerCase();
        }

        fname = fname + " " + this.props.waypointObj_.symbol.split('-')[2];

        return fname;
    }


    render() {
        return (
            <LinearGradient
                colors={[Colors.secondaryColorLight.toString(), Colors.secondaryColor.toString(), Colors.secondaryColorDark.toString()]}
                style={this.getWrapper()}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
            >
                <View style={styles.iconBox}>
                    <DynamicMapIcon
                        typeName_={this.props.waypointObj_.type}
                        pixelSize_={60 }
                    />
                </View>

                <View style={styles.textbox}>
                    <Text style={globalStyles.textListLarge}>{this.formatName()}</Text>
                    <View>
                        <Text style={globalStyles.textList}>Coords: [{this.props.waypointObj_.x}, {this.props.waypointObj_.y}]</Text>
                    </View>
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
    },

    orbitalWrapper: {
        flexDirection: 'row',
        marginTop: -5,
        marginBottom: 10,
        marginLeft: 40,
        marginRight: 20,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#f00',
    },

    iconBox: {
        verticalAlign: 'center',
        width: 60,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
    },
})