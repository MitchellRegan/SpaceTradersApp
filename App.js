import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

//Styles
import Fonts from './styles/Fonts';
import Colors from './styles/Colors';

//Components
import DrawerMenu from './components/DrawerMenu';

//Screens
import HomeScreen from './screens/HomeScreen';
import NewAccountScreen from './screens/NewAccountScreen';
import MapScreen from './screens/MapScreen';
import ErrorScreen from './screens/ErrorScreen';
import ContractsScreen from './screens/ContractsScreen';
import ShipsScreen from './screens/ShipsScreen';
import GameInfoScreen from './screens/GameInfoScreen';

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Drawer.Navigator
                    screenOptions={{
                        headerShown: false,
                        swipeMinDistance: 5,
                        drawerPosition: 'right'
                    }}
                    drawerContent={props => <DrawerMenu {...props }/>}
                >
                    <Drawer.Screen name="Home" component={HomeScreen} />
                    <Drawer.Screen name="NewAccount" component={NewAccountScreen} />
                    <Drawer.Screen name="Map" component={MapScreen} />
                    <Drawer.Screen name="Error" component={ErrorScreen} />
                    <Drawer.Screen name="Contracts" component={ContractsScreen} />
                    <Drawer.Screen name="Ships" component={ShipsScreen} />
                    <Drawer.Screen name="GameInfo" component={GameInfoScreen } />
                </Drawer.Navigator>
            </NavigationContainer>
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
