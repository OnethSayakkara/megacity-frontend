// src/components/GpsTracker.js
import { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const GPSTracker = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAe8qybKlyLJc7fAC3s-0NwUApOPYRILCs", // Replace with your API key
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentLocation || { lat: 0, lng: 0 }}
      zoom={15}
    >
      {currentLocation && <Marker position={currentLocation} />}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default GPSTracker;