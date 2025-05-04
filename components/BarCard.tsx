// components/BarCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Bar } from '../api/bars';

interface BarCardProps {
  bar: Bar;
}

export default function BarCard({ bar }: BarCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{bar.name}</Text>
      <Text style={styles.info}>Horaires : {bar.openingHours}</Text>
      <Text style={styles.info}>Prix bière : {bar.beerPrice}</Text>
      {bar.photoUrl ? (
        <Image source={{ uri: bar.photoUrl }} style={styles.image} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  info: {
    fontSize: 14,
    marginBottom: 4,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 6,
    marginTop: 8,
  },
});
