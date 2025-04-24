import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import BarMapScreen from '../screens/BarMapScreen';
import BarDetailScreen from '../screens/BarDetailScreen';
import { Bar } from '../api/bars';

export type AppStackParamList = {
  Home: undefined;
  BarMap: undefined;
  BarDetail: { bar: Bar };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BarMap" component={BarMapScreen} />
        <Stack.Screen name="BarDetail" component={BarDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
