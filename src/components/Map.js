import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'


mapboxgl.accessToken ="pk.eyJ1IjoiY3J1Z2dnaWVybyIsImEiOiJja3pteWFjMTAxZ2k3MndueHZnbmhuaDN2In0.N9uLqiw04di8ghl1-KUkdw";

const defLNG = -120.6252; // default lat/long is set to SLO
const defLAT = 35.2628;
const defZoom = 9;

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(defLNG);
  const [lat, setLat] = useState(defLAT);
  const [zoom, setZoom] = useState(defZoom);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    // add search bar
    map.current.addControl(
      new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl
      })
    );
    // track user location
    map.current.addControl(
      new mapboxgl.GeolocateControl({
          positionOptions: {
              enableHighAccuracy: true
          },
          // When active the map will receive updates to the device's location as it changes.
          trackUserLocation: true,
          // Draw an arrow next to the location dot to indicate which direction the device is heading.
          showUserHeading: true
      })
    );
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default Map;
