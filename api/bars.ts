// api/bars.ts

export interface Bar {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    openingHours: string;
    beerPrice: string;
    photoUrl?: string;
  }
  
  const barCache: { [key: string]: Bar[] } = {}; // Cache for bars data
  
  export async function fetchBarsFromOverpass(
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
  ): Promise<Bar[]> {
    const cacheKey = `${latitude},${longitude},${latitudeDelta},${longitudeDelta}`;
    
    // Check if data is already cached
    if (barCache[cacheKey]) {
      console.log("Returning cached bars...");
      return barCache[cacheKey];
    }
  
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="bar"]
          (${latitude - latitudeDelta},${longitude - longitudeDelta},
           ${latitude + latitudeDelta},${longitude + longitudeDelta});
      );
      out body;
    `;
  
    const url = 'https://overpass-api.de/api/interpreter';
  
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: query,
        signal: controller.signal,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const json = await response.json();
  
      const bars = json.elements
        .filter((el: any) => el.lat && el.lon)
        .map((el: any) => ({
          id: el.id,
          name: el.tags.name || 'Unnamed Bar',
          latitude: el.lat,
          longitude: el.lon,
          openingHours: el.tags.opening_hours || 'Unknown',
          beerPrice: el.tags['drink:beer'] || 'Unknown',
        }));
  
      // Cache the fetched bars data
      barCache[cacheKey] = bars;
  
      return bars;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.error('Request timed out');
      } else {
        console.error('Error fetching bars:', error.message);
      }
      return []; // Return empty list to avoid crash
    } finally {
      clearTimeout(timeout);
    }
  }
  