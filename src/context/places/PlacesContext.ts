import { createContext } from 'react';
import { Feature } from '../../interfaces/places';

interface PlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];
  userLocationName?: string;
  places: Feature[];
  isLoadingPlaces?: boolean;
  tripInfo?: { distance: number; time: number };
  searchPlacesByQuery: (query: string) => Promise<Feature[]>;
  setTripInfo: (distance: number, time: number) => void;
}

export const PlacesContext = createContext<PlacesContextProps>(
  {} as PlacesContextProps
);
