import React, { Component } from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//Styles
import Colors from '../../styles/Colors';


export default class GradientScreenBackground extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <LinearGradient
                colors={[
                    Colors.backgroundColorDark.toString(),
                    //Colors.primaryColorDark.toString(),
                    Colors.backgroundColorLight.toString()
                ]}
                style={{ flex: 1 }}
                start={{ x: 0.4, y: 0.6 }}
                end={{ x: 0.8, y: 1.2 }}
            >
                {this.props.children}
            </LinearGradient>
        );
    }
}