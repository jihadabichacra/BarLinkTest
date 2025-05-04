// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const nav = useNavigation<NativeStackNavigationProp<AppStackParamList, 'Home'>>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur BarLink</Text>
      <Button title="Voir la carte" onPress={() => nav.navigate('Map')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center' },
  title: { fontSize:24, marginBottom:20 },
});
