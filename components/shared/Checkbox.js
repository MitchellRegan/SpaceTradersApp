import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//Styles
import Colors from '../../styles/Colors';

//SVG Icons
import CheckmarkIcon from '../../assets/icons/Checkmark_icon.svg';


/**
 * Component to display a botton to act as a checkbox.
 * Props:
 *  isOn: Bool to signal if this checkbox is checked (true) or empty (false).
 *  onPress: The function to call when pressed.
 */
export default class BigButton1 extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <TouchableOpacity
                style={styles.gradientView}
                onPress={() => this.props.onPress()}
            >
                <LinearGradient
                    colors={[
                        Colors.primaryColor.toString(),
                        'rgba(0,0,0,0)',
                        Colors.primaryColor.toString()
                    ]}
                    start={{ x: 0.5, y: -0.3 }}
                    end={{ x: 0.5, y: 1.3 }}
                    style={styles.iconGradientStyle}
                >
                    {(this.props.isOn) && <CheckmarkIcon height={'25'} width={'25'} style={styles.iconStyle} />}
                    {(!this.props.isOn) && <View style={styles.emptyBox}/> }
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    gradientView: {
        borderColor: Colors.primaryColor,
        borderWidth: 1,
        padding: 2,
        margin: 5,
        alignSelf: 'center',
    },

    gradientStyle: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 5,
        paddingRight: 5,
    },

    iconStyle: {
        alignSelf: 'center',
        padding: 5,
    },

    emptyBox: {
        padding: 5,
        height: 25,
        width: 25,
    },
})