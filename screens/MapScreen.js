import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

//Styles
import Fonts from '../styles/Fonts';
import Colors from '../styles/Colors';
import globalStyles from '../styles/global-stylesheet';

//Components
import HeaderBar from '../components/HeaderBar';
import InteractiveMap from '../components/map screen/InteractiveMap';

export default class MapScreen extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={globalStyles.screenWrapperView}>
                <HeaderBar
                    title={"Map"}
                    navigation={this.props.navigation}
                    showBackButton={true}
                    showMenuButton={true}
                />

                <InteractiveMap />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});