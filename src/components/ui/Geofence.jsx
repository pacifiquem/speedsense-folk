import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl } from "react-leaflet-draw";
import axios from "axios";
import { rwandaCoordinates } from "../../constants/data";

import { useGeofence } from "../../contexts/GeofenceContext";
import showToast from "../../utils/errorToasts.util";

const Geofence = ({ road, location, onClose }) => {
  const [speedLimit, setSpeedLimit] = useState("");
  const [roadSegmentName, setRoadSegmentName] = useState("");
  const [initialPosition, setInitialPosition] = useState([
    rwandaCoordinates.latitude,
    rwandaCoordinates.longitude,
  ]); // Default to Rwanda
  const [selectedRoad, setSelectedRoad] = useState(null);
  const { addRoadSegment } = useGeofence();

  // Fetch initial position based on location
  useEffect(() => {
    const fetchLocationCoordinates = async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search`,
          {
            params: {
              q: location || "Rwanda",
              format: "json",
              limit: 1,
            },
          }
        );

        if (response.data.length) {
          const { lat, lon } = response.data[0];
          setInitialPosition([parseFloat(lat), parseFloat(lon)]);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        showToast("Failed to fetch location", "error");
      }
    };

    if (location) fetchLocationCoordinates();
  }, [location]);

  const handleSpeedChange = (e) => {
    setSpeedLimit(Number(e.target.value));
  };

  const handleSave = () => {
    if (!selectedRoad) {
      showToast("Please draw a road first.", "error");
      return;
    } else if (!speedLimit) {
      showToast("Please set a speed limit.", "error");
      return;
    } else if (!roadSegmentName) {
      showToast("Please set a name for the road segment.", "error");
      return;
    }
    addRoadSegment(selectedRoad, speedLimit, road.id, roadSegmentName);
    onClose();
    showToast("Segment added successfully", "success");
  };

  // Handle road drawing
  const onCreated = (e) => {
    const { layerType, layer } = e;
    if (layerType === "polyline") {
      const latlngs = layer.getLatLngs();
      setSelectedRoad(latlngs);
    }
  };

  return (
    <div className="max-w-full p-6 mx-auto text-gray-200 bg-gray-900 rounded-lg shadow-lg md:max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-center">
        {road.name} Geofence Setup
      </h1>

      {/* Map */}
      <div className="overflow-hidden rounded-lg shadow-md">
        <MapContainer
          center={initialPosition}
          zoom={12}
          className="w-full h-80"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Draw Feature Group */}
          <FeatureGroup>
            <EditControl
              position="topright"
              onCreated={onCreated}
              draw={{
                polyline: true, // Allow line drawing
                polygon: false,
                rectangle: false,
                circle: false,
                marker: false,
              }}
            />
          </FeatureGroup>
        </MapContainer>
      </div>

      {/* name input */}
      <div className="flex flex-col items-center justify-center mt-6 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <label className="text-lg">Name:</label>
        <input
          type="text"
          value={roadSegmentName}
          onChange={(e) => setRoadSegmentName(e.target.value)}
          min="0"
          className="w-32 p-2 text-center text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Speed limit input */}
      <div className="flex flex-col items-center justify-center mt-6 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <label className="text-lg">Max Speed Limit (KM/H):</label>
        <input
          type="number"
          value={speedLimit}
          onChange={handleSpeedChange}
          min="0"
          className="w-32 p-2 text-center text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={handleSave}
          className="px-6 py-2 text-white transition duration-200 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Geofence;
