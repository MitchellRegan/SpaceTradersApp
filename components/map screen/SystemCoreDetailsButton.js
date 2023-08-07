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
 * Component that displays details about a given system's core star on the WaypointsMapScreen.
 * Props
 *  systemObj_: JSON object that contains all of the system's details.
 *      {
 *          symbol: string,
 *          type: string,
 *          x: number,
 *          y: number,
 *          factions: [strings for which factions are here]
 *      }
 */
export default class SystemCoreDetailsButton extends Component {
    constructor(props) {
        super(props);
    }


    /**
     * Method to convert the type name of this system to a normal format (first letter upper-case, spaces instead of underscores)
     * @returns {string} The formatted type name.
     */
    formatName = function () {
        let nameWords = this.props.systemObj_.type.split('_');
        let fname = "";
        for (var i = 0; i < nameWords.length; i++) {
            if (i > 0) {
                fname = fname + " ";
            }
            fname = fname + nameWords[i][0];
            fname = fname + nameWords[i].slice(1).toLowerCase();
        }

        return fname;
    }


    render() {
        return (
            <LinearGradient
                colors={[Colors.secondaryColorLight.toString(), Colors.secondaryColor.toString(), Colors.secondaryColorDark.toString()]}
                style={styles.wrapper}
                start={{ x: 0, y: 0.5 }}
                end={{x:1, y:0.5} }
            >
                <View style={styles.iconBox}>
                    <DynamicMapIcon
                        typeName_={this.props.systemObj_.type}
                        pixelSize_={45}
                    />
                </View>

                <View style={styles.textbox }>
                    <Text style={globalStyles.textListLarge}>{this.formatName()} {this.props.systemObj_.symbol}</Text>
                    <View>
                        <Text style={globalStyles.textList}>Galactic Position:</Text>
                        <Text style={globalStyles.textListSmall}> X: {this.props.systemObj_.x}</Text>
                        <Text style={globalStyles.textListSmall}> Y: {this.props.systemObj_.y}</Text>
                        {(this.props.systemObj_.factions.length > 0) && <Text style={globalStyles.textList }>Controlling Factions:</Text>}
                        {this.props.systemObj_.factions.map((item, key) => (
                            <Text key={key}>{item.symbol}</Text>
                        ))}
                    </View>
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 20,
        marginRight: 20,
    },

    iconBox: {
        verticalAlign: 'center',
        margin: 7,
        justifyContent: 'center',
    },

    textBox: {
        paddingLeft: 10,
    }
})