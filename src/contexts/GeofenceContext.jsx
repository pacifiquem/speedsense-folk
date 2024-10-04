import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "../utils/axios.util";
import showToast from "../utils/errorToasts.util";

const GeofenceContext = createContext();

const GeofenceProvider = ({ children }) => {
  const [roads, setRoads] = useState([]);
  // Fetch all roads
  useEffect(() => {
    const fetchRoads = async () => {
      try {
        const response = await axios.get("geofence/roads");
        setRoads(response.data);
      } catch (error) {
        showToast("Failed to fetch roads", "error");
        console.error("Failed to fetch roads:", error);
      }
    };
    fetchRoads();
  }, []);

  // Add a new road
  const addRoad = async (name) => {
    try {
      const response = await axios.post("geofence/roads", { name });
      setRoads([...roads, response.data]);
    } catch (error) {
      showToast("Failed to add road", error);
      console.error("Failed to add road:", error);
    }
  };

  // Add a new road segment
  const addRoadSegment = async (coordinates, speedLimit, roadId) => {
    try {
      const response = await axios.post("geofence/road_segments", {
        coordinates,
        speedLimit,
        roadId,
      });
      const updatedRoads = roads.map((road) =>
        road.id === roadId
          ? { ...road, segments: [...road.segments, response.data] }
          : road
      );
      setRoads(updatedRoads);
    } catch (error) {
      showToast("Failed to add road segment", "error");
      console.error("Failed to add road segment:", error);
    }
  };

  return (
    <GeofenceContext.Provider value={{ roads, addRoad, addRoadSegment }}>
      {children}
    </GeofenceContext.Provider>
  );
};

const useGeofence = () => useContext(GeofenceContext);

export { useGeofence, GeofenceProvider };
