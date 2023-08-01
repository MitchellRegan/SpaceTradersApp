import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

//Styles

//Components
import HeaderBar from '../components/HeaderBar';
import UserLogin from '../components/home screen/UserLogin';
import MyAgentDetails from '../components/home screen/MyAgentDetails';
import MyContracts from '../components/home screen/MyContracts';
import MyShips from '../components/home screen/MyShips';

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
        var localData = require("../user-preferences.json");

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
            <View style={styles.wrapper }>
                <HeaderBar
                    title={"SpaceTraders"}
                    navigation={this.props.navigation}
                    showBackButton={false}
                    showMenuButton={this.state.loggedIn}
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },

    scrollView: {
        flex: 1,
    }
});