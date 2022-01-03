import { useContext, useState } from 'react';
import { PlacesContext, MapContext, UiContext } from '../context';
import { Feature } from '../interfaces/places';
import { LoadingPlaces } from './LoadingPlaces';

export const SearchResult = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const { map, getRoutesBetweenPoints } = useContext(MapContext);
  const { areResultsVisible, setResultsStatus } = useContext(UiContext);
  const [activeId, setActiveId] = useState('');

  const onViewMapClick = (place: Feature) => {
    setResultsStatus(false);
    const [lng, lat] = place.center;
    map?.flyTo({ zoom: 15, center: [lng, lat] });
  };

  const getRoute = (place: Feature) => {
    if (!userLocation) return;
    const [lng, lat] = place.center;
    getRoutesBetweenPoints(userLocation, [lng, lat]);
    setResultsStatus(false);
    setActiveId(place.id);
  };

  if (isLoadingPlaces) {
    return <LoadingPlaces />;
  }

  return (
    <div
      className={`flex flex-col bg-dark rounded-b-xl text-light-color w-96 p-3 overflow-auto -mt-3 ${
        places?.length === 0 || !areResultsVisible ? 'hidden' : ''
      }`}
    >
      {places?.map((place) => (
        <div
          key={place.id}
          className={`flex flex-col items-center  p-3 rounded-lg m-3 text-center ${
            activeId === place.id ? 'bg-medium-color ' : 'bg-hard-color '
          } `}
        >
          <p className="mb-3">{place.text}</p>
          <div className="flex  justify-between w-full">
            <div
              onClick={() => getRoute(place)}
              className="p-2 border-2 border-light-color hover:bg-light-color hover:text-hard-color cursor-pointer"
            >
              Set Destination <i className="fas fa-route"></i>
            </div>
            <div
              onClick={() => onViewMapClick(place)}
              className="p-2 border-2 border-light-color hover:bg-light-color hover:text-hard-color cursor-pointer"
            >
              View on map <i className="far fa-map"></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
