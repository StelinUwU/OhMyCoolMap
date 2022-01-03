import { Map } from 'mapbox-gl';
import { useContext, useLayoutEffect, useRef } from 'react';
import { MapContext, PlacesContext } from '../context';

export const MapView = () => {
  const { userLocation, userLocationName } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);
  const mapDiv = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (userLocation && userLocationName) {
      const map = new Map({
        container: mapDiv.current!,
        style: 'mapbox://styles/mapbox/dark-v10',
        center: userLocation,
        zoom: 15,
      });
      setMap(map);
    }
  }, [userLocation, userLocationName]);

  return <div ref={mapDiv} className="fixed h-screen w-screen"></div>;
};
