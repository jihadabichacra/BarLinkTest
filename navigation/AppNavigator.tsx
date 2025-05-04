// navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import BarMapScreen from '../screens/BarMapScreen';
import { Bar } from '../api/bars';

export type AppStackParamList = {
  Home: undefined;
  Map: undefined;
  Details: { bar: Bar };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={BarMapScreen} options={{ title: 'Carte des bars' }}/>
        <Stack.Screen name="Details" component={require('../screens/BarDetailScreen').default} options={{ title: 'Détails du bar' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
