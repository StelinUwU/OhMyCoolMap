import axios from 'axios';
import config from '../config';

export const directionsAPI = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    geometries: 'geojson',
    language: 'en',
    overview: 'simplified',
    steps: false,
    access_token: config.mapbox_token,
  },
});
