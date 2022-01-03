import { useEffect, useReducer } from 'react';
import { searchName, searchPlaces } from '../../apis';
import { getUserLocation } from '../../helpers';
import { PlacesResponse, Feature } from '../../interfaces/places';
import { PlacesNames } from '../../interfaces/placesName';
import { PlacesContext } from './PlacesContext';
import { PlacesReducer } from './PlacesReducer';

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  userLocationName?: string;
  isLoadingPlaces: boolean;
  places: Feature[];
  tripInfo?: { distance: number; time: number };
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  userLocationName: undefined,
  isLoadingPlaces: false,
  places: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(PlacesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then((lngLat) => {
      dispatch({ type: 'SET_USER_LOCATION', payload: lngLat });
    });
  }, []);

  useEffect(() => {
    if (!state.userLocation) return;
    searchName
      .get<PlacesNames>(`${state.userLocation.join(',')}.json`)
      .then((res) => res.data.features[0].text)
      .then((name) => dispatch({ type: 'SET_LOCATION_NAME', payload: name }));
  }, [state.userLocation]);

  const searchPlacesByQuery = async (query: string): Promise<Feature[]> => {
    if (query.length === 0) {
      dispatch({ type: 'SET_PLACES', payload: [] });
      dispatch({ type: 'REMOVE_TRIP_INFO' });
      return [];
    }
    if (!state.userLocation) throw new Error('No user location');
    dispatch({ type: 'SET_LOADING_PLACES' });

    const resp = await searchPlaces.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(','),
      },
    });
    dispatch({ type: 'SET_PLACES', payload: resp.data.features });
    return resp.data.features;
  };

  const setTripInfo = (distance: number, time: number) => {
    dispatch({ type: 'SET_TRIP_INFO', payload: { distance, time } });
  };
  return (
    <PlacesContext.Provider
      value={{ ...state, searchPlacesByQuery, setTripInfo }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
