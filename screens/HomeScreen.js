import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

//Styles
import Fonts from '../styles/Fonts';
import Colors from '../styles/Colors';

//Components
import HeaderBar from '../components/HeaderBar';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.wrapper }>
                <HeaderBar
                    title={"Home"}
                    navigation={this.props.navigation}
                    showBackButton={false}
                    showMenuButton={true}
                />


            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    }
});