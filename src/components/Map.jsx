import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ location }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Initialize map once
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([20.5937, 78.9629], 5); // Default view to India

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }
  }, []);

  useEffect(() => {
    if (location && mapRef.current) {
      const { lat, lon } = location;

      // Set map view to new location
      mapRef.current.setView([lat, lon], 13);

      // Remove previous marker
      if (markerRef.current) {
        mapRef.current.removeLayer(markerRef.current);
      }

      // Add new marker
      markerRef.current = L.marker([lat, lon])
        .addTo(mapRef.current)
        .bindPopup(location.formatted)
        .openPopup();
    }
  }, [location]);

  return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
};

export default Map;
