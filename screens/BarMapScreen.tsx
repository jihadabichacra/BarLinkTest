// screens/BarMapScreen.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Button, Text, Image, Alert } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import debounce from 'lodash/debounce';
import { fetchBarsFromOverpass, Bar } from '../api/bars';

export default function BarMapScreen({ navigation }: any) {
  const [bars, setBars] = useState<Bar[]>([]);
  const [clickedBar, setClickedBar] = useState<Bar | null>(null);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [region, setRegion] = useState<Region>({
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 0.07,
    longitudeDelta: 0.07,
  });
  const ZOOM_THRESHOLD = 0.02;

  // Fetch bars for a given region
  const loadBars = async (r: Region) => {
    try {
      const data = await fetchBarsFromOverpass(
        r.latitude,
        r.longitude,
        r.latitudeDelta,
        r.longitudeDelta
      );
      setBars(data);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Could not load bars. Please try again.');
    }
  };

  // Debounce the loadBars call so it only fires after user stops zoom/pan
  const debouncedLoad = useMemo(
    () => debounce((r: Region) => loadBars(r), 300),
    [loadBars]
  );

  // Initial load
  useEffect(() => {
    loadBars(region);
  }, []);

  // Handle marker press to toggle between name and full info
  const onMarkerPress = (bar: Bar) => {
    if (clickedBar && clickedBar.id === bar.id) {
      setIsInfoVisible(true);
    } else {
      setClickedBar(bar);
      setIsInfoVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => {
          setRegion(newRegion);
          if (
            newRegion.latitudeDelta < ZOOM_THRESHOLD &&
            newRegion.longitudeDelta < ZOOM_THRESHOLD
          ) {
            debouncedLoad(newRegion);
          } else {
            setBars([]);
          }
        }}
      >
        {bars.map((bar) => (
          <Marker
            key={bar.id}
            coordinate={{ latitude: bar.latitude, longitude: bar.longitude }}
            title={bar.name}
            onPress={() => onMarkerPress(bar)}
          />
        ))}
      </MapView>

      {clickedBar && (
        <View style={styles.infoContainer}>
          <Text style={styles.barName}>{clickedBar.name}</Text>
          {isInfoVisible ? (
            <>
              <Text style={styles.barInfo}>
                Opening Hours: {clickedBar.openingHours}
              </Text>
              <Text style={styles.barInfo}>
                Beer Price: {clickedBar.beerPrice}
              </Text>
              {clickedBar.photoUrl && (
                <Image
                  source={{ uri: clickedBar.photoUrl }}
                  style={styles.barImage}
                />
              )}
            </>
          ) : (
            <Text style={styles.barInfo}>
              Tap again to see more information
            </Text>
          )}
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Refresh Bars" onPress={() => loadBars(region)} />
      </View>

      {bars.length === 0 && (
        <Text style={styles.noBarsText}>Zoom in to see bars</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { ...StyleSheet.absoluteFillObject },
  buttonContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 80,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
  },
  barName: { fontSize: 18, fontWeight: 'bold' },
  barInfo: { marginTop: 5 },
  barImage: { width: '100%', height: 120, marginTop: 10, borderRadius: 8 },
  noBarsText: {
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 8,
    borderRadius: 4,
  },
});
