import React from 'react';
import {View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Registration from "../pages/Registration";
import Profile from "../pages/Profile";
import Barcode from '../pages/Barcode';
import Login from "../pages/Login";
import {colors, useScreenDimensions} from "../constants/helpers";
import Scanner from "../pages/Scanner";
import ScannerCamera from "../components/ScannerCamera";
import ScannerResult from "../components/ScannerResult";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const LoginStackScreen = () => {
    return(
        <Stack.Navigator initialRouteName="Profile" screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Profile',
                    tabBarIcon: () => (
                        <View>
                            <Icon
                                name={'ra'}
                            />
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="Registration"
                component={Registration}
            />
        </Stack.Navigator>
    )
}

const ScannerStackScreen = () => {
    return(
        <Stack.Navigator initialRouteName="Scanner" screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="Scanner"
                component={Scanner}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Scanner',
                    tabBarIcon: () => (
                        <View>
                            <Icon
                                name={'ra'}
                            />
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="ScannerCamera"
                component={ScannerCamera}
            />
            <Stack.Screen
                name="ScannerResult"
                component={ScannerResult}
            />
        </Stack.Navigator>
    )
}

const RootNavigator = () => {
    const screenData = useScreenDimensions()
    return (
        <NavigationContainer>
            <Tab.Navigator shifting={true}
                           sceneAnimationEnabled={true}
                           initialRouteName="Profile"
                           activeColor="#EAE7ED"
                           labelStyle={{ fontSize: 12 }}
                           barStyle={{
                               backgroundColor: colors.shadowBlue,
                               height: screenData.isLandscape ? '9%' : '9%'
                           }}
            >
                <Tab.Screen
                    name='Barcode'
                    options={{
                        tabBarLabel: 'Штрихкод',
                        tabBarIcon: () => (
                            <View>
                                <Icon
                                    style={[{color: '#F9F3E7'}]}
                                    size={23}
                                    name={'ra'}
                                />
                            </View>
                        ),
                    }}
                    component={Barcode}
                />
                <Tab.Screen
                    name='Scanner'
                    options={{
                        tabBarLabel: 'Сканер',
                        tabBarIcon: () => (
                            <View>
                                <Icon
                                    style={[{color: '#F9F3E7'}]}
                                    size={28}
                                    name={'th'}
                                />
                            </View>
                        ),
                    }}
                     component={ScannerStackScreen}
                />
                <Tab.Screen
                    name='Profile'
                    options={{
                        tabBarLabel: 'Профіль',
                        tabBarIcon: () => (
                            <View>
                                <Icon
                                    style={[{color: '#F9F3E7'}]}
                                    size={28}
                                    name={'user'}
                                />
                            </View>
                        ),
                    }}
                    component={LoginStackScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigator
