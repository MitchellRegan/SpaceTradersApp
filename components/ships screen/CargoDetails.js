import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

//Styles
import Colors from '../../styles/Colors';
import globalStyles from '../../styles/global-stylesheet';

//Components
import ListElementView from '../shared/ListElementView';


/**
 * Component to show all details about a ship's cargo hold
 * Props:
 *  cargoData: JSON object containing information about items in the ship's cargo hold
 */
export default class MountDetails extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.headerRow}>
                    <Text style={globalStyles.header2Text}>Cargo</Text>
                    <Text style={[globalStyles.header2Text, { padding: 6 }]}>{this.props.cargoData.units}/{this.props.cargoData.capacity}</Text>
                </View>

                <View style={styles.block}>
                    {this.props.cargoData.inventory.map((itemData, key) => (
                        <ListElementView key={key}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={globalStyles.textList}>{itemData.name}</Text>
                                <Text style={globalStyles.textList}>x{itemData.units}</Text>
                            </View>
                            <Text style={globalStyles.textListSmall}>{itemData.description}</Text>
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

    headerRow: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    block: {
        paddingLeft: 10,
    },
});