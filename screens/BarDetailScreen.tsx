// screens/BarDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../navigation/AppNavigator';

type Props = { route: RouteProp<AppStackParamList, 'Details'> };

export default function BarDetailScreen({ route }: Props) {
  const { bar } = route.params;
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{bar.name}</Text>
      <Text style={styles.item}>Horaires: {bar.openingHours}</Text>
      <Text style={styles.item}>Prix bière: {bar.beerPrice}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  title: { fontSize:24, fontWeight:'bold', marginBottom:12 },
  item: { fontSize:16, marginVertical:6 },
});
