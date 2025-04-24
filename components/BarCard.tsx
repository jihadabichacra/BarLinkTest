// components/BarCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Bar } from '../api/bars';

interface BarCardProps {
  bar: Bar;
}

const BarCard: React.FC<BarCardProps> = ({ bar }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{bar.name}</Text>
    <Text>{bar.openingHours}</Text>
    <Text>{bar.beerPrice}</Text>
    {bar.photoUrl && <Image source={{ uri: bar.photoUrl }} style={styles.image} />}
  </View>
);

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginTop: 10,
  },
});

export default BarCard;
