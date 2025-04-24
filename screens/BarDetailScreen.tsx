// screens/BarDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Bar } from '../api/bars';

export default function BarDetailScreen({ route }: any) {
  const { bar }: { bar: Bar } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.barName}>{bar.name}</Text>
      <Text style={styles.barInfo}>Opening Hours: {bar.openingHours}</Text>
      <Text style={styles.barInfo}>Beer Price: {bar.beerPrice}</Text>
      {bar.photoUrl && <Image source={{ uri: bar.photoUrl }} style={styles.barImage} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  barName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  barInfo: {
    fontSize: 16,
    marginVertical: 5,
  },
  barImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
});
