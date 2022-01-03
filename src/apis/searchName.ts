import axios from 'axios';
import config from '../config';

export const searchName = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    access_token: config.mapbox_token,
    language: 'en',
  },
});
