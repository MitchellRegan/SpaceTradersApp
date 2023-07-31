import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

//Styles
import Fonts from './styles/Fonts';
import Colors from './styles/Colors';

//Screens
import LoginScreen from './screens/LoginScreen';
import NewAccountScreen from './screens/NewAccountScreen';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import ErrorScreen from './screens/ErrorScreen';

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Drawer.Navigator
                    screenOptions={{
                        headerShown: false,
                        swipeEdgeWidth: 0,
                        drawerPosition: 'right'
                    }}
                >
                    <Drawer.Screen name="Login" component={LoginScreen}/>
                    <Drawer.Screen name="NewAccount" component={NewAccountScreen} />
                    <Drawer.Screen name="Home" component={HomeScreen} />
                    <Drawer.Screen name="Map" component={MapScreen} />
                    <Drawer.Screen name="Error" component={ErrorScreen} />
                </Drawer.Navigator>
            </NavigationContainer>
         </View>
    );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: Colors.headerColor
  },
});
