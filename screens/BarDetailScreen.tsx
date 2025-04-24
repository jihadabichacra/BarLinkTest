import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Bar } from '../api/bars';

export default function BarDetailScreen({ route }: any) {
  const { bar }: { bar: Bar } = route.params;
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{bar.name}</Text>
      <Text style={styles.info}>Hours: {bar.openingHours}</Text>
      <Text style={styles.info}>Price: {bar.beerPrice}</Text>
      {bar.photoUrl && (
        <Image source={{ uri: bar.photoUrl }} style={styles.image} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:12 },
  title: { fontSize:24, fontWeight:'bold', marginBottom:12 },
  info: { fontSize:16, marginBottom:8 },
  image: { width:'100%', height:200, borderRadius:8, marginTop:12 },
});
