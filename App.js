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

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Drawer.Navigator
                    drawerPosition={'right'}
                    screenOptions={{
                        headerShown: false,
                        swipeEdgeWidth: 0
                    }}
                >
                    <Drawer.Screen name="Login" component={LoginScreen}/>
                    <Drawer.Screen name="NewAccount" component={NewAccountScreen}/>
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
