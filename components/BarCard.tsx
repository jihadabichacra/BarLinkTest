import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Bar } from '../api/bars';

export default function BarCard({ bar }: { bar: Bar }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{bar.name}</Text>
      <Text>{bar.openingHours}</Text>
      <Text>{bar.beerPrice}</Text>
      {bar.photoUrl && <Image source={{ uri: bar.photoUrl }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding:10, backgroundColor:'white', borderRadius:6, marginBottom:10 },
  name: { fontWeight:'bold', fontSize:18 },
  image: { width:'100%', height:100, marginTop:8, borderRadius:6 },
});
