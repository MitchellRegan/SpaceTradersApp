import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

//Styles
import Colors from '../../styles/Colors';
import globalStyles from '../../styles/global-stylesheet';

//Components
import ListElementView from '../shared/ListElementView';


/**
 * Component to show all details about a ship's installed mounts
 * Props:
 *  mountData: JSON object containing information about the ship's installed mounts
 */
export default class MountDetails extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={globalStyles.header2Text}>Mounted Equipment</Text>

                <View style={styles.block}>
                    {this.props.mountData.map((itemData, key) => (
                        <ListElementView key={key}>
                            <Text style={globalStyles.textListLarge}>{itemData.name}</Text>
                            <Text style={globalStyles.textListSmall}>Strength: {itemData.strength}</Text>
                            <Text style={globalStyles.defaultText}>{itemData.description}</Text>
                            <Text style={globalStyles.textListSmall}>Requirements:  {itemData.requirements.crew} Crew + {itemData.requirements.power} Power</Text>
                        </ListElementView>
                    ))}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        borderColor: Colors.primaryColor,
        borderBottomWidth: 2,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        padding: 5,
        justifyContent: 'center',
    },

    block: {
        paddingLeft: 10,
    },
});