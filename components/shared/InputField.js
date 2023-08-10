import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//SVG Icons
import ProfileIcon from '../../assets/icons/Profile_icon.svg';
import LockIcon from '../../assets/icons/Lock_icon.svg';
import EmailIcon from '../../assets/icons/Email_icon.svg';

//Styles
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';


/**
 * Custom-styled text input field.
 * Props:
 *  value: String for what text is currently displayed.
 *  placeholder: String for placeholder text. Defaults to empty.
 *  keyboardType: String for what kind of keyboard this will use. defaults to "default"
 *  multiline: Bool for if this input field can take up multiple lines. Defaults to true.
 *  maxLength: The maximum number of chars that can be in this input field. Defaults to 1024.
 *  onChangeText: The function to call when text is changed in this input field.
 *  symbol: String for what SVG icon to display. Values are None, Username, Token, Email. Defaults to None
 */
export default class InputField extends Component {
    constructor(props) {
        super(props);
    }


    getDisplaySymbol = function () {
        switch (this.props.symbol) {
            case "Username":
                return (
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
                        <ProfileIcon height={'30'} width={'30'} style={styles.iconStyle} />
                    </LinearGradient>);
            case "Token":
                return (
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
                        <LockIcon height={'30'} width={'30'} style={styles.iconStyle} />
                    </LinearGradient>);
            case "Email":
                return (
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
                        <EmailIcon height={'30'} width={'30'} style={styles.iconStyle} />
                    </LinearGradient>);
            default:
                return <View style={{height: 30, paddingTop: 5, paddingBottom: 5}} />;
        }
    }


    render() {
        return (
            <View style={[styles.wrapper, this.props.style]}>
                {this.getDisplaySymbol()}

                <LinearGradient
                    colors={[
                        Colors.secondaryColorLight.toString(),
                        'rgba(0,0,0,0)'
                    ]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.inputGradientStyle}
                >
                    <TextInput
                        style={styles.input}
                        multiline={this.props.multiline}
                        placeholder={this.props.placeholder}
                        placeholderTextColor={Colors.tertiaryColorDark}
                        value={this.props.value}
                        maxLength={this.props.maxLength}
                        onChangeText={newText => this.props.onChangeText(newText)}
                    />
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 4,
        padding: 2,
        borderColor: Colors.primaryColor,
        borderWidth: 1,
    },

    iconStyle: {
        alignSelf: 'center',
        padding: 5,
    },

    iconGradientStyle: {
        padding: 6,
    },

    inputGradientStyle: {
        marginLeft: 2
    },

    input: {
        alignSelf: 'center',
        flex: 1,
        width: 200,
        marginLeft: 5,
        paddingLeft: 3,
        fontFamily: Fonts.tektur,
        color: Colors.primaryColor,
        fontSize: 18,
    },
})