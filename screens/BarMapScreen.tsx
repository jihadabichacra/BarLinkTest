// screens/BarMapScreen.tsx

import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';  // Import the Region type
import { fetchBarsFromOverpass, Bar } from '../api/bars';
import debounce from 'lodash/debounce';

export default function BarMapScreen() {
  const [bars, setBars] = useState<Bar[]>([]);
  const [region, setRegion] = useState<Region>({
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 0.07,
    longitudeDelta: 0.07,
  });
  const [error, setError] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(0);

  // Debounced function to load bars based on region
  const debouncedLoad = useMemo(() => debounce(async (region: Region) => {
    try {
      const data = await fetchBarsFromOverpass(
        region.latitude,
        region.longitude,
        region.latitudeDelta,
        region.longitudeDelta
      );
      setBars(data);
    } catch (err) {
      setError("Error fetching bars. Please try again.");
    }
  }, 300), []);

  // Update zoom level and region on map interaction
  const onRegionChangeComplete = (region: Region) => {  // Type the region here
    setZoomLevel(region.latitudeDelta);
    setRegion(region);
  };

  // Filter bars based on zoom level
  const filteredBars = bars.filter(bar => zoomLevel < 0.05); // Adjust the zoom threshold

  useEffect(() => {
    debouncedLoad(region); // Trigger the debounced function when the region changes

    return () => {
      debouncedLoad.cancel(); // Cleanup the debounced function
    };
  }, [region, debouncedLoad]);

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <MapView
        style={StyleSheet.absoluteFillObject}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {filteredBars.map((bar) => (
          <Marker
            key={bar.id}
            coordinate={{ latitude: bar.latitude, longitude: bar.longitude }}
            title={bar.name}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    color: 'red',
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    fontSize: 16,
  },
});
