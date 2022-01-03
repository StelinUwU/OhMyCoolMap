import axios from 'axios';
import config from '../config';

export const searchPlaces = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    access_token: config.mapbox_token,
    language: 'en',
    limit: 5,
  },
});
