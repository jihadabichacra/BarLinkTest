// api/bars.ts
export type Bar = {
    id: string;
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
    longitudeDelta: number
  ): Promise<Bar[]> {
    // build the bounding‐box from the region
    const south = latitude - latitudeDelta / 2;
    const north = latitude + latitudeDelta / 2;
    const west  = longitude - longitudeDelta / 2;
    const east  = longitude + longitudeDelta / 2;
  
    const query = `
      [out:json][timeout:25];
      node["amenity"="bar"](${south},${west},${north},${east});
      out body;
    `;
  
    // send as POST
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'data=' + encodeURIComponent(query),
    });
  
    const text = await response.text();
  
    // quick check: if it starts with '<', it’s HTML—throw so you can see it
    if (text.trim().startsWith('<')) {
      console.error('Overpass HTML error response:', text);
      throw new Error('Overpass API returned HTML instead of JSON');
    }
  
    // now safely parse JSON
    const json = JSON.parse(text);
  
    return json.elements.map((el: any) => ({
      id: el.id.toString(),
      name: el.tags.name || 'Unnamed Bar',
      latitude: el.lat,
      longitude: el.lon,
      openingHours: el.tags.opening_hours || 'Not available',
      beerPrice: el.tags.beer_price || 'Not available',
      photoUrl: el.tags.image || undefined,
    }));
  }
  