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
  
  export const fetchBarsFromOverpass = async (
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
  ): Promise<Bar[]> => {
    const url = `https://overpass-api.de/api/interpreter?data=[out:json];(node["amenity"="bar"](around:${latitudeDelta},${latitude},${longitudeDelta},${longitude}););out;`;
    const response = await fetch(url);
    const data = await response.json();
  
    return data.elements.map((el: any) => ({
      id: el.id,
      name: el.tags.name,
      latitude: el.lat,
      longitude: el.lon,
      openingHours: el.tags.opening_hours || 'Not available',
      beerPrice: 'Price not available', // You can modify this if you fetch beer price separately
      photoUrl: el.tags.image || undefined,
    }));
  };
  