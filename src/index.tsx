import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import config from './config';
import { MapsApp } from './MapsApp';
import './index.css';

if (!navigator.geolocation) {
  alert('Geolocation is not supported by your browser');
  throw new Error('Geolocation is not supported by your browser');
}

mapboxgl.accessToken = config.mapbox_token;

ReactDOM.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
  document.getElementById('root')
);
