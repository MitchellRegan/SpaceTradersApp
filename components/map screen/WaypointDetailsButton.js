import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//Styles
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import globalStyles from '../../styles/global-stylesheet';

//Components
import DynamicMapIcon from './DynamicMapIcon';
import TraitDetailsButton from './TraitDetailsButton';


/**
 * Component that displays details about a given waypoint on the WaypointsMapScreen.
 * Props
 *  waypointObj: JSON object that contains all of the waypoint's details.
 *      {
 *          systemSymbol: string,
 *          symbol: string,
 *          type: string,
 *          x: number,
 *          y: number,
 *          orbitals: [strings of waypoint symbols],
 *          traits: [strings of trait types]
 *      }
 *  isOrbital: Boolean for if this object is orbiting another object. If true, this button's style changes slightly.
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
        if (this.props.isOrbital) {
            return styles.orbitalWrapper;
        }

        return [globalStyles.listViewWrapper1, {flexDirection: 'row'}];
    }


    /**
     * Method to convert the type name of this waypoint to a normal format (first letter upper-case, spaces instead of underscores)
     * @returns {string} The formatted type name.
     */
    formatName = function () {
        let nameWords = this.props.waypointObj.type.split('_');
        let fname = "";
        for (var i = 0; i < nameWords.length; i++) {
            if (i > 0) {
                fname = fname + " ";
            }
            fname = fname + nameWords[i][0];
            fname = fname + nameWords[i].slice(1).toLowerCase();
        }

        fname = fname + " " + this.props.waypointObj.symbol.split('-')[2];

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
                        typeName_={this.props.waypointObj.type}
                        pixelSize_={45}
                    />
                </View>

                <View style={styles.textBox}>
                    <Text style={globalStyles.textListLarge}>{this.formatName()}</Text>
                    <View style={{width: '100%'} }>
                        <Text style={globalStyles.textListSmall}>Controlling Faction: {this.props.waypointObj.faction.symbol}</Text>
                        <Text style={globalStyles.textListSmall}>Traits:{(this.props.waypointObj.traits.length == 0) && " NONE"}</Text>
                        <View style={globalStyles.traitListView}>
                            {this.props.waypointObj.traits.map((item, key) => (
                                <TraitDetailsButton 
                                    key={key}
                                    traitName={item.name}
                                    traitDetails={item.description}
                                />
                        ))}
                        </View>
                    </View>
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    orbitalWrapper: {
        flexDirection: 'row',
        marginTop: 0,
        marginBottom: 5,
        marginLeft: 40,
        marginRight: 20,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.primaryColor,
    },

    iconBox: {
        verticalAlign: 'center',
        margin: 7,
        justifyContent: 'center',
    },

    textBox: {
        flex: 1,
        paddingRight: 3,
    }
})