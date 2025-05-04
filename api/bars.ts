// api/bars.ts
export type Bar = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    openingHours: string;
    beerPrice: string;
    photoUrl?: string;
  };
  
  export async function fetchBarsFromOverpass(
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
    signal?: AbortSignal
  ): Promise<Bar[]> {
    // Ignore overly zoomed-out regions
    const MAX_DELTA = 0.1;
    if (latitudeDelta > MAX_DELTA || longitudeDelta > MAX_DELTA) {
      console.warn('Zoom level too low — skipping fetch.');
      return [];
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
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: query,
        signal,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const json = await response.json();
  
      return json.elements
        .filter((el: any) => el.lat && el.lon)
        .map((el: any) => ({
          id: el.id,
          name: el.tags?.name || 'Unnamed Bar',
          latitude: el.lat,
          longitude: el.lon,
          openingHours: el.tags?.opening_hours || 'Unknown',
          beerPrice: el.tags?.['drink:beer'] || 'Unknown',
        }));
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted.');
      } else {
        console.error('Error fetching bars:', error.message);
      }
      return [];
    }
  }
  