import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Font from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//Styles
import Colors from './styles/Colors';

//Screens
import HomeScreen from './screens/HomeScreen';
import NewAccountScreen from './screens/NewAccountScreen';
import MapScreen from './screens/MapScreen';
import ErrorScreen from './screens/ErrorScreen';
import ContractsScreen from './screens/ContractsScreen';
import ShipsScreen from './screens/ShipsScreen';
import ShipDetailsScreen from './screens/ShipDetailsScreen';
import ShipWarpScreen from './screens/ShipWarpScreen';
import GameInfoScreen from './screens/GameInfoScreen';
import WaypointsMapScreen from './screens/WaypointsMapScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {
    const [stateVars, setStateVars] = useState({
        fontsLoaded: false
    })


    loadFontsAsync = async function(){
        await Font.loadAsync({
            'Tektur': require('./assets/fonts/Tektur.ttf'),
            'Tektur-Bold': require('./assets/fonts/Tektur-Bold.ttf')
        })
            .then(() => {
                setStateVars(prevState => {
                    return ({
                        ...prevState,
                        fontsLoaded: true
                    });
                });
            })
            .catch(error => {
                console.log("ERROR at App.js trying to load fonts");
                console.log(error);
            })
    }

    if (!stateVars.fontsLoaded) {
        this.loadFontsAsync();
    }


    return (
        <View style={styles.container}>
            {(stateVars.fontsLoaded) && <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="NewAccount" component={NewAccountScreen} />
                    <Stack.Screen name="Map" component={MapScreen} />
                    <Stack.Screen name="Error" component={ErrorScreen} />
                    <Stack.Screen name="Contracts" component={ContractsScreen} />
                    <Stack.Screen name="Ships" component={ShipsScreen} />
                    <Stack.Screen name="ShipDetails" component={ShipDetailsScreen} />
                    <Stack.Screen name="ShipWarp" component={ShipWarpScreen} />
                    <Stack.Screen name="GameInfo" component={GameInfoScreen} />
                    <Stack.Screen name="WaypointsMap" component={WaypointsMapScreen} />
                    <Stack.Screen name="Settings" component={SettingsScreen} />
                </Stack.Navigator>
            </NavigationContainer>}
         </View>
    );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: Colors.primaryColor
  },
});
