import { useContext } from 'react';
import { PlacesContext, UiContext } from '../context';
import {
  ErrorAlert,
  SearchBar,
  BtnMyLocation,
  Loading,
  MapView,
} from '../components';
import { TripInformation } from '../components/TripInformation';

export const HomeScreen = () => {
  const { userLocation, isLoading, tripInfo } = useContext(PlacesContext);
  const { errorAlert } = useContext(UiContext);

  if (isLoading || !userLocation) {
    return <Loading />;
  }
  return (
    <div>
      <MapView />
      <SearchBar />
      <BtnMyLocation />
      {errorAlert.isVisible && <ErrorAlert />}
      {tripInfo && (
        <TripInformation time={tripInfo.time} distance={tripInfo.distance} />
      )}
    </div>
  );
};
