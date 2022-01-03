import { PlacesState } from './PlacesProvider';
import { Feature } from '../../interfaces/places';
type Action =
  | { type: 'SET_USER_LOCATION'; payload: [number, number] }
  | { type: 'SET_LOCATION_NAME'; payload: string }
  | { type: 'SET_LOADING_PLACES' }
  | { type: 'SET_PLACES'; payload: Feature[] }
  | { type: 'SET_TRIP_INFO'; payload: { distance: number; time: number } }
  | { type: 'REMOVE_TRIP_INFO' };

export const PlacesReducer = (
  state: PlacesState,
  action: Action
): PlacesState => {
  switch (action.type) {
    case 'SET_USER_LOCATION':
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload,
      };
    case 'SET_LOCATION_NAME':
      return {
        ...state,
        userLocationName: action.payload,
      };
    case 'SET_LOADING_PLACES':
      return {
        ...state,
        isLoadingPlaces: true,
        places: [],
      };
    case 'SET_PLACES':
      return {
        ...state,
        isLoadingPlaces: false,
        places: action.payload,
      };
    case 'SET_TRIP_INFO':
      return {
        ...state,
        tripInfo: action.payload,
      };
    case 'REMOVE_TRIP_INFO':
      return {
        ...state,
        tripInfo: undefined,
      };
    default:
      return state;
  }
};
