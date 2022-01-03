import { useContext } from 'react';
import { MapContext } from '../context/map/MapContext';
import { PlacesContext } from '../context/places/PlacesContext';

export const BtnMyLocation = () => {
  const { map } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);

  const handleClick = () => {
    if (!map) throw new Error('Map is not initialized');
    if (!userLocation) throw new Error('User location is not initialized');
    map.flyTo({ zoom: 15, center: userLocation });
  };
  return (
    <button
      onClick={handleClick}
      className=" fixed z-10 bg-hard-color  hover:bg-medium-color text-white p-3 rounded bottom-8 sm:bottom-16 right-2 sm:right-10 "
    >
      <i className="far fa-compass mr-2"> </i>
      My location
    </button>
  );
};
