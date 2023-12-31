import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

//Components
import HeaderBar from '../components/shared/HeaderBar';
import GradientScreenBackground from '../components/shared/GradientScreenBackground';

//Styles
import Fonts from '../styles/Fonts';
import Colors from '../styles/Colors';
import globalStyles from '../styles/global-stylesheet';


/**
 * Screen to display error messages.
 * Props:
 *  title: String for the title of the header.
 *  message: String for the detailed error message.
 */
export default class ErrorScreen extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <GradientScreenBackground>
                <HeaderBar
                    navigation={this.props.navigation}
                    title={"ERROR!"}
                    showBackButton={true }
                />

                <View style={{ justifyContent: 'center', marginTop: 30 }}>
                    <View style={styles.centerView}>
                        <Text style={globalStyles.header2Text}>
                            Oops! Something went wrong...
                        </Text>

                        <Text style={globalStyles.header3Text}>
                            {this.props.route.params.title}
                        </Text>

                        <Text style={[globalStyles.defaultText, {textAlign: 'center'}]}>
                            {this.props.route.params.message}
                        </Text>
                    </View>
                </View>
            </GradientScreenBackground>
        );
    }
}

const styles = StyleSheet.create({
    centerView: {
        alignSelf: 'center',
        width: '100%',
        alignItems: 'center'
    },

    header: {
        fontFamily: Fonts.monospace,
        color: Colors.textDefaultColor1,
        fontSize: 24,
        marginBottom: 30,
        width: '70%',
        textAlign: 'center'
    },

    title: {
        fontFamily: Fonts.monospace,
        color: Colors.textErrorColor,
        fontSize: 16,
        marginBottom: 10,
        width: '90%',
        textAlign: 'center'
    },

    errorMessage: {
        fontFamily: Fonts.monospace,
        color: Colors.textDefaultColor1,
        fontSize: 16,
        marginBottom: 10,
        width: '90%',
        textAlign: 'center'
    }
});