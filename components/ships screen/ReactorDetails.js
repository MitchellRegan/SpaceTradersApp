import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

//Styles
import Colors from '../../styles/Colors';
import globalStyles from '../../styles/global-stylesheet';

//Components
import StatusPercentBar from '../../components/ships screen/StatusPercentBar';


/**
 * Component to show all details about a ship's reactor
 * Props:
 *  reactorData: JSON object containing information about the ship's reactor
 */
export default class ReactorDetails extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={globalStyles.header2Text}>Reactor Details</Text>

                <View style={styles.block}>
                    <Text style={globalStyles.textListLarge}>{this.props.reactorData.name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[globalStyles.textList, { textAlignVertical: 'center' }]}>Condition:</Text>
                        <StatusPercentBar percent={this.props.reactorData.condition} />
                    </View>
                    <Text style={globalStyles.defaultText}>{this.props.reactorData.description}</Text>
                    <Text style={globalStyles.textListSmall}>Power Output: {this.props.reactorData.powerOutput}</Text>
                    <Text style={globalStyles.textListSmall}>Requirements:  {this.props.reactorData.requirements.crew} Crew</Text>
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