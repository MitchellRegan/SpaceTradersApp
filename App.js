import React from 'react';
import { StyleSheet, View } from 'react-native';
//import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
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
import WaypointsMapScreen from './screens/WaypointsMapScreen';

//const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
    return (
        <View style={styles.container}>
            <NavigationContainer>
                {/*<Drawer.Navigator
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
                    <Drawer.Screen name="GameInfo" component={GameInfoScreen} />
                    <Drawer.Screen name="WaypointsMap" component={WaypointsMapScreen} />
                </Drawer.Navigator>*/}

                <Stack.Navigator screenOptions={{headerShown: false} }>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="NewAccount" component={NewAccountScreen} />
                    <Stack.Screen name="Map" component={MapScreen} />
                    <Stack.Screen name="Error" component={ErrorScreen} />
                    <Stack.Screen name="Contracts" component={ContractsScreen} />
                    <Stack.Screen name="Ships" component={ShipsScreen} />
                    <Stack.Screen name="GameInfo" component={GameInfoScreen} />
                    <Stack.Screen name="WaypointsMap" component={WaypointsMapScreen} />
                </Stack.Navigator>
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
