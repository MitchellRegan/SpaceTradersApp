import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

//Styles
import Fonts from '../styles/Fonts';
import Colors from '../styles/Colors';
import globalStyles from '../styles/global-stylesheet';

//Components
import HeaderBar from '../components/shared/HeaderBar';
import NavBar from '../components/shared/NavBar';
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
                />

                <InteractiveMap />

                <ScrollView style={{flex: 1}}>

                </ScrollView>

                <NavBar navigation={this.props.navigation} />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});