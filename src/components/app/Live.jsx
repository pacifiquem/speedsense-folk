import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import io from "socket.io-client";
import { useViolations } from "../../contexts/DashboardContext";

const VIOLATION_LIFETIME = 5 * 60 * 1000; // 5 minutes in milliseconds

export default function ViolationMap() {
  const { violations, loading } = useViolations();
  const [filters, setFilters] = useState({ violationType: "", deviceId: "" });
  const [filteredViolations, setFilteredViolations] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io("https://speedsense.onrender.com");
    setSocket(socketInstance);

    socketInstance.on("newViolation", (violation) => {
      setFilteredViolations((prevViolations) => [violation, ...prevViolations]);
    });

    return () => socketInstance.disconnect();
  }, []);

  useEffect(() => {
    const filtered = violations.filter(
      (violation) =>
        (!filters.violationType || violation.type === filters.violationType) &&
        (!filters.deviceId || violation.deviceId === filters.deviceId)
    );
    setFilteredViolations(filtered);
  }, [filters, violations]);

  // Remove markers after the set violation lifetime
  useEffect(() => {
    const interval = setInterval(() => {
      setFilteredViolations((prevViolations) =>
        prevViolations.filter(
          (violation) =>
            new Date() - new Date(violation.time) < VIOLATION_LIFETIME
        )
      );
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="min-h-screen p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 text-gray-900 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Violation Map</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          value={filters.violationType}
          onChange={(e) =>
            setFilters({ ...filters, violationType: e.target.value })
          }
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Violation Types</option>
          <option value="speeding">Speeding</option>
          <option value="disconnection">Disconnection</option>
        </select>
        <input
          type="text"
          placeholder="Filter by Device ID"
          value={filters.deviceId}
          onChange={(e) => setFilters({ ...filters, deviceId: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Map */}
      <MapContainer
        center={[1.6109, 29.4999]} // Sample coordinates for demonstration
        zoom={13}
        className="w-full h-[500px] mb-8"
      >
        <TileLayer
          url={`https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&ll=-1.89667105,30.03693855&key=AIzaSyBFOHm9uRT4PWyKqrUzRAAi7Ol7xfzs6U4&`}
          attribution="&copy; OpenStreetMap contributors"
        />
        {filteredViolations.map((violation) => (
          <Marker
            key={violation.id}
            position={[violation.coordinates.lat, violation.coordinates.lng]}
          >
            <Popup>
              <div>
                <p>
                  <strong>Device ID:</strong> {violation.device.id}
                </p>
                <p>
                  <strong>Type:</strong> {violation.violationType}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {new Date(violation.time).toLocaleString()}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
