/*eslint import/no-webpack-loader-syntax:off*/
//@ts-ignore
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from '!mapbox-gl';
import { useContext, useEffect, useReducer } from 'react';
import { MapContext } from './MapContext';
import { MapReducer } from './MapReducer';
import { PlacesContext, UiContext } from '../';
import { directionsAPI } from '../../apis';
import { DirectionsResponse } from '../../interfaces/directions';

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE);
  const { userLocationName, places, setTripInfo } = useContext(PlacesContext);
  const { setErrorAlert, hideErrorAlert } = useContext(UiContext);
  useEffect(() => {
    if (!state.map) return;
    state.markers.forEach((marker) => marker.remove());
    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(
        `<h3 class="text-center" >${place.text}</h3> `
      );
      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map);
      newMarkers.push(newMarker);
    }
    if (state.map?.getLayer('route')) {
      state.map.removeLayer('route');
      state.map.removeSource('route');
    }
    dispatch({ type: 'SET_MARKERS', payload: newMarkers });
  }, [places]);

  const getRoutesBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const resp = await directionsAPI.get<DirectionsResponse>(
      `/${start.join(',')};${end.join(',')}`
    );

    if (!resp || resp.data.code === 'NoRoute') {
      setErrorAlert('No route found');
      setTimeout(() => {
        hideErrorAlert();
      }, 2000);
      return;
    }

    const { distance, duration, geometry } = resp.data.routes[0];

    const { coordinates: coords } = geometry;

    const kms = Math.ceil(distance / 1000);
    const minutes = Math.ceil(duration / 60);
    setTripInfo(kms, minutes);

    const bounds = new LngLatBounds(start, start);

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }
    state.map?.fitBounds(bounds, { padding: 50 });

    //Polyline
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        ],
      },
    };

    if (state.map?.getLayer('route')) {
      state.map.removeLayer('route');
      state.map.removeSource('route');
    }

    state.map?.addSource('route', sourceData);
    state.map?.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#3b9ddd',
        'line-width': 3,
      },
    });
  };

  //Polyline

  const setMap = (map: Map) => {
    const myLocationPopup = new Popup({
      className: 'bg-blue-200 rounded-2xl',
    }).setHTML(` <h3 class="text-center" >${userLocationName}</h3> `);

    new Marker({ color: '#3282B8' })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);
    dispatch({ type: 'SET_MAP', payload: map });
  };

  return (
    <MapContext.Provider value={{ ...state, setMap, getRoutesBetweenPoints }}>
      {children}
    </MapContext.Provider>
  );
};
