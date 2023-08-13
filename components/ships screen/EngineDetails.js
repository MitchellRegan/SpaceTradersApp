import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

//Styles
import Colors from '../../styles/Colors';
import globalStyles from '../../styles/global-stylesheet';

//Components
import StatusPercentBar from '../../components/ships screen/StatusPercentBar';


/**
 * Component to show all details about a ship's engine
 * Props:
 *  engineData: JSON object containing information about the ship's engine
 */
export default class EngineDetails extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={globalStyles.header2Text}>Engine Details</Text>

                <View style={styles.block}>
                    <Text style={globalStyles.textListLarge}>{this.props.engineData.name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[globalStyles.textList, { textAlignVertical: 'center' }]}>Condition:</Text>
                        <StatusPercentBar percent={this.props.engineData.condition} />
                    </View>
                    <Text style={globalStyles.defaultText}>{this.props.engineData.description}</Text>
                    <Text style={globalStyles.textListSmall}>Speed: {this.props.engineData.speed}</Text>
                    <Text style={globalStyles.textListSmall}>Requirements:  {this.props.engineData.requirements.crew} Crew,  {this.props.engineData.requirements.power} Power</Text>
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