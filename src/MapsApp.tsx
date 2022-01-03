import { PlacesProvider, MapProvider, UiProvider } from './context';
import { HomeScreen } from './screens';

export const MapsApp = () => {
  return (
    <UiProvider>
      <PlacesProvider>
        <MapProvider>
          <HomeScreen />
        </MapProvider>
      </PlacesProvider>
    </UiProvider>
  );
};
