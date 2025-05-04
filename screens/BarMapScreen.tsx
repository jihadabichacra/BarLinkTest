// screens/BarMapScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { fetchBarsFromOverpass, Bar } from '../api/bars';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../navigation/AppNavigator';

type NavProp = NativeStackNavigationProp<AppStackParamList, 'Map'>;

const ZOOM_THRESHOLD = 0.1;

export default function BarMapScreen() {
  const [bars, setBars] = useState<Bar[]>([]);
  const [region, setRegion] = useState<Region>({
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 0.07,
    longitudeDelta: 0.07,
  });
  const [selected, setSelected] = useState<Bar | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const navigation = useNavigation<NavProp>();

  const handleRegionChange = (newRegion: Region) => {
    setRegion(newRegion);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (newRegion.latitudeDelta >= ZOOM_THRESHOLD || newRegion.longitudeDelta > ZOOM_THRESHOLD) {
        abortRef.current?.abort();
        abortRef.current = null;
        if (bars.length) setBars([]); // ✅ This clears pins when zoomed out
        setSelected(null);
        setShowDetails(false);
        return;
    }

    debounceRef.current = setTimeout(() => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      fetchBarsFromOverpass(
        newRegion.latitude,
        newRegion.longitude,
        newRegion.latitudeDelta,
        newRegion.longitudeDelta,
        controller.signal
      )
        .then((data) => setBars(data))
        .catch((err) => {
          if (err.name !== 'AbortError') console.warn(err);
        });
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      abortRef.current?.abort();
    };
  }, []);

  const onMarkerPress = (bar: Bar) => {
    if (selected?.id === bar.id) {
      setShowDetails(true);
    } else {
      setSelected(bar);
      setShowDetails(false);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={handleRegionChange}
        minZoomLevel={12} // prevent excessive zoom out
      >
        {region.latitudeDelta <= ZOOM_THRESHOLD &&
          bars.map((bar) => (
            <Marker
                key={bar.id}
                coordinate={{ latitude: bar.latitude, longitude: bar.longitude }}
                title={bar.name}
                onPress={() => onMarkerPress(bar)}
            />
          ))}
      </MapView>

      {selected && (
        <TouchableOpacity
          style={styles.info}
          onPress={() => navigation.navigate('Details', { bar: selected })}
        >
          <Text style={styles.title}>{selected.name}</Text>
          {showDetails ? (
            <>
              <Text>Horaires : {selected.openingHours}</Text>
              <Text>Prix bière : {selected.beerPrice}</Text>
            </>
          ) : (
            <Text style={styles.tap}>Appuyez encore pour voir plus</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { ...StyleSheet.absoluteFillObject },
  info: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  tap: { fontStyle: 'italic', marginTop: 4, color: '#555' },
});
