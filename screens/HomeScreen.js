import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';

//Styles
import Colors from '../styles/Colors';
import globalStyles from '../styles/global-stylesheet';

//Components
import HeaderBar from '../components/shared/HeaderBar';
import NavBar from '../components/shared/NavBar';
import UserLogin from '../components/home screen/UserLogin';
import MyAgentDetails from '../components/home screen/MyAgentDetails';
import MyContracts from '../components/home screen/MyContracts';
import MyShips from '../components/home screen/MyShips';
import GradientScreenBackground from '../components/shared/GradientScreenBackground';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false
        }
    }


    /**
     * Function called when this screen loads. If there's an account login saved locally, we display user data. If not, we show the login component.
     */
    componentDidMount() {
        var localData = require("../save data/user-preferences.json");

        if (localData.username != "" && localData.token != "") {
            this.setState(prevState => {
                return ({
                    ...prevState,
                    loggedIn: true
                })
            })
        }
    }


    /**
     * Method passed to the UserLogin component through props. When successfully logged in, this screen refreshes and changes which components are displayed.
     */
    hideLogin = function (true_) {
        this.setState(prevState => {
            return ({
                ...prevState,
                loggedIn: true
            })
        })
    }


    render() {
        return (
            <GradientScreenBackground>
                <HeaderBar
                    title={"N E B U L A"}
                    navigation={this.props.navigation}
                    showBackButton={false}
                />

                {(!this.state.loggedIn) && <UserLogin
                    navigation={this.props.navigation}
                    onLogin={this.hideLogin.bind(this)}
                />}

                {(this.state.loggedIn) && <ScrollView
                    style={styles.scrollView }
                >
                    <MyAgentDetails
                        navigation={this.props.navigation }
                    />
                    <MyContracts
                        navigation={this.props.navigation }
                    />
                    <MyShips
                        navigation={this.props.navigation }
                    />
                </ScrollView>}

                {(this.state.loggedIn) && <NavBar navigation={this.props.navigation} />}
            </GradientScreenBackground>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    }
});